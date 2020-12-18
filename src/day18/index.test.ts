import day18 from "./index";

const TEST_DATA = [
  `1 + 2 * 3 + 4 * 5 + 6`,
  `1 + (2 * 3) + (4 * (5 + 6))`,
  `5 + (8 * 3 + 9 + 3 * 4 * 3)`,
  `5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`,
  `((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`,
];

const TEST_DATA_B = [
  [`1 + (2 * 3) + (4 * (5 + 6))`, `51`],
  [`2 * 3 + (4 * 5)`, `46`],
  [`5 + (8 * 3 + 9 + 3 * 4 * 3)`, `1445`],
  [`5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))`, `669060`],
  [`((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2`, `23340`],
];

describe("day18", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day18("a", TEST_DATA[0])).toBe("71");
      expect(day18("a", TEST_DATA[1])).toBe("51");
      expect(day18("a", TEST_DATA[2])).toBe("437");
      expect(day18("a", TEST_DATA[3])).toBe("12240");
      expect(day18("a", TEST_DATA[4])).toBe("13632");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day18("b", TEST_DATA_B[0][0])).toBe(TEST_DATA_B[0][1]);
      expect(day18("b", TEST_DATA_B[1][0])).toBe(TEST_DATA_B[1][1]);
      expect(day18("b", TEST_DATA_B[2][0])).toBe(TEST_DATA_B[2][1]);
      expect(day18("b", TEST_DATA_B[3][0])).toBe(TEST_DATA_B[3][1]);
      expect(day18("b", TEST_DATA_B[4][0])).toBe(TEST_DATA_B[4][1]);
    });
  });
});
