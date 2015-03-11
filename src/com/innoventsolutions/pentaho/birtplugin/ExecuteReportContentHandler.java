package com.innoventsolutions.pentaho.birtplugin;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.Serializable;
import java.util.Map;

import org.mortbay.util.ajax.JSON;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.engine.core.audit.AuditHelper;
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
	private final IPentahoSession userSession;
	private final ReportContentGenerator contentGenerator;
	private final Configuration configuration;
	private String remoteFileId = null;

	public ExecuteReportContentHandler(
			final ReportContentGenerator contentGenerator) {
		this.contentGenerator = contentGenerator;
		this.userSession = contentGenerator.getUserSession();
		this.configuration = new Configuration();
	}

	public void createReportContent(final OutputStream outputStream,
			final Serializable fileId, final String path,
			final boolean forceDefaultOutputTarget) throws Exception {
		final long start = System.currentTimeMillis();
		final Map<String, Object> inputs = contentGenerator.createInputs();
		AuditHelper.audit(userSession.getId(), userSession.getName(), path,
				contentGenerator.getObjectName(), getClass().getName(),
				MessageTypes.INSTANCE_START, contentGenerator.getInstanceId(),
				"", 0, contentGenerator); //$NON-NLS-1$
		String result = MessageTypes.INSTANCE_END;
		// StagingHandler reportStagingHandler = null;
		try {
			String outputType = null;
			if (inputs.containsKey(OUTPUT_TYPE)) {
				// a mime type
				outputType = String.valueOf(inputs.get(OUTPUT_TYPE));
			}
			String outputTarget = null;
			if (inputs.containsKey(OUTPUT_TARGET)) {
				outputTarget = String.valueOf(inputs.get(OUTPUT_TARGET));
			}
			InputStream reportDefinitionInputStream = null;
			if (inputs.containsKey(REPORT_DEFINITION_INPUT)) {
				reportDefinitionInputStream = (InputStream) inputs
						.get(REPORT_DEFINITION_INPUT);
			}
			boolean paginateOutput = false;
			if (inputs.containsKey(PAGINATE_OUTPUT)) {
				paginateOutput = "true".equals(String.valueOf(inputs
						.get(PAGINATE_OUTPUT)));
			}
			int acceptedPage = -1;
			if (inputs.containsKey(ACCEPTED_PAGE)) {
				acceptedPage = ParserUtil.parseInt(
						String.valueOf(inputs.get(ACCEPTED_PAGE)), -1);
			}
			boolean print = false;
			if (inputs.containsKey(PRINT)) {
				print = "true".equals(String.valueOf(inputs.get(PRINT)));
			}
			String printer = null;
			if (inputs.containsKey(PRINTER_NAME)) {
				printer = String.valueOf(inputs.get(PRINTER_NAME));
			}
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
			// produce rendered report
			// final SimpleReportingComponent reportComponent = new
			// SimpleReportingComponent();
			final RemoteFileManager remoteFileManager = new RemoteFileManager(
					configuration);
			remoteFileId = remoteFileManager.registerFile(fileId);
			if (remoteFileId != null) {
				final ClientConfig config = new DefaultClientConfig();
				final ClientFilter authFilter = new HTTPBasicAuthFilter(
						configuration.getUsername(),
						configuration.getPassword());
				final Client client = Client.create(config);
				client.addFilter(authFilter);
				String outputFormat = null;
				String mimeType = null;
				if (outputTarget != null) {
					if (outputTarget.indexOf("html") >= 0) {
						outputFormat = "html";
						mimeType = "text/html";
					}
					else if (outputTarget.indexOf("pdf") >= 0) {
						outputFormat = "pdf";
						mimeType = "application/pdf";
					}
					// TODO
				}
				final WebResource service = client
						.resource(configuration.getUri()).path("birt")
						.path("report").path("run").path(outputFormat)
						.path(remoteFileId);
				final WebResource.Builder builder = service.accept(mimeType)
						.type("application/json");
				final String params = JSON.toString(inputs);
				// final StreamingOutput streamingOutput = new StreamingOutput()
				// {
				// @Override
				// public void write(final OutputStream output)
				// throws IOException, WebApplicationException {
				// final byte[] outputBytes = params.getBytes();
				// output.write(outputBytes);
				// }
				// };
				final ClientResponse response = builder.post(
						ClientResponse.class, params);
				if (response.getStatus() != 200) {
					throw new RuntimeException("Run report request failed: "
							+ response.getStatus());
				}
				final InputStream inputStream = response
						.getEntity(InputStream.class);
				final byte[] buffer = new byte[0x1000];
				int bytesRead = inputStream.read(buffer);
				while (bytesRead >= 0) {
					outputStream.write(buffer, 0, bytesRead);
					bytesRead = inputStream.read(buffer);
				}
				// TODO close the output stream?
			}
		}
		catch (final Exception ex) {
			result = MessageTypes.INSTANCE_FAILED;
			throw ex;
		}
		finally {
			final long end = System.currentTimeMillis();
			AuditHelper.audit(userSession.getId(), userSession.getName(), path,
					contentGenerator.getObjectName(), getClass().getName(),
					result, contentGenerator.getInstanceId(),
					"", ((float) (end - start) / 1000), contentGenerator); //$NON-NLS-1$
		}
	}
}
