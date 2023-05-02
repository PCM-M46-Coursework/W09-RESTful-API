const { DataTypes } = require("sequelize");

/**
 * Defines schema for a record, within the Tasks table, in the database.
 */
module.exports = {
	title: {
		type: DataTypes.STRING,
		allowNull: {
			args: false,
			msg: "Title is a required field.",
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: {
			args: false,
			msg: "Description is a required field.",
		},
	},
	priority: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		allowNull: {
			args: false,
			msg: "Priority is a required field.",
		},
	},
	completed: {
		type: DataTypes.BOOLEAN,
		allowNull: {
			args: false,
			msg: "Completed is a required field.",
		},
	},
};
