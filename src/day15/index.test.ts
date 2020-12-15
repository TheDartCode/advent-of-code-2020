import day15 from "./index";

const TEST_DATA = `0,3,6`;

describe("day15", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day15("a", TEST_DATA)).toBe("436");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day15("b", TEST_DATA)).toBe("1");
    });
  });
});
