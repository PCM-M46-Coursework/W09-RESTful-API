module.exports = {
	/**
	 * Hash a cleartext password, using bcrypt.
	 */
	hashPassword: require("./hashPassword"),

	/**
	 * Compares a cleartext password, with the hashed using bcrypt.
	 */
	compareHash: require("./compareHash"),
};
