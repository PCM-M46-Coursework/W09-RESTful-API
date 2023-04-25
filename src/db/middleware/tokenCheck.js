const jwt = require("jsonwebtoken");
const User = require("../../api/users/model");
const debug = require("../../diagnostics/debug");

module.exports = async (req, res, next) => {
	try {
		debug.traceRoute(req, "Entering tokenCheck Middleware");

		// Retrieve the token from the Authorization header.
		const token = req.headers?.authorization?.split(" ")[1];

		if (token == null) {
			// Send request onwards if used is not authenticated.
			if (req.body.username != null && req.body.password != null) {
				next();
				return;
			}

			// Throw error if token not present.
			throw new Error();
		}

		// Decode the token using the secret key
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

		// If the token is invalid, return a 401 Unauthorised error.
		if (decodedToken == null) throw new Error();

		// Retrieve the user associated with the token from the database.
		if (req.user?.id != decodedToken.id) {
			req.user = await User.findOne({ where: { id: decodedToken.id } });
		}

		// If the user is not found, return a 401 Unauthorised error.
		if (!req.user) throw new Error();

		// Call the next middleware function in the chain.
		req.user.token = token;
		debug.traceRoute(req, "Leaving tokenCheck Middleware");
		next();
	} catch (error) {
		// For debugging purposes, I'm adding the error in the response.
		res.status(401).json({ message: "Unauthorised", error });
	}
};
