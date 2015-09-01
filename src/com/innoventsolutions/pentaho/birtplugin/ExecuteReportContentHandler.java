package com.innoventsolutions.pentaho.birtplugin;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.Map;

import org.mortbay.util.ajax.JSON;
import org.pentaho.platform.engine.core.audit.MessageTypes;
import org.pentaho.platform.util.UUIDUtil;
import org.pentaho.reporting.libraries.xmlns.common.ParserUtil;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.client.filter.ClientFilter;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;

public class ExecuteReportContentHandler {
	public static final String OUTPUT_TYPE = "output-type";
	public static final String OUTPUT_TARGET = "output-target";
	public static final String REPORT_DEFINITION_INPUT = "report-definition";
	public static final String PAGINATE_OUTPUT = "paginate";
	public static final String ACCEPTED_PAGE = "accepted-page";
	public static final String PRINT = "print";
	public static final String PRINTER_NAME = "printer-name";
	public static final String DASHBOARD_MODE = "dashboard-mode";
	private final Map<String, Object> inputs;
	private final Auditor auditor;
	private final Configuration configuration;
	private final RemoteFileManager remoteFileManager;

	public ExecuteReportContentHandler(final Map<String, Object> inputs,
			final Auditor auditor) {
		this.inputs = inputs;
		this.auditor = auditor;
		this.configuration = new Configuration();
		this.remoteFileManager = new RemoteFileManager(configuration);
	}

	public interface Auditor {
		void start();

		void end(String result, long time);
	}

	/**
	 * Run a report given a file ID.
	 *
	 * @param outputStream
	 * @param fileId
	 * @param forceDefaultOutputTarget
	 * @throws Exception
	 */
	public void createReportContent(final OutputStream outputStream,
			final Serializable fileId, final boolean forceDefaultOutputTarget)
			throws Exception {
		final long start = System.currentTimeMillis();
		if (auditor != null) {
			auditor.start();
		}
		String result = MessageTypes.INSTANCE_END;
		try {
			final String remoteFileId = remoteFileManager.registerFile(fileId);
			if (remoteFileId != null) {
				runReport(remoteFileId, outputStream);
			}
		}
		catch (final Exception ex) {
			result = MessageTypes.INSTANCE_FAILED;
			throw ex;
		}
		finally {
			final long end = System.currentTimeMillis();
			if (auditor != null) {
				auditor.end(result, end - start);
			}
		}
	}

	/**
	 * Use this if you have an input stream for the report design but no file
	 * ID.
	 *
	 * @param outputStream
	 * @param inputStream
	 * @throws IOException
	 */
	public void createReportContent(final OutputStream outputStream,
			final InputStream inputStream) throws IOException {
		final long start = System.currentTimeMillis();
		if (auditor != null) {
			auditor.start();
		}
		String result = MessageTypes.INSTANCE_END;
		try {
			final RemoteFileManager remoteFileManager = new RemoteFileManager(
					configuration);
			final String remoteFileId = remoteFileManager.sendFile(inputStream);
			if (remoteFileId != null) {
				runReport(remoteFileId, outputStream);
			}
		}
		catch (final IOException ex) {
			result = MessageTypes.INSTANCE_FAILED;
			throw ex;
		}
		finally {
			final long end = System.currentTimeMillis();
			if (auditor != null) {
				auditor.end(result, end - start);
			}
		}
	}

	private void runReport(final String remoteFileId,
			final OutputStream outputStream) throws IOException {
		remoteFileManager.uploadResources();
		@SuppressWarnings("unused")
		String outputType = null;
		if (inputs.containsKey(OUTPUT_TYPE)) {
			// a mime type
			outputType = String.valueOf(inputs.get(OUTPUT_TYPE));
		}
		String outputTarget = null;
		if (inputs.containsKey(OUTPUT_TARGET)) {
			outputTarget = String.valueOf(inputs.get(OUTPUT_TARGET));
		}
		@SuppressWarnings("unused")
		InputStream reportDefinitionInputStream = null;
		if (inputs.containsKey(REPORT_DEFINITION_INPUT)) {
			reportDefinitionInputStream = (InputStream) inputs
					.get(REPORT_DEFINITION_INPUT);
		}
		@SuppressWarnings("unused")
		boolean paginateOutput = false;
		if (inputs.containsKey(PAGINATE_OUTPUT)) {
			paginateOutput = "true".equals(String.valueOf(inputs
					.get(PAGINATE_OUTPUT)));
		}
		@SuppressWarnings("unused")
		int acceptedPage = -1;
		if (inputs.containsKey(ACCEPTED_PAGE)) {
			acceptedPage = ParserUtil.parseInt(
					String.valueOf(inputs.get(ACCEPTED_PAGE)), -1);
		}
		@SuppressWarnings("unused")
		boolean print = false;
		if (inputs.containsKey(PRINT)) {
			print = "true".equals(String.valueOf(inputs.get(PRINT)));
		}
		@SuppressWarnings("unused")
		String printer = null;
		if (inputs.containsKey(PRINTER_NAME)) {
			printer = String.valueOf(inputs.get(PRINTER_NAME));
		}
		@SuppressWarnings("unused")
		boolean dashboardMode = false;
		if (inputs.containsKey(DASHBOARD_MODE)) {
			dashboardMode = "true".equals(String.valueOf(inputs
					.get(DASHBOARD_MODE)));
		}
		final Object rawSessionId = inputs
				.get(ParameterXmlContentHandler.SYS_PARAM_SESSION_ID);
		if ((rawSessionId instanceof String) == false
				|| "".equals(rawSessionId)) {
			inputs.put(ParameterXmlContentHandler.SYS_PARAM_SESSION_ID,
					UUIDUtil.getUUIDAsString());
		}
		final ClientConfig config = new DefaultClientConfig();
		final ClientFilter authFilter = new HTTPBasicAuthFilter(
				configuration.getUsername(), configuration.getPassword());
		final Client client = Client.create(config);
		client.addFilter(authFilter);
		String mimeType = "text/html";
		String outputFormat = "html";
		if (outputTarget != null) {
			if (outputTarget.toLowerCase().indexOf("html") >= 0) {
				mimeType = "text/html";
				outputFormat = "html";
			}
			else if (outputTarget.toLowerCase().indexOf("pdf") >= 0) {
				mimeType = "application/pdf";
				outputFormat = "pdf";
			}
			// TODO
		}
		final WebResource service = client.resource(configuration.getUri())
				.path("birt").path("report").path("run").path(outputFormat)
				.path(remoteFileId);
		final WebResource.Builder builder = service.accept(mimeType).type(
				"application/json");
		final String params = JSON.toString(inputs);
		final ClientResponse response = builder.post(ClientResponse.class,
				params);
		if (response.getStatus() != 200) {
			throw new RuntimeException("Run report request failed: "
					+ response.getStatus());
		}
		final InputStream inputStream = response.getEntity(InputStream.class);
		final byte[] buffer = new byte[0x1000];
		int bytesRead = inputStream.read(buffer);
		while (bytesRead >= 0) {
			outputStream.write(buffer, 0, bytesRead);
			bytesRead = inputStream.read(buffer);
		}
		// TODO close the output stream?
	}
}
