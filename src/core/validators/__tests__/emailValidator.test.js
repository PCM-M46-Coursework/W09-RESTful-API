const { isValidEmail } = require("../emailValidator");

describe("isValidEmail", () => {
	it("should return true, when passed a valid email", () => {
		const validEmail = "example@example.com";
		const result = isValidEmail(validEmail);
		expect(result).toBe(true);
	});

	it("should return false, when passed an invalid email", () => {
		const invalidEmail = "example(at)example.com";
		const result = isValidEmail(invalidEmail);
		expect(result).toBe(false);
	});

	it("should return false, when passed an email with invalid characters", () => {
		const invalidEmail = "example@ example.com";
		const result = isValidEmail(invalidEmail);
		expect(result).toBe(false);
	});

	it("should return false, when passed an email with a missing domain", () => {
		const invalidEmail = "example@";
		const result = isValidEmail(invalidEmail);
		expect(result).toBe(false);
	});

	it("should return false, when passed an email with a missing username", () => {
		const invalidEmail = "@example.com";
		const result = isValidEmail(invalidEmail);
		expect(result).toBe(false);
	});

	it("should return false, when passed a non-string input", () => {
		const nonStringInput = 123;
		const result = isValidEmail(nonStringInput);
		expect(result).toBe(false);
	});
});
