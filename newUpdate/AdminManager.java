package com.mapfinder.services;

import org.json.JSONArray;
import org.json.JSONObject;

import com.mapfinder.modal.Quiz;


public class AdminManager {
		
	public static long getTotalUsers(){
		return UserManager.getUserCount();
	}
	
	public static long getTotalPoints(){
		return LeaderBoardManager.totalPointsOfAllUsers();
	}
	
	public static long getTotalCertificates() {
		return CertificateManger.totalCertificateCount();
	}
	
	public static float getAverageHints() {
		return UserManager.getAvgHint();
	}
	
	public static JSONArray getUsers() {
		return UserManager.getAllusers();
	}
	
	public static JSONArray getAnnouncements() {
		return AnnouncementManager.getActiveAnnouncement();
	}
	
	public static JSONObject getAnnouncement(int id) {
		return AnnouncementManager.getAnnouncementByID(id);
	}
	
	
	public static JSONArray getQuestions() {
		return QuizManager.getAllQuestion();
	}
	

	public static String deletemessage(int id) {
		return AnnouncementManager.deleteAnnouncement(id);
	}
	
	public static String deletequestion(int id) {
		return QuizManager.deleteQuestion(id);
	}
	
	public static void addMessage(String title,String message,int userId) {
		AnnouncementManager.addAnnouncement(title, message , userId);
	}
	
	public static String updateMessage(int id,String message,String title) {
		return AnnouncementManager.updateAnnouncement(id, message, title);
	}
	public static boolean addquestion(Quiz quiz) {
		return QuizManager.insertQuiz(quiz);
	}
	
	public static JSONObject getQuestionById(int id) {
		return QuizManager.getQuestionById(id);
	}
	

	public static boolean addquestion(int id ,String question,JSONArray option,JSONArray correct) {
		return QuizManager.insertQuestion(id,question,option,correct);
	}
	
	public static JSONArray getContentType() {
		return QuizManager.getContentType();
	}
	
	
	public static boolean updateQuestion(JSONObject obj) {
		return QuizManager.updateQuestion(obj);
	}
}
