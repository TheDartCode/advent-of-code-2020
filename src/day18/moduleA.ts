import { Operator, Operand, Expression } from "./types";

const evalExpression = (expression: Expression): number => {
  let result = expression.shift();
  while (expression.length > 0) {
    if (result === "(") {
      result = evalExpression(expression);
    }
    let current = expression.shift();
    if (current === "(") {
      current = evalExpression(expression);
    } else if (current === ")") {
      break;
    }
    let next = expression.shift();
    if (next === "(") {
      next = evalExpression(expression);
    }
    if (current === "+") {
      (result as Operand) += next as Operand;
    } else if (current === "*") {
      (result as Operand) *= next as Operand;
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

const moduleA = (list: string): number => {
  return list.split("\n").reduce((total, line) => {
    return total + evalExpression(parseExpressionTree(line));
  }, 0);
};

export default moduleA;
