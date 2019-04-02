package com.example.demo.common;

import com.google.gson.Gson;

public class GsonUtil {
	public static String simpleJson(Object jsonObject){
	      Gson gson = new Gson();
	      String json = gson.toJson(jsonObject);
	      System.out.println(json);
	      return json;
	  }
}
