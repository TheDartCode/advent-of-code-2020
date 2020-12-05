import dayX from "./index";

const TEST_DATA = '';

describe("dayX", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(dayX('a', TEST_DATA)).toBe(2);
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(dayX('b', TEST_DATA)).toBe(1);
    });
  });
});
