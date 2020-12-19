import { Rule } from "./types";

export const parseInput = (input: string) => {
  const [rulesString, messagesString] = input.split("\n\n");
  const ruleHash: {
    [key: string]: { rule: Rule; ruleContents: string | number[][] };
  } = rulesString.split("\n").reduce((reduction, l) => {
    const [id, contents] = l.split(": ");
    const ruleContents = contents.startsWith('"')
      ? JSON.parse(contents)
      : contents
          .trim()
          .split(" | ")
          .map((r) => r.split(" ").map((rid) => parseInt(rid)));
    const rule = new Rule(parseInt(id));
    reduction[rule.id] = { rule, ruleContents };
    return reduction;
  }, {});

  Object.values(ruleHash).forEach(({ rule, ruleContents }) => {
    rule.contents =
      typeof ruleContents === "string"
        ? ruleContents
        : (ruleContents as number[][]).map((ruleIds) =>
            ruleIds.map((ruleId) => ruleHash[ruleId].rule)
          );
  });

  const rules = Object.values(ruleHash)
    .sort((r1, r2) => r1.rule.id - r2.rule.id)
    .map(({ rule }) => rule);
  const messages = messagesString.split("\n").filter((l) => l.length > 0);
  return { rules, messages };
};
