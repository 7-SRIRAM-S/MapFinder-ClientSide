package com.mapfinder.modal;

public class Choice {

	private int choiceId;
	private int questionId;
	private String choiceText;
	private boolean isCorrect;

	public Choice() {
	}

	public Choice(int choiceId, int questionId, String choiceText, boolean isCorrect) {
		this.choiceId = choiceId;
		this.questionId = questionId;
		this.choiceText = choiceText;
		this.isCorrect = isCorrect;
	}

	public int getChoiceId() {
		return choiceId;
	}

	public void setChoiceId(int choiceId) {
		this.choiceId = choiceId;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getChoiceText() {
		return choiceText;
	}

	public void setChoiceText(String choiceText) {
		this.choiceText = choiceText;
	}

	public boolean isCorrect() {
		return isCorrect;
	}

	public void setCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}

}
