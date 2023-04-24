const { DataTypes } = require("sequelize");
const { context } = require("../../db/connection");

/**
 * Defines schema for a record, within the Users table, in the database.
 */
const User = context.define(
	"User",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		// IMPORTANT: the `User.validate()` method DOES NOT respect the
		// constraints set within this indexes array. To allow for model
		// validation, the constraints MUST be added above.
		indexes: [],
	},
);

module.exports = User;
