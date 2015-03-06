package com.innoventsolutions.pentaho.birtplugin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.StreamingOutput;

import org.mortbay.util.ajax.JSON;
import org.pentaho.platform.api.repository2.unified.IUnifiedRepository;
import org.pentaho.platform.api.repository2.unified.data.simple.SimpleRepositoryFileData;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.client.filter.ClientFilter;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;

public class RemoteFileManager {
	private final Configuration configuration;
	private final Map<Serializable, RemoteFile> map = new HashMap<Serializable, RemoteFile>();

	public RemoteFileManager(final Configuration configuration) {
		this.configuration = configuration;
	}

	public String registerFile(final Serializable fileId) {
		final RemoteFile remoteFile = map.get(fileId);
		if (remoteFile != null) {
			if (remoteFile.getExpirationTime() > System.currentTimeMillis()) {
				return remoteFile.getId();
			}
		}
		final IUnifiedRepository unifiedRepository = PentahoSystem.get(
				IUnifiedRepository.class, PentahoSessionHolder.getSession());
		final SimpleRepositoryFileData data = unifiedRepository.getDataForRead(
				fileId, SimpleRepositoryFileData.class);
		final InputStream inputStream = data.getInputStream();
		// upload the file to BMR
		final ClientConfig config = new DefaultClientConfig();
		final ClientFilter authFilter = new HTTPBasicAuthFilter(
				configuration.getUsername(), configuration.getPassword());
		final Client client = Client.create(config);
		client.addFilter(authFilter);
		final WebResource service = client.resource(configuration.getUri())
				.path("birt").path("report").path("upload");
		final WebResource.Builder builder = service
				.accept(MediaType.APPLICATION_JSON_TYPE);
		final StreamingOutput streamingOutput = new StreamingOutput() {
			@Override
			public void write(final OutputStream output) throws IOException,
					WebApplicationException {
				// final FileInputStream inputStream = new
				// FileInputStream(file);
				try {
					final byte[] buffer = new byte[0x1000];
					int bytesRead = inputStream.read(buffer);
					while (bytesRead >= 0) {
						output.write(buffer, 0, bytesRead);
						bytesRead = inputStream.read(buffer);
					}
				}
				finally {
					inputStream.close();
				}
			}
		};
		final ClientResponse response = builder.post(ClientResponse.class,
				streamingOutput);
		if (response.getStatus() != 200) {
			throw new RuntimeException("Upload file request failed: "
					+ response.getStatus());
		}
		final String jsonString = response.getEntity(String.class);
		System.out.println(jsonString);
		String remoteFileId = null;
		final Object jsonObj = JSON.parse(jsonString);
		if (jsonObj instanceof Map) {
			@SuppressWarnings("unchecked")
			final Map<Object, Object> map = (Map<Object, Object>) jsonObj;
			final Object remoteFileIdObj = map.get("fileId");
			if (remoteFileIdObj instanceof String) {
				remoteFileId = (String) remoteFileIdObj;
				// TODO associate remote file id with local file
			}
		}
		map.put(fileId, new RemoteFile(remoteFileId, System.currentTimeMillis()
				+ 15 * 60 * 60 * 1000));
		return remoteFileId;
	}
}
