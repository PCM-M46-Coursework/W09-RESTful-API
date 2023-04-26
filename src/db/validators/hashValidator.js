module.exports = {
	isValidHash(hash) {
		const hashRegex = /^\$(2b)\$(12)\$[./0-9A-Za-z]{53}$/;
		return hashRegex.test(hash);
	},
};
