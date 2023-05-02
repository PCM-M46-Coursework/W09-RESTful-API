module.exports = function ({ User }) {
	return {
		/**
		 * Get all users within the database.
		 *
		 * @param {object} req - Express request object
		 * @param {object} res - Express response object
		 * @returns {object} 200 - A JSON object with all users.
		 * @returns {Error} 500 - Internal server error.
		 */
		getAllUsers: async function (_, res) {
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
		getUserById: async function (req, res) {
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
		 * Authorises an authenticated user, with the provided token.
		 * Authorisation handled by {@link tokenCheck} middleware.
		 *
		 * @param {User.model} req - The request object.
		 * @param {Object} res - The response object.
		 * @returns {AuthenticatedUserResponse.model} 200 - The authenticated user model.
		 * @returns {Error} 500 - Internal server error.
		 */
		authCheck: async function (req, res) {
			try {
				const { username, email, token } = req.user;
				res.status(200).json({
					message: "success",
					user: {
						username,
						email,
						token,
					},
				});
			} catch (error) {
				res.status(500).json({
					message: error.message,
					error,
				});
			}
		},
	};
};
