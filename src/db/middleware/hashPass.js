const bcrypt = require("bcrypt");
module.exports = async (req, res, next) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 12);
		next();
	} catch (error) {
		res.status(501).json({
			message: error.message,
			error,
		});
	}
};
