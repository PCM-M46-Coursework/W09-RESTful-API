module.exports = {
	build(context) {
		return {
			/**
			 * Hash a cleartext password, using bcrypt.
			 */
			hashPass: require("./hashPass"),

			/**
			 * Compares a cleartext password, with the hashed using bcrypt.
			 */
			comparePass: require("./comparePass").build(context),

			/**
			 * Validates the strength of a cleartext password, using the OWASP Password Strength Guidelines.
			 */
			validatePass: require("./validatePass"),

			/**
			 * Validates a username. Ensures the username exists, when registering.
			 */
			validateUsername: require("./validateUsername"),

			/**
			 * Validates an email address, using the HTML5 email validation rules.
			 */
			validateEmail: require("./validateEmail"),

			/**
			 * Authorise a user, with a JWT Token.
			 */
			tokenCheck: require("./tokenCheck").build(context),

			/**
			 * Validates, and hashes a new password for a user.
			 */
			changePass: require("./changePass"),
		};
	},
};
