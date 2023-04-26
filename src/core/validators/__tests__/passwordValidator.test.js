const { isValidPassword } = require("../passwordValidator");

describe("isValidPassword", () => {
	it("should return true for a valid password.", () => {
		const validPassword = "Pa$$w0rd123";
		expect(isValidPassword(validPassword)).toBe(true);
	});

	it("should return false for a password that is too short.", () => {
		const shortPassword = "Pa$$w0rd";
		expect(isValidPassword(shortPassword)).toBe(false);
	});

	it("should return false for a password that does not contain a lowercase letter.", () => {
		const noLowercasePassword = "PA$$W0RD123";
		expect(isValidPassword(noLowercasePassword)).toBe(false);
	});

	it("should return false for a password that does not contain an uppercase letter.", () => {
		const noUppercasePassword = "pa$$w0rd123";
		expect(isValidPassword(noUppercasePassword)).toBe(false);
	});

	it("should return false for a password that does not contain a digit.", () => {
		const noDigitPassword = "Pa$$wordABC";
		expect(isValidPassword(noDigitPassword)).toBe(false);
	});

	it("should return false for a password that does not contain a special character.", () => {
		const noSpecialCharPassword = "Passw0rd123";
		expect(isValidPassword(noSpecialCharPassword)).toBe(false);
	});

	it("should return false for a password that contains an invalid character.", () => {
		const invalidCharPassword = "Pá$$w0rd123";
		expect(isValidPassword(invalidCharPassword)).toBe(false);
	});
});
