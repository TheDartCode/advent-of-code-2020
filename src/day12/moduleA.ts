import { parseInstruction } from "./helpers";
import { Action, Instruction, ShipInfo, BEARINGS } from "./types";

const getNextShipState = (
  initialState: ShipInfo,
  instruction: Instruction
): ShipInfo => {
  const result = {
    x: initialState.x,
    y: initialState.y,
    bearingIndex: initialState.bearingIndex,
  };

  let action = instruction.action;
  const { amount } = instruction;
  if (action === Action.Forward) {
    action = BEARINGS[initialState.bearingIndex];
  }
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
      result.bearingIndex =
        (result.bearingIndex + amount / 90) % BEARINGS.length;
      break;
    case Action.Left:
      result.bearingIndex =
        (BEARINGS.length + result.bearingIndex - amount / 90) % BEARINGS.length;
      break;
    default:
      throw new Error(
        `Unknown action \`${action}\`, ${JSON.stringify(instruction)}`
      );
  }

  return result;
};

const moduleA = (list: string): number => {
  const instructions: Instruction[] = list
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l: string) => parseInstruction(l));

  let currentState: ShipInfo = {
    x: 0,
    y: 0,
    bearingIndex: 1,
  };

  instructions.forEach((instruction) => {
    currentState = getNextShipState(currentState, instruction);
  });

  return Math.abs(currentState.x) + Math.abs(currentState.y);
};

export default moduleA;
