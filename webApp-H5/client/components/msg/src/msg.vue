<template>
    <transition name="modal">
        <div class="msgBox" v-if="show">
            <div class="message" >
                <div class="msg" v-if="msgType === 'msg'">{{message.content}}</div>
                <div class="msgIcon msgOk" v-if="msgType === 'ok'">
                  <i class="iconfont">&#xe6c5;</i>
                  <p>加载完成</p>
                </div>
                <div class="msgIcon msgOk" v-if="msgType === 'no'">
                  <i class="iconfont">&#xe6c5;</i>
                  <p>加载失败</p>
                </div>
                <div class="msgIcon msgOk" v-if="msgType === 'warning'">
                  <i class="iconfont">&#xe6c5;</i>
                  <p>警示信息</p>
                </div>
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
        },
        msgType: ''
      }
    },
    mounted () {
      let vm = this
      vm.msgType = vm.msgType === undefined ? 'msg' : vm.msgType
      setTimeout(() => {
        vm.show = false
      }, vm.time)
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
    z-index: 9999
    -webkit-user-select: none
    .message
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      background: #fff
      z-index: 999
      overflow: hidden
      background-color: rgba(0,0,0,0.6)
      border-radius: 10px
    .msg
      font-size: 30px
      color: #fff
      text-align: center
      padding: 20px 30px
    .msgIcon
      text-align: center
      width: 180px
      height: 180px
      padding-top: 30px
      .iconfont
        font-size: 72px
        color: #fff
      p
        font-size: 28px
        color: #fff
        margin-top: 10px
</style>
