module.exports = {
	traceRoute(req, message) {
		if (!req.header("X-Trace-Route")) return;
		console.log(message);
	},
};
