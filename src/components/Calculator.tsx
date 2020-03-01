import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './Calculator.css?module'

interface Props {
  msg: string
}

@Component
export default class Calculator extends VueComponent<Props> {
  @Prop()
  private msg!: string;

  get buffer() {
    return this.$store.state.buffer;
  }

  get result() {
    const correctExpression = this.buffer.replace(/[^\d]*$/g, '');
    return eval(correctExpression);
  }

  get bufferRltToNormal() {
    return this.$store.state.buffer.split(/(?<=\d)(?=\s)|(?<=\s)(?=\d)/).reverse().join('');
  }

  get resultRtlToNormal() {
    return String(this.result).split(/(?<=-)/).reverse().join('');
  }

  onNumberClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const value = target.innerText.trim();

    const buffer = this.$store.state.buffer;
    const lastNumberMatch = buffer.match(/\d+$/g);

    if (Array.isArray(lastNumberMatch) && parseInt(lastNumberMatch[0]) === 0) {
      this.$store.state.buffer = this.replaceLastChar(buffer, value);
    } else {
      this.$store.state.buffer += value;
    }
  }

  replaceLastChar(string: string, char: string): string {
    return string.slice(0, -1) + char;
  }

  onOperatorClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isLastCharNotDigit = /[^\d]$/.test(this.$store.state.buffer);
    if (isLastCharNotDigit) {
      return;
    }
    this.$store.state.buffer += ` ${target.innerText.trim()} `;
  }

  onClearClick(event: MouseEvent) {
    this.$store.state.buffer = '0';
  }

  onCalculateClick(event: MouseEvent) {
    this.$store.state.buffer = String(this.result);
  }

  render() {
    return (
      <div class={styles.calculator}>
        {/* <h1>{ this.msg }</h1> */}

        <div class={[styles['number-display'], styles.buffer]}>{this.bufferRltToNormal}</div>
        <div class={[styles['number-display'], styles.result]}>{this.resultRtlToNormal}&nbsp;=</div>

        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.zero]}>0</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.one]}>1</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.two]}>2</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.three]}>3</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.four]}>4</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.five]}>5</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.six]}>6</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.seven]}>7</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.eight]}>8</div>
        <div onClick={this.onNumberClick} class={[styles['button'], styles['number-button'], styles.nine]}>9</div>

        <div onClick={this.onClearClick} class={[styles['button'], styles['action-button'], styles.clear]}>C</div>
        <div onClick={this.onOperatorClick} class={[styles['button'], styles['action-button'], styles.minus]}>-</div>
        <div onClick={this.onOperatorClick} class={[styles['button'], styles['action-button'], styles.plus]}>+</div>
        <div onClick={this.onCalculateClick} class={[styles['button'], styles['action-button'], styles.calculate]}>=</div>

      </div>
    )
  }
}
