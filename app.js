const calculator = document.getElementById("calculator");
const viewCalc = document.getElementById("viewCalc");
viewCalc.value = "2+4/2*5-6";
const sumbitBtn = document.getElementById("submitBtn");
const historyArea = document.getElementById("history");

calculator.addEventListener("click", function (e) {
    if (e.target.dataset.item !== undefined) {
        viewCalc.value += e.target.dataset.item;
        return;
    }
});

sumbitBtn.onclick = () => calc(viewCalc.value);


// Calculator Function Start

function calc(value) {
    let regex = /(\d+)([\*\/\+\-])(\d+)/g;
    let formulaStr = value;
    formulaStr = divi(formulaStr);
    formulaStr = multi(formulaStr);
    formulaStr = add(formulaStr);
    formulaStr = sub(formulaStr);

    historyArea.insertAdjacentHTML("beforeend", `<p>${value} = <span class="result">${formulaStr}<span></p>`);
}

function sub(formulaStr) {
    let pFormulaStr = new String(formulaStr);
    let regex = /(\/?\d+\.?\d*)([\-])(\d+\.?\d*)/g;
    while (true) {
        let formula = regex.exec(formulaStr);

        if (formula == null) break;
        let sum = 0;

        let arrFormula = formula.map((value, index, array) => {
            if (value.includes("/") && index !== 0) {
                return value.replace(value, 1 / value.match(/\d+/));
            }
            return value;
        });

        console.log(arrFormula);
        console.log(formula);

        sum += +arrFormula[1] - +arrFormula[3];
        console.log(sum);

        pFormulaStr = pFormulaStr.replace(arrFormula[0], sum);
    }

    if (pFormulaStr.match(/\d+[\-]/)) return sub(pFormulaStr);

    return pFormulaStr;
}

function add(formulaStr) {
    let pFormulaStr = new String(formulaStr);
    let regex = /(\/?\d+\.?\d*)([\+])(\d+\.?\d*)/g;
    while (true) {
        let formula = regex.exec(formulaStr);

        if (formula == null) break;
        let sum = 0;

        let arrFormula = formula.map((value, index, array) => {
            if (value.includes("/") && index !== 0) {
                return value.replace(value, 1 / value.match(/\d+/));
            }
            return value;
        });

        console.log(arrFormula);
        console.log(formula);

        sum += +arrFormula[1] + +arrFormula[3];
        console.log(sum);

        pFormulaStr = pFormulaStr.replace(arrFormula[0], sum);
    }

    if (pFormulaStr.match(/[\+]/)) return add(pFormulaStr);

    return pFormulaStr;
}

function divi(formulaStr) {
    let pFormulaStr = new String(formulaStr);
    let regex = /(\/?\d+\.?\d*)([\/])(\d+\.?\d*)/g;
    while (true) {
        let formula = regex.exec(formulaStr);

        if (formula == null) break;
        let sum = 0;

        let arrFormula = formula.map((value, index, array) => {
            if (value.includes("/") && index !== 0) {
                return value.replace(value, 1 / value.match(/\d+/));
            }
            return value;
        });

        console.log(arrFormula);
        console.log(formula);

        sum += +arrFormula[1] / +arrFormula[3];
        console.log(sum);

        pFormulaStr = pFormulaStr.replace(arrFormula[0], sum);
    }

    if (pFormulaStr.match(/[\/]/)) return divi(pFormulaStr);

    return pFormulaStr;
}

function multi(formulaStr) {
    let pFormulaStr = new String(formulaStr);
    let regex = /(\/?\d+\.?\d*)([\*])(\d+\.?\d*)/g;
    while (true) {
        let formula = regex.exec(formulaStr);

        if (formula == null) break;
        let sum = 0;

        let arrFormula = formula.map((value, index, array) => {
            if (index === 0) {
                return value.replace("/", "");
            }
            if (value.includes("/") && index !== 0) {
                return value.replace(value, 1 / value.match(/\d+/));
            }
            return value;
        });

        console.log(arrFormula);
        console.log(formula);

        sum += +arrFormula[1] * +arrFormula[3];
        console.log(sum);

        pFormulaStr = pFormulaStr.replace(arrFormula[0], sum);
    }

    if (pFormulaStr.match(/[\*]/)) return multi(pFormulaStr);

    return pFormulaStr;
}