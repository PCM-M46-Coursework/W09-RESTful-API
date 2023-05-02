const appBuilder = require("../app");
const request = require("supertest");
const mockContextBuilder = require("../db/__mocks__/mockContext");
const context = mockContextBuilder.build();
const app = appBuilder.build(context);

describe("POST /users", () => {
	describe("Given a user with valid credentials", () => {
		it("should respond with a status code of 201", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.statusCode).toBe(201);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a 'message' of 'success' in the body", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.body.message).toEqual("success");
		});

		it("should respond with a the 'username' and 'email' within a 'user' object in the body", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.body.user).toEqual({
				username: "testuser",
				email: "testuser@example.com",
			});
		});
	});

	describe("Given a user with a missing username", () => {
		it("should respond with a status code of 422", async () => {
			const response = await request(app).post("/users/register").send({
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.statusCode).toBe(422);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a message, stating that the username is required.", async () => {
			const response = await request(app).post("/users/register").send({
				email: "testuser@example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.body.message).toEqual(
				"Username is a required field.",
			);
		});
	});

	describe("Given a user with a missing email address", () => {
		it("should respond with a status code of 422", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				password: "Pa$$w0rd123",
			});

			expect(response.statusCode).toBe(422);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				password: "Pa$$w0rd123",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a message, stating that the email is required.", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				password: "Pa$$w0rd123",
			});

			expect(response.body.message).toEqual("Email address is required.");
		});
	});

	describe("Given a user with an invalid email", () => {
		it("should respond with a status code of 422", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser(at)example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.statusCode).toBe(422);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser(at)example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a message, stating that the email is invalid.", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser(at)example.com",
				password: "Pa$$w0rd123",
			});

			expect(response.body.message).toEqual("Invalid email address.");
		});
	});

	describe("Given a user with a missing password", () => {
		it("should respond with a status code of 422", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
			});

			expect(response.statusCode).toBe(422);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a message, stating that the email is required.", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
			});

			expect(response.body.message).toEqual(
				"Password is a required field.",
			);
		});
	});

	describe("Given a user with a weak password", () => {
		it("should respond with a status code of 422", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd",
			});

			expect(response.statusCode).toBe(422);
		});

		it("should respond with a JSON content type", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd",
			});

			expect(response.header["content-type"]).toEqual(
				expect.stringContaining("json"),
			);
		});

		it("should respond with a message, stating that the email is weak.", async () => {
			const response = await request(app).post("/users/register").send({
				username: "testuser",
				email: "testuser@example.com",
				password: "Pa$$w0rd",
			});

			expect(response.body.message).toEqual(
				"Password does not meet strength requirements.",
			);
		});
	});
});
