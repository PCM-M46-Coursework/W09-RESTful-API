module.exports.validateModel = function (model, body) {
	const attributes = model.rawAttributes;
	const errors = [];
	for (const [key, value] of Object.entries(attributes)) {
		if (["id", "createdAt", "updatedAt"].includes(key)) continue;
		const validate = value.validate || {};
		if (!validate.allowNull && body[key] === undefined) {
			errors.push({
				key,
				message: validate.msg || `${key} is a required field.`,
			});
		}
	}
	return errors;
};
