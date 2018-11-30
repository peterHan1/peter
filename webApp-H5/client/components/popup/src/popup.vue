<template>
  <div >
    <div class="layer">
      <slot />
      <div class="popup_btn">
        <div class="popup_btn1" @click="codeClose" v-show="close">{{close}}</div>
        <div class="popup_btn2" @click="codeSub" v-show="submit">{{submit}}</div>
      </div>
    </div>
    <div class="shade"></div>
  </div>
</template>
<script>
  export default {
    name: 'Popup',
    props: ['close', 'submit'],
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      codeClose () {
        this.$emit('on-close')
      },
      codeSub () {
        this.$emit('on-sub')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .layer
    width: 5.24rem
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: #fff
    z-index: 9999
    overflow: hidden
    border-radius: 20px
    .popup_btn
      line-height: 0.8rem
      font-size: 0.3rem
      display: flex
      border-top: 1px solid #ccc
      margin-top: 0.2rem
      div
        flex: 1
        text-align: center
      .popup_btn1
        color: #ccc
        border-right: 1px solid #ccc
      .popup_btn2
        color: #FF6600
  .shade
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.5)
    z-index: 999
</style>
