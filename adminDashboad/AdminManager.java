//$Id$
package com.mapfinder.services;

import org.json.JSONArray;

public class AdminManager {
		
	public static long getTotalUsers(){
		return 200;
	}
	
	public static long getTotalPoints(){
		return LeaderBoardManager.totalPointsOfAllUsers();
	}
	
	public static long getTotalCertificates() {
		return 400;
	}
	
	public static long getAverageHints() {
		return 20;
	}
	
	public static JSONArray getUsers() {
		return new JSONArray();
	}
	
	public static JSONArray getAnnouncements(int id) {
		return AnnouncementManager.getActiveAnnouncement(id);
	}
	
	public static JSONArray getQuestions() {
		return new JSONArray();
	}
}