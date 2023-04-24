require("dotenv").config();
const express = require("express");
const cors = require("cors");
const expressServerPort = process.env.EXPRESS_SERVER_PORT || 5001;

const db = require("./db/connection");
db.connect().then(() => {
	// Synchronise Database with remote.
	const map = require("./db/mapping");
	map.mapRelationships();
	map.synchroniseTables();

	// Launch the RESTFul API.
	express()
		.use(cors())
		.use(express.json())
		.listen(expressServerPort, () => {
			console.log(`Express is listening on port ${expressServerPort}`);
		});
});
