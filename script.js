import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";


//Regex to test the input
const operatorRegex = /[\-+×÷]/g;
const numberRegex= /[0-9]/g;


//Setting calculator function 
function multipleSignClean(str) {

    // handle multiple signs to the last one
    const signCleanUpRegex = /([+\-×÷]{1,})(?=([+×÷][\-]{0,1}[0-9.]+))/g;

    return str.replace(signCleanUpRegex, "");
}

function doubleSignClean(str) {
    //--|++ => + change 2 minus or 2 plus into 1 plus
    const doubleSignRegex = /[\-+]{2}(?=[0-9.]+)/g;
    return str.replace(doubleSignRegex, "+");
}

console.log(multipleSignClean("555-×+÷÷÷÷3"));

function calculateFromString(string) {
    //Replace everything except calculator touch input with ""
    let sanitizedString = string.replace(/[^-()\d\/+*.]/g, '');
    return eval(sanitizedString);
}

function haveDecimalPoint(str) {
    let arrNumbers = str.split(operatorRegex);
    return /[.]/.test(arrNumbers[arrNumbers.length - 1]);
}

function convertSignIntoMathOperator(str) {
    // Change × into * then ÷ into /
    return str.replace("×", "*")
        .replace("÷", "/");
}


class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            resultNum: '',
            calculResult: false
        };

        this.inputChange = this.inputChange.bind(this);
        this.clear = this.clear.bind(this);
        this.calculate = this.calculate.bind(this);

    }

    componentDidMount() {

        $(".digit div, .operator div").on("click", this.inputChange);
    }
    componentWillUnmount() {
        $(".digit div").off("click", this.inputChange);
    }

    inputChange(e) {
        let data = $(e.target).html();

        this.setState(state => {
            
            //control number of zero before decimal point
            if (operatorRegex.test(state.input[state.input.length - 1]) && operatorRegex.test(data)) {
                if (data != "-") {
                    return {
                        input: state.input.slice(0, inputTextLength - 1) + data
                    }
                }
            }
           else if (state.input == "0") {
                if (data == "." || operatorRegex.test(data)) {
                    return {
                        input: state.input + data,
                        resultNum: ''
                    };
                }
                else if (numberRegex.test(data)) {
                    return {
                        input: data,
                        resultNum: ''
                    };

                }
            }
        
            else if (state.input != "0") {
                // allow only one decimal point for a number
                if (data == "." && !haveDecimalPoint(state.input)) {
                    return {
                        input: state.input + data,
                        resultNum: ''
                    };

                }
            
                else if (numberRegex.test(data) || operatorRegex.test(data)) {
                    return {
                        input: state.input + data,
                        resultNum: ''
                    };

                }
            }
        });
    }

    clear() {
        this.setState({
            input: "0",
            resultNum: ""
        });

    }

    calculate() {
        this.setState(state => {
            if (state.input) {
                let result = calculateFromString(convertSignIntoMathOperator(state.input));
                return {
                    resultNum: state.input,
                    input: result.toString()
                };

            }
        });
    }

    render() {

        return /*#__PURE__*/ (
            React.createElement("div", { id: "react-body" }, /*#__PURE__*/
                React.createElement(Screen, { screenInput: this.state.input, resultNum: this.state.resultNum }), /*#__PURE__*/
                React.createElement("div", { className: "touch-pad" }, /*#__PURE__*/
                    React.createElement("div", { className: "digit" }, /*#__PURE__*/
                        React.createElement("div", { id: "seven", role: "button" }, "7"), /*#__PURE__*/
                        React.createElement("div", { id: "eight", role: "button" }, "8"), /*#__PURE__*/
                        React.createElement("div", { id: "nine", role: "button" }, "9"), /*#__PURE__*/
                        React.createElement("div", { id: "four", role: "button" }, "4"), /*#__PURE__*/
                        React.createElement("div", { id: "five", role: "button" }, "5"), /*#__PURE__*/
                        React.createElement("div", { id: "six", role: "button" }, "6"), /*#__PURE__*/
                        React.createElement("div", { id: "one", role: "button" }, "1"), /*#__PURE__*/
                        React.createElement("div", { id: "two", role: "button" }, "2"), /*#__PURE__*/
                        React.createElement("div", { id: "three", role: "button" }, "3"), /*#__PURE__*/
                        React.createElement("div", { id: "zero", role: "button" }, "0"), /*#__PURE__*/
                        React.createElement("div", { id: "decimal", role: "button" }, ".")), /*#__PURE__*/

                    React.createElement("div", { className: "operator" }, /*#__PURE__*/
                        React.createElement("div", { id: "add", role: "button" }, "+"), /*#__PURE__*/
                        React.createElement("div", { id: "subtract", role: "button" }, "-"), /*#__PURE__*/
                        React.createElement("div", { id: "multiply", role: "button" }, "\xD7"), /*#__PURE__*/
                        React.createElement("div", { id: "divide", role: "button" }, "\xF7")), /*#__PURE__*/

                    React.createElement("div", { className: "result" }, /*#__PURE__*/
                        React.createElement("div", { id: "clear", role: "button", onClick: this.clear }, "CA"), /*#__PURE__*/
                        React.createElement("div", { id: "equals", role: "button", onClick: this.calculate }, "=")))));




    }
}


class Screen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return /*#__PURE__*/ (
            React.createElement("div", { id: "screen" }, /*#__PURE__*/
                React.createElement("div", { id: "sup-display" }, this.props.resultNum), /*#__PURE__*/
                React.createElement("hr", null), /*#__PURE__*/
                React.createElement("div", { id: "display" }, /*#__PURE__*/
                    React.createElement("span", null, this.props.screenInput))));



    }
}


ReactDOM.render( /*#__PURE__*/ React.createElement(Calculator, null), document.getElementById("calculator-display"));