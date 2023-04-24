const User = require("../api/users/model");

module.exports = {
	/**
	 * Create table structure between DB and ORM.
	 */
	synchroniseTables: function () {
		User.sync({ alter: true });
	},

	/**
	 * Create relational mappings between tables.
	 */
	mapRelationships: function () {},
};
