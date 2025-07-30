// Realiza a conta de divisão e multiplicação
export const formulaDivMult = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta entre os dois números
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "x" || expression[i] === "÷") {
      const operator = expression[i];
      const leftNumber = expression[i - 1];
      const rightNumber = expression[i + 1];

      // Caso o operador seja 'x' faz a multiplicação, se não faz a divisão
      let result =
        operator === "x" ? leftNumber * rightNumber : leftNumber / rightNumber;
      // Caso o resultado seja decimal ele é formatado
      result = result % 1 === 0 ? result : Number(result.toFixed(10));

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i - 1, 3, result);
      i -= 1;
    }
  }

  return expression;
};

// Realiza a conta de adição e subtração
export const formulaSubAdd = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta entre os dois números
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "+" || expression[i] === "-") {
      const operator = expression[i];
      const leftNumber = expression[i - 1];
      const rightNumber = expression[i + 1];

      // Caso o operador seja '+' faz a adição, se não faz a subtração
      let result =
        operator === "+" ? leftNumber + rightNumber : leftNumber - rightNumber;
      // Caso o resultado seja decimal ele é formatado
      result = result % 1 === 0 ? result : Number(result.toFixed(10));

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i - 1, 3, result);
      i -= 1;
    }
  }

  return expression;
};

// Realiza a conta de porcentagem
export const formulaPercentage = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta com o número
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "%") {
      const number = expression[i - 1];

      let result = number / 100;

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i - 1, 2, result);
      i -= 1;
    }
  }

  return expression;
};

// Realiza a conta de fatorial
export const formulaFactorial = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta com o número
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "!") {
      let number = expression[i - 1];

      if (number === 0 || number === 1) {
        expression.splice(i - 1, 2, 1);
        i -= 1;
        continue;
      }

      let result = number;

      while (number > 1) {
        number--;
        result *= number;
      }

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i - 1, 2, result);
      i -= 1;
    }
  }

  return expression;
};

// Realiza a conta de potência
export const formulaExponentation = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta entre os dois números
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "^") {
      const leftNumber = expression[i - 1];
      const rightNumber = expression[i + 1];

      let result = leftNumber ** rightNumber;
      // Caso o resultado seja decimal ele é formatado
      result = result % 1 === 0 ? result : Number(result.toFixed(10));

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i - 1, 3, result);
      i -= 1;
    }
  }

  return expression;
};

// Realiza a conta de raiz quadrada
export const formulaSquareRoot = (expression) => {
  // Percorre a expressão, identificando onde está o operador e realizando a conta com o número
  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === "√") {
      const number = expression[i + 1];

      let result = Math.sqrt(number);
      // Caso o resultado seja decimal ele é formatado
      result = result % 1 === 0 ? result : Number(result.toFixed(10));

      // Substitui os elementos usados na conta pelo resultado
      expression.splice(i, 2, result);
      i -= 1;
    }
  }

  return expression;
};
