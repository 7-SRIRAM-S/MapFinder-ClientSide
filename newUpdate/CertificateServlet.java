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

import com.mapfinder.services.AdminManager;
import com.mapfinder.services.CertificateManger;
import com.mapfinder.utils.JSONUtil;
import com.mapfinder.utils.ResponseUtil;

/**
 * Servlet implementation class CertificateServlet
 */
public class CertificateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger LOGGER = LogManager.getLogger(AdminServlet.class.getName());

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CertificateServlet() {
		super();
		// TODO Auto-generated constructor stub
	}


	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		JSONObject res = new JSONObject();
		int clientId = -1;
		HttpSession session = null;

		try {

			session = request.getSession(false);

			String[] arr = request.getRequestURI().split("/");

			if (arr.length != 4) {
				res = ResponseUtil.buildErrorResponse(HttpServletResponse.SC_BAD_REQUEST, "No url Found");
				LOGGER.error(new StringBuilder("::: Bad request ::: No Url Found   :::").toString());
			} else {
				if (session != null) {
					String userId = (String) session.getAttribute("user");
					clientId = Integer.parseInt(userId);

					if (clientId == -1) {
						LOGGER.fatal(new StringBuilder("::: No User id found  ::: Inside Session :::").toString());
						return;
					}
				} else {
					LOGGER.fatal(
							new StringBuilder(":::No  Session availble ::: Redirecting into error.jsp :::").toString());
				}
				if (arr[3].equals("updateCertificate")) {
					LOGGER.info(new StringBuilder("::: Get data for dashboard ::: querying into AdminManager :::")
							.toString());
					boolean updateCertificate = CertificateManger.insertCertificate(clientId);

				} else {
					LOGGER.error(new StringBuilder("::: Bad request ::: No url found   :::").toString());
					response.sendError(404);
				}

			}

		} catch (Exception e) {
			res = ResponseUtil.buildErrorResponse(HttpServletResponse.SC_BAD_REQUEST, e.getMessage());
			LOGGER.error(new StringBuilder("::: Problem in url or parameters are not founded ::: " + e.getMessage() + "   :::").toString());
		}

		LOGGER.info(new StringBuilder("::: Data processed (USER ID = " + clientId + " ) ::: For Uri => " + request.getRequestURI() + " :::").toString());
		ResponseUtil.ProcessResponse(res, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

	}

}
