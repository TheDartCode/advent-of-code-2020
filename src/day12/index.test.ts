import day12 from "./index";
import { getNextShipState, getNextWaypointState, rotate } from "./moduleB";
import { Action } from "./types";

const TEST_DATA = `F10
N3
F7
R90
F11`;

describe("day12", () => {
  describe("first part", () => {
    it("satisfies test data", () => {
      expect(day12("a", TEST_DATA)).toBe("25");
    });
  });
  describe("second part", () => {
    describe("#getNextShipState", () => {
      it("moves forward", () => {
        expect(
          getNextShipState(
            { x: 0, y: 0, bearingIndex: 1 },
            { x: -10, y: 1 },
            { action: Action.Forward, amount: 10 }
          )
        ).toEqual({
          bearingIndex: 1,
          x: -100,
          y: 10,
        });
        expect(
          getNextShipState(
            { x: -170, y: 38, bearingIndex: 1 },
            { x: -4, y: -10 },
            { action: Action.Forward, amount: 11 }
          )
        ).toEqual({
          bearingIndex: 1,
          x: -214,
          y: -72,
        });
      });
    });
    describe("rotate", () => {
      it("rotates based on current position, direction, and degrees", () => {
        expect(rotate(Action.Right, 90, { x: -10, y: 4 })).toEqual({
          x: -4,
          y: -10,
        });
        expect(rotate(Action.Right, 90, { x: 0, y: 4 })).toEqual({
          x: -4,
          y: -0,
        });
        expect(rotate(Action.Left, 90, { x: 10, y: 4 })).toEqual({
          x: 4,
          y: -10,
        });
        expect(rotate(Action.Left, 90, { x: 0, y: 4 })).toEqual({
          x: 4,
          y: 0,
        });
        expect(rotate(Action.Left, 180, { x: 0, y: 4 })).toEqual({
          x: 0,
          y: -4,
        });
        expect(rotate(Action.Right, 360, { x: 0, y: 4 })).toEqual({
          x: 0,
          y: 4,
        });
      });
    });
    it("satisfies test data", () => {
      expect(day12("b", TEST_DATA)).toBe("286");
    });
  });
});
