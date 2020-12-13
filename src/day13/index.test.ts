import day13 from "./index";

const TEST_DATA = `939
7,13,x,x,59,x,31,19`;

describe("day13", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day13("a", TEST_DATA)).toBe("295");
    });
  });
  describe("second part", () => {
    it("satisfies test data", () => {
      expect(day13("b", TEST_DATA)).toBe("1068781");
      expect(day13("b", "\n17,x,13,19")).toBe("3417");
      expect(day13("b", "\n67,7,59,61")).toBe("754018");
      expect(day13("b", "\n67,x,7,59,61")).toBe("779210");
      expect(day13("b", "\n67,7,x,59,61")).toBe("1261476");
      expect(day13("b", "\n1789,37,47,1889")).toBe("1202161486");
    });
  });
});
