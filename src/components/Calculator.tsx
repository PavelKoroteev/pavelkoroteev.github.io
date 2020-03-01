import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';
import Button from './Button';

import styles from './Calculator.css?module'

interface Props {
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
  }

  private onCalculateClick(event: MouseEvent) {
    this.$store.state.buffer = String(this.result);
  }

  render() {
    return (
      <div class={styles.calculator}>
        <div class={[styles['number-display'], styles.buffer]}>{this.bufferRltToNormal}</div>
        <div class={[styles['number-display'], styles.result]}>{this.resultRtlToNormal}&nbsp;=</div>

        <Button type="Number" value="0" classes={[styles.zero]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="1" classes={[styles.one]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="2" classes={[styles.two]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="3" classes={[styles.three]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="4" classes={[styles.four]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="5" classes={[styles.five]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="6" classes={[styles.six]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="7" classes={[styles.seven]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="8" classes={[styles.eight]} handleClick={this.handleChangeValue}></Button>
        <Button type="Number" value="9" classes={[styles.nine]} handleClick={this.handleChangeValue}></Button>

        <Button type="Action" value="C" classes={[styles.clear]} handleClick={this.onClearClick}></Button>
        <Button type="Action" value="-" classes={[styles.minus]} handleClick={this.onOperatorClick}></Button>
        <Button type="Action" value="+" classes={[styles.plus]} handleClick={this.onOperatorClick}></Button>
        <Button type="Action" value="=" classes={[styles.calculate]} handleClick={this.onCalculateClick}></Button>
      </div>
    )
  }
}
