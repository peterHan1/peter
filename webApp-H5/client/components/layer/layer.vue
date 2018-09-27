<template>
  <div v-if="param.show">
      <div class="layer">
        <div class="layer_title">
          <span v-if="param.title">{{param.title}}</span>
          <div class="layer_close" v-if="param.closeX" @click="closeFn">X</div>
        </div>
        <div class="layer_content" v-html="param.content"></div>
        <div class="layer_btn">
          <div class="layer_btn1" v-if="param.cancelBtn" @click="param.cancelBtnFn">{{param.cancelBtn}}</div>
          <div class="layer_btn2" v-if="param.confirmBtn" @click="param.confirmBtnFn">{{param.confirmBtn}}</div>
        </div>
      </div>
      <div class="shade"></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        param: {
          closeX: false,
          show: false,
          title: '',
          content: '',
          cancelBtn: '',
          confirmBtn: '',
          cancelBtnFn: function () {},
          confirmBtnFn: function () {}
        }
      }
    },
    mounted () {
      console.log(this.param)
    },
    methods: {
      closeFn () {
        this.param.show = false
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
      .layer_content
        font-size: 40px
        padding: 10px 30px
      .layer_title
        width: 100%
        text-align:center
        font-size: 40px
        line-height:100px
        position: relative
        .layer_close
          display: inline-block
          padding:0 30px
          position: absolute
          right: 0
      .layer_btn
        line-height: 80px
        font-size: 40px
        display: flex
        border-top: 1px solid #ccc
        margin-top: 20px
        div
          flex: 1
          text-align: center
        .layer_btn1
          color: #ccc
          border-right: 1px solid #ccc
        .layer_btn2
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
