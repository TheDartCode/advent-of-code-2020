import { Operator, Operand, Expression } from "./types";

const evalExpression = (expression: Expression, context?: Operator): number => {
  let first = expression.shift();

  if (first === "(") {
    first = evalExpression(expression, "(");
  }

  let result: number = first as Operand;

  while (expression.length > 0) {
    let current = expression.shift();
    if (current === ")") {
      if (context !== "(") {
        expression.unshift(current);
      }
      return result;
    }
    if (current === "*") {
      if (context === "+") {
        expression.unshift(current);
        return result;
      }
      const next = evalExpression(expression, current);
      result *= next as Operand;
    } else if (current === "+") {
      const next = evalExpression(expression, current);
      result += next as Operand;
    }
  }
  return result as Operand;
};

const parseExpressionTree = (expression: string): Expression => {
  return expression
    .split("")
    .filter((c) => c !== " ")
    .map((c) => {
      const num = parseInt(c);
      if (!isNaN(num)) {
        return num as Operand;
      }

      return c as Operator;
    });
};

const moduleB = (list: string): number => {
  return list.split("\n").reduce((total, line) => {
    return total + evalExpression(parseExpressionTree(line));
  }, 0);
};

export default moduleB;
