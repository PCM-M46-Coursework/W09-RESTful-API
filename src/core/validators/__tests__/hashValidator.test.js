const { isValidHash } = require("../hashValidator");
const saltRounds = 12;

describe("isValidHash", () => {
	it("should return true for a valid hash.", () => {
		const validHash = `$2b$${saltRounds}$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96`;
		expect(isValidHash(validHash)).toBe(true);
	});

	test.each([saltRounds - 1, saltRounds + 1])(
		"should return false for a hashes with different amounts of salt rounds.",
		saltRounds => {
			const invalidHash = `$2b$${saltRounds}$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96`;
			expect(isValidHash(invalidHash)).toBe(false);
		},
	);

	test.each(["2a", "3b", "4c"])(
		"should return false for a hashes with different algorithms.",
		algorithm => {
			const invalidHash = `$${algorithm}$12$V1Ml6K.lJYUETRNs79TRnejWeCjd5Ew3Cr/AluH.xwhaTsnvlck96`;
			expect(isValidHash(invalidHash)).toBe(false);
		},
	);
});
