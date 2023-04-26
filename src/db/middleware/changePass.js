const { isValidPassword } = require("../../core/validators/passwordValidator");
const { hash } = require("../../core/cryptography/passwordHasher");
const debug = require("../../core/diagnostics/debug");

/** THEORYCRAFT:

    Previous: tokenCheck (Middleware)
    Next: changePasswordForUser (Controller Endpoint)
    Chain: comparePass -> tokenCheck -> changePass -> changePasswordForUser()

    By the time we get here, the user has already been authenticated, an authorised.
    The request body should be:

    {
        "username": "<USERNAME>",
        "password": "<CURRENT_HASH>",
        "newPassword": "<NEW_CLEARTEXT>"
    }

    The purpose of this middleware should be to:
    
    1. Validate the new password.
    2. Hash the new password.
    3. Ensure new hash is different to the current hash.
    4. Overwrite the body to contain just the new password hash as "password".
    5. Pass the new request body onto the PATCH controller.

    {
        "password": "<NEW_HASH>"
    }

    The PATCH controller will then perform a partial update on the user within the database, and re-issue a token.
    Within the scope of this project, we have no way to invalidate redundant tokens.
 */

module.exports = async function (req, res, next) {
	debug.traceRoute(req, "Entering changePass Middleware");
	const { password, newPassword } = req.body;

	// Return early if both passwords are not within the request body.
	if (!password || !newPassword) {
		return res.status(422).json({
			message: "Username, password, and new password are all required.",
		});
	}

	try {
		// 1. Validate the new password.
		if (!isValidPassword(newPassword))
			return res.status(422).json({
				message:
					"The new password does not meet the minimum password strength rules.",
			});

		// 2. Hash the new password.
		const newHash = await hash(req.body.newPassword);

		// 3. Ensure new hash is different to the current hash.
		if (newHash == req.body.password)
			return res.status(422).json({
				message:
					"The new password must be different than the old password.",
			});

		// 4. Overwrite the body to contain just the new password hash as "password".
		req.body = { password: newHash };

		// 5. Pass the new request body onto the PATCH controller.
		debug.traceRoute(req, "Leaving changePass Middleware");
		next();
	} catch (error) {
		res.status(500).json({
			message: error.message,
			error,
		});
	}
};
