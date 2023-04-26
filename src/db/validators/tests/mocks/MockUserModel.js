const { isValidHash } = require("../../../../db/validators/hashValidator");
const { isValidEmail } = require("../../../../db/validators/emailValidator");

const User = {
	rawAttributes: {
		username: {
			allowNull: {
				args: false,
				msg: "Username is a required field.",
			},
			unique: {
				args: true,
				msg: "Username already exists.",
			},
			validate: {
				notEmpty: true,
				len: [4, 30],
			},
		},
		email: {
			allowNull: {
				args: false,
				msg: "Email is a required field.",
			},
			unique: {
				args: true,
				msg: "Email already exists.",
			},
			validate: {
				notEmpty: true,
				isValid(value) {
					if (!isValidEmail(value)) {
						throw new Error("Invalid email address.");
					}
				},
			},
		},
		password: {
			allowNull: {
				args: false,
				msg: "Password is a required field.",
			},
			validate: {
				notEmpty: true,
				isValid(value) {
					if (!isValidHash(value)) {
						throw new Error("Plaintext password are not allowed.");
					}
				},
			},
		},
	},
};

module.exports = User;
