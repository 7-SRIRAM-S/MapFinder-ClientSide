package com.mapfinder.modal;

import java.util.List;

public class Question {
    private int id;
    private String questionText;
    private List<Choice> choise;
    
	public Question() {
	}
	public Question(int id, String questionText) {
		super();
		this.id = id;
		this.questionText = questionText;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getQuestionText() {
		return questionText;
	}
	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}
	public List<Choice> getChoise() {
		return choise;
	}
	public void setChoise(List<Choice> choise) {
		this.choise = choise;
	}

    
}