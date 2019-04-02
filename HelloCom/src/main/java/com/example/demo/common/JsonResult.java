package com.example.demo.common;

import org.springframework.http.HttpStatus;

public class JsonResult {
	 // Status code: 1 is successful, others are failed
    public int code;

    // Success is success, others are failure reasons
    public String message;

    // Data result set
    public Object data;

    public JsonResult(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public JsonResult(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public JsonResult(HttpStatus code, String message, Object data) {
        this.code = code.value();
        this.message = message;
        this.data = data;
    }
}
