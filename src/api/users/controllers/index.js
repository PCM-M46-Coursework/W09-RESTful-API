module.exports = {
	/**
	 * CQRS Commands repository, for the authors within the database.
	 */
	commands: require("./controller.commands"),

	/**
	 * CQRS Queries repository, for the authors within the database.
	 */
	queries: require("./controller.queries"),
};
