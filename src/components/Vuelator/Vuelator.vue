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

        // reset variable
        this.input = '';
        this.total = '';
        // eslint-disable-next-line no-restricted-globals
      } else if (this.input.toString() === '0' && !isNaN(value)) {
        // remove 0 if not decimal number
        this.input = Number(this.input + value);
      } else {
        this.input += value;
        this.total = '';
      }
    },
    doCalculate() {
      this.expression += this.input;
      // eslint-disable-next-line no-eval
      this.total = eval(this.expression); // count total
      this.expression += `=${this.total}`;

      // save to history
      if (this.expression) {
        this.logs.push(this.expression);

        // reset variable
        this.input = '';
        this.expression = '';
      }
    },
    setDecimal() {
      const isDecimal = this.input.toString().includes('.');

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
