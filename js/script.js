"use strict";
const calScreen = document.getElementById("calScreen");
const angleMode = document.getElementById("angleMode");
const symbols = ['+', '-', '*', '/'];
const factorial = (n) => (n <= 0) ? 1 : n * factorial(n - 1);
let backspace = () => {
    let str = calScreen.innerHTML;
    calScreen.innerHTML = str.slice(0, str.length - 1);
};
let clrscr = () => {
    calScreen.innerHTML = " ";
};
let MathDotFact = (str, cb, eleArray) => {
    //replace all fact and give its real value(ans)
    eleArray.forEach((ele) => {
        let temp = `${cb}(${ele})`;
        str = str.replace(ele + "!", temp);
    });
    return str;
};
function fact(str) {
    let oprand = [];
    //check if factorial is there in str
    if (str.search("!") !== -1) {
        let factFound = [];
        str.split('').forEach((ele, index) => {
            if (ele === "!") {
                factFound.push(index);
            }
        });
        //find the oparand to which it is applied
        factFound.forEach((ele) => {
            let start = ele - 1; //starting index
            let pCount = 0; //for parenthesis
            let expr = '';
            while (start >= 0) {
                if (str[start] === ')') {
                    pCount++;
                }
                else if (str[start] === '(') {
                    pCount--;
                }
                if (symbols.includes(str[start]) && pCount == 0)
                    break;
                else {
                    expr = str[start] + expr;
                }
                start--;
            }
            //console.log(pCount);
            oprand.push(expr); //when expression is found pushed to oprands
        });
        //console.log(oprand)
    }
    return oprand;
}
let mathFun = (str, cb, s, angle = "") => {
    // console.log(str,cb,s);
    let oprand = [];
    //check if func is there in str
    if (str.search(s) !== -1) {
        let found = [];
        //found index of each occurance of func
        for (let i = 0; i < str.length - s.length + 1; i++) {
            if (str.substring(i, s.length + i) == s) {
                found.push(i);
            }
        }
        //find the oparand to which it is applied
        found.forEach((ele) => {
            let start = ele + s.length; //starting index
            let pCount = 0; //for parenthesis
            let expr = "";
            while (start < str.length) {
                if (str[start] === "(") {
                    pCount++;
                }
                else if (str[start] === ")") {
                    pCount--;
                }
                if (symbols.includes(str[start]) && pCount === 0)
                    break;
                else {
                    expr += str[start];
                }
                start++;
            }
            oprand.push(expr); //when expression is found pushed to oprands
        });
        if (angle == "DEG") {
            let degAngle = [];
            oprand.forEach((ele) => {
                let prev = ele;
                ele = ((eval(ele) * Math.PI) / 180).toString();
                // change str parameter which are in degree to angle
                str = str.replace(prev, ele);
                degAngle.push(ele);
            });
            //call the function with deg-to-red value and return ans
            degAngle.forEach((ele) => {
                let temp = `${cb}(${ele})`;
                str = str.replace(s + ele, temp);
            });
            return str;
        }
        else {
            //for other functions
            oprand.forEach((ele) => {
                let temp = `${cb}(${ele})`;
                str = str.replace(s + ele, temp);
            });
            return str;
        }
    }
    return str;
};
let evaluate = (str) => {
    let newstr = "";
    newstr = str.replace("÷", "/");
    newstr = newstr.replace("π", "Math.PI");
    newstr = newstr.replace("^", "**");
    newstr = newstr.replace("e", "Math.E");
    newstr = mathFun(newstr, 'Math.ceil', "ceil ");
    newstr = mathFun(newstr, 'Math.floor', "floor ");
    newstr = mathFun(newstr, 'Math.round', "round ");
    if (angleMode.innerHTML == "DEG") {
        newstr = mathFun(newstr, 'Math.sin', "sin ", "DEG");
        newstr = mathFun(newstr, 'Math.cos', "cos ", "DEG");
        newstr = mathFun(newstr, 'Math.tan', "tan ", "DEG");
    }
    else {
        newstr = mathFun(newstr, 'Math.sin', "sin ", "RED");
        newstr = mathFun(newstr, 'Math.cos', "cos ", "RED");
        newstr = mathFun(newstr, 'Math.tan', "tan ", "RED");
    }
    // newstr = mathFun(newstr,'Math.sqrt',"√");
    let factEle = fact(newstr);
    newstr = MathDotFact(newstr, 'factorial', factEle);
    // console.log(newstr)
    return newstr;
};
// Trigonometry function
function angleToogle() {
    if (angleMode.innerHTML == "DEG") {
        angleMode.innerHTML = "RED";
    }
    else {
        angleMode.innerHTML = "DEG";
    }
}
function dropdowntoogle(id) {
    var _a;
    (_a = document.getElementById(`${id}-menu`)) === null || _a === void 0 ? void 0 : _a.classList.toggle("show");
}
function onDropnBtnClick(id) {
    let str = calScreen.innerHTML;
    calScreen.innerHTML += `${id} `;
    if (id == 'sin' || id == 'cos' || id == 'tan') {
        dropdowntoogle("trig");
    }
    else {
        dropdowntoogle("func");
    }
}
function calculate() {
    let expression = evaluate(calScreen.innerHTML);
    console.log(expression);
    calScreen.innerHTML = eval(expression);
}
function plusMinus() {
    if (calScreen.innerText.charAt(0) == "-") {
        calScreen.innerText = calScreen.innerText.substring(1, calScreen.innerText.length);
    }
    else {
        calScreen.innerText = "-" + calScreen.innerText;
    }
}
function ln() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.log(Number(expression)).toString();
}
function log() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.log10(Number(expression)).toString();
}
function tenPower() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.pow(10, Number(expression)).toString();
}
function exp() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.exp(Number(expression)).toString();
}
function abs() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.abs(Number(expression)).toString();
}
function squareRoot() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.sqrt(Number(expression)).toString();
}
// Other Functions
// round, ceil, floor
//    function round() {
//     let expression=evaluate(calScreen.innerHTML);
//     calScreen.innerHTML=Math.round(expression)
//    }
function ceil() {
    let expression = evaluate(calScreen.innerHTML);
    calScreen.innerHTML = Math.ceil(Number(expression)).toString();
}
//    function floor() {
//     let expression=evaluate(calScreen.innerHTML);
//     calScreen.innerHTML=Math.floor(expression)
//    }
// Memory funtion
let Memory = (function () {
    let currentMemory = 0;
    function mmStore() {
        var _a, _b;
        let expression = evaluate(calScreen.innerHTML);
        if (eval(expression) != undefined)
            currentMemory = eval(expression);
        else
            currentMemory = 0;
        console.log("current memory stored as :" + currentMemory);
        (_a = document.getElementById("mc")) === null || _a === void 0 ? void 0 : _a.classList.remove("disabled");
        (_b = document.getElementById("mr")) === null || _b === void 0 ? void 0 : _b.classList.remove("disabled");
    }
    function mmClear() {
        var _a, _b;
        currentMemory = 0;
        console.log("current memory reset to 0:" + currentMemory);
        (_a = document.getElementById("mc")) === null || _a === void 0 ? void 0 : _a.classList.add("disabled");
        (_b = document.getElementById("mr")) === null || _b === void 0 ? void 0 : _b.classList.add("disabled");
    }
    function mmRecall() {
        calScreen.innerHTML = currentMemory.toString();
        console.log("Current Memory :" + currentMemory);
    }
    function mmAdd() {
        let expression = evaluate(calScreen.innerHTML);
        let added = eval(expression);
        currentMemory += added;
        calScreen.innerHTML = currentMemory.toString();
        console.log(`${added} is added to current memory.`);
        console.log("Current Memory :" + currentMemory);
    }
    function mmSub() {
        let expression = evaluate(calScreen.innerHTML);
        let sub = eval(expression);
        currentMemory -= sub;
        calScreen.innerHTML = currentMemory.toString();
        console.log(`${sub} is subtracted from current memory.`);
        console.log("Current Memory :" + currentMemory);
    }
    return {
        mmStore,
        mmAdd,
        mmSub,
        mmClear,
        mmRecall,
    };
})();
