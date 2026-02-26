//$Id$
package com.mapfinder.services;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;

import com.mapfinder.dao.UserDAOImpl;
import com.mapfinder.utils.DBUtil;
import com.mapfinder.utils.QueryUtil;

public class QuizzDAO {

	private static Connection con=DBUtil.getInstance().getConnection();
    private static final Logger LOGGER=LogManager.getLogger(QuizzDAO.class.getName());
    
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
}
