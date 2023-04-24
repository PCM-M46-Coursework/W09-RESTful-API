module.exports = {
	/**
	 * CQRS Commands repository, for the users within the database.
	 */
	commands: require("./controller.commands"),

	/**
	 * CQRS Queries repository, for the users within the database.
	 */
	queries: require("./controller.queries"),
};
