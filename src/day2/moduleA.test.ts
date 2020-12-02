import { parseLine } from "./helpers";
import moduleA, { passwordEntryIsValid } from "./moduleA";

const TEST_DATA = `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`;

describe("day2", () => {
  describe("#parseLine", () => {
    it("parses a password line successfully", () => {
      expect(parseLine("1-3 a: abcde")).toEqual({
        policy: {
          start: 1,
          end: 3,
          char: "a",
        },
        password: "abcde",
      });
    });
  });
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
            start: 3,
            end: 3,
            char: "a",
          },
          password: "abcadae",
        })
      ).toBe(true);
    });
  });
  describe("moduleA", () => {
    it("satisfies test data", () => {
      expect(moduleA(TEST_DATA)).toBe(2);
    });
  });
});
