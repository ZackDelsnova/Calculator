let firstNumber = "";
let secondNumber = "";
let operator = null;
let isSecondNumber = false;

function appendNumber(number) {
    if(!isSecondNumber) {
        firstNumber += number;
    } else {
        secondNumber += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (firstNumber === "") return;
    if(operator !== null) return;

    operator = op;
    if (op === "%") {
        calculatePercentage();
    } else {
        isSecondNumber = true;
    }
    updateDisplay();
}

function updateDisplay() {
    const calculation = document.getElementById("calculation");
    const result = document.getElementById("result");

    calculation.textContent = `${firstNumber} ${operator || ""} ${secondNumber}`;
    result.textContent = "";
}

function calculate() {
    if (firstNumber === "" || secondNumber === "" || operator===null) return;

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);
    let result = 0;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
            break;
        case "%":
            result = num1 * (num2/100);
            break;
        default:
            return;
    }

    // Display the result
    document.getElementById("result").textContent = result;

    // Reset for the next calculation
    firstNumber = result.toString();
    secondNumber = "";
    operator = null;
    isSecondNumber = false;
}

function calculatePercentage() {
    if (firstNumber !== "") {
        let num1 = parseFloat(firstNumber);
        let result = num1/100;
        document.getElementById("result").textContent = result;
        firstNumber = result.toString();
    }
}

function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    operator = null;
    isSecondNumber = false;
    updateDisplay();
    document.getElementById("result").textContent = "";
}

function deleteLast() {
    if (isSecondNumber && secondNumber !== "") {
      secondNumber = secondNumber.slice(0, -1);
    } else if (!isSecondNumber && operator === null) {
      firstNumber = firstNumber.slice(0, -1);
    } else if (!isSecondNumber && operator !== null) {
      operator = null;
      isSecondNumber = false;
    }
    updateDisplay();
}
