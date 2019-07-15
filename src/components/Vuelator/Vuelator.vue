<template>
  <div class="vuelator">
    <div>{{total}}{{expression}}{{input}}</div>
    <div>
      <ul v-if="logs.length > 0">
        <li v-for="(log, index) in logs" :key="index">{{log}}</li>
      </ul>
    </div>
    <vuelator-btn btnClass="btn" btnText="1" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="2" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="3" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="4" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="5" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="6" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="7" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="8" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="9" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="0" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="+" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="-" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="*" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="/" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="." @clicked="setDecimal"/>
    <vuelator-btn btnClass="btn" btnText="=" @clicked="doCalculate"/>
    <vuelator-btn btnClass="btn" btnText="C" @clicked="doReset"/>
  </div>
</template>

<script>
import VuelatorBtn from '@/components/Vuelator/VuelatorBtn.vue';
import VuelatorLog from '@/components/Vuelator/VuelatorLog.vue';

export default {
  components: {
    VuelatorBtn,
  },
  computed: {
    getDisplay() {
      return this.$store.getters.getDisplay;
    },
  },
  data() {
    return {
      input: 0,
      expression: '',
      total: '',
      logs: [],
    };
  },
  methods: {
    setDigit(value) {
      const { isOperator } = this;

      if (isOperator(value)) {
        if (this.total) {
          this.expression += this.total + value;
        } else {
          this.expression += this.input + value;
        }
        this.input = '';
        this.total = '';
      } else if (this.input.toString() === '0' && !isNaN(value)) {
        this.input = Number(this.input + value);
      } else {
        this.input += value;
        this.total = '';
      }
    },
    doCalculate() {
      this.expression += this.input;
      // eslint-disable-next-line no-eval
      this.total = eval(this.expression);
      this.expression += `=${this.total}`;

      // save to history
      if (this.expression) {
        this.logs.push(this.expression);
        this.input = '';
        this.expression = '';
      }
    },
    setDecimal() {
      const { input } = this;
      const isDecimal = input.toString().includes('.');

      if (!isDecimal) {
        this.input += '.';
      }
    },
    doReset() {
      this.expression = '';
      this.input = 0;
    },
    isOperator(type) {
      return type === '+' || type === '-' || type === '*' || type === '/' || type === '-' || type === '=';
    },
  },
};
</script>
