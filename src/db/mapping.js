const User = require("../api/users/model");
const Task = require("../api/tasks/model");

module.exports = {
	/**
	 * Create table structure between DB and ORM.
	 */
	synchroniseTables: function () {
		User.sync(/* { alter: true } */);
		Task.sync(/* { alter: true } */);
	},

	/**
	 * Create relational mappings between tables.
	 */
	mapRelationships: function () {
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
	},
};
