const { sequelise } = require("./connection");

const userAttributes = require("./models/User");
const taskAttributes = require("./models/Task");

/**
 * Create table structure between DB and ORM.
 */
function synchroniseTables({ User, Task }) {
	User.sync(/* { alter: true } */);
	Task.sync(/* { alter: true } */);
}

/**
 * Create relational mappings between tables.
 */
function mapRelationships({ User, Task }) {
	/**
	 * One -> Many Optional Relationship: User may have zero or more Tasks.
	 */
	User.hasMany(Task, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});

	/**
	 * One -> One Required Relationship: Task has a User.
	 */
	Task.belongsTo(User, {
		foreignKey: {
			name: "user_id",
			allowNull: false,
		},
	});
}

module.exports = {
	build: function () {
		const context = {
			User: sequelise.define("User", userAttributes),
			Task: sequelise.define("Task", taskAttributes),
		};
		mapRelationships(context);
		synchroniseTables(context);
		return context;
	},
};
