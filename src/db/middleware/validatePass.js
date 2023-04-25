const isValid = require("../../api/users/validators/passwordValidator");

module.exports = async (req, res, next) => {
	const password = req.body.password;
	if (!email) {
		return res
			.status(422)
			.json({ message: "Password is a required field." });
	}
	if (!isValid(password)) {
		return res.status(422).json({
			message: "Password does not meet strength requirements.",
		});
	}
	next();
};
