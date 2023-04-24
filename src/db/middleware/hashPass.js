const bcrypt = require("bcrypt");

const hashPass = async (req, res, next) => {
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

module.exports = hashPass;
