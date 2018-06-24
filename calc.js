/*
 * An improved version of: 
 * Implement all your JavaScript in this file!
 * https://codepen.io/simonja2/pen/QbGYbR
 */

 $(document).ready(function() {
  var result = '';
  var prevEntry = 0;
  var lastEntry = 0;
  var operation = null;
  var currentEntry = '0';
  // var currentDisplay = '';
  var appBuffer = [];
  updateScreen(result);

  $('button').on('click', function(evt) {
    var buttonPressed = $(this).html();
    console.log(buttonPressed);

    if (buttonPressed === "C") {
      // result = 0;
      result = '';
      currentEntry = '';
      appBuffer = [];
    } else if (buttonPressed === "CE") {
      currentEntry = '0';
    } else if (buttonPressed === "back") {
      //currentEntry = currentEntry.substring(0, currentEntry.length-1);
    } else if (buttonPressed === "+/-") {
      currentEntry *= -1;
    } else if (buttonPressed === '.') {
      currentEntry += '.';
    } else if (isNumber(buttonPressed)) {
      if ( last() && ( last()==='=' || isOperator(last()) ) ) {
        currentEntry = '';
      }
      if (currentEntry === '0') currentEntry = buttonPressed;
      else currentEntry = currentEntry + buttonPressed;
      appBuffer.push(buttonPressed);
    } else if (isOperator(buttonPressed)) {
      if (pendingOperation()) {
        currentEntry = operate(prevEntry, currentEntry, pendingOperation());
      }
      prevEntry = parseFloat(currentEntry);
      operation = buttonPressed;
      appBuffer.push(operation);

    } else if(buttonPressed === '%') {
      currentEntry = currentEntry / 100;

    } else if (buttonPressed === 'sqrt') {
      currentEntry = Math.sqrt(currentEntry);

    } else if (buttonPressed === '1/x') {
      currentEntry = 1 / currentEntry;

    } else if (buttonPressed === 'pi') {
      currentEntry = Math.PI;

    } else if (buttonPressed === '=') {
      // If ther is no operation selected return
      if (!operation) return;

      // If last button entered was an operator ignore "="
      if (isOperator(last())) return;

      // If equal is pressed (again) repeat the last operation
      if (isEqualPressed(last())) {
        currentEntry = operate(currentEntry, lastEntry, operation);
      } else {
        lastEntry = currentEntry;
        currentEntry = operate(prevEntry, currentEntry, operation);
      }

      appBuffer.push(buttonPressed);
    }

    updateScreen(currentEntry, appBuffer);
  });

  last = function () {
     return appBuffer[appBuffer.length-1];
  };

  /**
   * Is there an operation pedding?
   */
  pendingOperation = function() {
    for (i = appBuffer.length-1 ; i >=0; i--){
      if (appBuffer[i] === '=') return null;
      if (isOperator(appBuffer[i])){
        if (appBuffer[i + 1] && isNumber(appBuffer[i + 1])) {
          return appBuffer[i];
        }
      }
    }
    return null;
  };
});

/**
 * Update the display.
 */
updateScreen = function(displayValue, bfr) {
  bfr = bfr || [];
  $('#buffer').html(bfr.join(', '));
  displayValue = displayValue.toString();
  $('#display').html(displayValue.substring(0, 10));
  $('#display').val(displayValue.substring(0, 10));
};

isNumber = function(value) {
  return !isNaN(value);
};

isEqualPressed = function(value) {
  value = value || '';
  return value === '=';
};

isOperator = function(value) {
  value = value || '';
  return value.charCodeAt(0) === 247 || value === '*' || value === '+' || value === '-';
};

operate = function(a, b, operation) {
  a = parseFloat(a);
  b = parseFloat(b);
  console.log(a, b, operation);
  if (operation === '+') return a + b;
  if (operation === '-') return a - b;
  if (operation === '*') return a * b;
  if (operation.charCodeAt(0) === 247) return a / b;
};
