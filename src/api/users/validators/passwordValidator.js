/**
 * Checks if the password field in the request body meets the following industry standard conventions:
 *
 *  • Contains at least one lowercase letter
 *  • Contains at least one uppercase letter
 *  • Contains at least one digit
 *  • Contains at least one special character (!@#$%^&*()_+)
 *  • Is at least 8 characters long
 */
module.exports = password => {
	const passwordRegex =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])(?=.*[^\da-zA-Z]).{8,}$/;
	return passwordRegex.test(password);
};
