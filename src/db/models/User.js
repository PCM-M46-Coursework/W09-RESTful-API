const { DataTypes } = require("sequelize");
const { context } = require("../connection");
const { isValidHash } = require("../../core/validators/hashValidator");
const isValidEmail = require("../../core/validators/emailValidator");

/**
 * Defines schema for a record, within the Users table, in the database.
 */
const User = context.define("User", {
	username: {
		type: DataTypes.STRING,
		allowNull: {
			args: false,
			msg: "Username is a required field.",
		},
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
		allowNull: {
			args: false,
			msg: "Email is a required field.",
		},
		unique: {
			args: true,
			msg: "Email already exists.",
		},
		validate: {
			notEmpty: true,
			isValidEmail(value) {
				if (!isValidEmail(value)) {
					throw new Error("Invalid email address.");
				}
			},
		},
	},
	password: {
		type: DataTypes.STRING,
		allowNull: {
			args: false,
			msg: "Password is a required field.",
		},
		validate: {
			notEmpty: true,
			isBCryptHash(value) {
				if (!isValidHash(value)) {
					throw new Error("Plaintext password are not allowed.");
				}
			},
		},
	},
});

module.exports = User;
