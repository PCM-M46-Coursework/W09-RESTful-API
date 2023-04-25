const { Router } = require("express");
const { commands, queries } = require("./controllers");
const { hashPass, comparePass } = require("../../db/middleware");
const router = Router();

// ===================================================================================
//  COMMANDS
// ===================================================================================

router
	.post("/register", hashPass, commands.registerUser)
	.post("/login", comparePass, commands.loginUser)
	.put("/:id", commands.updateUser)
	.patch("/:id", commands.patchUser)
	.delete("/", commands.deleteAllUsers)
	.delete("/:id", commands.deleteSingle);

// ===================================================================================
//  QUERIES
// ===================================================================================

router
    .get("/", queries.getAllUsers)
    .get("/:id", queries.getUserById);

module.exports = router;
