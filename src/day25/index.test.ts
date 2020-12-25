import { encrypt, findLoopSize, parseInput } from "./helpers";
import day25 from "./index";

const TEST_DATA = `5764801
17807724`;

describe("day25", () => {
  describe("helpers", () => {
    describe("parseInput", () => {
      it("parses the two public keys", () => {
        expect(parseInput(TEST_DATA)).toEqual([5764801, 17807724]);
      });
    });
    describe("findLoopSize", () => {
      it("exhaustively searches for the loop size, given a public key", () => {
        const [key1, key2] = parseInput(TEST_DATA);
        expect(findLoopSize(key1)).toEqual(8);
        expect(findLoopSize(key2)).toEqual(11);
      });
    });
    describe("encrypt", () => {
      it("encrypts a given value with a specific loop size", () => {
        const keys = parseInput(TEST_DATA);
        const loopSizes = keys.map(findLoopSize);
        expect(encrypt(keys[0], loopSizes[1])).toEqual(14897079);
        expect(encrypt(keys[1], loopSizes[0])).toEqual(14897079);
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day25("a", TEST_DATA)).toBe("14897079");
    });
  });
});
