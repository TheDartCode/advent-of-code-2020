export interface Bag {
  color: string;
  contents: BagContent[];
}

interface BagContent {
  color: string;
  count: number;
}

export interface Graph {
  [color: string]: Bag;
}

export const constructBagsGraph = (rules: string[]): Graph => {
  const result: Graph = {};
  rules.forEach((rule) => {
    const [color, contents] = rule.split(" bags contain ");
    if (!result[color]) {
      result[color] = {
        color,
        contents: [],
      };
    }
    const contentsMatcher = new RegExp(/(\d+) ([a-z]+ [a-z]+) bag/g);
    do {
      const match = contentsMatcher.exec(contents);
      if (!match) {
        break;
      }
      const [, bagCount, bagColor] = match;
      result[color].contents.push({
        color: bagColor,
        count: parseInt(bagCount),
      });
    } while (true);
  });
  return result;
};
