const { DataTypes } = require("sequelize");
const { context } = require("../../db/connection");

/**
 * Defines schema for a record, within the Tasks table, in the database.
 */
const Task = context.define("Task", {
	title: {
		type: DataTypes.STRING,
		allowNull: {
			args: false,
			msg: "Title is a required field.",
		},
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true,
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
		defaultValue: false,
		allowNull: {
			args: false,
			msg: "Completed is a required field.",
		},
	},
});

module.exports = Task;
