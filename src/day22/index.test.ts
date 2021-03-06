import day22 from "./index";
import { parseInput } from "./helpers";
import { fastExit, game, Player } from "./moduleB";

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
    describe("fastExit()", () => {
      it("returns true if curren deck has appeared before in same arrangement", () => {
        expect(
          fastExit(
            [17, 36, 26, 31, 2, 42, 10, 45, 22],
            [
              [45, 23, 20, 17, 31, 2, 42],
              [23, 20, 17, 31, 2, 42, 45, 10],
            ]
          )
        ).toEqual(false);

        expect(
          fastExit(
            [17, 36, 26, 31, 2, 42, 10, 45, 22],
            [
              [45, 23, 20, 17, 31, 2, 42],
              [23, 20, 17, 31, 2, 42, 45, 10],
              [20, 17, 31, 2, 42, 45, 10],
              [17, 31, 2, 42, 45, 10],
              [31, 2, 42, 45, 10],
              [2, 42, 45, 10, 31, 22],
              [42, 45, 10, 31, 22],
              [45, 10, 31, 22, 42, 36],
              [10, 31, 22, 42, 36, 45, 23],
              [31, 22, 42, 36, 45, 23],
              [22, 42, 36, 45, 23, 31, 20],
              [42, 36, 45, 23, 31, 20],
              [36, 45, 23, 31, 20, 42, 17],
              [45, 23, 31, 20, 42, 17],
              [23, 31, 20, 42, 17, 45, 2],
              [31, 20, 42, 17, 45, 2],
              [20, 42, 17, 45, 2, 31, 10],
              [42, 17, 45, 2, 31, 10],
              [17, 45, 2, 31, 10, 42, 22],
              [45, 2, 31, 10, 42, 22],
              [2, 31, 10, 42, 22, 45, 36],
              [31, 10, 42, 22, 45, 36],
              [10, 42, 22, 45, 36, 31, 23],
              [42, 22, 45, 36, 31, 23],
              [22, 45, 36, 31, 23, 42, 20],
              [45, 36, 31, 23, 42, 20],
              [36, 31, 23, 42, 20, 45, 17],
              [31, 23, 42, 20, 45, 17, 36, 26],
              [23, 42, 20, 45, 17, 36, 26, 31, 2],
              [42, 20, 45, 17, 36, 26, 31, 2],
              [20, 45, 17, 36, 26, 31, 2, 42, 10],
              [45, 17, 36, 26, 31, 2, 42, 10],
              [17, 36, 26, 31, 2, 42, 10, 45, 22],
              [36, 26, 31, 2, 42, 10, 45, 22],
              [26, 31, 2, 42, 10, 45, 22, 36, 23],
              [31, 2, 42, 10, 45, 22, 36, 23],
              [2, 42, 10, 45, 22, 36, 23, 31, 20],
              [42, 10, 45, 22, 36, 23, 31, 20],
              [10, 45, 22, 36, 23, 31, 20, 42, 17],
              [45, 22, 36, 23, 31, 20, 42, 17],
              [22, 36, 23, 31, 20, 42, 17, 45, 26],
              [36, 23, 31, 20, 42, 17, 45, 26],
              [23, 31, 20, 42, 17, 45, 26, 36, 2],
              [31, 20, 42, 17, 45, 26, 36, 2],
              [20, 42, 17, 45, 26, 36, 2, 31, 10],
              [42, 17, 45, 26, 36, 2, 31, 10],
              [17, 45, 26, 36, 2, 31, 10, 42, 22],
              [45, 26, 36, 2, 31, 10, 42, 22],
              [26, 36, 2, 31, 10, 42, 22, 45, 23],
              [36, 2, 31, 10, 42, 22, 45, 23],
              [2, 31, 10, 42, 22, 45, 23, 36, 20],
              [31, 10, 42, 22, 45, 23, 36, 20],
              [10, 42, 22, 45, 23, 36, 20, 31, 17],
              [42, 22, 45, 23, 36, 20, 31, 17],
              [22, 45, 23, 36, 20, 31, 17, 42, 26],
              [45, 23, 36, 20, 31, 17, 42, 26],
              [23, 36, 20, 31, 17, 42, 26, 45, 2],
              [36, 20, 31, 17, 42, 26, 45, 2],
              [20, 31, 17, 42, 26, 45, 2, 36, 10],
              [31, 17, 42, 26, 45, 2, 36, 10],
              [17, 42, 26, 45, 2, 36, 10, 31, 22],
              [42, 26, 45, 2, 36, 10, 31, 22],
              [26, 45, 2, 36, 10, 31, 22, 42, 23],
              [45, 2, 36, 10, 31, 22, 42, 23],
              [2, 36, 10, 31, 22, 42, 23, 45, 20],
              [36, 10, 31, 22, 42, 23, 45, 20],
              [10, 31, 22, 42, 23, 45, 20, 36, 17],
              [31, 22, 42, 23, 45, 20, 36, 17],
              [22, 42, 23, 45, 20, 36, 17, 31, 26],
              [42, 23, 45, 20, 36, 17, 31, 26],
              [23, 45, 20, 36, 17, 31, 26, 42, 2],
              [45, 20, 36, 17, 31, 26, 42, 2],
              [20, 36, 17, 31, 26, 42, 2, 45, 10],
              [36, 17, 31, 26, 42, 2, 45, 10],
              [17, 31, 26, 42, 2, 45, 10, 36, 22],
              [31, 26, 42, 2, 45, 10, 36, 22],
              [26, 42, 2, 45, 10, 36, 22, 31, 23],
              [42, 2, 45, 10, 36, 22, 31, 23],
              [2, 45, 10, 36, 22, 31, 23, 42, 20],
              [45, 10, 36, 22, 31, 23, 42, 20],
              [10, 36, 22, 31, 23, 42, 20, 45, 17],
              [36, 22, 31, 23, 42, 20, 45, 17],
              [22, 31, 23, 42, 20, 45, 17, 36, 26],
              [31, 23, 42, 20, 45, 17, 36, 26],
              [23, 42, 20, 45, 17, 36, 26, 31, 2],
              [42, 20, 45, 17, 36, 26, 31, 2],
              [20, 45, 17, 36, 26, 31, 2, 42, 10],
              [45, 17, 36, 26, 31, 2, 42, 10],
            ]
          )
        ).toEqual(true);
      });
    });
    describe("game()", () => {
      it("detects infinite loops and exits", () => {
        expect(game([43, 19], [2, 29, 14])).toEqual(Player.One);
      });
    });
    it("satisfies test data", () => {
      expect(day22("b", TEST_DATA)).toBe("291");
    });
  });
});
