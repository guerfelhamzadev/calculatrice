const screen = document.getElementById('screen');
const keys = document.querySelector('.calculator-keys');
let operator = '';
let firstValue = '';
let secondValue = '';
let shouldResetScreen = false;

keys.addEventListener('click', (e) => {
    const { target } = e;
    const { value } = target;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case 'all-clear':
            clearScreen();
            break;
        case '=':
            calculate();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperator(value);
            break;
        default:
            inputNumber(value);
            break;
    }
});

function clearScreen() {
    screen.value = '';
    operator = '';
    firstValue = '';
    secondValue = '';
    shouldResetScreen = false;
}

function calculate() {
    if (operator === '' || shouldResetScreen) return;
    secondValue = screen.value;
    screen.value = operate(firstValue, secondValue, operator);
    operator = '';
    shouldResetScreen = true;
}

function setOperator(op) {
    if (operator !== '') calculate();
    firstValue = screen.value;
    operator = op;
    shouldResetScreen = true;
}

function inputNumber(number) {
    if (screen.value === '0' || shouldResetScreen) {
        screen.value = number;
        shouldResetScreen = false;
    } else {
        screen.value += number;
    }
}

function operate(first, second, operator) {
    first = parseFloat(first);
    second = parseFloat(second);
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            if (second === 0) return 'Error';
            return first / second;
        default:
            return 'Error';
    }
}
