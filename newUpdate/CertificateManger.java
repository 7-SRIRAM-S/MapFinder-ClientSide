package com.mapfinder.services;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.mapfinder.dao.CertificateDAO;

public class CertificateManger {
	private static CertificateDAO certificateDao = new CertificateDAO();
	private static final Logger LOGGER=LogManager.getLogger(CertificateManger.class.getName());
	
	public static boolean insertCertificate(int userId) {
		LOGGER.trace(new StringBuilder("::: insert UserCertificate from DB :::  Creating Object for Certificate ::: ").toString());
		try {
			return certificateDao.insertUserCertificate(userId , 1);
		}
		catch(Exception e) {
			LOGGER.warn(new StringBuilder("::: Problem in Creating Object :::  "+e.getMessage()+" ::: ").toString());
			return false;
		}
	}
	
	public static int userCertificateCount(int userId) {
		LOGGER.trace(new StringBuilder("::: get UserCertificate from DB :::  Creating Object for Certificate ::: ").toString());
		try {
			return certificateDao.userCertificateCount(userId);
			
		} catch (Exception e) {
			LOGGER.warn(new StringBuilder("::: Problem in Creating Object :::  "+e.getMessage()+" ::: ").toString());
			return 0;
		}
	}
	

public static long totalCertificateCount() {
	try {
		return certificateDao.totalCertificateCount();
		
	} catch (Exception e) {
		LOGGER.warn(new StringBuilder("::: Problem in Creating Object :::  "+e.getMessage()+" ::: ").toString());
		return 0;
	}
}
}
