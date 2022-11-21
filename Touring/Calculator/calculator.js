class Calculadora {
  add(num1, num2) {
    return num1 + num2;
  }

  substract(num1, num2) {
    return num1 - num2;
  }

  multiply(num1, num2) {
    return num1 * num2;
  }

  divide(num1, num2) {
    return num1 / num2;
  }

  percent(num1, num2, operation) {
    let result;
    let totalPercent = ((num1 * num2) / 100);
    let onlyPercent = num2 / 100;
    switch (operation) {
      case 'add':
        result = num1 + totalPercent;
        break;
      case 'substract':
        result = num1 - totalPercent;
        break;
      case 'divide':
        result = num1 / onlyPercent;
        break;
      case 'multiply':
        result = num1 * onlyPercent;
        break;
    }
    return {
      result,
      totalPercent,
      onlyPercent
    }
  }

  opposite(num1) {
    return -(num1);
  }
}