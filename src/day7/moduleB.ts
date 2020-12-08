import { constructBagsGraph, Graph } from "./helpers";

const traverseGraph = (
  graph: Graph,
  startingColor: string,
  multiplier: number
): number => {
  let result = 0;
  for (let {color, count} of graph[startingColor].contents) {
    result += count * multiplier;
    result += traverseGraph(graph, color, count * multiplier);
  }
  return result;
};

const moduleB = (list) => {
  const rules = list.split("\n").filter((l) => l.length > 0);
  const graph = constructBagsGraph(rules);
  return traverseGraph(graph, "shiny gold", 1);
};

export default moduleB;
