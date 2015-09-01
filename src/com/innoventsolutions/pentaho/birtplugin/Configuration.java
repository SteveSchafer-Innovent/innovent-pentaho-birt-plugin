package com.innoventsolutions.pentaho.birtplugin;

import java.net.URI;
import java.util.Properties;

import javax.ws.rs.core.UriBuilder;

public class Configuration {
	private final String username;
	private final String password;
	private final URI uri;
	private final String resourceDir;

	public Configuration() {
		// TODO think of a better way to store configuration parameters
		final Properties properties = System.getProperties();
		this.username = properties
				.getProperty("com.innoventsolutions.bmr.username");
		this.password = properties
				.getProperty("com.innoventsolutions.bmr.password");
		final String uriString = properties
				.getProperty("com.innoventsolutions.bmr.uri");
		this.uri = UriBuilder.fromUri(uriString).build();
		this.resourceDir = properties
				.getProperty("com.innoventsolutions.bmr.resource-dir");
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public URI getUri() {
		return uri;
	}

	public String getResourceDir() {
		return resourceDir;
	}
}
