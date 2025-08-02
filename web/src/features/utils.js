import { solveExpression } from "./calculate.js";

// Quando retorna true, há algum erro na expressão
export const verifyParentheses = (expression) => {
  let counter = 0;

  // Percorre o array expressão e identifica onde estão os parênteses e garante que cada um tem o seu par
  for (const element of expression) {
    if (element === "(") {
      counter++;
    } else if (element === ")") {
      counter--;
    }

    // Caso tenha um parêntese de fechamento (')') a mais, o contador fica menor que zero e retorna true
    if (counter < 0) {
      return true;
    }
  }

  // Caso os parênteses estajam balanceados, ou seja, com o contador igual a zero, retorna false
  if (counter === 0) {
    return false;
  } else {
    // Caso tenha um parêntese de abertura ('(') a mais, o contador fica maior que zero e retorna true
    return true;
  }
};

// Quando retorna true, há algum erro na expressão
export const verifyInvalidExpression = (expression) => {
  const operators = ["+", "-", "x", "÷", "^"];
  const lastDigit = expression[expression.length - 1];

  // Caso tenha somente o símbolo '√' no visor retorna true
  if (lastDigit === "√") {
    return true;
  }

  for (let i = 0; i < expression.length; i++) {
    // Verifica se o elemento da expressão é algum dos operadores que estão na variável operadores
    if (operators.includes(expression[i])) {
      const leftNumber =
        expression[i - 1] === undefined
          ? expression[i - 1]
          : expression[i - 1].toString().replace(/[,]/g, ".");
      const rightNumber =
        expression[i + 1] === undefined
          ? expression[i + 1]
          : expression[i + 1].toString().replace(/[,]/g, ".");

      // Verifica se há uma divisão por zero, se houver retorna true
      if (expression[i] === "÷" && rightNumber === 0) {
        return true;
      } else if (
        // Verifica se os elementos do lado dos operadores são números ou símbolos válidos, se não retorna true
        (isNaN(rightNumber) || isNaN(leftNumber)) &&
        (rightNumber !== "√" || leftNumber !== "!")
      ) {
        return true;
      }
      // Verifica se o elemento da expressão é '%' ou '!'
    } else if (expression[i] === "%" || expression[i] === "!") {
      const leftNumber =
        expression[i - 1] === undefined
          ? expression[i - 1]
          : expression[i - 1].toString().replace(/[,]/g, ".");

      // Verifica se o número na esquerda de '%' ou de '!' é válido, se não retorna true
      if (isNaN(leftNumber)) {
        return true;
      } else if (
        // Verifica se a conta fatorial é feita com número negativo ou decimal, se sim retorna true
        expression[i] === "!" &&
        (leftNumber.includes("-") || leftNumber.includes("."))
      ) {
        return true;
      }
      // Verifica se o elemento da expressão é '√'
    } else if (expression[i] === "√") {
      const rightNumber =
        expression[i + 1] === undefined
          ? expression[i + 1]
          : expression[i + 1].toString().replace(/[,]/g, ".");

      // Verifica se o número a direita de '√' é válido ou negativo, se não for válido ou se for negativo retorna true
      if (isNaN(rightNumber) || rightNumber < 0) {
        return true;
      }
    }
  }

  // Caso não tenha nenhum erro de sintaxe na experssao retorna false
  return false;
};

// Percorre o array e identifica elementos que são negativos no formato '(-x)' e tira os parênteses
export const removeParenthesesFromNumberNegative = (expression) => {
  for (let i = 0; i < expression.length; i++) {
    if (
      typeof expression[i] === "string" &&
      expression[i].includes("(") &&
      expression[i].includes(")")
    ) {
      expression[i] = Number(expression[i].replace(/[()]/g, ""));
    }
  }

  return expression;
};

// Percorre o array e identifica elementos que são números válidos e os transforma em valores tipo number
export const convertStringToNumber = (expression) => {
  for (let i = 0; i < expression.length; i++) {
    if (!isNaN(expression[i])) {
      expression[i] = Number(expression[i]);
    }
  }

  return expression;
};

// Percorre o array e substitui as vírgulas por pontos em todos os elementos que tenham vírgula
export const removeComma = (expression) => {
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].includes(",")) {
      expression[i] = expression[i].replace(/[,]/g, ".");
    }
  }

  return expression;
};

// Percorre o array e tira os pontos em todos os elementos que tenham pontos
export const removeDot = (expression) => {
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].includes(".")) {
      expression[i] = expression[i].replace(/[.]/g, "");
    }
  }

  return expression;
};

// Faz os números de um array ficarem válidos
const convertNumberToValids = (expression) => {
  removeDot(expression);
  removeComma(expression);

  return expression;
};

// Identifica números negativos escritos em outro formato e ajusta a conta para um formato válido
export const normalizeUnaryNegatives = (expression) => {
  // Perorre o array expressão e identifica onde estão os números negativos em determinadas posições para ajustar a conta
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "-") {
      if (i === 0 || expression[i - 1] === "(") {
        expression.splice(i, 0, 0);
        i++;
      }
    }
  }

  return expression;
};

// Altera o sinal de um número (positivo para negativo e vice-versa)
export const changeSign = (expression) => {
  const lastPosition = expression.length - 1;
  const lastDigit = expression[lastPosition];
  const lastDigitFormatted = convertNumberToValids([lastDigit]);

  if (lastDigit === "0") return expression;

  // Verifica se o último elemento é negativo
  if (lastDigit.includes("-")) {
    // Transforma o número em positivo, retirando os parênteses e o sinal negativo
    const numero_positivo = lastDigit.slice(1, -1).replace(/[-]/g, "");
    expression[lastPosition] = numero_positivo;
    // Verifica se o último elemento é um número
  } else if (!isNaN(lastDigitFormatted)) {
    // Transforma o número em negativo, colocando os parênteses e o sinal negativo
    const numero_negativo = `(-${lastDigit})`;
    expression[lastPosition] = numero_negativo;
  }

  return expression;
};

// Atualiza as casas de milhar de um número
export const updateThousands = (number) => {
  number = number.replace(/\./g, "");

  // Verifica se number não é um número, caso não seja retorna number (evita tentativas de formatação desnecessárias)
  if (isNaN(number.replace(/[,]/g, "."))) return number;

  const [integerPart, decimalPart] = number.split(",");

  // Formata a parte inteira, colocando ponto para dividir as casas de milhar
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  // Verifica se tem uma parte decimal no número, e tiver retorna o número com a parte decimal
  if (decimalPart) {
    return `${formattedIntegerPart},${decimalPart}`;
  } else if (number.includes(",") && !decimalPart) {
    // Verifica se o número tem uma vírgula, porém ainda não tem uma parte decimal (o usuário está digitando o número), se sim retorna o número formatado junto com a vírgula
    return `${formattedIntegerPart},`;
  } else {
    // Caso não tenha parte decimal ou vírgula no número, retorna a parte formatada
    return formattedIntegerPart;
  }
};

// Retorna o resultado da expressão
export const expressionResult = (expression) => {
  const displayExpression = expression.map(String).join("");

  if (displayExpression === "0" || expression.length === 1) {
    return expression;
  }

  // Obtém a expressão e formata ela para que todos os números, que originalmente são do tipo string, virem valores do tipo number para realizar as contas
  convertNumberToValids(expression);
  convertStringToNumber(expression);
  removeParenthesesFromNumberNegative(expression);
  normalizeUnaryNegatives(expression);

  // Verifica se os parênteses estão balanceados, se não retorna "Expressão inválida"
  if (verifyParentheses(expression)) {
    expression = ["Expressão inválida"];
    return expression;
  }

  // Calcula a expressão
  let result = solveExpression(expression);
  result = result.toString();

  // Verifica se o resultado tem ponto, ou seja, se é um número decimal, se sim substitui o ponto por vírgula
  if (result.includes(".")) {
    result = result.replace(/[.]/g, ",");
  }

  // Formata o resultado com as casas de milhar
  const formattedResult = updateThousands(result);
  expression = [formattedResult];

  return expression;
};
