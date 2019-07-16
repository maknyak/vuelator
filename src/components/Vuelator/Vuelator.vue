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
    <vuelator-btn btnClass="btn" btnText="+" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText="-" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText="x" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText=":" @clicked="setOperator"/>
    <vuelator-btn btnClass="btn" btnText="." @clicked="setDecimal"/>
<!--    <vuelator-btn btnClass="btn" btnText="=" @clicked="doCalculate"/>-->
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
        this.expression += this.input + operator; // set operator
        this.input = '';
      }
    },
    setDecimal() {
      const isDecimal = this.input.toString().includes('.');

      if (!isDecimal && this.input !== '') {
        this.input += '.';
      }
    },
    isOperator(tipe) {
      return tipe === '+' || tipe === '-' || tipe === ':' || tipe === 'x';
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
  },
};
</script>
