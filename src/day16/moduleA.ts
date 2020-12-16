import { parseData, isValueValid } from "./helpers";
import { Ticket, TicketRule } from "./types";

export const getInvalidValues = (
  rules: TicketRule[],
  ticket: Ticket
): number[] => {
  const invalidValues = [];
  for (let value of ticket) {
    if (rules.every(({ ranges }) => !isValueValid(value, ranges))) {
      invalidValues.push(value);
    }
  }
  return invalidValues;
};

const moduleA = (list: string): number => {
  const data = parseData(list);

  return data.otherTickets
    .reduce(
      (total, ticket) => [...total, ...getInvalidValues(data.rules, ticket)],
      []
    )
    .reduce((total, val) => total + val, 0);
};

export default moduleA;
