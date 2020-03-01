import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '../shims-vue';

import styles from './Button.css?module'

enum type {
    'Number' = 'Number',
    'Action' = 'Action'
}

interface Props {
  value: string,
  classes: Array<string>,
  type: 'Number' | 'Action',
  handleClick: Function
}

const typeClasses = {
    [type.Action]: styles['action-button'],
    [type.Number]: styles['number-button']
};

@Component
export default class Calculator extends VueComponent<Props> {
  @Prop()
  private value!: string;

  @Prop()
  handleClick!: Function;

  @Prop()
  private classes!: Array<string>;

  @Prop()
  private type!: 'Number' | 'Action';

  public onClick(event: MouseEvent) {
      this.handleClick(this.value);
  }

  render() {
    const typeClass: string = typeClasses[this.type];
    return (
        <div onClick={this.onClick} class={[styles['button'], typeClass, ...this.classes]}>
            {this.value}
        </div>
    )
  }
}
