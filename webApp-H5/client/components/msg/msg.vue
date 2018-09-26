<template>
    <transition name="modal">
        <div class="msgBox" v-if="show">
            <div class="message">
                <div class="msg">{{message.content}}</div>
            </div>
        </div>
    </transition>
</template>
<script>
  export default {
    data () {
      return {
        show: false,
        time: 3000,
        message: {
          content: ''
        }
      }
    },
    mounted () {
      let _this = this
      setTimeout(() => {
        _this.show = false
      }, _this.time)
    },
    methods: {
    }
  }
</script>
<style lang="stylus" scoped>
  .msgBox
    position: fixed
    left: 0
    top: 0
    width: 100%
    height: 100%
    -webkit-transition: opacity 0.3s ease
    -moz-transition: opacity 0.3s ease
    transition: opacity 0.3s ease
    z-index: 99
    -webkit-user-select: none
    .message
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 999
      overflow: hidden
      background-color: rgba(0,0,0,0.5)
      padding:0 30px;
      line-height: 100px
      border-radius: 20px
    .msg
      font-size: 50px
      color: #fff
      white-space: nowrap
</style>