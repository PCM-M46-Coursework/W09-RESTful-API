const jwt = require("jsonwebtoken");
const User = require("../../api/users/model");

module.exports = async (req, res, next) => {
	try {
		// Retrieve the token from the Authorization header.
		const token = req.headers?.authorization?.split(" ")[1];

		// Return early if token not present.
		if (token == null) throw new Error("Unauthorised 1");

		// Decode the token using the secret key
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// If the token is invalid, return a 401 Unauthorised error.
		if (decodedToken == null) throw new Error("Unauthorised 2");

		// Retrieve the user associated with the token from the database.
		if (req.user?.id != decodedToken.id) {
			req.user = await User.findOne({ where: { id: decodedToken.id } });
		}

		// If the user is not found, return a 401 Unauthorised error.
		if (!req.user) throw new Error("Unauthorised 3");

		// Call the next middleware function in the chain.
		req.user.token = token;
		next();
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};
