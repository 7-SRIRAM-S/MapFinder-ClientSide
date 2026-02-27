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
	public static boolean addquestion(int id ,String question,JSONArray option,JSONArray correct) {
		return quizz.insertQuestion(id,question,option,correct);
	}
	
	public static JSONArray getContentType() {
		return quizz.getContentType();
	}
}





quizzManager

public static String deleteQuestion(int id) {
	if(new QuizzDAO().delete(id)) {
		return "succes";
	}else {
		return "process was failed";
	}
}

public static boolean insertQuestion(int id,String question,JSONArray option,JSONArray correct) {
	try {
	
		return new QuizzDAO().insertQuestion(id,question,option,correct);
	
	} catch (Exception e) {
		return false;
	}
}

public static JSONArray getContentType() {
	return new QuizzDAO().getContentType();

 
public boolean delete(int Id) {
	try {
		PreparedStatement stmt=conn.prepareStatement("DELETE from announcements where announcement_id = ?");
		stmt.setInt(1, Id);
		return stmt.execute();
	} catch (Exception e) {
		return false;
	}
}


quizDAO  

public JSONArray getAllQuestion() {
	JSONArray array = new JSONArray();
	try {
		Statement stmt=con.createStatement();
		ResultSet rs=stmt.executeQuery(QueryUtil.ALL_QUESTION);
		while(rs.next()) {
			JSONObject json= new JSONObject();
			json.put("id", rs.getLong("question_id"));
			json.put("title", rs.getString("title"));
			json.put("question_text", rs.getString("question_text"));
			json.put("options", new JSONArray(rs.getString("choices")));
			array.put(json);
		}
	}catch (SQLException e) {
		LOGGER.error(new StringBuilder("Problem in Fetch All questions :::  "+e.getMessage()+"   :::").toString());
	}
	return array;
}

public JSONArray getContentType() {
	JSONArray array=new JSONArray();
	try {
		Statement stmt=con.createStatement();
		ResultSet rs=stmt.executeQuery(QueryUtil.SELECT_CONTENT_TYPE);
		while(rs.next()) {
			JSONObject json= new JSONObject();
			json.put("id", rs.getLong("id"));
			json.put("contentType", rs.getString("content_type"));
			array.put(json);
		}
	}catch (SQLException e) {
		LOGGER.error(new StringBuilder("Problem in Fetch All content Type  :::  "+e.getMessage()+"   :::").toString());
	}
	return array;
}

public boolean delete(int id) {
	try {
		PreparedStatement ps=con.prepareStatement("DELETE FROM questions WHERE id = ?");
		
		ps.setInt(1, id);
		return ps.execute();
	}catch (Exception e) {
		LOGGER.error(new StringBuilder("Problem in Deleting question and choice :::  "+e.getMessage()+"   :::").toString());
	}
	return false;
}

public boolean insertQuestion(int id,String question,JSONArray option,JSONArray correct) {

	try {

		PreparedStatement quizStmt = con.prepareStatement(QueryUtil.INSERTQUESTION);

		quizStmt.setInt(1, id);
		quizStmt.setString(2, question);

		quizStmt.execute();

		Statement stmt = con.createStatement();
		
		ResultSet rs = stmt.executeQuery(QueryUtil.LAST_MODIFIED_ID);
		
		rs.next();
		
		int question_id=Integer.parseInt(rs.getString("id"));

		PreparedStatement ps = con.prepareStatement(QueryUtil.INSERT_FOUR_CHOICE);
		
		for(int i=0;i<option.length();i++) {
			ps.setInt(1+(3*i), question_id);
			ps.setString(2+(3*i), option.getString(i));
			System.out.println(correct.getString(i));
			if(correct.getString(i).equals(true)) {
				ps.setInt(3+(3*i),1);
			}else {
				ps.setInt(3+(3*i),0);
			}
		}
		
		
		
		System.out.println(id+" --- "+question+" -- "+option);

		return ps.execute();
	} catch (Exception e) {
		LOGGER.warn(new StringBuilder("::: Problem in Inserting Quiz :::  "+e.getMessage()+" ::: ").toString());
		return false;
	}
}



query utill

public static final String SELECT_CONTENT_TYPE="select id , content_type from quizzes";
	
public static final String LAST_MODIFIED_ID="select LAST_INSERT_ID() as id";

public static final String INSERT_FOUR_CHOICE="INSERT INTO choices (question_id, choice_text, is_correct)  VALUES (?, ?, ?) ,(?, ?, ?),(?, ?, ?),(?, ?, ?)";



responseUtil

public static void sendResponceFile(HttpServletResponse response, StringBuffer data) {
	try {
		response.setContentType("text/csv; charset=UTF-8");
		response.setHeader("Content-Disposition", "attachment; filename=test.csv;");
		response.setHeader("X-Download-Options", "noopen");
		response.getWriter().println(data.toString());

	} catch (Exception e) {
		e.printStackTrace();
	}
	
}

public static void processResponseFile(HttpServletResponse response, JSONObject responseJson) {
	try {
	
		 JSONArray jsonArray = responseJson.getJSONArray("data");
					  
		 String heading="ID,USERNAME,SCORE,CERTIFICATES,HINTS,CREATED_AT";

		  ArrayList<String> string= new ArrayList<>();
		  string.add(heading);
		  for (int i = 0; i < jsonArray.length(); i++) {
			  JSONObject obj = jsonArray.getJSONObject(i);
			  String row = obj.getInt("id") +"," + obj.getString("USERNAME") +"," + obj.getInt("total_score") +"," + obj.getInt("certificateCount") +"," + obj.getInt("HINTS") +"," + (obj.get("CREATED_AT")).toString();
			  string.add(row);
		 }
		StringBuffer sb=new StringBuffer();
		
		string.forEach(data->{
			sb.append(data);
			sb.append("\n");
		});

		sendResponceFile(response, sb);
	} catch (Exception e) {
		e.printStackTrace();
	}
}