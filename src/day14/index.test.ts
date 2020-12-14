import day14 from "./index";

const TEST_DATA = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`;

describe("day14", () => {
  describe("first part", () => {
    it.skip("satisfies test data", () => {
      expect(day14("a", TEST_DATA)).toBe("2");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day14("b", TEST_DATA)).toBe("1");
    });
  });
});
