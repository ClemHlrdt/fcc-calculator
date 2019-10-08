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
            { id: "seven", value: "7" },
            { id: "eight", value: "8" },
            { id: "nine", value: "9" },
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
            expression: ''

        }
        this.PLACEHOLDER = 'do your math';
        this.ERROR = 'Ohoh something is wrong...'
    }

    clearDisplay = () => {
        this.setState({
            total: 0,
            expression: ''
        });
    }

    componentWillMount() {
        document.addEventListener("keypress", event => {
            console.log(event.key);
            // if key is a number or +, -, . => updateExpression
            if (!isNaN(event.key) || event.key === '+' || event.key === '-' || event.key === '.')
                this.updateExpression(event.key);
            else if (event.key === '/') this.updateExpression('÷');
            else if (event.key === '*') this.updateExpression('×');
            else if (event.key === '(') this.updateExpression('(')
            else if (event.key === ')') this.updateExpression(')')
            else if (event.key === 'Enter') this.updateExpression('=');
            else if (event.key === 'Escape') this.updateExpression('clear');
            else if (event.key === 'Backspace') this.updateExpression('↶');
            else return
        });
    }

    undo = (currentExpression) => {
        // if currentExpression is equal to the total, return currentExpression
        if (currentExpression === String(this.state.total)) return currentExpression;
        // else, if the length of the current expression is above 1 and it is not equal to the placeholder
        return currentExpression.length > 1 && currentExpression !== this.PLACEHOLDER
            ? currentExpression.substr(0, currentExpression.length - 1)
            : this.PLACEHOLDER

    }

    addDigit(currExpr, pad) {
        console.log('Added a digit');
        return currExpr === '0' || currExpr === this.PLACEHOLDER || currExpr === this.ERROR
            ? pad
            : currExpr + pad;
    }

    addDecimal(currExpr, pad) {
        return currExpr === '0' || currExpr === this.PLACEHOLDER || currExpr === this.ERROR
            ? pad
            : currExpr + '.';
    }

    addOperator(currExpr, pad) {
        const endsWithNaN = isNaN(currExpr.substr(currExpr.length - 1));
        const endsWithaSpace = currExpr.substr(currExpr.length - 1) === ' ';
        if (endsWithaSpace)
            return currExpr.substr(0, currExpr.length - 2) + ' ' + pad + ' ';
        else if (endsWithNaN)
            return currExpr;
        else
            return currExpr + ' ' + pad + ' ';
    }

    addParenthesis(currExpr, pad) {
        return currExpr + ' ' + pad + ' ';
    }

    formatExpression = (currExpr) => {
        // remove spaces, change × to *, ÷ to /
        return currExpr.replace(/ /g, '').replace(/×/g, '*').replace(/÷/g, '/');
    }

    doMath = (currExpr) => {
        // TODO: Convert resulting large decimal numbers into exponents.
        let total = this.state.total;
        let updateExpr = this.state.expression;
        currExpr = this.formatExpression(currExpr);
        if (isNaN(currExpr[currExpr.length - 1])) {
            this.setState({
                total: 'ERROR', expression: this.ERROR
            }, () => setTimeout(() => {
                this.setState({
                    total: total,
                    expression: updateExpr
                })
            }, 1000));
            return;
        } else {
            total = updateExpr = currExpr !== '' ? new Function(`return ${currExpr}`)() : '';
            if (String(total).indexOf('.') !== -1)
                if (String(total).split('.')[1].length > 5) this.manyDecimals = true;
                else this.manyDecimals = false;
        }
        this.setState({
            total: total,
            expression: updateExpr,
            manyDecimals: this.manyDecimals
        });
    };


    updateExpression = pad => {
        console.log("called", pad);
        // get current expression
        const currExpr = String(this.state.expression);
        let updateExpr = '';
        // get current 
        let updateTotal = this.state.total;
        // if clear => clear state
        if (pad === 'AC') return this.clearDisplay();
        else if (pad === '↶') updateExpr = this.undo(currExpr);
        else if (!isNaN(pad)) updateExpr = this.addDigit(currExpr, pad);
        else if (pad === '.') updateExpr = this.addDecimal(currExpr, pad);
        else if (pad === '(' || pad === ')') updateExpr = this.addParenthesis(currExpr, pad)
        else if (pad === '+'
            || pad === '-'
            || pad === '×'
            || pad === '÷') updateExpr = this.addOperator(currExpr, pad);
        else if (pad === '=') return this.doMath(currExpr);
        this.setState({
            expression: updateExpr,
            total: updateTotal
        });
    }

    render() {
        return (
            <section>
                <div className="Calculator">
                    <Display total={this.state.total} expression={this.state.expression}
                    />
                    <Brand brandName="React Calculator" />
                    <Buttons buttons={this.actions} updateExpr={this.updateExpression} />
                </div>
            </section>
        );
    }
}

export default Calculator;