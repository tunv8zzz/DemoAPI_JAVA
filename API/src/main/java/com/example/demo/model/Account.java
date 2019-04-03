package com.example.demo.model;

import javax.persistence.*;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

	private String username;
    private String password;
    private String auth_plugin;

    public Account() {  }

    public Account(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public Account(int id, String username, String password) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
	}
    
	public Account(int id, String username, String password, String auth_plugin) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.auth_plugin = auth_plugin;
	}

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAuth_plugin() {
		return auth_plugin;
	}

	public void setAuth_plugin(String auth_plugin) {
		this.auth_plugin = auth_plugin;
	}


    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}