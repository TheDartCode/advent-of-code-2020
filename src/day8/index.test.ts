import day8 from "./index";

const TEST_DATA = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

describe("day8", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day8('a', TEST_DATA)).toBe("5");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day8('b', TEST_DATA)).toBe("8");
    });
  });
});
