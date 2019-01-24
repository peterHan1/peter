<template>
  <button 
    :class="btnClass"
    class="td-btn"
    @click="btnFun">
    {{ value }}
  </button>
</template>
<script>
export default {
  name: 'td-button',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    btnClass() {
      return {
        'td-btn-disabled': this.disabled,
        'td-btn-border': this.border
      }
    }
  },
  methods: {
    btnFun() {
      this.$emit('btnFn')
    }
  }
}
</script>
<style lang="stylus">
.td-btn
  width: 100%
  height: 74px
  background: $color-primary
  border-radius: 34px
  color: $color-white
  font-size: $fontsize-large-x
.td-btn-disabled
  background: $color-gray6
.td-btn-border
  border: 2px solid $color-primary
  background-color: $color-white
  color: $color-primary
</style>
