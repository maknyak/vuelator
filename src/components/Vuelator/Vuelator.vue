<template>
  <div class="vuelator">
    <div>{{expression}}{{input}}</div>
    <div>{{total}}</div>
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
    <vuelator-btn btnClass="btn" btnText="x" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText=":" @clicked="setDigit"/>
    <vuelator-btn btnClass="btn" btnText="." @clicked="setDecimal"/>
    <vuelator-btn btnClass="btn" btnText="=" @clicked="doCalculate"/>
    <vuelator-btn btnClass="btn" btnText="+/-" @clicked="setNegatifNumber"/>
    <vuelator-btn btnClass="btn" btnText="%" @clicked="doPercentage"/>
    <vuelator-btn btnClass="btn" btnText="Clear" @clicked="doReset"/>
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
      const isDecimal = this.input.toString().includes('.');

      if (isOperator(value)) {
        // check input on decimal value
        const lastIndex = this.input.length - 1;
        if (isDecimal && isNaN(this.input[lastIndex])) {
          return false;
        }

        if (this.total) {
          this.expression += this.total + value;
        } else {
          this.expression += this.input + value;

          // check if operator has duplicated
          const last = this.expression.substr(-2);
          if (isOperator(last[0]) && isOperator(last[1])) {
            this.expression = this.expression.replace(last, value);
          }
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

      console.log(this.input);
    },
    setDecimal() {
      const isDecimal = this.input.toString().includes('.');

      if (!isDecimal && this.input !== '') {
        this.input += '.';
      }
    },
    setNegatifNumber() {
      if (this.input > 0) {
        this.input = `(-${this.input})`;
      }
    },
    doPercentage() {
      if (this.input > 0) {
        const result = Number(this.input) * 0.01;
        this.input = result;
      }
    },
    doReset() {
      this.expression = '';
      this.total = '';
      this.input = 0;
    },
    doCalculate() {
      this.expression += this.input;
      if (this.expression === '0:0') {
        alert('Infinity');
        this.doReset();
      } else {
        this.expression = this.expression.replace(/x/g, '*');
        // eslint-disable-next-line no-useless-escape
        this.expression = this.expression.replace(/\:/g, '/');

        // eslint-disable-next-line no-eval
        this.total = eval(this.expression); // calculate total
        this.expression += `=${parseFloat(this.total)}`;

        // save to history
        if (this.expression) {
          this.logs.push(this.expression);

          // reset variable
          this.input = '';
          this.expression = '';
        }
      }
    },
    isOperator(type) {
      return type === '+' || type === '-' || type === 'x' || type === ':' || type === '-' || type === '=';
    },
  },
};
</script>
