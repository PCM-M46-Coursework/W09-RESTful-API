const User = require("../model");

module.exports = {
	/**
	 * Create a new user within the database.
	 *
	 * @param {User.model} req.body.required - The model to create.
	 * @returns {UserResponse.model} 201 - The created model.
	 * @returns {Error} 500 - Internal server error.
	 */
	registerUser: async (req, res) => {
		try {
			const { username, email } = await User.create(req.body);
			res.status(201).json({
				message: `Successfully created user.`,
				user: {
					username,
					email,
				},
			});
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Update a user within the database. All fields are required for update.
	 *
	 * @param {String} id.path.required - The user's ID.
	 * @param {User.model} model.body.required - The updated user.
	 * @returns {UserResponse.model} 200 - The updated model.
	 * @returns {Error} 500 - Internal server error.
	 */
	updateUser: async (req, res) => {
		try {
			const user = await User.findByPk(req.params.id);
			if (!user) throw new Error("User not found.");

			const updatedUser = new User(req.body);
			const validationError = await updatedUser.validate();
			if (validationError.errors) throw validationError;

			user.set(req.body);
			await user.save();
			res.status(200).json({ data: user });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Update a model within the database. Partial updates are allowed.
	 *
	 * @param {String} id.path.required - The model's ID.
	 * @param {User.model} model.body.required - The updated model.
	 * @returns {UserResponse.model} 200 - The updated user.
	 * @returns {Error} 500 - Internal server error.
	 */
	patchUser: async (req, res) => {
		try {
			const user = await User.findByPk(req.params.id);
			if (!user) throw new Error("User not found.");

			user.set(req.body);
			await user.save();
			res.status(200).json({ data: user });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Delete a user from the database.
	 *
	 * @param {String} id.path.required - The model's ID.
	 * @returns {Void} 204 - No Content.
	 * @returns {Error} 500 - Internal server error.
	 */
	deleteSingle: async (req, res) => {
		try {
			let user = await User.findByPk(req.params.id);
			if (!user) throw new Error("User not found.");
			await user.destroy();
			res.status(204).end();
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Truncates the Users table within the database. USE WITH CAUTION!
	 *
	 * @returns {Void} 204 - No Content.
	 * @returns {Error} 500 - Internal server error.
	 */
	deleteAllUsers: async (_, res) => {
		try {
			await User.destroy({ truncate: true });
			res.status(204).end();
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},
};