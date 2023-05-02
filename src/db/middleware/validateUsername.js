module.exports = async function (req, res, next) {
	const username = req.body.username;
	if (!username) {
		return res
			.status(422)
			.json({ message: "Username is a required field." });
	}
	next();
};
