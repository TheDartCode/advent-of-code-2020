import day13 from "./index";

const TEST_DATA = `939
7,13,x,x,59,x,31,19`;

describe("day13", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day13("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day13("b", TEST_DATA)).toBe("1");
    });
  });
});
