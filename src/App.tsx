import { Component, Vue } from 'vue-property-decorator';
import Calculator from './components/Calculator';

import './App.css'

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        <img alt="Vue logo" src={require('./assets/logo.png')} />
        <Calculator msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
    )
  }
}
