module.exports = {
	/**
	 * Hash a cleartext password, using bcrypt.
	 */
	hashPass: require("./hashPass"),

	/**
	 * Compares a cleartext password, with the hashed using bcrypt.
	 */
	comparePass: require("./comparePass"),

	/**
	 * Validates the strength of a cleartext password, using the OWASP Password Strength Guidelines.
	 */
	validatePass: require("./validatePass"),

	/**
	 * Validates an email address, using the HTML5 email validation rules.
	 */
	validateEmail: require("./validateEmail"),

	/**
	 * Authorise a user, with a JWT Token.
	 */
	tokenCheck: require("./tokenCheck"),

	/**
	 * Validates, and hashes a new password for a user.
	 */
	changePass: require("./changePass"),
};
