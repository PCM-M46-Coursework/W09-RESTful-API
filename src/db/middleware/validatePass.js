const { isValidPassword } = require("../validators/passwordValidator");

module.exports = async (req, res, next) => {
	const password = req.body.password;
	if (!password) {
		return res
			.status(422)
			.json({ message: "Password is a required field." });
	}
	if (!isValidPassword(password)) {
		return res.status(422).json({
			message: "Password does not meet strength requirements.",
		});
	}
	next();
};
