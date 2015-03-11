package com.innoventsolutions.pentaho.birtplugin;

import java.io.File;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.repository2.unified.IUnifiedRepository;
import org.pentaho.platform.api.repository2.unified.RepositoryFile;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.plugin.services.pluginmgr.PluginClassLoader;
import org.pentaho.platform.util.UUIDUtil;

public class ReportContentGenerator extends ParameterContentGenerator {
	private static final long serialVersionUID = 1L;

	public enum RENDER_TYPE {
		REPORT, XML, PARAMETER, DOWNLOAD
	}

	private static final Log log = LogFactory
			.getLog(ReportContentGenerator.class);

	public ReportContentGenerator() {
	}

	@Override
	public void createContent(final OutputStream outputStream) throws Exception {
		final String id = UUIDUtil.getUUIDAsString();
		String path = null;
		RENDER_TYPE renderMode = null;
		setInstanceId(id);
		final IUnifiedRepository unifiedRepository = PentahoSystem.get(
				IUnifiedRepository.class, null);
		final IParameterProvider requestParams = getRequestParameters();
		final IParameterProvider pathParams = getPathParameters();
		if (requestParams != null
				&& requestParams.getStringParameter("path", null) != null) {
			path = requestParams.getStringParameter("path", "");
		}
		else if (pathParams != null
				&& pathParams.getStringParameter("path", null) != null) {
			path = pathParams.getStringParameter("path", "");
		}
		path = URLDecoder.decode(path, "UTF-8");
		if (requestParams != null
				&& requestParams.getStringParameter("renderMode", null) != null) {
			renderMode = RENDER_TYPE.valueOf(requestParams.getStringParameter(
					"renderMode", RENDER_TYPE.REPORT.toString()).toUpperCase());
		}
		else if (pathParams != null
				&& pathParams.getStringParameter("renderMode", null) != null) {
			renderMode = RENDER_TYPE.valueOf(pathParams.getStringParameter(
					"renderMode", RENDER_TYPE.REPORT.toString()).toUpperCase());
		}
		// If render mode is not passed in the request or path parameter, then
		// we will assume that the render type is REPORT
		if (renderMode == null) {
			renderMode = RENDER_TYPE.REPORT;
		}
		final RepositoryFile repoFile = unifiedRepository.getFile(path);
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
				// create inputs from request parameters
				final ExecuteReportContentHandler executeReportContentHandler = new ExecuteReportContentHandler(
						this);
				executeReportContentHandler.createReportContent(outputStream,
						repoFile.getId(), repoFile.getPath(), false);
				break;
			}
			default:
				throw new IllegalArgumentException();
			}
		}
		catch (final Exception ex) {
			final String exceptionMessage = ex.getMessage() != null ? ex
					.getMessage() : ex.getClass().getName();
			log.error(exceptionMessage, ex);
			if (outputStream != null) {
				outputStream.write(exceptionMessage.getBytes("UTF-8"));
				outputStream.flush();
			}
			else {
				throw new IllegalArgumentException();
			}
		}
	}

	public String getInstanceId() {
		return instanceId;
	}

	public Map<String, IParameterProvider> getParameterProviders() {
		return parameterProviders;
	}

	@Override
	public Log getLogger() {
		return log;
	}

	@Override
	public String getMimeType() {
		final IParameterProvider requestParams = getRequestParameters();
		final IParameterProvider pathParams = getPathParameters();
		RENDER_TYPE renderMode = null;
		// final String path = null;
		// final IUnifiedRepository unifiedRepository = PentahoSystem.get(
		// IUnifiedRepository.class, null);
		if (requestParams != null
				&& requestParams.getStringParameter("renderMode", null) != null) {
			renderMode = RENDER_TYPE.valueOf(requestParams.getStringParameter(
					"renderMode", RENDER_TYPE.REPORT.toString()).toUpperCase());
		}
		else if (pathParams != null
				&& pathParams.getStringParameter("renderMode", null) != null) {
			renderMode = RENDER_TYPE.valueOf(pathParams.getStringParameter(
					"renderMode", RENDER_TYPE.REPORT.toString()).toUpperCase());
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
		// try {
		// if (requestParams != null
		// && requestParams.getStringParameter("path", null) != null) {
		// path = requestParams.getStringParameter("path", "");
		// }
		// else if (pathParams != null
		// && pathParams.getStringParameter("path", null) != null) {
		// path = pathParams.getStringParameter("path", "");
		// }
		// path = idTopath(URLDecoder.decode(path, "UTF-8"));
		// }
		// catch (final UnsupportedEncodingException e) {
		// e.printStackTrace();
		// }
		// final RepositoryFile repoFile = unifiedRepository.getFile(path);
		// final boolean isMobile = "true".equals(requestParams
		// .getStringParameter("mobile", "false"));
		// final SimpleReportingComponent reportComponent = new
		// SimpleReportingComponent();
		// final Map<String, Object> inputs = createInputs(requestParams);
		// reportComponent.setForceDefaultOutputTarget(isMobile);
		// reportComponent
		// .setDefaultOutputTarget(HtmlTableModule.TABLE_HTML_PAGE_EXPORT_TYPE);
		// reportComponent.setReportFileId(repoFile.getId());
		// reportComponent.setInputs(inputs);
		// return reportComponent.getMimeType();
		if (requestParams == null) {
			return "application/octet-stream";
		}
		final String outputTarget = requestParams.getStringParameter(
				"output-target", null);
		if (outputTarget == null) {
			return "application/octet-stream";
		}
		if (outputTarget.indexOf("html") >= 0) {
			return "text/html";
		}
		if (outputTarget.indexOf("pdf") >= 0) {
			return "application/pdf";
		}
		// TODO
		return "application/octet-stream";
	}

	public String getSystemRelativePluginPath(final ClassLoader classLoader) {
		final File dir = getPluginDir(classLoader);
		if (dir == null) {
			return null;
		}
		// get the full path with \ converted to /
		String path = dir.getAbsolutePath().replace("\\",
				RepositoryFile.SEPARATOR);
		final int pos = path.lastIndexOf(RepositoryFile.SEPARATOR + "system"
				+ RepositoryFile.SEPARATOR);
		if (pos != -1) {
			path = path.substring(pos + 8);
		}
		return path;
	}

	protected File getPluginDir(final ClassLoader classLoader) {
		if (classLoader instanceof PluginClassLoader) {
			return ((PluginClassLoader) classLoader).getPluginDir();
		}
		return null;
	}
}
