import { AreaMap } from "./types";
import { calculatePath } from "./helpers";

const moduleB = (mapString: string): number => {
  const slopes = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
  ];
  return slopes
    .map((slope) => {
      const map = new AreaMap(mapString);

      calculatePath(map, slope);
      return map.getTreeCollisionCount();
    })
    .reduce((total, item) => total * item, 1);
};

export default moduleB;
