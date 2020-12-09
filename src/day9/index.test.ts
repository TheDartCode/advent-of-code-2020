import day9 from "./index";

const TEST_DATA = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

describe("day9", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day9("a", TEST_DATA, { preamble: 5 })).toBe("127");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day9("b", TEST_DATA, { targetSum: 127 })).toBe("62");
    });
  });
});
