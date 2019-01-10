<template>
  <button 
    :class="btnClass"
    class="td-btn">
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
    }
  },
  computed: {
    btnClass() {
      return {
        'td-btn-disabled': this.disabled
      }
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
</style>
