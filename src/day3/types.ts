enum MapSquare {
  OPEN = ".",
  TREE = "#",
}

enum VisitedSquare {
  OPEN = "O",
  TREE = "X",
}

type Slope = {
  right: number;
  down: number;
};

type Square = MapSquare | VisitedSquare;

class AreaMap {
  initialMap: Square[][];
  map: Square[][];
  height: number;

  get width(): number {
    return this.map[0].length;
  }

  constructor(mapString: string) {
    this.map = this.parseMap(mapString);
    this.initialMap = this.parseMap(mapString);
    this.height = this.map.length;
  }

  visitSquare(x: number, y: number) {
    const previous = this.map[y][x];
    this.map[y][x] =
      previous === MapSquare.OPEN ? VisitedSquare.OPEN : VisitedSquare.TREE;
  }

  extendMap() {
    for (let i in this.map) {
      this.map[i] = [...this.map[i], ...this.initialMap[i]];
    }
  }

  getTreeCollisionCount() {
    return this.map.reduce(
      (total, line) =>
        total + line.filter((square) => square === VisitedSquare.TREE).length,
      0
    );
  }

  debug() {
    return this.map.map((l) => l.join("")).join("\n");
  }

  private parseMap(mapString: string) {
    return mapString
      .split("\n")
      .map((s) => s.split("").map((sq: Square) => sq as Square));
  }
}

export { AreaMap, Slope };
