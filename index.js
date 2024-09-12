// Access the DOM elements of the calculator

const inputBox = document.getElementById("input");
const expressionDiv = document.getElementById("expression");
const resultDiv = document.getElementById("result");

// define expression and result variables
let expression = '';
let result = '';

//define event handler

function buttonClick(event){
    //get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    //console.log(target, action, value);
    //switch case to contron the calculator
    switch(action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== ''){
                startFromResult(value);
            }else if (expression !== '' && !isLastCharOperator())
            {
                addValue(value);
            }
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal();
            break;
    }
    //update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);
function addValue(value){
    //add value to the expression
    if (value === '.'){
    //find the index of last operator in the expression
    const lastOperatorIndex = expression.search(/[+\-*/]/);
    //find the index of last deciaml in the expression
    const lastDecimalIndex = expression.lastIndexOf('.');
    //find the index of last number in the xpression
    const lastNumberIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/'),
    );
    //check if this is the first decimal in the current number or if the expression is empty
    if (
      (lastDecimalIndex < lastOperatorIndex ||
       lastDecimalIndex < lastNumberIndex ||
       lastDecimalIndex === -1) &&
       (expression === ' ' ||
        expression.slice(lastNumberIndex + 1).indexOf('-')
        === -1)
       ) {
        expression += value;
       }
    }else {
        expression += value;
    
    }
}
function updateDisplay(expression, result){
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}
function clear(){
    expression = '';
    result = '';
}
function backspace(){
    expression = expression.slice(0, -1);
}
function isLastCharOperator(){
    return isNaN(parseInt(expression.slice(-1)));
}
function startFromResult(value) {
    expression += result + value;
}
function submit(){
    result = evaluateExpression();
    expression = '';
}
function evaluateExpression(){
    const evalResult = eval(expression);
    //checks if evalResult is not a number or infinite.It if is, return a spcae character' '
    return isNaN(evalResult) || !isFinite(evalResult)
    ? ' '
    : evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}
function negate(){
    //Negate the result if expression is empty and result is present
    if (expression === '' && result !== '') {
        result = -result;
        
        //toggle the sign of expression and if its not already negative and its not empty
    }else if (!expression.startsWith('-') && expression !==''){
        expression = '-' + expression;
        // Remove the negative sign from the expresiion if its already negative
    }else if (expression.startsWith('-')){
        expression = expression.slice(1);
    }
}
function percentage(){
    //evaluate the expression as it will take the percentage of only the first number
    if (expression !== ''){
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)){
            result /= 100;
        }else {
            result = '';
        }
    }else if(result !== '') {
        result = parseFloat(result) /100;
    }
}
function decimal(){
    if (!expression.endsWith('.') && !isNaN(expression.slice[-1])){
        addValue(value);
    }
}
