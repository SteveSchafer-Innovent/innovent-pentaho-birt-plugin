package com.innoventsolutions.pentaho.birtplugin;

import java.io.OutputStream;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.mortbay.util.ajax.JSON;
import org.pentaho.platform.api.engine.IParameterProvider;
import org.pentaho.platform.util.UUIDUtil;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.client.filter.ClientFilter;
import com.sun.jersey.api.client.filter.HTTPBasicAuthFilter;

public class ParameterXmlContentHandler {
	public static final String SYS_PARAM_SESSION_ID = "::session";
	private static final String NS_PARAM_ATTR_CORE = "http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core";
	private final Map<String, Object> inputs;
	private final IParameterProvider requestParameters;
	private Document document;
	private final Configuration configuration;
	private String remoteFileId = null;
	@SuppressWarnings("unused")
	private final boolean paginate;

	public ParameterXmlContentHandler(
			final ParameterContentGenerator contentGenerator,
			final boolean paginate) {
		this.inputs = contentGenerator.createInputs();
		this.requestParameters = contentGenerator.getRequestParameters();
		this.configuration = new Configuration();
		this.paginate = paginate;
	}

	public void createParameterContent(final OutputStream outputStream,
			final Serializable fileId, final String path,
			final boolean overrideOutputType, final Object object)
			throws Exception {
		System.out.println("createParameterContent");
		// object == null, fileId is a uuid
		final String sessionIdKey = SYS_PARAM_SESSION_ID;
		final Object rawSessionId = inputs.get(sessionIdKey);
		if ((rawSessionId instanceof String) == false
				|| "".equals(rawSessionId)) {
			inputs.put(sessionIdKey, UUIDUtil.getUUIDAsString());
		}
		this.document = DocumentBuilderFactory.newInstance()
				.newDocumentBuilder().newDocument();
		@SuppressWarnings("unused")
		final boolean isMobile = "true".equals(requestParameters
				.getStringParameter("mobile", "false"));
		// TODO inputs may contain parameter values and result in parameter
		// prompts being hidden
		final Element parameters;
		parameters = document.createElement("parameters");
		parameters.setAttribute("is-prompt-needed", "false"); // TODO ????
		parameters.setAttribute("ignore-biserver-5538", "true");
		final Boolean autoSubmit = getBooleanRequestParameter("autoSubmit");
		if (autoSubmit != null)
			parameters.setAttribute("autoSubmit",
					autoSubmit.booleanValue() ? "true" : "false");
		final Boolean autoSubmitUI = getBooleanRequestParameter("autoSubmitUI");
		parameters.setAttribute("autoSubmitUI", autoSubmitUI == null ? "true"
				: autoSubmitUI.booleanValue() ? "true" : "false");
		final String layout = requestParameters.getStringParameter("layout",
				null);
		parameters.setAttribute("layout", layout == null ? "vertical" : layout);
		final RemoteFileManager remoteFileManager = new RemoteFileManager(
				configuration);
		remoteFileId = remoteFileManager.registerFile(fileId);
		System.out.println("file is registered, id = " + remoteFileId);
		if (remoteFileId != null) {
			final ClientConfig config = new DefaultClientConfig();
			final ClientFilter authFilter = new HTTPBasicAuthFilter(
					configuration.getUsername(), configuration.getPassword());
			final Client client = Client.create(config);
			client.addFilter(authFilter);
			final WebResource service = client.resource(configuration.getUri())
					.path("birt").path("report").path("parameters")
					.path(remoteFileId);
			System.out.println("service = " + service);
			final WebResource.Builder builder = service
					.accept(MediaType.APPLICATION_JSON_TYPE);
			final ClientResponse response = builder.get(ClientResponse.class);
			if (response.getStatus() != 200) {
				System.out.println("Get parameters request failed: "
						+ response.getClientResponseStatus());
				throw new RuntimeException("Get parameters request failed: "
						+ response.getStatus());
			}
			final String jsonString = response.getEntity(String.class);
			System.out.println("GET parameters returned " + jsonString);
			final Object jsonObj = JSON.parse(jsonString);
			if (jsonObj instanceof Object[]) {
				final Object[] paramsObjArray = (Object[]) jsonObj;
				for (final Object paramObj : paramsObjArray) {
					if (paramObj instanceof Map) {
						@SuppressWarnings("unchecked")
						final Map<Object, Object> paramMap = (Map<Object, Object>) paramObj;
						final Element element = createParamElement(paramMap);
						parameters.appendChild(element);
					}
				}
			}
			// create other parameters that seem to be needed
			parameters.appendChild(createAcceptedPageElement());
			parameters.appendChild(createShowParametersElement());
			parameters.appendChild(createOutputTargetElement());
			System.out.println("parameters = " + parameters);
		}
		this.document.appendChild(parameters);
		final DOMSource source = new DOMSource(document);
		final StreamResult result = new StreamResult(outputStream);
		final Transformer transformer = TransformerFactory.newInstance()
				.newTransformer();
		transformer.transform(source, result);
		System.out.println("createParameterContent finished");
	}

	private Boolean getBooleanRequestParameter(final String parameterName) {
		final String parameterValue = requestParameters.getStringParameter(
				parameterName, null);
		return parameterValue == null ? null : Boolean.valueOf("true"
				.equals(parameterValue));
	}

	/**
	 * Creates the "output-target" parameter. This parameter is required by the
	 * dashboard framework. Instead of the values required by Pentaho reports we
	 * will fill it with values required for the output format of BIRT reports.
	 *
	 * One of the criteria for determining if a report has parameters (so the
	 * parameters dialog will show up) is that it has an output-target
	 * parameter. (see FileResource.doIsParameterizable())
	 *
	 * Also reportviewer.js examines output-target to determine if the report is
	 * HTML.
	 *
	 * @return
	 */
	private Node createOutputTargetElement() {
		final Object requestValue = requestParameters
				.getParameter("output-target");
		final Element element = document.createElement("parameter");
		// <parameter is-list="true" is-mandatory="true" is-multi-select="false"
		// is-strict="true" name="output-target" type="java.lang.String">
		element.setAttribute("name", "output-target");
		element.setAttribute("is-list", "true");
		element.setAttribute("is-mandatory", "true");
		element.setAttribute("is-multi-select", "false");
		element.setAttribute("is-strict", "true"); // must be in list
		element.setAttribute("type", "java.lang.String");
		// <attribute name="role"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="system"/>
		element.appendChild(createAttributeElement("role", NS_PARAM_ATTR_CORE,
				"system"));
		// <attribute name="preferred"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="true"/>
		element.appendChild(createAttributeElement("preferred",
				NS_PARAM_ATTR_CORE, "true"));
		// <attribute name="parameter-group"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="parameters"/>
		element.appendChild(createAttributeElement("parameter-group",
				NS_PARAM_ATTR_CORE, "parameters"));
		// <attribute name="parameter-group-label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="Report Parameters"/>
		element.appendChild(createAttributeElement("parameter-group-label",
				NS_PARAM_ATTR_CORE, "Report Parameters"));
		// <attribute name="label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="Output Type"/>
		element.appendChild(createAttributeElement("label", NS_PARAM_ATTR_CORE,
				"Output Type"));
		// <attribute name="parameter-render-type"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="dropdown"/>
		element.appendChild(createAttributeElement("parameter-render-type",
				NS_PARAM_ATTR_CORE, "dropdown"));
		// <attribute name="hidden"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="false"/>
		element.appendChild(createAttributeElement("hidden",
				NS_PARAM_ATTR_CORE, "false"));
		// <values>
		final Element valuesElement = document.createElement("values");
		// <value label="HTML (Paginated)" null="false" selected="true"
		// type="java.lang.String" value="table/html;page-mode=page"/>
		// framework searches for "html"
		// <value label="HTML (Single Page)" null="false" selected="false"
		// type="java.lang.String" value="table/html;page-mode=stream"/>
		// <value label="PDF" null="false" selected="false"
		// type="java.lang.String" value="pageable/pdf"/>
		// <value label="Excel" null="false" selected="false"
		// type="java.lang.String" value="table/excel;page-mode=flow"/>
		// <value label="Excel 2007" null="false" selected="false"
		// type="java.lang.String"
		// value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;page-mode=flow"/>
		// <value label="Comma Separated Value" null="false" selected="false"
		// type="java.lang.String" value="table/csv;page-mode=stream"/>
		// <value label="Rich-Text-Format" null="false" selected="false"
		// type="java.lang.String" value="table/rtf;page-mode=flow"/>
		// <value label="Text" null="false" selected="false"
		// type="java.lang.String" value="pageable/text"/>
		final String defaultValue = requestValue == null ? "html"
				: requestValue.toString().toLowerCase();
		valuesElement.appendChild(createValueElement("HTML", false,
				"html".equals(defaultValue), "java.lang.String", "html"));
		valuesElement.appendChild(createValueElement("PDF", false,
				"pdf".equals(defaultValue), "java.lang.String", "pdf"));
		valuesElement.appendChild(createValueElement("XLS", false,
				"xls".equals(defaultValue), "java.lang.String", "xls"));
		valuesElement.appendChild(createValueElement("XLSX", false,
				"xlsx".equals(defaultValue), "java.lang.String", "xlsx"));
		valuesElement.appendChild(createValueElement("DOC", false,
				"doc".equals(defaultValue), "java.lang.String", "doc"));
		valuesElement.appendChild(createValueElement("DOCX", false,
				"docx".equals(defaultValue), "java.lang.String", "docx"));
		valuesElement.appendChild(createValueElement("ODP", false,
				"odp".equals(defaultValue), "java.lang.String", "odp"));
		valuesElement.appendChild(createValueElement("ODS", false,
				"odp".equals(defaultValue), "java.lang.String", "odp"));
		valuesElement.appendChild(createValueElement("ODT", false,
				"odt".equals(defaultValue), "java.lang.String", "odt"));
		valuesElement.appendChild(createValueElement("POSTSCRIPT", false,
				"postscript".equals(defaultValue), "java.lang.String",
				"postscript"));
		valuesElement.appendChild(createValueElement("PPT", false,
				"ppt".equals(defaultValue), "java.lang.String", "ppt"));
		valuesElement.appendChild(createValueElement("PPTX", false,
				"pptx".equals(defaultValue), "java.lang.String", "pptx"));
		valuesElement.appendChild(createValueElement("RPTDOCUMENT", false,
				"rptdocument".equals(defaultValue), "java.lang.String",
				"rptdocument"));
		// TODO
		// </values>
		// </parameter>
		element.appendChild(valuesElement);
		return element;
	}

	/**
	 * Creates the "showParameters" system parameter which is required by the
	 * dashboard framework.
	 *
	 * @return
	 */
	private Element createShowParametersElement() {
		final Element element = document.createElement("parameter");
		// <parameter is-list="false" is-mandatory="false"
		// is-multi-select="false" is-strict="false" name="showParameters"
		// type="java.lang.Boolean">
		element.setAttribute("name", "showParameters");
		element.setAttribute("is-list", "false");
		element.setAttribute("is-mandatory", "false");
		element.setAttribute("is-multi-select", "false");
		element.setAttribute("is-strict", "false");
		element.setAttribute("type", "java.lang.Boolean");
		// <attribute name="role"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="system"/>
		element.appendChild(createAttributeElement("role", NS_PARAM_ATTR_CORE,
				"system"));
		// <attribute name="hidden"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="true"/>
		element.appendChild(createAttributeElement("hidden",
				NS_PARAM_ATTR_CORE, "true"));
		// <attribute name="preferred"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="true"/>
		element.appendChild(createAttributeElement("preferred",
				NS_PARAM_ATTR_CORE, "true"));
		// <attribute name="parameter-group"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="system"/>
		element.appendChild(createAttributeElement("parameter-group",
				NS_PARAM_ATTR_CORE, "system"));
		// <attribute name="parameter-group-label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="System Parameters"/>
		element.appendChild(createAttributeElement("parameter-group-label",
				NS_PARAM_ATTR_CORE, "System Parameters"));
		// <attribute name="label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="showParameters"/>
		element.appendChild(createAttributeElement("label", NS_PARAM_ATTR_CORE,
				"showParameters"));
		// <attribute name="parameter-render-type"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="textbox"/>
		element.appendChild(createAttributeElement("parameter-render-type",
				NS_PARAM_ATTR_CORE, "textbox"));
		// <attribute name="deprecated"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="true"/>
		element.appendChild(createAttributeElement("deprecated",
				NS_PARAM_ATTR_CORE, "true"));
		// <values>
		final Element valuesElement = document.createElement("values");
		// <value label="true" null="false" selected="true"
		// type="java.lang.Boolean" value="true"/>
		valuesElement.appendChild(createValueElement("true", false, true,
				"java.lang.Boolean", "true"));
		// </values>
		element.appendChild(valuesElement);
		// </parameter>
		return element;
	}

	/**
	 * Creates the "accepted-page" system parameter which is required by the
	 * dashboard framework.
	 *
	 * @return
	 */
	private Element createAcceptedPageElement() {
		final Element element = document.createElement("parameter");
		// <parameter is-list="false" is-mandatory="false"
		// is-multi-select="false" is-strict="false" name="accepted-page"
		// type="java.lang.Integer">
		element.setAttribute("name", "accepted-page");
		element.setAttribute("is-list", "false");
		element.setAttribute("is-mandatory", "false");
		element.setAttribute("is-multi-select", "false");
		element.setAttribute("is-strict", "false");
		element.setAttribute("type", "java.lang.Integer");
		// <attribute name="role"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="system"/>
		element.appendChild(createAttributeElement("role", NS_PARAM_ATTR_CORE,
				"system"));
		// <attribute name="hidden"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="true"/>
		element.appendChild(createAttributeElement("hidden",
				NS_PARAM_ATTR_CORE, "true"));
		// <attribute name="preferred"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="false"/>
		element.appendChild(createAttributeElement("preferred",
				NS_PARAM_ATTR_CORE, "false"));
		// <attribute name="parameter-group"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="system"/>
		element.appendChild(createAttributeElement("parameter-group",
				NS_PARAM_ATTR_CORE, "system"));
		// <attribute name="parameter-group-label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="System Parameters"/>
		element.appendChild(createAttributeElement("parameter-group-label",
				NS_PARAM_ATTR_CORE, "System Parameters"));
		// <attribute name="label"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="accepted-page"/>
		element.appendChild(createAttributeElement("label", NS_PARAM_ATTR_CORE,
				"accepted-page"));
		// <attribute name="parameter-render-type"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="textbox"/>
		element.appendChild(createAttributeElement("parameter-render-type",
				NS_PARAM_ATTR_CORE, "textbox"));
		// <attribute name="deprecated"
		// namespace="http://reporting.pentaho.org/namespaces/engine/parameter-attributes/core"
		// value="false"/>
		element.appendChild(createAttributeElement("deprecated",
				NS_PARAM_ATTR_CORE, "false"));
		// </parameter>
		return element;
	}

	private Element createParamElement(final Map<Object, Object> paramMap) {
		class MapHelper {
			String getStringValue(final String key) {
				final Object paramValueObj = paramMap.get(key);
				if (paramValueObj instanceof String) {
					return (String) paramValueObj;
				}
				return null;
			}

			Boolean getBooleanValue(final String key) {
				final Object paramValueObj = paramMap.get(key);
				if (paramValueObj instanceof Boolean) {
					return (Boolean) paramValueObj;
				}
				return null;
			}

			Integer getIntegerValue(final String key) {
				final Object paramValueObj = paramMap.get(key);
				if (paramValueObj instanceof Integer) {
					return (Integer) paramValueObj;
				}
				return null;
			}
		}
		final MapHelper helper = new MapHelper();
		final String name = helper.getStringValue("name");
		final Object requestValue = requestParameters.getParameter(name);
		final String displayName = helper.getStringValue("displayName");
		@SuppressWarnings("unused")
		final String helpText = helper.getStringValue("helpText");
		@SuppressWarnings("unused")
		final String type = helper.getStringValue("type");
		final String promptText = helper.getStringValue("promptText");
		final String dataType = helper.getStringValue("dataType");
		final Boolean isHidden = helper.getBooleanValue("hidden");
		final Boolean isRequired = helper.getBooleanValue("required");
		final Boolean allowNewValues = helper.getBooleanValue("allowNewValues");
		@SuppressWarnings("unused")
		final Boolean displayInFixedOrder = helper
				.getBooleanValue("displayInFixedOrder");
		@SuppressWarnings("unused")
		final Boolean valueIsConcealed = helper
				.getBooleanValue("valueConcealed");
		@SuppressWarnings("unused")
		final String displayFormat = helper.getStringValue("displayFormat");
		final String controlType = helper.getStringValue("controlType");
		@SuppressWarnings("unused")
		final String alignment = helper.getStringValue("alignment");
		final String defaultValue = helper.getStringValue("defaultValue");
		final String scalarParameterType = helper
				.getStringValue("scalarParameterType");
		@SuppressWarnings("unused")
		final Integer autoSuggestThreshold = helper
				.getIntegerValue("autoSuggestThreshold");
		final boolean isList = "list-box".equals(controlType);
		final boolean multiValue = "multi-value".equals(scalarParameterType);
		final Element element = document.createElement("parameter");
		element.setAttribute("name", name);
		/*
		 * type: java class (prefaced by "[L") if array
		 */
		final String javaType = getJavaType(multiValue, dataType);
		element.setAttribute("type", javaType);
		/*
		 * parameter has an "is-mandatory" attribute which is usually false.
		 * There is also a "mandatory" attribute child tag which is sometimes
		 * true even when the attribute is false. The child tag only occurs on
		 * parameters with the "user" role.
		 */
		element.setAttribute("is-mandatory", "false"); // TODO what is this?
		element.setAttribute("is-list", isList ? "true" : "false");
		element.setAttribute("is-multi-select", multiValue ? "true" : "false");
		final boolean isStrict = "boolean".equals(dataType)
				|| (isList && !allowNewValues.booleanValue());
		/*
		 * is-strict = must be a choice
		 */
		element.setAttribute("is-strict", isStrict ? "true" : "false");
		/*
		 * role: user, system
		 */
		element.appendChild(createAttributeElement("role", NS_PARAM_ATTR_CORE,
				"user"));
		/*
		 * parameter-layout: (optional)
		 */
		element.appendChild(createAttributeElement("parameter-layout",
				NS_PARAM_ATTR_CORE, "vertical"));
		/*
		 * parameter-render-type (required): textbox, togglebutton, dropdown,
		 * list
		 */
		final String parameterRenderType = getParameterRenderType(controlType,
				dataType);
		element.appendChild(createAttributeElement("parameter-render-type",
				NS_PARAM_ATTR_CORE, parameterRenderType));
		element.appendChild(createAttributeElement("hidden",
				NS_PARAM_ATTR_CORE,
				isHidden == null || isHidden.booleanValue() ? "true" : "false"));
		element.appendChild(createAttributeElement("mandatory",
				NS_PARAM_ATTR_CORE,
				isRequired == null || isRequired.booleanValue() ? "true"
						: "false"));
		element.appendChild(createAttributeElement("label", NS_PARAM_ATTR_CORE,
				promptText == null ? displayName == null ? name : displayName
						: promptText));
		if (isList) {
			final List<Map<String, Object>> choices = getParameterChoices(
					remoteFileId, name);
			if (!choices.isEmpty()) {
				element.appendChild(createValuesElement(choices, requestValue));
			}
		}
		else if ("boolean".equals(dataType)) {
			final List<Map<String, Object>> choices = new ArrayList<Map<String, Object>>();
			{
				final Map<String, Object> map = new HashMap<String, Object>(2);
				map.put("value", Boolean.TRUE);
				map.put("label", "True");
				map.put("selected", Boolean.TRUE);
				choices.add(map);
			}
			{
				final Map<String, Object> map = new HashMap<String, Object>(2);
				map.put("value", Boolean.FALSE);
				map.put("label", "False");
				map.put("selected", Boolean.FALSE);
				choices.add(map);
			}
			element.appendChild(createValuesElement(choices, requestValue));
		}
		else if (requestValue != null) {
			final Element valuesElement = document.createElement("values");
			valuesElement.appendChild(createValueElement(
					requestValue.toString(), requestValue, true));
			element.appendChild(valuesElement);
		}
		else if (defaultValue != null) {
			final Element valuesElement = document.createElement("values");
			valuesElement.appendChild(createValueElement(defaultValue,
					defaultValue, true));
			element.appendChild(valuesElement);
		}
		return element;
	}

	private Element createValuesElement(
			final List<Map<String, Object>> choices, final Object requestValue) {
		final Element element = document.createElement("values");
		for (final Map<String, Object> paramMap : choices) {
			final Object label = paramMap.get("label");
			final Object value = paramMap.get("value");
			final boolean selected;
			if (requestValue == null) {
				selected = Boolean.TRUE.equals(paramMap.get("selected"));
			}
			else {
				selected = value != null
						&& value.toString().equals(requestValue);
			}
			element.appendChild(createValueElement(label.toString(), value,
					selected));
		}
		return element;
	}

	private Element createValueElement(final String label, final Object value,
			final boolean selected) {
		return createValueElement(label, false, selected, "java.lang.String",
				value.toString());
	}

	private Element createValueElement(final String label,
			final boolean allowNull, final boolean selected, final String type,
			final String value) {
		final Element element = document.createElement("value");
		element.setAttribute("label", label);
		element.setAttribute("null", allowNull ? "true" : "false");
		element.setAttribute("selected", selected ? "true" : "false");
		element.setAttribute("type", type);
		element.setAttribute("value", value);
		return element;
	}

	private String getParameterRenderType(final String controlType,
			final String dataType) {
		// parameter-render-type:
		// checkbox: "pentaho.common.prompting.builders.CheckBuilder"
		// datepicker: "pentaho.common.prompting.builders.DateInputBuilder"
		// default: "pentaho.common.prompting.builders.PlainPromptBuilder"
		// dropdown: "pentaho.common.prompting.builders.DropDownBuilder"
		// error-label: "pentaho.common.prompting.builders.ErrorLabelBuilder"
		// external-input:
		// "pentaho.common.prompting.builders.ExternalInputBuilder"
		// filebrowser: "pentaho.common.prompting.builders.ExternalInputBuilder"
		// gc: "pentaho.common.prompting.builders.GarbageCollectorBuilder"
		// group-panel:
		// "pentaho.common.prompting.builders.ParameterGroupPanelBuilder"
		// label: "pentaho.common.prompting.builders.LabelBuilder"
		// list: "pentaho.common.prompting.builders.ListBuilder"
		// multi-line: "pentaho.common.prompting.builders.TextAreaBuilder"
		// parameter-panel:
		// "pentaho.common.prompting.builders.ParameterPanelBuilder"
		// prompt-panel: "pentaho.common.prompting.builders.PromptPanelBuilder"
		// radio: "pentaho.common.prompting.builders.RadioBuilder"
		// submit: "pentaho.common.prompting.builders.SubmitComponentBuilder"
		// submit-panel: "pentaho.common.prompting.builders.SubmitPanelBuilder"
		// togglebutton: "pentaho.common.prompting.builders.MultiButtonBuilder"
		if ("list-box".equals(controlType)) {
			return "dropdown";
		}
		if ("boolean".equals(dataType))
			return "dropdown";
		return "textbox";
	}

	private static final Map<String, String> DATA_TYPES = new HashMap<String, String>();
	static {
		DATA_TYPES.put("string", String.class.getName());
		DATA_TYPES.put("float", Float.class.getName());
		DATA_TYPES.put("decimal", BigDecimal.class.getName());
		DATA_TYPES.put("date-time", Date.class.getName());
		DATA_TYPES.put("boolean", Boolean.class.getName());
		DATA_TYPES.put("integer", Integer.class.getName());
		DATA_TYPES.put("date", Date.class.getName());
		DATA_TYPES.put("time", Date.class.getName());
		// TODO any?
	}

	private static String getJavaType(final boolean multiValue,
			final String dataType) {
		return (multiValue ? "[L" : "") + DATA_TYPES.get(dataType);
	}

	private Node createAttributeElement(final String name,
			final String namespace, final String value) {
		final Element element = document.createElement("attribute");
		element.setAttribute("name", name);
		element.setAttribute("namespace", namespace);
		element.setAttribute("value", value);
		return element;
	}

	private List<Map<String, Object>> getParameterChoices(
			final String remoteFileId, final String paramName) {
		final ClientConfig config = new DefaultClientConfig();
		final ClientFilter authFilter = new HTTPBasicAuthFilter(
				configuration.getUsername(), configuration.getPassword());
		final Client client = Client.create(config);
		client.addFilter(authFilter);
		final WebResource service = client.resource(configuration.getUri())
				.path("birt").path("report").path("parameter").path("choices")
				.path(remoteFileId).path(paramName);
		final WebResource.Builder builder = service
				.accept(MediaType.APPLICATION_JSON_TYPE);
		final ClientResponse response = builder.get(ClientResponse.class);
		if (response.getStatus() != 200) {
			throw new RuntimeException("Get parameter choices request failed: "
					+ response.getStatus());
		}
		final String jsonString = response.getEntity(String.class);
		System.out.println(jsonString);
		final List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		final Object jsonObj = JSON.parse(jsonString);
		if (jsonObj instanceof Object[]) {
			final Object[] paramsObjArray = (Object[]) jsonObj;
			for (final Object paramObj : paramsObjArray) {
				if (paramObj instanceof Map) {
					@SuppressWarnings("unchecked")
					final Map<Object, Object> paramMap = (Map<Object, Object>) paramObj;
					final Map<String, Object> map = new HashMap<String, Object>();
					for (final Object key : paramMap.keySet()) {
						if (key == null)
							continue;
						map.put(key.toString(), paramMap.get(key));
					}
					list.add(map);
				}
			}
		}
		return list;
	}
}
