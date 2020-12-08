import { constructBagsGraph, Graph } from "./helpers";

const traverseGraph = (
  graph: Graph,
  startingColor: string,
  desiredColor: string
): boolean => {
  for (let content of graph[startingColor].contents) {
    if (content.color === desiredColor) {
      return true;
    }
    if (traverseGraph(graph, content.color, desiredColor)) {
      return true;
    }
  }
};

const moduleA = (list) => {
  const rules = list.split("\n").filter((l) => l.length > 0);
  const graph = constructBagsGraph(rules);
  let validColorsCount = 0;
  Object.keys(graph).forEach((color) => {
    if (traverseGraph(graph, color, "shiny gold")) {
      validColorsCount++;
    }
  });
  return validColorsCount;
};

export default moduleA;
