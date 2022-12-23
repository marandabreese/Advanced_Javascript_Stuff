function bitFunction() {
    let firstNum = 3;
    let secondNum = 1;
    let result = firstNum ^ secondNum;
    document.getElementById('bitwise').innerHTML = result;
}

function searchFunction() {
    let test = "this is a string";
    let result = test.search(/string/i);
    document.getElementById('searchfunction').innerHTML = "We found the word 'string' at the " + result + " spot in the sentence.";
}

function replaceFunction() {
    let test = "this is a new string";
    let result = test.replace(/string/i, 'sentence');
    document.getElementById('replacefunction').innerHTML = result;
}

function tryFunction() {
    let num = document.getElementById('textinput').value;
    try{
        if (num == "") throw "Please enter a value";
        if (isNaN(num)) throw " is not a number.";
        if (num > 10) throw " is greater than 10";
        if (num < 5) throw " is less than 5";
    }
    catch(err) {
        document.getElementById('output').innerHTML = num + err + " Please try again.";
    }
    finally {
        document.getElementById('tryfunction').innerHTML = "You entered the number " + num + ".";
    }
}

function strictFunction() {
    "use strict";
    document.getElementById('strict').innerHTML = "Check the log!"
    newVar = 15;
}

function thisFunction() {
    const newObj = {
        name: "Object",
        purpose: "This is an object",
        testCase: function() {
            return this.purpose;
        }
    }

    document.getElementById('testthis').innerHTML = newObj.testCase();
}

function arrowFunction() {
    let greatVar = document.getElementById('newinput').value;
    let test = () => {
        return "You entered: " + greatVar;
    }
    document.getElementById('newoutput').innerHTML = test();
}

function classFunction() {
    class newObj {
        constructor(name, value) {
            this.name = name;
            this.value = value;
        }

        displayName() {
            return "This object is named " + this.name;
        }
    }

    let myObj = new newObj('Great Name', 'Cool Value');
    document.getElementById('testclass').innerHTML = myObj.displayName();
}

function debugFunction() {
    let x = 15;
    let y = 20;
    let result = x * y;
    debugger;
    document.getElementById('debugblock').innerHTML = result;
}

function indexFunction() {
    const arr = [1.5, 3.6, 7];
    function testInt(value, index, array) {
        return Number.isInteger(value) == true;
    }

    document.getElementById('indexoutput').innerHTML = "We found an integer at index " + arr.findIndex(testInt);
}

function dogObject() {
    class Dog {
        constructor(breed, color, height, weight) {
            this.breed = breed;
            this.color = color;
            this.height = height;
            this.weight = weight;
        }

        shake() {
            return this.breed + " can shake their paws!";
        }

        sit() {
            return "Good Dog!";
        }

        laydown() {
            return this.breed + ' is getting sleepy.';
            }
    }

    let fido = new Dog('Chihuahua', 'tan', '1ft', '20lbs');
    document.getElementById('dogobj').innerHTML = fido.shake();
}