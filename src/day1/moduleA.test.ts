import moduleA from "./moduleA";

const TEST_DATA = `1721
979
366
299
675
1456`;

describe("day1", () => {
  describe("moduleA", () => {
    it("satisfies test data", () => {
      expect(moduleA(TEST_DATA)).toBe(514579);
    });
  });
});
