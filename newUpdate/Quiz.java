package com.mapfinder.modal;

import java.util.List;

public class Quiz {
	private int id;
	private String title;
	private String description;
	private String contentType;
	private String issuerName;
	private List<Question> questions;
	public Quiz() {
		
	}
	
	public Quiz(int id, String title, String description, String contentType, String issuerName) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.contentType = contentType;
		this.issuerName = issuerName;
	}
	
	
	public Quiz( String title, String description, String contentType, String issuerName) {
		this.title = title;
		this.description = description;
		this.contentType = contentType;
		this.issuerName = issuerName;
	}
	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getContentType() {
		return contentType;
	}
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}
	public String getIssuerName() {
		return issuerName;
	}
	public void setIssuerName(String issuerName) {
		this.issuerName = issuerName;
	}


	public List<Question> getQuestions() {
		return questions;
	}


	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}

	
	
}
