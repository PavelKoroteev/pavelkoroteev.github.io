import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';
import Button from './Button';

import styles from './Calculator.css?module'

interface Props {
}

@Component
export default class Calculator extends VueComponent<Props> {
  private isNeedCalculate = true;
  private isLoading = false;

  calucateDecorator(fn: Function) {
    return (...args: Array<any>) => {
      this.isNeedCalculate = true;
      return fn(...args);
    }
  }

  get buffer() {
    return this.$store.state.buffer;
  }

  get result() {
    return this.$store.state.result;
  }

  getResult(expression: string) {
    const correctExpression = expression.replace(/[^\d]*$/g, '');
    return eval(correctExpression);
  }

  negativeNumberRltToNormal(number: string) {
    return number.split(/(?<=-)(?=\d)/).reverse().join('');
  }

  get bufferRltToNormal() {
    return this.$store.state.buffer
      .split(/(?<=\d)(?=\s)|(?<=\s)(?=\d)/)
      .reverse()
      .map(this.negativeNumberRltToNormal)
      .join('');
  }

  get resultRtlToNormal() {
    return this.negativeNumberRltToNormal(String(this.result));
  }

  get displayResult() {
    if (this.isNeedCalculate) {
      return '';
    }

    return `${this.resultRtlToNormal} =`;
  }

  public handleChangeValue(value: string) {
    const buffer = this.$store.state.buffer;
    const lastNumberMatch = buffer.match(/\d+$/g);

    if (Array.isArray(lastNumberMatch) && parseInt(lastNumberMatch[0]) === 0) {
      this.$store.state.buffer = this.replaceLastChar(buffer, value);
    } else {
      this.$store.state.buffer += value;
    }
  }

  private replaceLastChar(string: string, char: string): string {
    return string.slice(0, -1) + char;
  }

  private onOperatorClick(value: string) {
    const isLastCharNotDigit = /[^\d]$/.test(this.$store.state.buffer);
    if (isLastCharNotDigit) {
      return;
    }
    this.$store.state.buffer += ` ${value} `;
  }

  private onClearClick(value: string) {
    this.$store.state.buffer = '0';
    this.$store.state.result = '0';
  }

  private async onCalculateClick(value: string) {
    this.setLoading(true);
    try {
      const result = await this.fetchCalculated(this.$store.state.buffer);
      this.isNeedCalculate = false;
      this.$store.state.result = result;
      this.$store.state.buffer = String(result);
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(state: boolean) {
    this.isLoading = state;
  }

  private fetchCalculated(expression: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = this.getResult(expression);
        resolve(result);
      }, 2000);
    });
  }

  render() {
    const mainStyles = [styles.calculator];
    if (this.isLoading) {
      mainStyles.push(styles.calculator_loading);
    }

    return (
      <div class={mainStyles}>
        <div class={[styles['number-display'], styles.buffer]}>{this.bufferRltToNormal}</div>
        <div class={[styles['number-display'], styles.result]}>{this.displayResult}</div>

        <Button type="Number" value="0" classes={[styles.zero]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="1" classes={[styles.one]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="2" classes={[styles.two]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="3" classes={[styles.three]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="4" classes={[styles.four]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="5" classes={[styles.five]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="6" classes={[styles.six]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="7" classes={[styles.seven]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="8" classes={[styles.eight]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>
        <Button type="Number" value="9" classes={[styles.nine]} handleClick={this.calucateDecorator(this.handleChangeValue)}></Button>

        <Button type="Action" value="C" classes={[styles.clear]} handleClick={this.calucateDecorator(this.onClearClick)}></Button>
        <Button type="Action" value="-" classes={[styles.minus]} handleClick={this.calucateDecorator(this.onOperatorClick)}></Button>
        <Button type="Action" value="+" classes={[styles.plus]} handleClick={this.calucateDecorator(this.onOperatorClick)}></Button>
        <Button type="Action" value="=" classes={[styles.calculate]} handleClick={this.calucateDecorator(this.onCalculateClick)}></Button>
      </div>
    )
  }
}
