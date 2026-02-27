//$Id$
package com.mapfinder.services;

import org.json.JSONArray;

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
}


LeaderBoardManager


public static long totalPointsOfAllUsers() {
	return leaderBoard.totalPoitsOfAllUsers();
}


certificatManager

public static long totalCertificateCount() {
	try {
		return CertificateManger.certificate.totalCertificateCount();
		
	} catch (Exception e) {
		LOGGER.warn(new StringBuilder("::: Problem in Creating Object :::  "+e.getMessage()+" ::: ").toString());
		return 0;
	}
}


UserManager

public static float getAvgHint() {
	return (userDAO.getAvgHint()/(float)getUserCount());
}

public static long getUserCount() {
	return userDAO.getUserCount();
}

public static JSONArray getAllusers() {
	return userDAO.getAllUserData();
}

UserDAO 

public long getAvgHint() {
	try {
		PreparedStatement ps=con.prepareStatement(QueryUtil.TOTAL_USERS_HINT);
		ResultSet rs=ps.executeQuery();
		rs.next();
		return rs.getLong("total");
		
	} catch (SQLException e) {
		LOGGER.error(new StringBuilder("Problem in Fetch average hint of all user :::  "+e.getMessage()+"   :::").toString());
	}
	return 0;
}


public long getUserCount() {
	try {
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(QueryUtil.SELECT_USERCOUNT);
		rs.next();
		return rs.getLong("userCount");
	}
	catch(SQLException e) {
		LOGGER.error(new StringBuilder("Problem in Fetch User count:::  "+e.getMessage()+"   :::").toString());
		return -1l;
		
	}
}

public JSONArray getAllUserData() {
	JSONArray array=new JSONArray();
	try {
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(QueryUtil.TOTAL_USERS);
		while (rs.next()) {
			JSONObject json = new JSONObject();
			json.put("id",rs.getInt("user_id"));
			json.put("USERNAME",rs.getString("USERNAME"));
			json.put("CREATED_AT", rs.getTimestamp("CREATED_AT").toLocalDateTime());
			json.put("HINTS", rs.getLong("HINTS"));
			json.put("certificateCount", rs.getLong("certificateCount"));
			json.put("total_score", rs.getLong("total_score"));
			array.put(json);
		}
			
		return array;
	}catch(SQLException e) {
		LOGGER.error(new StringBuilder("Problem in Fetch all user datas:::  "+e.getMessage()+"   :::").toString());
	}
	return array;
}


leaderboardDAO 

public long totalPoitsOfAllUsers() {
    	
	try {
		PreparedStatement ps= conn.prepareStatement(QueryUtil.TOTALPOINTS);
		ResultSet rs = ps.executeQuery();
		rs.next();
		return rs.getLong("total");
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return -1;
}


certificateDAO 

public long totalCertificateCount() {
	LOGGER.trace(new StringBuilder("::: get userCertificateCount into DB :::  Creating Object for Certificate ::: ").toString());
	int totalCertificates = 0;
	try {
		PreparedStatement ps = conn.prepareStatement(QueryUtil.TOTAL_CERTIFICATE);
		ResultSet rs = ps.executeQuery();
		rs.next();
		return rs.getLong("total");
		
	} catch (Exception e) {
		e.printStackTrace();
	}

	return totalCertificates;

}



queryUtil 

public static final String ALL_QUESTION=" SELECT q.title,qs.id AS question_id,qs.question_text,JSON_ARRAYAGG(JSON_OBJECT('choice', c.choice_text,'correct', c.is_correct)) AS choices FROM quizzes q JOIN questions qs ON q.id = qs.quiz_id JOIN choices c ON qs.id = c.question_id WHERE qs.quiz_id = q.id GROUP BY q.title, qs.id, qs.question_text ORDER BY qs.id";
public static final String TOTAL_CERTIFICATE="select count(*) as total from certificates";
public static final String TOTALPOINTS="SELECT SUM(total_score) as total from leaderboard";
public static final String TOTAL_USERS_HINT="select sum(HINTS) as total from users";
public static final String SELECT_USERCOUNT = "select count(*) as userCount from users";
public static final String TOTAL_USERS="SELECT u.user_id,u.USERNAME,u.CREATED_AT,u.HINTS,COUNT(c.certificate_id) AS certificateCount,COALESCE(l.total_score, 0) AS total_score FROM users u LEFT JOIN user_certificates c ON u.user_id = c.user_id LEFT JOIN leaderboard l ON u.user_id = l.user_id GROUP BY u.user_id,u.USERNAME,u.CREATED_AT, u.HINTS,l.total_score";
	