package com.example.demo.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.common.ErrorsMap;
import com.example.demo.service.UserService;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor(onConstructor = @_ ({@Autowired}))
public class UserValidator {

    private final UserService userService;

    public ErrorsMap existsValid(String username){
        ErrorsMap errors = new ErrorsMap();
        if (!userService.existsByUsername(username)){
            errors.put("user","User does not exist");
        }
        return errors;
    }

}