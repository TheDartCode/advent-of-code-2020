import day18 from "./index";

const TEST_DATA = [
  `1 + 2 * 3 + 4 * 5 + 6`,
  `1 + (2 * 3) + (4 * (5 + 6))`,
  `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`,
];

describe("day18", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day18("a", TEST_DATA[0])).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day18("b", TEST_DATA[0])).toBe("1");
    });
  });
});
