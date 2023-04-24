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
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{
		// This shows a different way to determine unique fields.
		// However, it can be better to define the properties of the
		// fields within the field definition, above.
		indexes: [
			{
				allowNull: false,
				fields: ["username", "email", "password"],
			},
			{
				unique: true,
				fields: ["username", "email"],
			},
		],
	},
);

module.exports = User;
