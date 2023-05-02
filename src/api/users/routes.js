const { Router } = require("express");

module.exports = function (context) {
	const { commands, queries } = require("./controllers").build(context);
	const middleware = require("../../db/middleware").build(context);
	const router = Router();

	// ===================================================================================
	//  COMMANDS
	// ===================================================================================

	router
		.post(
			"/register",
			middleware.validateUsername,
			middleware.validateEmail,
			middleware.validatePass,
			middleware.hashPass,
			commands.registerUser,
		)
		.post(
			"/login",
			middleware.tokenCheck,
			middleware.comparePass,
			commands.loginUser,
		)
		.put("/:id", commands.updateUser)
		.patch(
			"/change-password",
			middleware.comparePass,
			middleware.tokenCheck,
			middleware.changePass,
			commands.changePassword,
		)
		.patch("/:id", commands.patchUser)
		.delete("/", commands.deleteAllUsers)
		.delete("/:id", commands.deleteUser);

	// ===================================================================================
	//  QUERIES
	// ===================================================================================

	router
		.get("/", queries.getAllUsers)
		.get("/authcheck", middleware.tokenCheck, queries.authCheck)
		.get("/:id", queries.getUserById);

	return router;
};
