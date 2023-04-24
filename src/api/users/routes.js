const { Router } = require("express");
const { commands, queries } = require("./controllers");
const router = Router();

// ===================================================================================
//  COMMANDS
// ===================================================================================

router
	.post("/", commands.registerUser)
	.put("/:id", commands.updateUser)
	.patch("/:id", commands.patchUser)
	.delete("/", commands.deleteAllUsers)
	.delete("/:id", commands.deleteSingle);

// ===================================================================================
//  QUERIES
// ===================================================================================

router
	.get("/", queries.getMany)
	.get("/:id", queries.getUserById)
	.get("/:username", queries.getUserByUsername);

module.exports = router;
