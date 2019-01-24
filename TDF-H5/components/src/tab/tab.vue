<template>
  <div
    :class="{'cube-tab_active': isActive}"
    class="cube-tab"
    @click="handleClick">
    <slot name="icon">
      <i
        :class="icon"
        class="iconfont"/>
    </slot>
    <slot>
      <div v-html="label"/>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'cube-tab',
  props: {
    label: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [String, Number],
      default() {
        return this.label
      }
    },
    icon: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.$parent.addTab(this)
  },
  destroyed() {
    this.$parent.removeTab(this)
  },
  computed: {
    isActive() {
      return this.$parent.value === this.value
    }
  },
  methods: {
    handleClick(item) {
      this.$parent.trigger(this.value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.cube-tab
  flex: 1
  color: $color-gray2
  text-align: center

.cube-tab_active
  color: $color-primary
</style>
