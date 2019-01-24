<template>
  <div 
    v-if="loadShow" 
    class="cube-loading">
    <span
      :style="style"
      class="cube-loading-spinners">
      <i
        v-for="item in balde"
        :key="item"
        class="cube-loading-spinner"/>
    </span>
    <p>加载中...</p>
  </div>
</template>
<script >
export default {
  data() {
    return {
      balde: 9,
      loadShow: false
    }
  },
  props: {
    size: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      if (!this.size) {
        return
      }
      const value = `${this.size}px`
      return {
        width: value,
        height: value
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .cube-loading
    font-size: $fontsize-large-xxx
    position: fixed
    left: 50%
    top: 50%
    width: 180px
    height: 180px
    z-index: 999
    transform: translate(-50%, -50%)
    background-color: rgba(0,0,0,0.6)
    border-radius: 10px
    display: flex
    align-items: center
    flex-direction: column
    p
      flex: 1
      font-size: $fontsize-small-s
      color: $color-white
      padding-top: 16px
  .cube-loading-spinners
    flex: 1
    position: relative
    width: 88px
    height: 88px
    margin-top: 30px
  .cube-loading-spinner
    position: absolute
    left: 44.5%
    top: 37%
    width: 4px
    height: 23%
    border-radius: 50%/20%
    opacity: .25
    background-color: #fff
    animation: spinner-fade 1s linear infinite
    for num in (1..9)
      &:nth-child({num})
        animation-delay: ((num - 1) / 9)s
        transform: rotate(40deg * (num - 6)) translateY(-150%)
  @keyframes spinner-fade
    0%
      opacity: .85
    50%
      opacity: .25
    100%
      opacity: .25

</style>
