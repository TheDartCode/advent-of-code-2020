export type Range = {
  min: number;
  max: number;
};

export type TicketRule = {
  fieldName: string;
  ranges: Range[];
};

export type Ticket = number[];

export type TicketValueMapping = { [key: string]: number };
