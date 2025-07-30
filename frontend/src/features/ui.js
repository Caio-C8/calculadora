import { updateThousands } from "./utils.js";

// Adiciona um novo valor no visor
export const addDigitToDisplay = (digit, expression) => {
  const operators = ["+", "-", "x", "÷", "^", "√"];
  const parentheses = ["(", ")"];
  const lastPosition = expression.length - 1;
  const lastDigit = expression[lastPosition];
  const displayExpression = expression.join("");
  let newDigit = "";

  // Caso a mensagem "Expressão inválida" estaja no visor, ela será substituída pelo novo valor
  if (expression.length === 1 && displayExpression === "Expressão inválida") {
    expression[lastPosition] = digit;
    return expression;
  }

  // Verifica se o valor é um operador
  if (operators.includes(digit)) {
    // Substitui o zero inicial por '-' ou '√'
    if ((digit === "-" || digit === "√") && lastDigit === "0")
      expression[lastPosition] = digit;
    // Caso haja um operador, ele é substituido pelo operador digitado, com excessão de '√'
    else if (operators.includes(lastDigit) && digit !== "√") {
      expression[lastPosition] = digit;
    }
    // Adiciona o operador
    else {
      expression.push(digit);
    }
    // Verifica se o valor é uma vírgula
  } else if (digit === ",") {
    // Caso o último valor seja um operador ou um parênteses é colocado '0,'
    if (operators.includes(lastDigit) || parentheses.includes(lastDigit)) {
      expression.push("0,");
      // Caso o último valor seja um número com vírgula o comando é ignorado
    } else if (
      !isNaN(lastDigit.replace(/\./g, "")) &&
      lastDigit.includes(",")
    ) {
      return expression;
      // Caso não seja um dos casos acima, a vírgula é adicionada ao número
    } else {
      newDigit = lastDigit + digit;
      expression[lastPosition] = newDigit;
    }
    // Verifica se o valor é um número
  } else if (!isNaN(digit)) {
    // Verifica se o zero está no visor
    if (displayExpression === "0") {
      // Caso o valor seja zero, ignora, se for outro valor o zero é substituido por ele
      if (digit === "0") return expression;
      else expression[lastPosition] = digit;
      // Verifica se o último valor é um número para adicionar um novo algarismo no número
    } else if (
      !isNaN(lastDigit.replace(/\./g, "")) ||
      lastDigit.includes(",")
    ) {
      newDigit = lastDigit + digit;
      expression[lastPosition] = updateThousands(newDigit);
      // Caso não seja as últimas situações, adiciona o número
    } else {
      expression.push(digit);
    }
    // Caso não seja nenhum dos casos acima, vai cair aqui
  } else {
    // Verifica se o zero está no visor e se o valor é um parêntese, se sim o zero é substituído por um parêntese
    if (lastDigit === "0" && parentheses.includes(digit))
      expression[lastPosition] = digit;
    // Adiciona no visor outro valor não tratado anteriormente
    else expression.push(digit);
  }

  return expression;
};

// Apaga o visor dígito por dígito
export const deleteDigitFromDisplay = (expression) => {
  const lastPosition = expression.length - 1;
  let lastDigit = expression[lastPosition];
  const displayExpression = expression.join("");

  // Verifica se a mensagem "Expressão inválida" está no visor e apaga ela completamente
  if (expression.length === 1 && displayExpression === "Expressão inválida") {
    expression[lastPosition] = "0";
    // Verifica se o tamanho do último valor é maior que um, se sim tira somente o último dígito
  } else if (lastDigit.length > 1) {
    lastDigit = lastDigit.slice(0, -1);
    expression[lastPosition] = updateThousands(lastDigit);
    // Caso não seja nenhum dos casos, exclui a última posição do array expression
  } else {
    expression.pop();

    // Evita que o zero seja excluído do visor
    if (expression.length === 0) expression[lastPosition] = "0";
  }

  return expression;
};
