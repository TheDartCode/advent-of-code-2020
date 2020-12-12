import { parseInstruction } from "./helpers";
import { Action, Instruction, ShipInfo, Position } from "./types";

export const getNextShipState = (
  initialState: ShipInfo,
  waypointInfo: Position,
  instruction: Instruction
): ShipInfo => {
  const { action, amount } = instruction;

  if (action !== Action.Forward) {
    return initialState;
  }

  return {
    bearingIndex: initialState.bearingIndex,
    x: initialState.x + waypointInfo.x * amount,
    y: initialState.y + waypointInfo.y * amount,
  };
};

export const rotate = (
  direction: Action,
  degrees: number,
  initialPosition: Position
): Position => {
  let result = { ...initialPosition };
  for (let i = 0; i < degrees / 90; i++) {
    let newX: number, newY: number;
    if (direction === Action.Right) {
      newX = Math.abs(result.y) * (result.y > 0 ? -1 : 1);
      newY = Math.abs(result.x) * (result.x <= 0 ? -1 : 1);
    } else if (direction === Action.Left) {
      newX = Math.abs(result.y) * (result.y < 0 ? -1 : 1);
      newY = Math.abs(result.x) * (result.x > 0 ? -1 : 1);
    }
    result = { x: newX, y: newY };
  }
  return result;
};

export const getNextWaypointState = (
  initialState: Position,
  instruction: Instruction
): Position => {
  const { action, amount } = instruction;
  if (action === Action.Forward) {
    return initialState;
  }
  const result = { ...initialState };
  switch (action) {
    case Action.North:
      result.y += amount;
      break;
    case Action.West:
      result.x += amount;
      break;
    case Action.South:
      result.y -= amount;
      break;
    case Action.East:
      result.x -= amount;
      break;
    case Action.Right:
    case Action.Left:
      return rotate(action, amount, initialState);
    default:
      throw new Error(
        `Unknown action \`${action}\`, ${JSON.stringify(instruction)}`
      );
  }

  return result;
};

const moduleB = (list: string): number => {
  const instructions: Instruction[] = list
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l: string) => parseInstruction(l));

  let currentShipState: ShipInfo = {
    x: 0,
    y: 0,
    bearingIndex: 1,
  };

  let currentWaypointState: Position = {
    x: -10,
    y: 1,
  };

  instructions.forEach((instruction) => {
    currentWaypointState = getNextWaypointState(
      currentWaypointState,
      instruction
    );
    currentShipState = getNextShipState(
      currentShipState,
      currentWaypointState,
      instruction
    );
  });

  return Math.abs(currentShipState.x) + Math.abs(currentShipState.y);
};

export default moduleB;
