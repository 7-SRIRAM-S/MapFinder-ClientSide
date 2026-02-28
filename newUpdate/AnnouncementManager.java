//$Id$
package com.mapfinder.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mapfinder.dao.AnnouncementDAO;
import com.mapfinder.modal.Announcement;
import com.mapfinder.utils.JSONUtil;

public class AnnouncementManager {
	private static AnnouncementDAO announcementDao = new AnnouncementDAO();
	private static final Logger LOGGER = LogManager.getLogger(AnnouncementManager.class.getName());

	public static boolean addAnnouncement(String title, String msg,int userId) {
		LOGGER.trace(new StringBuilder("::: Add Announcement into DB :::  Creating Object for Announcement ::: ")
				.toString());
		Announcement announcement = null;

		try {
			announcement = new Announcement(title, msg,userId);

			return announcementDao.insertAnnouncement(announcement);
		} catch (Exception e) {
			LOGGER.warn(
					new StringBuilder("::: Problem in Creating Object :::  " + e.getMessage() + " ::: ").toString());

		}
		return false;
	}
	
	

	public static JSONArray getActiveAnnouncement() {
		LOGGER.trace(new StringBuilder("::: view Announcement from DB :::  Creating Object for Announcement ::: ")
				.toString());
		List<Announcement> announcement = new ArrayList<Announcement>();
		try {
			announcement = announcementDao.findActive();

		} catch (Exception e) {

			LOGGER.warn(
					new StringBuilder("::: Problem in Creating Object :::  " + e.getMessage() + " ::: ").toString());

		}
		return JSONUtil.convertAnnouncementTOJson(announcement);
	}

	public static JSONObject getAnnouncementByID(int id) {
		return announcementDao.getAnnouncement(id);
	}

	public static String deleteAnnouncement(int Id) {
		try {
			if (announcementDao.delete(Id)) {
				return "Sucess";
			} else {
				return "Error was happen in delete";
			}
		} catch (Exception e) {
			return "Error was happen in delete";
		}
	}

	public static String updateAnnouncement(int Id, String message, String title) {
		try {
			if (announcementDao.updateAnnouncement(Id, message, title)) {
				return "Sucess";
			} else {
				return "Error was happen in delete";
			}
		} catch (Exception e) {
			return "Error was happen in delete";
		}
	}
}
