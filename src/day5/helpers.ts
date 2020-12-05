class TreeNode {
  parent?: TreeNode;
  left: TreeNode | Leaf;
  right: TreeNode | Leaf;
}

interface Leaf {
  label: number;
}

export type TreeBisection = "L" | "R";

export class Tree {
  root: TreeNode;
  leaves: Leaf[];
  private nextLabel = 0;

  constructor(leavesCount) {
    const depth = Math.log2(leavesCount);
    this.leaves = [];
    this.root = this.buildSubtree(0, depth - 1);
  }

  navigate(path: TreeBisection[]): Leaf {
    let currentNode: TreeNode | Leaf = this.root;
    path.forEach(value => {
      if (!("left" in currentNode)) {
        return currentNode;
      }
      currentNode = value === "L" ? currentNode.left : currentNode.right;
    });
    if (!("label" in currentNode)) {
      throw new Error("Invalid path given, it does not end in a leaf");
    }
    return currentNode;
  }

  private buildSubtree(depth: number = 0, maxDepth): TreeNode {
    const root = new TreeNode();
    if (depth === maxDepth) {
      root.left = {label: this.nextLabel++};
      root.right = {label: this.nextLabel++};
      this.leaves.push(root.left, root.right);
    } else {
      root.left = this.buildSubtree(depth + 1, maxDepth);
      root.right = this.buildSubtree(depth + 1, maxDepth);
    }
    return root;
  }
}

export class SeatFinder {
  static readonly ROWS = 128;
  static readonly COLUMNS = 8;
  rows: Tree;
  columns: Tree;

  constructor() {
    this.rows = new Tree(SeatFinder.ROWS);
    this.columns = new Tree(SeatFinder.COLUMNS);
  }

  findSeat(path: string): { row: number, column: number } {
    const [, rowSelector, columnSelector] = path.match(/^([FB]{7})([LR]{3})$/);
    return {
      row: this.rows.navigate(rowSelector
        .split("")
        .map(c => (c === "F" ? "L" : "R")) as TreeBisection[]).label,
      column: this.columns.navigate(columnSelector.split("") as TreeBisection[])
        .label
    };
  }

  getSeatID(seat: { row: number, column: number }): number {
    return seat.row * 8 + seat.column;
  }

  getAllPossibleSeats() {

  }
}
