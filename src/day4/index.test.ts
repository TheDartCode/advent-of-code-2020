import day4 from "./";

const TEST_DATA = '';

describe("day4", () => {
  describe("moduleA", () => {
    it("satisfies test data", () => {
      expect(day4('a', TEST_DATA)).toBe(2);
    });
  });
  describe("moduleB", () => {
    it("satisfies test data", () => {
      expect(day4('b', TEST_DATA)).toBe(1);
    });
  });
});
