const User = require("./models/User");
const Task = require("./models/Task");

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
