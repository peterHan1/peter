<template>
  <div>
    <header>
      <i
        class="iconfont"
        @click="back">&#xe6fe;</i>
      <span>{{ title }}</span>
      <b @click="returnFn">{{ rightTxt }}</b>
    </header>
  </div>
</template>
<script>
export default {
  name: 'td-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    rightTxt: {
      type: String,
      default: ''
    },
    returnUrl: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    back() {
      if (this.returnUrl) {
        this.$store.commit('project/setTransition', 'turn-off')
        this.$router.back()
      } else {
        this.$router.push(this.url)
      }
    },
    returnFn() {
      this.$emit('navRightFn')
    }
  }
}
</script>
<style lang="stylus" scoped>
header
  height 88px
  line-height: 88px
  width: 100%
  background: $color-white
  position: fixed
  left: 0
  top: 0
  right: 0
  text-align: center
  font-size: $fontsize-large-xxx
  color: $color-gray1
  border-bottom: 1px solid $color-gray5
  z-index: 99
  i
    position: absolute
    top: 0
    left: 0
    font-size: 60px
    margin-left: 15px
  b
    position: absolute
    top: 0
    right: 0
    font-size: $fontsize-medium
    margin-right: 30px
    color: $color-gray3
</style>
