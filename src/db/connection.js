const { Sequelize } = require("sequelize");

module.exports = {
	/**
	 * The database object, used to define the schema of the database structure, and
	 * provides a way to interact with the database, through the entities mapped to it.
	 */
	sequelise: new Sequelize(process.env.MYSQL_CONNECTION_STRING),

	/**
	 * Creates a connection to the remotely hosted database, using the credentials set
	 * within the `.env` file. Reports back with a confirmation, or error message.
	 */
	connect: async function () {
		try {
			await this.sequelise.authenticate();
			console.log("DB Connection established.");
		} catch (error) {
			console.log(error);
		}
	},
};
