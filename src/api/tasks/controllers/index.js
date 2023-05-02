const commandsController = require("./controller.commands");
const queriesController = require("./controller.queries");

module.exports = {
	build(context) {
		return {
			/**
			 * CQRS Commands repository, for the users within the database.
			 */
			commands: commandsController(context),

			/**
			 * CQRS Queries repository, for the users within the database.
			 */
			queries: queriesController(context),
		};
	},
};
