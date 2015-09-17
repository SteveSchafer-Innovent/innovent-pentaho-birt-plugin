package com.innoventsolutions.pentaho.birtplugin;

import java.io.InputStream;
import java.io.OutputStream;
import java.util.Collections;
import java.util.Map;

import org.pentaho.platform.api.action.IStreamingAction;
import org.pentaho.platform.api.action.IVarArgsAction;
import org.pentaho.platform.api.repository2.unified.RepositoryFile;
import org.pentaho.platform.repository2.unified.fileio.RepositoryFileInputStream;

import com.innoventsolutions.pentaho.birtplugin.ReportContentGenerator.RENDER_TYPE;

public class BirtReportingAction implements IStreamingAction, IVarArgsAction {
	private Map<String, Object> inputs;
	private String outputTarget;
	private String defaultOutputTarget;
	private OutputStream outputStream;
	private InputStream inputStream;
	private String reportDefinitionPath;
	private String lineageId;

	public BirtReportingAction() {
	}

	public String getOutputTarget() {
		return outputTarget;
	}

	public void setOutputTarget(final String outputTarget) {
		this.outputTarget = outputTarget;
	}

	public String getDefaultOutputTarget() {
		return defaultOutputTarget;
	}

	public void setDefaultOutputTarget(final String defaultOutputTarget) {
		if (defaultOutputTarget == null) {
			throw new NullPointerException();
		}
		this.defaultOutputTarget = defaultOutputTarget;
	}

	@Override
	public void setOutputStream(final OutputStream outputStream) {
		this.outputStream = outputStream;
	}

	public void setInputStream(final InputStream inputStream) {
		this.inputStream = inputStream;
	}

	public String getLineageId() {
		return lineageId;
	}

	public void setLineageId(final String lineageId) {
		this.lineageId = lineageId;
	}

	/**
	 * Returns the path to the report definition (for platform use this is a
	 * path in the solution repository)
	 *
	 * @return reportdefinitionPath
	 */
	public String getReportDefinitionPath() {
		return reportDefinitionPath;
	}

	/**
	 * Sets the path to the report definition (platform path)
	 *
	 * @param reportDefinitionPath
	 *            the path to the report definition.
	 */
	public void setReportDefinitionPath(final String reportDefinitionPath) {
		this.reportDefinitionPath = reportDefinitionPath;
	}

	/**
	 * This method sets the map of *all* the inputs which are available to this
	 * component. This allows us to use action-sequence inputs as parameters for
	 * our reports.
	 *
	 * @param inputs
	 *            a Map containing inputs
	 */
	@Override
	public void setVarArgs(final Map<String, Object> inputs) {
		if (inputs == null) {
			this.inputs = Collections.emptyMap();
			return;
		}
		this.inputs = inputs;
	}

	@Override
	public void execute() throws Exception {
		RENDER_TYPE renderMode = null;
		final Map<String, Object> inputs = this.inputs;
		if (inputs == null) {
			renderMode = RENDER_TYPE.REPORT;
		}
		else {
			final Object renderModeObj = inputs.get("renderMode");
			if (!(renderModeObj instanceof String)) {
				renderMode = RENDER_TYPE.REPORT;
			}
			else {
				final String renderModeString = (String) renderModeObj;
				renderMode = RENDER_TYPE.valueOf(renderModeString);
				// If render mode is not passed in the request or path
				// parameter, then we will assume that the render type is REPORT
				if (renderMode == null) {
					renderMode = RENDER_TYPE.REPORT;
				}
			}
		}
		try {
			switch (renderMode) {
			case DOWNLOAD: {
				// final DownloadReportContentHandler contentHandler = new
				// DownloadReportContentHandler(
				// userSession, parameterProviders.get("path"));
				// contentHandler.createDownloadContent(outputStream,
				// idTopath(prptFile.getPath()));
				break;
			}
			case REPORT: {
				executeReport();
				// create inputs from request parameters
				// final ExecuteReportContentHandler executeReportContentHandler
				// = new ExecuteReportContentHandler(
				// inputs, null, null, null, null, null);
				// executeReportContentHandler.createReportContent(outputStream,
				// repoFile.getId(), repoFile.getPath(), false);
				break;
			}
			default:
				throw new IllegalArgumentException();
			}
		}
		catch (final Exception ex) {
			final String exceptionMessage = ex.getMessage() != null ? ex
					.getMessage() : ex.getClass().getName();
			if (outputStream != null) {
				outputStream.write(exceptionMessage.getBytes("UTF-8"));
				outputStream.flush();
			}
			else {
				throw new IllegalArgumentException();
			}
		}
	}

	private void executeReport() throws Exception {
		final InputStream rptdesignInputStream = this.inputStream;
		final OutputStream outputStream = this.outputStream;
		final Map<String, Object> inputs = this.inputs;
		final ExecuteReportContentHandler executeReportContentHandler = new ExecuteReportContentHandler(
				inputs, null);
		if (rptdesignInputStream instanceof RepositoryFileInputStream) {
			final RepositoryFileInputStream rfis = (RepositoryFileInputStream) rptdesignInputStream;
			final RepositoryFile repoFile = rfis.getFile();
			executeReportContentHandler.createReportContent(outputStream,
					repoFile.getId(), false);
			return;
		}
		executeReportContentHandler.createReportContent(outputStream,
				inputStream);
	}

	@Override
	public String getMimeType(final String ignored) {
		final Map<String, Object> inputs = this.inputs;
		if (inputs == null) {
			return "application/octet-stream";
		}
		final Object renderModeObj = inputs.get("renderMode");
		RENDER_TYPE renderMode;
		if (renderModeObj == null) {
			renderMode = null;
		}
		else {
			if (!(renderModeObj instanceof String)) {
				return "application/octet-stream";
			}
			final String renderModeString = (String) renderModeObj;
			renderMode = RENDER_TYPE.valueOf(renderModeString);
		}
		// If render mode is not passed in the request or path parameter, then
		// we will assume that the render type is REPORT
		if (renderMode == null) {
			renderMode = RENDER_TYPE.REPORT;
		}
		if (renderMode.equals(RENDER_TYPE.XML)
				|| renderMode.equals(RENDER_TYPE.PARAMETER)) {
			return "text/xml";
		}
		else if (renderMode.equals(RENDER_TYPE.DOWNLOAD)) {
			// perhaps we can invent our own mime-type or use application/zip?
			return "application/octet-stream";
		}
		final Object outputTargetObj = inputs.get("output-target");
		if (!(outputTargetObj instanceof String)) {
			return "text/html";
		}
		return getMimeTypeFromOutputType((String) outputTargetObj);
	}

	public static String getMimeTypeFromOutputType(final String outputType) {
		if (outputType.toLowerCase().equals("html")) {
			return "text/html";
		}
		if (outputType.toLowerCase().equals("pdf")) {
			return "application/pdf";
		}
		if (outputType.toLowerCase().equals("xls")) {
			return "application/vnd.ms-excel";
		}
		if (outputType.toLowerCase().equals("xlsx")) {
			return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
		}
		if (outputType.toLowerCase().equals("doc")) {
			return "application/msword";
		}
		if (outputType.toLowerCase().equals("docx")) {
			return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
		}
		if (outputType.toLowerCase().equals("ppt")) {
			return "application/vnd.ms-powerpoint";
		}
		if (outputType.toLowerCase().equals("pptx")) {
			return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
		}
		if (outputType.toLowerCase().equals("odt")) {
			return "application/vnd.oasis.opendocument.text";
		}
		if (outputType.toLowerCase().equals("ods")) {
			return "application/vnd.oasis.opendocument.text";
		}
		if (outputType.toLowerCase().equals("odp")) {
			return "application/vnd.oasis.opendocument.presentation";
		}
		if (outputType.toLowerCase().equals("postscript")) {
			return "application/postscript";
		}
		return "application/octet-stream";
	}
}
