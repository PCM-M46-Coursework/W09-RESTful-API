const express = require("express");
const cors = require("cors");

const userRouter = require("./api/users/routes");
const taskRouter = require("./api/tasks/routes");

module.exports = {
	build(context) {
		return express()
			.use(cors())
			.use(express.json())
			.use("/tasks", taskRouter(context))
			.use("/users", userRouter(context));
	},
};
