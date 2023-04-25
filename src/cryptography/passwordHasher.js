const bcrypt = require("bcrypt");

module.exports = {
	hash: async function (clearText) {
		return bcrypt.hash(clearText, parseInt(process.env.BCRYPT_SALT_ROUNDS));
	},
};
