import { AreaMap, Slope } from "./types";

export const calculatePath = (map: AreaMap, slope: Slope): AreaMap => {
  let x: number = 0;
  let y: number = 0;
  while (true) {
    x += slope.right;
    y += slope.down;

    if (y >= map.height) {
      break;
    }

    if (x >= map.width) {
      map.extendMap();
    }
    map.visitSquare(x, y);
  }

  return map;
};