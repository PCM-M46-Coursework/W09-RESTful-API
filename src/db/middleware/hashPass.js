const { hash } = require("../../cryptography/passwordHasher");
const debug = require("../../diagnostics/debug");

module.exports = async function (req, res, next) {
	try {
		debug.traceRoute(req, "Entering hashPass Middleware");
		req.body.password = await hash(req.body.password);
		debug.traceRoute(req, "Leaving hashPass Middleware");
		next();
	} catch (error) {
		res.status(501).json({
			message: error.message,
			error,
		});
	}
};
