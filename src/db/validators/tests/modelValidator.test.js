const User = require("./mocks/MockUserModel");
const { isValidModel } = require("../modelValidator");

describe("isValidModel", () => {
	it("should return no error when all required fields are present", () => {
		const body = {
			username: "testuser",
			email: "testuser@example.com",
			password: "password",
		};
		const errors = isValidModel(User, body);
		expect(errors).toEqual([]);
	});

	it("should return an error when required field is missing", () => {
		const body = {
			username: "testuser",
			password: "password",
		};
		const errors = isValidModel(User, body);
		expect(errors).toEqual([
			{
				key: "email",
				message: "email is a required field.",
			},
		]);
	});
});
