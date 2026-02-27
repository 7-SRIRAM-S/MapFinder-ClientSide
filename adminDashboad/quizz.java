//$Id$
package com.mapfinder.services;

import org.json.JSONArray;

public class quizz {
	public static JSONArray getAllQuestion() {
		return new QuizzDAO().getAllQuestion();
	}
}
