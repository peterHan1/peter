<template>
  <div>
    <div 
      :style="{top: cssSet}" 
      class="layer">
      <slot />
      <div 
        v-show="close || submit" 
        class="layer_btn">
        <div 
          v-show="close" 
          class="layer_btn1" 
          @click="codeClose">{{ close }}</div>
        <div 
          v-show="submit" 
          class="layer_btn2" 
          @click="codeSub">{{ submit }}</div>
      </div>
    </div>
    <div 
      class="shade" 
      @click="shadeClose"/>
  </div>
</template>
<script>
export default {
  name: 'Layer',
  props: {
    close: {
      type: String,
      default: ''
    },
    submit: {
      type: String,
      default: ''
    },
    cssSet: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bo: true
    }
  },
  mounted() {},
  methods: {
    shadeClose() {
      this.$emit('shade-close')
    },
    codeClose() {
      this.$emit('on-close')
    },
    codeSub() {
      this.$emit('on-sub')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .layer
    width: 524px
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: #fff
    z-index: 9999
    overflow: hidden
    border-radius: 20px
    .layer_btn
      line-height: 85px
      font-size: 32px
      display: flex
      border-top: 1px solid #E8E8E8
      margin-top: 20px
      div
        flex: 1
        text-align: center
      .layer_btn1
        color: #999
        border-right: 1px solid #E8E8E8
      .layer_btn2
        color: #FF7102
  .shade
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.5)
    z-index: 999
</style>
