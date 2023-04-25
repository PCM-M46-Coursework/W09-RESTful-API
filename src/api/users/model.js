const { DataTypes } = require("sequelize");
const { context } = require("../../db/connection");
const validatePassword = require("./validators/passwordValidator");
const validateEmail = require("./validators/emailValidator");

/**
 * Defines schema for a record, within the Users table, in the database.
 */
const User = context.define(
	"User",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "Username already exists.",
			},
			validate: {
				notEmpty: true,
				len: [4, 30],
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: "Email already exists.",
			},
			validate: {
				notEmpty: true,
				isValidEmail(value) {
					if (!validateEmail(value)) {
						throw new Error("Invalid email address.");
					}
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
				isStrongPassword(value) {
					if (!validatePassword(value)) {
						throw new Error(
							"Password does not meet strength requirements.",
						);
					}
				},
			},
		},
	},
	{
		// IMPORTANT: the `User.validate()` method DOES NOT respect the
		// constraints set within this indexes array. To allow for model
		// validation, the constraints MUST be added above, within the
		// field definitions.
		indexes: [],
	},
);

module.exports = User;
