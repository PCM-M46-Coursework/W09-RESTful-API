const { hash } = require("../../cryptography/passwordHasher");

module.exports = async (req, res, next) => {
	try {
		req.body.password = await hash(req.body.password);
		next();
	} catch (error) {
		res.status(501).json({
			message: error.message,
			error,
		});
	}
};
