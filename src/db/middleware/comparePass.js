const User = require("../../api/users/model");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
	const { username, password } = req.body;

	// Return early if username or password is not within the request body.
	if (!username || !password) {
		return res
			.status(400)
			.json({ message: "Username and password are required." });
	}

	try {
		// Find the user by username
		const user = await User.findOne({ where: { username } });

		// If user is not found, return a 401 unauthorised error.
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid username or password." });
		}

		// Use bcrypt to compare the user's password with the provided password.
		const match = await bcrypt.compare(password, user.password);

		// If the passwords don't match, return a 401 unauthorised error.
		if (!match) {
			return res
				.status(401)
				.json({ message: "Invalid username or password." });
		}

		// Attach the user object to the request and call the controller.
		req.user = user;
		next();
	} catch (error) {
		res.status(500).json({
			message: error.message,
			error,
		});
	}
};
