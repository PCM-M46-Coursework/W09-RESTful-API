module.exports = {
	isValidPassword(password) {
		// Ref: https://owasp.deteact.com/cheat/cheatsheets/Authentication_Cheat_Sheet.html
		// OWASP Password Strength Guidelines require the password to:
		//
		//    Contain at least one lowercase letter ((?=.*[a-z]))
		//    Contain at least one uppercase letter ((?=.*[A-Z]))
		//    Contain at least one digit ((?=.*\d))
		//    Contain at least one special character ((?=.*[!@#$%^&*()_+]))
		//    Be at least 10 characters long ({10,})
		//    Only contain letters, digits, and the specified special characters ([A-Za-z\d!@#$%^&*()_+ ])
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+ ]{10,}$/;
		return passwordRegex.test(password);
	},
};
