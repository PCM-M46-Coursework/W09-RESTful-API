const { Router } = require("express");
const { commands, queries } = require("./controllers");
const { hashPassword, compareHash } = require("../../db/middleware");
const router = Router();

// ===================================================================================
//  COMMANDS
// ===================================================================================

router
	.post("/", hashPassword, commands.registerUser)
	.post("/login", compareHash, commands.loginUser)
	.put("/:id", commands.updateUser)
	.patch("/:id", commands.patchUser)
	.delete("/", commands.deleteAllUsers)
	.delete("/:id", commands.deleteSingle);

// ===================================================================================
//  QUERIES
// ===================================================================================

router
	.get("/", queries.getAllUsers)
	.get("/:id", queries.getUserById)
	.get("/:username", queries.getUserByUsername);

module.exports = router;
