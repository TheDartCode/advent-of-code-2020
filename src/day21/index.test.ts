import day21 from "./index";

const TEST_DATA = `mxmxvkd kfcds sqjhc nhms (contains dairy, fish)
trh fvjkl sbzzf mxmxvkd (contains dairy)
sqjhc fvjkl (contains soy)
sqjhc mxmxvkd sbzzf (contains fish)`;

describe("day21", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day21("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day21("b", TEST_DATA)).toBe("1");
    });
  });
});
