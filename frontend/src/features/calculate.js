import {
  formulaDivMult,
  formulaFactorial,
  formulaPercentage,
  formulaSubAdd,
  formulaExponentation,
  formulaSquareRoot,
} from "./formulas.js";
import { verifyInvalidExpression } from "./utils.js";

// Separa a expressão em subexpressões para resolvê-las até que a expressão acabe
export const solveExpression = (expression) => {
  // Identifica as subexpressões que estão entre parênteses e resolve elas primeiro
  while (expression.includes("(")) {
    const closingIndex = expression.indexOf(")");
    const openingIndex = expression.lastIndexOf("(", closingIndex);

    const subExpression = expression.slice(openingIndex + 1, closingIndex);
    const subExpressionResult = solveSubExpression(subExpression);

    // Ao resolver, toda a subexpressão é substituída pelo resultado
    expression.splice(
      openingIndex,
      closingIndex - openingIndex + 1,
      subExpressionResult
    );
  }

  // Quando não houver mais subexpressões, a expressão será resolvida com base na ordem das operações matemáticas
  return solveSubExpression(expression);
};

// Resolve expressões/subexpressões
const solveSubExpression = (expression) => {
  expression = [...expression];

  // Verifica se a expressão não tem algum erro de sintaxe, se houver retorna a mensagem "Expressão inválida"
  if (verifyInvalidExpression(expression)) {
    expression = ["Expressão inválida"];
    return expression;
  }

  // Realiza as contas com base na ordem de operações matemáticas
  if (expression.includes("!")) {
    formulaFactorial(expression);
  }

  if (expression.includes("%")) {
    formulaPercentage(expression);
  }

  if (expression.includes("^")) {
    formulaExponentation(expression);
  }

  if (expression.includes("√")) {
    formulaSquareRoot(expression);
  }

  if (expression.includes("x") || expression.includes("÷")) {
    formulaDivMult(expression);
  }

  if (expression.includes("+") || expression.includes("-")) {
    formulaSubAdd(expression);
  }

  // Retorna somente o valor do resultado final
  return expression[0];
};
