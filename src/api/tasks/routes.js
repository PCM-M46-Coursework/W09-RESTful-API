const { Router } = require("express");

module.exports = function (context) {
	const { commands, queries } = require("./controllers").build(context);
	const middleware = require("../../db/middleware").build(context);
	const router = Router();

	// ===================================================================================
	//  COMMANDS
	// ===================================================================================

	router
		.post("/", middleware.tokenCheck, commands.createTask)
		.put("/:id", middleware.tokenCheck, commands.updateTask)
		.patch("/:id", middleware.tokenCheck, commands.patchTask)
		.delete("/", middleware.tokenCheck, commands.deleteAllTasks)
		.delete("/:id", middleware.tokenCheck, commands.deleteTask);

	// ===================================================================================
	//  QUERIES
	// ===================================================================================

	router
		.get("/", middleware.tokenCheck, queries.getAllTasks)
		.get("/:id", middleware.tokenCheck, queries.getTaskById);

	return router;
};
