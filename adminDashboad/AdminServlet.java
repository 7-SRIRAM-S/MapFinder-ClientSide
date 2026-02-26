package com.mapfinder.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.mapfinder.services.AdminManager;
import com.mapfinder.services.DashboardManager;
import com.mapfinder.utils.ResponseUtil;

public class AdminServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    private static final Logger LOGGER=LogManager.getLogger(AdminServlet.class.getName());
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject res=new JSONObject();
		int clientId = -1;
		HttpSession session=null;

		try {
			
			session=request.getSession(false);

			String[] arr=request.getRequestURI().split("/");
			
			if(arr.length != 4) {
				  res=ResponseUtil.buildErrorResponse(HttpServletResponse.SC_BAD_REQUEST,"No url Found");  
				  LOGGER.error(new StringBuilder("::: Bad request ::: No Url Found   :::").toString());
			}else {
				if(session!=null) {
					String userId = (String) session.getAttribute("user");
					clientId=Integer.parseInt(userId); 
					
					 if(clientId==-1) {
						  LOGGER.fatal(new StringBuilder("::: No User id found  ::: Inside Session :::").toString());
				    	 return;
				     }
				}
				else {
					  LOGGER.fatal(new StringBuilder(":::No  Session availble ::: Redirecting into error.jsp :::").toString());
				}
				if(arr[3].equals("dashboard")) {
					LOGGER.info(new StringBuilder("::: Get data for dashboard ::: querying into AdminManager :::").toString());

					JSONObject json=new JSONObject();
			
					json.put("HINTS", AdminManager.getAverageHints());
					json.put("POINTS", AdminManager.getTotalPoints());
					json.put("CERTIFICATES", AdminManager.getTotalCertificates());
					json.put("USERCOUNT",AdminManager.getTotalUsers());
					
					res = ResponseUtil.buildResponce(json, "dashBoard data was processed");
					
			
				}else if(arr[3].equals("users")) {	
					
					LOGGER.info(new StringBuilder("::: Get data for userdetails ::: querying into AdminManager :::").toString());

					res=ResponseUtil.buildResponce(AdminManager.getUsers(), "data recived");
			
				}else if(arr[3].equals("announcements")) {

					LOGGER.info(new StringBuilder("::: Get data for announcement ::: querying into AdminManager :::").toString());
			
					res = ResponseUtil.buildResponce(AdminManager.getAnnouncements(4), "data recived");
				}else if(arr[3].equals("questions")) {
					LOGGER.info(new StringBuilder("::: Get data for questions ::: querying into AdminManager :::").toString());
					
					res = ResponseUtil.buildResponce(AdminManager.getQuestions(), "data recived");
				}
				else { 
					LOGGER.error(new StringBuilder("::: Bad request ::: No url found   :::").toString());
					response.sendError(404);
				}
			
			}
		
		}catch(Exception e) {
		  res=ResponseUtil.buildResponceError(HttpServletResponse.SC_BAD_REQUEST,e.getMessage());
		  LOGGER.error(new StringBuilder("::: Problem in url or parameters are not founded ::: "+e.getMessage()+"   :::").toString());
		}
		
		LOGGER.info(new StringBuilder("::: Data processed (USER ID = "+ clientId +" ) ::: For Uri => "+request.getRequestURI()+" :::").toString());
		ResponseUtil.ProcessResponse(res, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
