package com.example.demo.servicelmpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Account;
import com.example.demo.repository.AccountRespository;
import com.example.demo.service.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor(onConstructor = @_({ @Autowired }))
public class UserServiceImpl<userRepository> implements UserService {

	private final AccountRespository userRepository;

	@Override
	public Account login(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public boolean existsByUsername(String phone) {
		return userRepository.existsByUsername(phone);
	}
}