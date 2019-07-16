<template>
  <div class="vuelator">
    <div>{{expression}}{{input}}</div>
    <div>{{total}}</div>
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
    <vuelator-btn btnClass="btn" btnText="+" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText="-" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText="x" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText=":" @clicked="setOperator"/>
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
    };
  },
  methods: {
    setDigit(value) {
      this.total = ''; // reset total
      if (this.input === 0 || this.input === '') {
        this.input = Number(this.input + value); // is not decimal number, remove 0
      } else {
        this.input += value; // concat new digit
      }
    },
    setOperator(operator) {
      const { isOperator } = this;
      const last = this.expression.substr(-1);

      if (isOperator(last) && this.input === '') {
        const expression = this.expression.slice(0, -1); // remove operator
        this.expression = expression + operator; // and replace with new operator
      } else {
        if (this.total) {
          this.expression += this.total + operator; // calculate previous total
        } else {
          this.expression += this.input + operator; // set operator
        }

        this.input = '';
        this.total = '';
      }
    },
    setDecimal() {
      const isDecimal = this.input.toString().includes('.');

      // set value as decimal number if value contains .
      if (!isDecimal && this.input !== '') {
        this.input += '.';
      }
    },
    isOperator(tipe) {
      // check current value is operator
      return tipe === '+' || tipe === '-' || tipe === ':' || tipe === 'x';
    },
    setNegatifNumber() {
      // add negatif number if value more than 0
      if (this.input > 0) {
        this.input = `(-${this.input})`;
      }
    },
    doPercentage() {
      if (this.input > 0) {
        // calculate percentage if value more than 0
        const result = Number(this.input) * 0.01;
        this.input = result;
      }
    },
    doReset() {
      // reset all variable
      this.expression = '';
      this.total = '';
      this.input = 0;
    },
    doCalculate() {
      const { isOperator } = this;
      const last = this.expression.substr(-1);

      let expression = '';
      if (isOperator(last) && this.input !== '') {
        this.expression += this.input;

        // convert : or x with aritmatic operator
        // eslint-disable-next-line no-useless-escape
        expression = this.expression.replace(/\:/g, '/');
        expression = this.expression.replace(/x/g, '*');

        // eslint-disable-next-line no-eval
        const total = eval(expression); // calculate total
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(total)) {
          this.expression += `=${parseFloat(total)}`;
          this.total = total;

          const logs = [];
          if (this.expression) {
            logs.push(this.expression);
            this.$store.commit('SET_LOGS', logs);
          }
        } else {
          alert('Infinite!');
        }

        // reset variable
        this.input = '';
        this.expression = '';
      }
    },
  },
};
</script>
