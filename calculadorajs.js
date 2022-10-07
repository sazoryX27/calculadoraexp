let runningTotal = 0;
let buffer = "0";
let previusOperator;
const screen = document.querySelector(".pantalla-calculadora");

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}
function handleNumber(value) {
    if (buffer === "0") {
        buffer = value
    } else {
        buffer += value
    }
}
function handleMath(value) {
    if (buffer === "0") {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer
    } else {
        flushOperation (intBuffer);
    }
    previusOperator = value;

    buffer = "0";
}

function flushOperation(intBuffer) {
    if (previusOperator === "+") {
        runningTotal += intBuffer;
    } else if(previusOperator === "-") {
        runningTotal -= intBuffer;
    } else if(previusOperator === "x") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if (previusOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previusOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
            case "+":
            case "-":
            case "x":
            case "÷":
                handleMath(value);
                break;
    }

}

function rerender() {
    screen.innerText=buffer;
}
function init() {
    document
    .querySelector(".botones-calculadora")
    .addEventListener("click", function (event){
        buttonClick(event.target.innerText);
    }); 
}

init();