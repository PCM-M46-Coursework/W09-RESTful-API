const User = require("../model");

module.exports = {
	/**
	 * Get all users within the database.
	 *
	 * @param {object} req - Express request object
	 * @param {object} res - Express response object
	 * @returns {object} 200 - A JSON object with all users.
	 * @returns {Error} 500 - Internal server error.
	 */
	getAllUsers: async (_, res) => {
		try {
			const users = await User.findAll();
			res.status(200).json({ message: "OK", data: users });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Get a single user from the database, by the user's id.
	 *
	 * @param {object} req - Express request object
	 * @param {object} res - Express response object
	 * @returns {object} 200 - A JSON object with the requested user.
	 * @returns {Error} 500 - Internal server error.
	 */
	getUserById: async (req, res) => {
		try {
			const user = await User.findByPk(req.params.id);
			if (!user) throw new Error("User not found.");
			res.status(200).json({ message: "OK", data: user });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Get a single user from the database.
	 *
	 * @param {object} req - Express request object
	 * @param {object} res - Express response object
	 * @returns {object} 200 - A JSON object with the requested user.
	 * @returns {Error} 500 - Internal server error.
	 */
	getUserByUsername: async (req, res) => {
		try {
			const user = await User.findOne({
				where: { username: req.params.username },
			});
			if (!user) throw new Error("User not found.");
			res.status(200).json({ message: "OK", data: user });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},
};
