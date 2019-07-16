<template>
  <button :class="btnClass" @click="onClick" :disabled="btnDisabled">{{btnText}}</button>
</template>

<script>
export default {
  name: 'VuelatorBtn',
  computed: {
    setBtnValue() {
      const { btnValue, btnText } = this;
      return btnValue || btnText;
    },
  },
  props: {
    btnText: {
      type: String,
      required: true,
    },
    btnClass: {
      type: String,
    },
    btnValue: {
      type: String,
      default: null,
    },
    btnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      const value = !this.btnValue ? this.btnText : this.btnValue;
      this.$emit('clicked', value);
    },
  },
};
</script>
