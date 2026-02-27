//$Id$
package com.mapfinder.services;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;

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
	
	public static JSONArray getAnnouncements(int id) {
		return AnnouncementManager.getActiveAnnouncement(id);
	}
	
	public static JSONArray getQuestions() {
		return quizz.getAllQuestion();
	}

	public static String deletemessage(int id) {
		return AnnouncementManager.deleteAnnouncement(id);
	}
	
	public static String deletequestion(int id) {
		return quizz.deleteQuestion(id);
	}
	
	public static void addMessage(String title,String message,int userId) {
		AnnouncementManager.addAnnouncement(title, message, userId, true);
	}
	
	public static String updateMessage(int id,String message,String title) {
		return AnnouncementManager.updateAnnouncement(id, message, title);
	}
	public static boolean addquestion(Quiz quiz) {
		return quizz.insertQuiz(quiz);
	}
}





AnnouncementDAO
 
public boolean delete(int Id) {
	try {
		PreparedStatement stmt=conn.prepareStatement("DELETE from announcements where announcement_id = ?");
		stmt.setInt(1, Id);
		return stmt.execute();
	} catch (Exception e) {
		return false;
	}
}

public JSONObject getAnnouncement(int Id) {
	JSONObject json = new JSONObject();

	try (PreparedStatement ps = conn.prepareStatement(QueryUtil.GET_ANNOUNCEMENT_ID)) {

		ps.setInt(1, Id);
		ResultSet rs = ps.executeQuery();

		rs.next();
			
	   json.put("id",rs.getInt("announcement_id"))
			   .put("title",rs.getString("title"))
			   .put("message",rs.getString("message"));
		
	}
	catch (Exception e) {
		e.printStackTrace();
		
	}
	return json;
}

public boolean updateAnnouncement(int id,String message,String title) {
	
	try (PreparedStatement ps = conn.prepareStatement(QueryUtil.UPDATE_ANNOUNCEMENT)){
		ps.setString(1, title);
		ps.setInt(3, id);
		ps.setString(2, message);
		
		return ps.execute();
	}catch (Exception e) {
		e.printStackTrace();
	}
	return false;
}

AnnouncementManager 

public static JSONObject getAnnouncementByID(int id) {
	return AnnouncementManager.announcement.getAnnouncement(id);
}

public static String deleteAnnouncement(int Id) {
	try {
		if(AnnouncementManager.announcement.delete(Id)) {
			return "Sucess"; 
		}else {
			return "Error was happen in delete";
		}
	} catch (Exception e) {
		return "Error was happen in delete";
	}
}

public static String updateAnnouncement(int Id,String message,String title) {
	try {
		if(AnnouncementManager.announcement.updateAnnouncement(Id,message,title)) {
			return "Sucess"; 
		}else {
			return "Error was happen in delete";
		}
	} catch (Exception e) {
		return "Error was happen in delete";
	}
}


queryUtil 


public static final String GET_ANNOUNCEMENT_ID="select * from announcements where announcement_id = ?";
public static final String UPDATE_ANNOUNCEMENT="UPDATE announcements SET title = ? , message = ? WHERE announcement_id = ?";