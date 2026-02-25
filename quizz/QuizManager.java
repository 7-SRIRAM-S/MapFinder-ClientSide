package com.mapfinder.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONArray;

import com.mapfinder.dao.LeaderboardDAO;
import com.mapfinder.dao.QuizDAO;
import com.mapfinder.modal.Leaderboard;
import com.mapfinder.modal.Quiz;
import com.mapfinder.utils.JSONUtil;

public class QuizManager {

	private static QuizDAO quizDao = new QuizDAO();
    private static final Logger LOGGER=LogManager.getLogger(QuizManager.class.getName());
    
    public static boolean insertQuiz(Quiz quiz) {
    	LOGGER.trace(new StringBuilder("::: Add Quiz into DB :::  Creating Object for LeaderBoard ::: ").toString());
    	try {
    		
    		return quizDao.insertQuiz(quiz);
			
		} catch (Exception e) {
			LOGGER.warn(new StringBuilder("::: Problem in Creating Object :::  "+e.getMessage()+" ::: ").toString());
			return false;
		}
    }
    
    
    public static JSONArray viewQuizz() {
    	List<Quiz> arr = new ArrayList<Quiz>();
    	try {
			arr = quizDao.getQuizById();
		} catch (Exception e) {
			LOGGER.warn(new StringBuilder("::: Problem in fetching data :::  "+e.getMessage()+" ::: ").toString());
		}
    	return JSONUtil.convertQuizzToJson(arr);
    }
}
