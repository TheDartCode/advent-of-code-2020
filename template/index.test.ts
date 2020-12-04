import dayX from "./index";

const TEST_DATA = '';

describe("dayX", () => {
  describe("moduleA", () => {
    it("satisfies test data", () => {
      expect(dayX('a', TEST_DATA)).toBe(2);
    });
  });
  describe("moduleB", () => {
    it("satisfies test data", () => {
      expect(dayX('b', TEST_DATA)).toBe(1);
    });
  });
});
