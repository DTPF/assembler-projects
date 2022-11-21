const numDecimals = 3;
let equalIsPushed = false;
let evalIsDisabled = false;
const historyButton = document.getElementsByClassName('history-btn');

class Display {
  constructor(previousDisplay, actualDisplay, operationsDisplay, logger) {
    this.previousDisplay = previousDisplay;
    this.actualDisplay = actualDisplay;
    this.operationsDisplay = operationsDisplay;
    this.logger = logger;
    this.calculator = new Calculadora();
    this.lastCommand = undefined;
    this.previousValue = '';
    this.actualValue = '';
    this.tempNumberForHistory = '';
    this.previousOperator = '';
    this.operator = '';
    this.operators = {
      add: '+',
      substract: '-',
      multiply: '*',
      divide: '/'
    }
  }

  addNumber(number) {
    if (!evalIsDisabled) {
      if (!this.actualValue && number === '.') this.actualValue = '0';
      if (equalIsPushed) this.previousValue = '';
      if (number === '.' && this.actualValue.includes('.')) return;
      this.actualValue = this.actualValue.toString() + number.toString();
    } else {
      if (number === '.' && this.actualValue.includes('.')) return;
      this.actualValue = this.actualValue.toString() + number.toString();
    }
    this.refreshDisplay();
  }

  chooseOperation(operator) {
    if (!evalIsDisabled) {
      if (operator !== '=') this.operator = operator;
      //Calc controllers
      if (operator === 'equal' || operator === 'percent') {
        if (!this.actualValue) return;
        else if (!this.previousValue) return;
      }
      if (operator === 'percent') {
        this.otherCalc(this.lastCommand);
        this.previousOperator = this.lastCommand;
        this.lastCommand = operator;
      } else {
        if (this.lastCommand !== 'equal' && this.lastCommand !== 'percent' && this.lastCommand !== 'opposite') this.calculate();
        if (this.lastCommand === 'opposite') this.otherCalc(this.lastCommand);
        this.previousOperator = this.lastCommand;
        this.lastCommand = operator;
      }
      //Print controllers
      if (this.lastCommand === 'equal' || this.lastCommand === 'percent') {
        if (this.lastCommand === 'percent') this.log(`${this.previousValue} ${this.operators[this.previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
        else if (this.lastCommand === 'equal') this.log(`${this.previousValue} ${this.operators[this.previousOperator]} ${this.tempNumberForHistory} = ${this.actualValue}`);
      }
      if (this.actualValue === 0) {
        this.previousValue = this.actualValue;
      } else this.previousValue = this.actualValue || this.previousValue;

      //General
      operator === 'equal' ? equalIsPushed = true : equalIsPushed = false;
      this.actualValue = '';
    } else {
      let operation;
      if (operator !== 'equal') {
        switch (operator) {
          case 'add':
            operation = '+';
            break;
          case 'substract':
            operation = '-';
            break;
          case 'divide':
            operation = '/';
            break;
          case 'multiply':
            operation = '*';
            break;
        }
        this.actualValue += operation;
      } else {
        this.calculate(operation);
      }
    }
    this.refreshDisplay();
  }

  calculate() {
    if (!evalIsDisabled) {
      const { previousVal, actualVal } = this.conversion();
      if (isNaN(previousVal) || isNaN(actualVal)) return;
      this.tempNumberForHistory = this.actualValue;
      this.actualValue = this.calculator[this.lastCommand](previousVal, actualVal);
    } else if (evalIsDisabled) {
      this.actualValue = eval(`${this.actualValue} ${this.operator} ${this.previousValue}`);
    }
    this.refreshDisplay();
  }

  otherCalc(operation) {
    const { actualVal, previousVal } = this.conversion();
    if (isNaN(actualVal)) return;
    const { result, totalPercent, onlyPercent } = this.calculator['percent'](previousVal, actualVal, operation);
    console.log(result);
    this.actualValue = result;
    switch (operation) {
      case "add": case "substract":
        this.tempNumberForHistory = totalPercent;
        break;
      case "multiply": case "divide":
        this.tempNumberForHistory = onlyPercent;
        break;
    }
    this.refreshDisplay();
  }

  conversion() {
    return {
      previousVal: parseFloat(this.previousValue),
      actualVal: parseFloat(this.actualValue)
    }
  }

  negate() {
    if (!this.actualValue) return;
    this.actualValue = -this.actualValue;
    this.refreshDisplay();
  }

  sendOperationToScreen(event) {
    this.operationsDisplay.textContent = '';
    let history = event.target.textContent;
    const array = history.split('=');
    this.actualValue = array[1];
    this.previousValue = '';
    this.refreshDisplay();
  }

  refreshDisplay() {
    let prevValue = this.previousValue && this.previousValue.toString().split('.');
    let prevValueDecimals = () => {
      if (prevValue[1]) {
        return prevValue[0] + '.' + prevValue[1].substring(0, numDecimals);
      } else {
        return this.previousValue;
      }
    }
    this.previousValue = prevValueDecimals();
    this.actualDisplay.textContent = this.actualValue;
    this.previousDisplay.textContent = `${prevValueDecimals()} ${this.operators[this.lastCommand] || ''}`;
  }

  log(text) {
    //Controlar decimales
    const logText = text.toString().split('.');
    const decimals = logText[logText.length - 1].substring(0, numDecimals);
    let newResult = [];

    for (const i in logText) {
      newResult.push(logText[i])
    }
    (newResult.length > 1) && newResult.pop(newResult.length - 1) && newResult.push(decimals);
    newResult = newResult.toString().replace(/,/g, '.');

    let position;
    for (const iterator in newResult) {
      if (newResult[iterator] === '.') {
        if (!isNaN(newResult[iterator + 1])) {
          position = iterator;
        }
      }
    }

    //Quitar punto 3.
    let array = [];
    for (const i in newResult) {
      if (newResult[i] === '.' && newResult[(parseInt(i) + parseInt(1))] === ' ');
      else array.push(newResult[i]);
    }

    newResult = array.toString().replace(/,/g, '');
    this.operationsDisplay.insertAdjacentHTML('beforeend', `<p>${newResult}</p>`);
    this.logger.insertAdjacentHTML('beforeend', `<p class="select-historial" onclick="display.sendOperationToScreen(event);">${newResult}</p>`);
  }

  delete() {
    this.actualValue = this.actualValue.toString().slice(0, -1);
    this.refreshDisplay();
    this.displayFontSize();
    this.showHideHistoryButton();
  }

  deleteAll() {
    this.operationsDisplay.textContent = '';
    this.previousValue = '';
    this.actualValue = '';
    this.lastCommand = undefined;
    this.refreshDisplay();
    this.displayFontSize();
    this.showHideHistoryButton();
  }

  displayFontSize() {
    const actualLength = displayActualValue.innerText.length;
    const previousLength = displayPreviousValue.innerText.length;

    let actualSize = (prop) => displayActualValue.style.fontSize = prop;
    !actualLength && actualSize('2.8rem');
    actualLength >= 10 && actualSize('2.6rem');
    actualLength >= 11 && actualSize('2.2rem');
    actualLength >= 13 && actualSize('1.8rem');
    actualLength >= 16 && actualSize('1.4rem');
    actualLength >= 19 && actualSize('1.2rem');
    actualLength >= 21 && actualSize('1rem');

    let previousSize = (prop) => displayPreviousValue.style.fontSize = prop;
    !previousLength && previousSize('1.8rem');
    previousLength >= 13 && previousSize('1.7rem');
    previousLength >= 15 && previousSize('1.4rem');
    previousLength >= 17 && previousSize('1.2rem');
    previousLength >= 19 && previousSize('1rem');
  }

  showHideHistoryButton() {
    if (logger.innerText.length === 0) {
      historyButton[0].classList.add('hide');
    } else {
      historyButton[0].classList.remove('hide');
      historyButton[0].classList.add('show');
    }
  }


  deleteHistory() {
    logger.innerText = '';
    showHistory();
    this.showHideHistoryButton();
  }
}