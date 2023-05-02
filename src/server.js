require("dotenv").config();
const expressServerPort = process.env.EXPRESS_SERVER_PORT || 5001;
const db = require("./db/connection");
const appBuilder = require("./app");
const ctxBuilder = require("./db/context");

db.connect().then(() => {
	const context = ctxBuilder.build();
	const app = appBuilder.build(context);
	app.listen(expressServerPort, () => {
		console.log(`Express Server is listening on port ${expressServerPort}`);
	});
});
