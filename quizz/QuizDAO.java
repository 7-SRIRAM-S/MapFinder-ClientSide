package com.mapfinder.dao;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.mapfinder.modal.Choice;
import com.mapfinder.modal.Question;
import com.mapfinder.modal.Quiz;
import com.mapfinder.utils.DBUtil;
import com.mapfinder.utils.QueryUtil;

public class QuizDAO {
	Connection conn = DBUtil.getInstance().getConnection();
	private static final Logger LOGGER = LogManager.getLogger(QuizDAO.class.getName());

	public boolean insertQuiz(Quiz quiz) {

		try {

			conn.setAutoCommit(false);
			PreparedStatement quizStmt = conn.prepareStatement(QueryUtil.INSERTQUIZE, Statement.RETURN_GENERATED_KEYS);

			quizStmt.setString(1, quiz.getTitle());
			quizStmt.setString(2, quiz.getDescription());
			quizStmt.setString(3, quiz.getContentType());
			quizStmt.setString(4, quiz.getIssuerName());

			quizStmt.executeUpdate();

			ResultSet quizKeys = quizStmt.getGeneratedKeys();
			quizKeys.next();
			int quizId = quizKeys.getInt(1);

			for (Question question : quiz.getQuestions()) {

				PreparedStatement questionStmt = conn.prepareStatement(QueryUtil.INSERTQUESTION,
						Statement.RETURN_GENERATED_KEYS);

				questionStmt.setInt(1, quizId);
				questionStmt.setString(2, question.getQuestionText());
				questionStmt.executeUpdate();

				ResultSet questionKeys = questionStmt.getGeneratedKeys();
				questionKeys.next();
				int questionId = questionKeys.getInt(1);

				for (Choice choice : question.getChoise()) {

					PreparedStatement choiceStmt = conn.prepareStatement(QueryUtil.INSERTCHOCE);

					choiceStmt.setInt(1, questionId);
					choiceStmt.setString(2, choice.getChoiceText());
					choiceStmt.setBoolean(3, choice.isCorrect());

					choiceStmt.executeUpdate();
				}
			}

			conn.commit();
			return true;
		} catch (SQLException e) {
			LOGGER.warn(new StringBuilder("::: Problem in Inserting Quiz :::  "+e.getMessage()+" ::: ").toString());
			return false;
		}
	}
	
	
	public List<Quiz> getQuizById() {

		List<Quiz> quizz = new ArrayList<Quiz>();

	    try {
	    	Statement quizStmt = conn.createStatement();
	    	ResultSet quizRs = quizStmt.executeQuery(QueryUtil.SELECT_QUIZZ);

	        if (quizRs.next()) {
	            Quiz quiz = new Quiz();
	            quiz.setId(quizRs.getInt("id"));
	            quiz.setTitle(quizRs.getString("title"));
	            quiz.setDescription(quizRs.getString("description"));
	            quiz.setContentType(quizRs.getString("content_type"));
	            quiz.setIssuerName(quizRs.getString("issuer_name"));

	            quiz.setQuestions(getQuestionsByQuizId(quizRs.getInt("id")));
	            quizz.add(quiz);
	        }

	    } catch (SQLException e) {
	        LOGGER.warn("::: Problem in Fetching Quiz ::: " + e.getMessage());
	    }

	    return quizz;
	}
	
	public List<Question> getQuestionsByQuizId(int quizId) {

	    List<Question> questionList = new ArrayList<>();

	    try {

	        PreparedStatement questionStmt = conn.prepareStatement(QueryUtil.SELECT_QUESTION);
	        questionStmt.setInt(1, quizId);

	        ResultSet questionRs = questionStmt.executeQuery();

	        while (questionRs.next()) {

	            Question question = new Question();
	            int questionId = questionRs.getInt("id");

	            question.setId(questionId);
	            question.setQuestionText(questionRs.getString("question_text"));

	            question.setChoise(getChoicesByQuestionId(questionId));

	            questionList.add(question);
	        }

	    } catch (SQLException e) {
	        LOGGER.warn("::: Problem in Fetching Questions ::: " + e.getMessage());
	    }

	    return questionList;
	}
	
	
	public List<Choice> getChoicesByQuestionId(int questionId) {

	    List<Choice> choiceList = new ArrayList();

	    try {

	        PreparedStatement choiceStmt = conn.prepareStatement(QueryUtil.SELECT_CHOICE);
	        choiceStmt.setInt(1, questionId);

	        ResultSet choiceRs = choiceStmt.executeQuery();

	        while (choiceRs.next()) {

	            Choice choice = new Choice();
	            choice.setChoiceId(choiceRs.getInt("id"));
	            choice.setChoiceText(choiceRs.getString("choice_text"));
	            choice.setCorrect(choiceRs.getBoolean("is_correct"));

	            choiceList.add(choice);
	        }

	    } catch (SQLException e) {
	        LOGGER.warn("::: Problem in Fetching Choices ::: " + e.getMessage());
	    }

	    return choiceList;
	}
}