const isValid = require("../validators/emailValidator");

module.exports = async (req, res, next) => {
	const email = req.body.email;
	if (!email) {
		return res.status(422).json({ message: "Email address is required." });
	}
	if (!isValid(email)) {
		return res.status(422).json({ message: "Invalid email address." });
	}
	next();
};
