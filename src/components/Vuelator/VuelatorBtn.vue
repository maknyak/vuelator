<template>
  <div class="vuelator-btn">
    <button :class="btnClass" @click="onClick" :disabled="btnDisabled">{{btnText}}</button>
  </div>
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
      required: true,
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

<style lang="scss">
  .vuelator-btn {
    display: inline-block;

    .btn {

      display: inline-block;
    }
  }
</style>
