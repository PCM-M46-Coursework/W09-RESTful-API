module.exports = {
	/**
	 * Hash a cleartext password, using bcrypt.
	 */
	hashPass: require("./hashPass"),

	/**
	 * Compares a cleartext password, with the hashed using bcrypt.
	 */
	comparePass: require("./comparePass"),
};
