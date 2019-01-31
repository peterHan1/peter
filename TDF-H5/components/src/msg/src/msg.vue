<template>
  <transition name="modal">
    <div 
      v-if="show" 
      class="msgBox">
      <div class="message" >
        <div 
          v-if="msgType === 'msg'" 
          class="msg">{{ message.content }}</div>
        <div 
          v-if="msgType === 'ok'" 
          class="msgIcon msgOk">
          <i class="iconfont">&#xe6fc;</i>
          <!-- <p>加载完成</p> -->
          <p>{{ message.content }}</p>
        </div>
        <div 
          v-if="msgType === 'no'" 
          class="msgIcon msgOk">
          <i class="iconfont">&#xe6fb;</i>
          <!-- <p>加载失败</p> -->
          <p>{{ message.content }}</p>
        </div>
        <div 
          v-if="msgType === 'warning'" 
          class="msgIcon msgOk">
          <i class="iconfont">&#xe6fd;</i>
          <!-- <p>警示信息</p> -->
          <p>{{ message.content }}</p>
        </div>
        <div 
          v-if="msgType === 'rests'" 
          class="msgIcon msgOk">
          <i class="iconfont">&#xe6fa;</i>
          <p>系统繁忙</p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      time: 2000,
      message: {
        content: ''
      },
      msgType: ''
    }
  },
  mounted() {
    let vm = this
    vm.msgType = vm.msgType === undefined ? 'msg' : vm.msgType
    setTimeout(() => {
      vm.show = false
    }, vm.time)
  },
  methods: {}
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
      background-color: rgba(0,0,0,0.7)
      border-radius: 10px
    .msg
      font-size: 30px
      color: #fff
      text-align: center
      padding: 20px 30px
    .msgIcon
      text-align: center
      width: 180px
      min-height: 180px
      padding-top: 30px
      .iconfont
        font-size: 72px
        color: #fff
      p
        font-size: 28px
        color: #fff
        margin-top: 10px
</style>
