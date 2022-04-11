const calculator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
};

function inputDigit (digit) {
  /* calculator.displayNumber += digit; */
  if (calculator.displayNumber == '0') {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

function updateDisplay () {
  document.getElementById('displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator () {
  calculator.displayNumber = 0;
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

function inverseNumber () {
  if (calculator.displayNumber === '0') {
    return;
  }

  calculator.displayNumber *= -1;
}

function handleOperator (operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;
    calculator.displayNumber = '0';
  } else {
    alert('Operator Sudah Ditetapkan');
  }
}

function performCalculation () {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert('Anda Belum Menerapkan Angka atau Operator.');
    return;
  }

  let result = 0, fo = calculator.firstNumber, so = calculator.displayNumber;

  if (calculator.operator === '+') {
    result = parseInt(fo) + parseInt(so);
  } else {
    result = parseInt(fo) - parseInt(so);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    secondNumber: calculator.displayNumber,
    operator: calculator.operator,
    result: result
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.getElementsByClassName('button');

for (const button of buttons) {
  button.addEventListener('click', function (event) {
    const target = event.target; 

    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('negative')) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equals')) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}