const { Router } = require("express");
const { commands, queries } = require("./controllers");
const middleware = require("../../db/middleware");
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

module.exports = router;
