class Calculator {
  constructor(previousInput, currentInput) {
    this.previousInput = previousInput;
    this.currentInput = currentInput;
    this.clear()
  }
  
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  clearCurr() {
    this.currentOperand = '';
  }
  
  clearOne() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  
  appendItem(item) {
    if(item ==='.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + item.toString()
  }
  
  chooseMath(operation) {
    if (this.currentOperand === '') return;
    if(this.previousOperand !== '') {
      this.compute();
    };
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    
  }
  
  compute() {
    let result;
    
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    
    if(isNaN(prev) || isNaN(curr)) return;
    
    switch(this.operation) {
      case '+':
        result = prev+curr;
        break;
      case '-':
        result = prev-curr;
        break;
      case '/':
        result = prev/curr;
        break;
      case '*':
        result = prev*curr;
        break;
      default:
        return;
    };
   
   this.currentOperand = result;
   this.previousOperand = '';
   this.operation = undefined;
   
  }
  
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const decDigits = stringNumber.split('.')[1];
    const floatNum = parseFloat(number);
    
    let intDisplay;
    
    if(isNaN(intDigits)) {
      intDisplay = '';
    } else {
     intDisplay = intDigits.toLocaleString('en', {
       maximumFractionDigits: 0});     
    }
    
    if(decDigits != null) {
      return `${intDisplay}.${decDigits}`;
    } else {
      return intDisplay;
    }
  }
  
  updateUI() {
    this.currentInput.innerHTML = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.previousInput.innerHTML = `${this.previousOperand} ${this.operation}`;
    }
    else {this.previousInput.innerHTML = this.previousOperand};
    
  }
}

const numberButts = document.querySelectorAll('[data-number]');
const operationButts = document.querySelectorAll('[data-operation]');
const memoryButts = document.querySelectorAll('[data-memory]');
const clearAll = document.querySelector('[data-deleteAll]');
const clearCurrent = document.querySelector('[data-deleteCurrent]');
const clearOne = document.querySelector('[data-deleteOne]');
const equalButt = document.querySelector('[data-equals]');
const specialButt = document.querySelector('[data-special]');
const previousInput = document.querySelector('[data-previous]');
const currentInput = document.querySelector('[data-current]');

const calculator = new Calculator(previousInput, currentInput);

numberButts.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendItem(button.value)
    calculator.updateUI()
  })
})

operationButts.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseMath(button.value)
    calculator.updateUI()
  })
})

equalButt.addEventListener('click', button => { 
  calculator.compute();
  calculator.updateUI();
});


// clear buttons
clearAll.addEventListener('click', button => { 
  calculator.clear();
  calculator.updateUI();
});
clearCurrent.addEventListener('click', button => { 
  calculator.clearCurr();
  calculator.updateUI();
});
clearOne.addEventListener('click', button => {
  calculator.clearOne();
  calculator.updateUI();
});

