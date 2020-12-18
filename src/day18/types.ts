export type Operand = number;

export type Operator = "+" | "*" | "(" | ")";

export type Expression = (Operand | Operator)[];
