const SequelizeMock = require("sequelize-mock");
const sequelizeMock = new SequelizeMock();

const userAttributes = require("../models/User");
const taskAttributes = require("../models/Task");

module.exports = {
	build() {
		const User = sequelizeMock.define("User", userAttributes);
		const Task = sequelizeMock.define("Task", taskAttributes);

		User.hasMany(Task, {
			foreignKey: "user_id",
			allowNull: false,
		});

		Task.belongsTo(User, {
			foreignKey: "user_id",
			allowNull: false,
		});

		return { User, Task };
	},
};
