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

  render() {
    return (
      <div class={styles.calculator}>
        {/* <h1>{ this.msg }</h1> */}

        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.zero]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.one]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.two]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.three]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.four]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.five]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.six]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.seven]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.eight]}></div>
        <div v-on:click="console.log('1')" class={[styles['number-buttons'], styles.nine]}></div>

        <div v-on:click="console.log('1')" class={[styles['action-buttons'], styles.clear]}></div>
        <div v-on:click="console.log('1')" class={[styles['action-buttons'], styles.minus]}></div>
        <div v-on:click="console.log('1')" class={[styles['action-buttons'], styles.plus]}></div>
        <div v-on:click="console.log('1')" class={[styles['action-buttons'], styles.result]}></div>

      </div>
    )
  }
}
