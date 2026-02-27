package com.mapfinder.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import com.mapfinder.modal.Quiz;
import com.mapfinder.services.AdminManager;
import com.mapfinder.utils.JSONUtil;
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
					
					res = ResponseUtil.buildResponse(json, "dashBoard data was processed");
					
			
				}else if(arr[3].equals("users")) {	
					
					LOGGER.info(new StringBuilder("::: Get data for userdetails ::: querying into AdminManager :::").toString());

					res=ResponseUtil.buildResponse(AdminManager.getUsers(), "data recived");
			
				}else if(arr[3].equals("announcements")) {

					LOGGER.info(new StringBuilder("::: Get data for announcements ::: querying into AdminManager :::").toString());
			
					res = ResponseUtil.buildResponse(AdminManager.getAnnouncements(4), "data recived");
				}else if(arr[3].equals("announcement")) {

					LOGGER.info(new StringBuilder("::: Get data for announcement ::: querying into AdminManager :::").toString());
					
					int id = Integer.parseInt(request.getParameter("id"));
					
					res=ResponseUtil.buildResponce(AdminManager.getAnnouncement(id), "data recived");
				}
				else if(arr[3].equals("questions")) {
					LOGGER.info(new StringBuilder("::: Get data for questions ::: querying into AdminManager :::").toString());
					
					res = ResponseUtil.buildResponse(AdminManager.getQuestions(), "data recived");
				}else if(arr[3].equals("contentType")) {
					LOGGER.info(new StringBuilder("::: Get data for questions ::: querying into AdminManager :::").toString());
					
					res = ResponseUtil.buildResponse(AdminManager.getQuestions(), "data recived");
				}else if(arr[3].equals("saveUsers")) {

					LOGGER.info(new StringBuilder("::: Get data for userdetails to convert the csv file ::: querying into AdminManager :::").toString());

				 	ResponseUtil.processResponseFile(response, ResponseUtil.buildResponce(AdminManager.getUsers(), "data recived"));
					return;
				}else if(arr[3].equals("deletemessage")) {
					LOGGER.info(new StringBuilder("::: IN Get data for delete message ::: querying into AdminManager :::").toString());
					
					int id =Integer.parseInt(request.getParameter("messageId"));
					
					res = ResponseUtil.buildResponse(new JSONObject().put("result",AdminManager.deletemessage(id)), "data recived");
				}else if(arr[3].equals("deletequestion")) {
					LOGGER.info(new StringBuilder("::: IN Get data for delete question ::: querying into AdminManager :::").toString());
					
					int id =Integer.parseInt(request.getParameter("questionId"));
					
					res = ResponseUtil.buildResponse(new JSONObject().put("result",AdminManager.deletequestion(id)), "data recived");
				}
				else { 
					LOGGER.error(new StringBuilder("::: Bad request ::: No url found   :::").toString());
					response.sendError(404);
				}
			
			}
		
		}catch(Exception e) {
		  res=ResponseUtil.buildErrorResponse(HttpServletResponse.SC_BAD_REQUEST,e.getMessage());
		  LOGGER.error(new StringBuilder("::: Problem in url or parameters are not founded ::: "+e.getMessage()+"   :::").toString());
		}
		
		LOGGER.info(new StringBuilder("::: Data processed (USER ID = "+ clientId +" ) ::: For Uri => "+request.getRequestURI()+" :::").toString());
		ResponseUtil.ProcessResponse(res, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		JSONObject payload=JSONUtil.readAsJSON(request);
		JSONObject res=new JSONObject();
		String title=null;
		String message=null;
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
				if(arr[3].equals("questions")) {
					LOGGER.info(new StringBuilder("::: IN POST data for questions ::: querying into AdminManager :::").toString());
					Quiz quizz=JSONUtil.buildQuizFromJson(payload);
					
					
				}else if(arr[3].equals("message")){
					LOGGER.info(new StringBuilder("::: IN POST data for message add data ::: querying into AdminManager :::").toString());
					title=payload.getString("title");
					message=payload.getString("message");
					AdminManager.addMessage(title, message, 4);
				}else if(arr[3].equals("editMessage")) {
					LOGGER.info(new StringBuilder("::: IN POST data for message edited ::: querying into AdminManager :::").toString());
					title=payload.getString("title");
					message=payload.getString("message");
					int id=payload.getInt("id");
					res=ResponseUtil.buildResponse(new JSONObject().put("recived : ",AdminManager.updateMessage(id, message, title)),"data recived");
				}
				else { 
				
					LOGGER.error(new StringBuilder("::: Bad request ::: No url found   :::").toString());
					response.sendError(404);
				}
			
			}
		
		}catch(Exception e) {
		  res=ResponseUtil.buildErrorResponse(HttpServletResponse.SC_BAD_REQUEST,e.getMessage());
		  LOGGER.error(new StringBuilder("::: Problem in url or parameters are not founded ::: "+e.getMessage()+"   :::").toString());
		}
		
		LOGGER.info(new StringBuilder("::: Data processed (USER ID = "+ clientId +" ) ::: For Uri => "+request.getRequestURI()+" :::").toString());
		ResponseUtil.ProcessResponse(res, response);
	}

}
