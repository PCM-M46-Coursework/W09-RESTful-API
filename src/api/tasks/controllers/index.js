module.exports = {
	/**
	 * CQRS Commands repository, for the tasks within the database.
	 */
	commands: require("./controller.commands"),

	/**
	 * CQRS Queries repository, for the tasks within the database.
	 */
	queries: require("./controller.queries"),
};
