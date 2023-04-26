const { isValidModel } = require("../../../db/validators/modelValidator");
const User = require("../model");
const jwt = require("jsonwebtoken");

module.exports = {
	/**
	 * Create a new user within the database.
	 *
	 * @param {User.model} req.body.required - The model to create.
	 * @returns {UserResponse.model} 201 - The created model.
	 * @returns {Error} 500 - Internal server error.
	 */
	registerUser: async function (req, res) {
		try {
			const { username, email } = await User.create(req.body);
			res.status(201).json({
				message: "success",
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
	 * Authenticates a user, with the provided credentials.
	 * Authentication handled by {@link comparePass} middleware.
	 * Authorisation handled by {@link tokenCheck} middleware.
	 *
	 * @param {User.model} req.body.required - The user credentials.
	 * @param {Object} res.body.required - The response object.
	 * @returns {AuthenticatedUserResponse.model} 200 - The authenticated user model.
	 * @returns {Error} 500 - Internal server error.
	 */
	loginUser: async function (req, res) {
		try {
			if (req.user?.token == null) {
				req.user.token = jwt.sign(
					{ id: req.user.id },
					process.env.JWT_SECRET,
				);
			}

			const { username, email, token } = req.user;
			res.status(200).json({
				message: `success`,
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

	/**
	 * Update a user within the database. All fields are required for update.
	 *
	 * @param {String} id.path.required - The user's ID.
	 * @param {User.model} model.body.required - The updated user.
	 * @returns {UserResponse.model} 200 - The updated model.
	 * @returns {Error} 500 - Internal server error.
	 */
	updateUser: async function (req, res) {
		try {
			const user = await User.findByPk(req.params.id);
			if (!user) throw new Error("User not found.");

			// Validate the updated data.
			var validationError = isValidModel(User, req.body);
			if (validationError.length > 0) {
				return res.status(422).json(validationError);
			}

			// Update the user with the new data.
			task.set(req.body);
			await task.save();
			res.status(200).json({ data: user });
		} catch (error) {
			res.status(500).json({
				message: error.message,
				error,
			});
		}
	},

	/**
	 * Update a user within the database. Partial updates are allowed.
	 *
	 * @param {String} id.path.required - The user's ID.
	 * @param {User.model} model.body.required - The updated user details.
	 * @returns {UserResponse.model} 200 - The updated user response object.
	 * @returns {Error} 500 - Internal server error.
	 */
	patchUser: async function (req, res) {
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
	 * Change an authenticated user's password.
	 * Authentication handled by {@link comparePass} middleware.
	 * Authorisation handled by {@link tokenCheck} middleware.
	 * Validation handled by {@link changePass} middleware.
	 *
	 * @param {Object} req - The request object.
	 * @param {Object} res - The response object.
	 * @returns {Void} 200 - Success.
	 * @returns {Error} 500 - Internal server error.
	 */
	changePassword: async function (req, res) {
		try {
			const user = await User.findByPk(req.user.id);
			if (!user) throw new Error("Pipeline error.");
			var token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
			user.set(req.body);
			await user.save();
			res.status(200).json({ message: "success", token });
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
	deleteUser: async function (req, res) {
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
	deleteAllUsers: async function (_, res) {
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
