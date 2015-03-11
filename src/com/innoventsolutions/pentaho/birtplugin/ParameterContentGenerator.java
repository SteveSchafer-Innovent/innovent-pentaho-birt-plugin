package com.innoventsolutions.pentaho.birtplugin;

import java.io.OutputStream;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.repository2.unified.IUnifiedRepository;
import org.pentaho.platform.api.repository2.unified.RepositoryFile;
import org.pentaho.platform.engine.core.solution.SimpleParameterProvider;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;

public class ParameterContentGenerator extends SimpleContentGenerator {
	private static final long serialVersionUID = 1L;
	private IParameterProvider requestParameters;
	private IParameterProvider pathParameters;

	public enum RenderMode {
		REPORT, XML, PARAMETER, SUBSCRIBE, DOWNLOAD
	}

	@Override
	public void createContent(final OutputStream outputStream) throws Exception {
		final IUnifiedRepository unifiedRepository = PentahoSystem.get(
				IUnifiedRepository.class, null);
		final IParameterProvider requestParams = getRequestParameters();
		final IParameterProvider pathParams = getPathParameters();
		String path = null;
		if (requestParams != null) {
			path = requestParams.getStringParameter("path", null);
		}
		if (path == null) {
			if (pathParams != null) {
				path = pathParams.getStringParameter("path", null);
			}
		}
		path = idTopath(URLDecoder.decode(path, "UTF-8"));
		final RepositoryFile designFile = unifiedRepository.getFile(path);
		final RenderMode renderMode = RenderMode
				.valueOf(requestParams.getStringParameter(
						"renderMode", RenderMode.XML.toString()).toUpperCase()); //$NON-NLS-1$
		switch (renderMode) {
		case XML: {
			final ParameterXmlContentHandler parameterXmlContentHandler = new ParameterXmlContentHandler(
					this, true);
			parameterXmlContentHandler.createParameterContent(outputStream,
					designFile.getId(), designFile.getPath(), false, null);
			break;
		}
		case PARAMETER: {
			final ParameterXmlContentHandler parameterXmlContentHandler = new ParameterXmlContentHandler(
					this, false);
			parameterXmlContentHandler.createParameterContent(outputStream,
					designFile.getId(), designFile.getPath(), false, null);
			break;
		}
		default:
			throw new IllegalArgumentException();
		}
	}

	@Override
	public String getMimeType() {
		return "text/xml";
	}

	@Override
	public Log getLogger() {
		return LogFactory.getLog(ParameterContentGenerator.class);
	}

	protected String idTopath(String path) {
		if (path != null && path.length() > 0 && path.charAt(0) != '/') {
			path = "/" + path;
		}
		return path;
	}

	/**
	 * Safely get our request parameters
	 *
	 * @return IParameterProvider the provider of parameters
	 */
	public IParameterProvider getRequestParameters() {
		if (requestParameters != null) {
			return requestParameters;
		}
		if (parameterProviders == null) {
			return new SimpleParameterProvider(); // no parameters
		}
		final IParameterProvider requestParams = parameterProviders
				.get(IParameterProvider.SCOPE_REQUEST);
		requestParameters = requestParams;
		return requestParams;
	}

	public IParameterProvider getPathParameters() {
		if (pathParameters != null) {
			return pathParameters;
		}
		final IParameterProvider pathParams = parameterProviders.get("path");
		pathParameters = pathParams;
		return pathParams;
	}

	public Map<String, Object> createInputs() {
		return createInputs(getRequestParameters());
	}

	protected static Map<String, Object> createInputs(
			final IParameterProvider requestParams) {
		final Map<String, Object> inputs = new HashMap<String, Object>();
		if (requestParams == null) {
			return inputs;
		}
		final Iterator<?> paramIter = requestParams.getParameterNames();
		while (paramIter.hasNext()) {
			final String paramName = (String) paramIter.next();
			final Object paramValue = requestParams.getParameter(paramName);
			if (paramValue == null) {
				continue;
			}
			// only actually add inputs who don't have NULL values
			inputs.put(paramName, paramValue);
		}
		return inputs;
	}

	public IPentahoSession getUserSession() {
		return userSession;
	}
}
