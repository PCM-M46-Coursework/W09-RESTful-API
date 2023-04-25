const bcrypt = require("bcrypt");

module.exports = {
	hash: async function (clearText) {
		return bcrypt.hash(clearText, process.env.BCRYPT_SALT_ROUNDS);
	},
};
