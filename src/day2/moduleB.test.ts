import moduleB, { passwordEntryIsValid } from "./moduleB";

const TEST_DATA = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

describe("day2:moduleB", () => {
  describe("passwordEntryIsValid", () => {
    it("checks password against policy", () => {
      expect(
        passwordEntryIsValid({
          policy: {
            start: 1,
            end: 3,
            char: "a",
          },
          password: "abcde",
        })
      ).toBe(true);

      expect(
        passwordEntryIsValid({
          policy: {
            start: 2,
            end: 3,
            char: "a",
          },
          password: "abcde",
        })
      ).toBe(false);
      expect(
        passwordEntryIsValid({
          policy: {
            start: 1,
            end: 3,
            char: "a",
          },
          password: "abadae",
        })
      ).toBe(false);
    });
  });
  describe("moduleB", () => {
    it("satisfies test data", () => {
      expect(moduleB(TEST_DATA)).toBe(1);
    });
  });
});
