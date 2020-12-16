import { parseData, isValueValid } from "./helpers";
import { Ticket, TicketRule, TicketValueMapping } from "./types";

export const isTicketValid = (rules: TicketRule[], ticket: Ticket): boolean => {
  for (let value of ticket) {
    if (rules.every(({ ranges }) => !isValueValid(value, ranges))) {
      return false;
    }
  }
  return true;
};

const valueMatchesRule = (value: number, rule: TicketRule): boolean => {
  return isValueValid(value, rule.ranges);
};

const getMatchingRulesForValues = (
  values: number[],
  rules: TicketRule[]
): TicketRule[] => {
  return rules.filter((rule) =>
    values.every((value) => valueMatchesRule(value, rule))
  );
};

export const getTicketValueMapping = (
  tickets: Ticket[],
  rules: TicketRule[]
): TicketValueMapping => {
  const ticketValueMapping: TicketValueMapping = {};

  let index = 0;
  while (true) {
    const remainingRules = rules.filter(
      (rule) => !ticketValueMapping.hasOwnProperty(rule.fieldName)
    );
    if (remainingRules.length === 0) {
      break;
    }
    const values = tickets.map((ticket) => ticket[index]);
    const matchingRules = getMatchingRulesForValues(values, remainingRules);
    if (matchingRules.length === 1) {
      ticketValueMapping[matchingRules[0].fieldName] = index;
    }
    index = (index + 1) % tickets[0].length;
  }
  return ticketValueMapping;
};

const moduleB = (
  list: string,
  fieldMatcher: RegExp | string = /^departure/
): number => {
  const data = parseData(list);

  const validTickets = data.otherTickets.filter((ticket) =>
    isTicketValid(data.rules, ticket)
  );

  const mapping = getTicketValueMapping(validTickets, data.rules);

  return Object.keys(mapping)
    .filter((key) => key.match(fieldMatcher))
    .reduce(
      (product, fieldKey) => product * data.ownTicket[mapping[fieldKey]],
      1
    );
};

export default moduleB;
