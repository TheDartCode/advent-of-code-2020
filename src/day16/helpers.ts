import { Ticket, TicketRule, Range } from "./types";
export const parseTicket = (ticketString: string): Ticket =>
  ticketString.split(",").map((val) => parseInt(val));

export const parseData = (data: string) => {
  const TOP_LEVEL_REGEX = /^((?:[\w\ ]+: \d+\-\d+ or \d+-\d+\n?)+)\n\nyour ticket:\n((?:\d,?)+)\n\nnearby tickets:\n((?:(?:\d,?)+\n?)+)/gm;
  const RULE_REGEX = /^([\w\ ]+): (\d+)\-(\d+) or (\d+)-(\d+)$/gm;
  const [
    ,
    ruleStrings,
    ownTicketString,
    otherTicketStrings,
  ] = TOP_LEVEL_REGEX.exec(data);

  const rules: TicketRule[] = [];
  let match: RegExpExecArray;
  while ((match = RULE_REGEX.exec(ruleStrings))) {
    const [, fieldName, minA, maxA, minB, maxB] = match;
    rules.push({
      fieldName,
      ranges: [
        { min: parseInt(minA), max: parseInt(maxA) },
        { min: parseInt(minB), max: parseInt(maxB) },
      ],
    });
  }

  const ownTicket = parseTicket(ownTicketString);

  const otherTickets = otherTicketStrings
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l) => parseTicket(l));

  return {
    rules,
    ownTicket,
    otherTickets,
  };
};

export const isValueValid = (value: number, ranges: Range[]): boolean => {
  return (
    (value >= ranges[0].min && value <= ranges[0].max) ||
    (value >= ranges[1].min && value <= ranges[1].max)
  );
};
