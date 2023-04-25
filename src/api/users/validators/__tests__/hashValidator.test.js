const validateHash = require("../hashValidator");

describe("validateHash", () => {
	it("should return true for a valid hash.", () => {
		const validHash =
			"$2b$12$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96";
		expect(validateHash(validHash)).toBe(true);
	});

	test.each([10, 11, 13])(
		"should return false for a hashes with different amounts of salt rounds.",
		saltRounds => {
			const invalidHash = `$2b$${saltRounds}$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96`;
			expect(validateHash(invalidHash)).toBe(false);
		},
	);

	test.each(["2a", "3b", "4c"])(
		"should return false for a hashes with different algorithms.",
		algorithm => {
			const invalidHash = `$${algorithm}$12$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96`;
			expect(validateHash(invalidHash)).toBe(false);
		},
	);
});
