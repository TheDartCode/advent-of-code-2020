import day22 from "./index";
import { parseInput } from "./helpers";

const TEST_DATA = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

describe("day22", () => {
  describe("helpers", () => {
    describe("parseInput", () => {
      it("parses input correctly", () => {
        expect(parseInput(TEST_DATA)).toEqual({
          player1: { deck: [9, 2, 6, 3, 1] },
          player2: { deck: [5, 8, 4, 7, 10] },
        });
      });
    });
  });
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day22("a", TEST_DATA)).toBe("306");
    });
  });
  describe("second part", () => {
    it.skip("satisfies test data", () => {
      expect(day22("b", TEST_DATA)).toBe("1");
    });
  });
});
