package com.innoventsolutions.pentaho.birtplugin;

public class RemoteFile {
	private final String id;
	private final long expirationTime;

	public RemoteFile(final String id, final long expirationTime) {
		this.id = id;
		this.expirationTime = expirationTime;
	}

	public String getId() {
		return id;
	}

	public long getExpirationTime() {
		return expirationTime;
	}
}
