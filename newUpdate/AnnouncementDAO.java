package com.mapfinder.dao;

import com.mapfinder.modal.Announcement;
import com.mapfinder.utils.DBUtil;
import com.mapfinder.utils.QueryUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

public class AnnouncementDAO {
	private Connection conn = DBUtil.getInstance().getConnection();
	private static final Logger LOGGER = LogManager.getLogger(AnnouncementDAO.class.getName());

	public boolean insertAnnouncement(Announcement announcement) {

		try (PreparedStatement stmt = conn.prepareStatement(QueryUtil.INSERT_ANNOUNCEMENT)) {

			stmt.setString(1, announcement.getTitle());
			stmt.setString(2, announcement.getMsg());
			stmt.setInt(3, announcement.getCreatedBy());
			stmt.setBoolean(4, true);

			stmt.executeUpdate();
			return true;
		} catch (SQLException e) {
			LOGGER.error(new StringBuilder("Problem in Insert Announcement into DB ::: " + e.getMessage() + "   :::")
					.toString());
			return false;
		}
	}

	public List<Announcement> findActive() {
		List<Announcement> list = new ArrayList<>();

		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(QueryUtil.VIEW_ANNOUNCEMENT);

			while (rs.next()) {
				list.add(new Announcement(rs.getInt("announcement_id"), rs.getString("title"), rs.getString("message"),
						rs.getInt("created_by"), rs.getBoolean("is_active"), rs.getTimestamp("created_at")));
			}
		} catch (Exception e) {
			LOGGER.error(
					new StringBuilder("Problem in fetching User into DB ::: " + e.getMessage() + "   :::").toString());

		}
		return list;
	}

	public boolean delete(int Id) {
		try {
			PreparedStatement stmt = conn.prepareStatement("DELETE from announcements where announcement_id = ?");
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

			json.put("id", rs.getInt("announcement_id")).put("title", rs.getString("title")).put("message",
					rs.getString("message"));

		} catch (Exception e) {
			e.printStackTrace();

		}
		return json;
	}

	public boolean updateAnnouncement(int id, String message, String title) {

		try (PreparedStatement ps = conn.prepareStatement(QueryUtil.UPDATE_ANNOUNCEMENT)) {
			ps.setString(1, title);
			ps.setInt(3, id);
			ps.setString(2, message);

			return ps.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
}
