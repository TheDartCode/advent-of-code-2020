import { AreaMap } from "./types";
import { calculatePath } from "./helpers";

const moduleA = (mapString: string): number => {
  const map = new AreaMap(mapString);
  calculatePath(map, { right: 3, down: 1 });
  return map.getTreeCollisionCount();
};

export default moduleA;
