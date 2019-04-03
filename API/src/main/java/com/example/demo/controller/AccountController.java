package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.common.ErrorsMap;
import com.example.demo.common.GsonUtil;
import com.example.demo.common.JsonResult;
import com.example.demo.model.Account;
import com.example.demo.repository.AccountRespository;
import com.example.demo.service.UserService;
import com.example.demo.validator.UserValidator;

import lombok.AllArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor(onConstructor = @_(@Autowired))
public class AccountController {

	@Autowired
	AccountRespository accountRespository;
	
	private final UserValidator validator;
	
	private final UserService service;

	@GetMapping("/account")
	public List<Account> index() {
		return accountRespository.findAll();
	}

	@GetMapping("/account/{id}")
	public Account show(@PathVariable String id) {
		int blogId = Integer.parseInt(id);
		return accountRespository.findById(blogId).get();
	}

	@PostMapping("/account/search")
	public List<Account> search(@RequestBody Map<String, String> body) {
		String searchTerm = body.get("text");
		return accountRespository.findByUsernameContainingOrPasswordContaining(searchTerm, searchTerm);
	}

	@PostMapping("/account")
	public Account create(@RequestBody Map<String, String> body) {
		String title = body.get("username");
		String content = body.get("password");
		return accountRespository.save(new Account(title, content));
	}

	@PostMapping("/update")
	public Account update(@RequestParam Map<String, String> body) {
		int blogId = Integer.parseInt(body.get("id"));
		// getting account
		Account account = accountRespository.findById(blogId).get();
		account.setAuth_plugin(body.get("auth"));
		return accountRespository.save(account);
	}

	@PostMapping("/")
	public JsonResult login(@RequestParam Map<String, String> body) {
		String username = body.get("username");
		String password = body.get("password");
		ErrorsMap errors = validator.existsValid(username);
		if (errors.hasError())
			return new JsonResult(404, "Login failed", errors);

		Account user = service.login(username, password);
		if (user == null) {
			errors.put("password", "wrong password");
			return new JsonResult(400, "Login failed", errors);
		} else {
			return new JsonResult(0, "successfully", user);
		}
	}

	@DeleteMapping("account/{id}")
	public boolean delete(@PathVariable String id) {
		int blogId = Integer.parseInt(id);
		accountRespository.deleteById(blogId);
		return true;
	}

}