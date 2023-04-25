const { Router } = require("express");
const { commands, queries } = require("./controllers");
const middleware = require("../../db/middleware");
const router = Router();

// ===================================================================================
//  COMMANDS
// ===================================================================================

router
	.post("/register",
		middleware.validateEmail,
		middleware.validatePass,
		middleware.hashPass,
		commands.registerUser,
	)
	.post("/login", middleware.tokenCheck, middleware.comparePass, commands.loginUser)
	.put("/:id", commands.updateUser)
	.patch("/:id", commands.patchUser)
	.delete("/", commands.deleteAllUsers)
	.delete("/:id", commands.deleteUser);

// ===================================================================================
//  QUERIES
// ===================================================================================

router
    .get("/", queries.getAllUsers)
    .get("/:id", queries.getUserById);

module.exports = router;
