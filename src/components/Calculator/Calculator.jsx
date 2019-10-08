import React, { Component } from 'react';
import './Calculator.scss';
import Display from '../Display/Display';
import Brand from '../Brand/Brand';
import Buttons from '../Buttons/Buttons';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.actions = [
            { id: "clear", value: "AC" },
            { id: "back", value: "↶" },
            { id: "leftParenthesis", value: "(" },
            { id: "rightParenthesis", value: ")" },
            {id: "seven", value: "7"},
            {id: "eight", value: "8"},
            {id: "nine", value: "9"},
            { id: "divide", value: "÷" },
            { id: "four", value: "4" },
            { id: "five", value: "5" },
            { id: "six", value: "6" },
            { id: "multiply", value: "×" },
            { id: "one", value: "1" },
            { id: "two", value: "2" },
            { id: "three", value: "3" },
            { id: "subtract", value: "-" },
            { id: "decimal", value: "." },
            { id: "zero", value: "0" },
            { id: "equals", value: "=" },
            { id: "add", value: "+" },
        ];

        this.state = {
            total: 0,
            expression: 0

        }
    }

    clearDisplay = () => {
        this.setState({
            total: 0,
            expression: 0
        });
    }

    componentWillMount() {
        document.addEventListener("keypress", event => console.log(event.key));
    }

    // addDigit
    // addDecimal
    // addOperator
    // doMath

    updateExpression = pad => {
        const currExpr = String(this.state.expression);
        let updateExpr = '';
        let updateResult = this.state.result;
        if (pad === 'clear') return this.clearDisplay();
        else if (pad === '↶') updateExpr = this.unDo(currExpr);
        else if (!isNaN(pad)) updateExpr = this.addDigit(currExpr, pad);
        else if (pad === '.') updateExpr = this.addDecimal(currExpr, pad);
        else if (pad === '+'
            || pad === '-'
            || pad === '×'
            || pad === '÷') updateExpr = this.addOperator(currExpr, pad);
        else if (pad === '=') return this.doMath(currExpr);
        this.setState({
            expression: updateExpr,
            result: updateResult
        });
    }

    render() {
        return (
            <section>
                <div className="Calculator">
                    <Display total={this.state.total} expression={this.state.expression}
                    />
                    <Brand brandName="React Calculator" />
                    <Buttons buttons={this.actions} updateExpr={this.updateExpression}/>
                </div>
            </section>
        );
    }
}

export default Calculator;