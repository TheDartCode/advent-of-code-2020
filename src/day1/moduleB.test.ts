import moduleB from "./moduleB";

const TEST_DATA = `1721
979
366
299
675
1456`;

describe("day1", () => {
  describe("moduleB", () => {
    it("satisfies test data", () => {
      expect(moduleB(TEST_DATA)).toBe(241861950);
    });
  });
});
