<template>
  <div class="suggestion">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="提交">意见反馈</Header>
    <textarea v-model="text"  @input="write" placeholder="感谢您使用拓道金服app！欢迎您向我们反馈使用过程中的任何意见和建议"></textarea>
    <span>{{length}}/150</span>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '意见反馈'
  },
  data () {
    return {
      text: '',
      length: 0
    }
  },
  methods: {
    write () {
      if (this.text.length >= 150) {
        this.text = this.text.substring(0, 150)
      }
      this.length = this.text.length
    },
    navRightFn () {}
  }
}
</script>
<style lang="stylus" scoped>
  .suggestion
    padding-top: 1.08rem
    position: relative
    font-size: 0.24rem
    textarea
      width: 100%
      padding: 0.2rem 0.3rem
      height: 4rem
      color: #333
      background: #fff
      resize:none
      font-size: 0.28rem
      outline: none
      font-family: -apple-system, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif
    textarea::-webkit-input-placeholder
      color: #999
      font-size: 0.24rem
      font-family: -apple-system, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif
    textarea:-moz-placeholder
      color: #999
      font-size: 0.24rem
      font-family: -apple-system, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif
    textarea::-moz-placeholder
      color: #999
      font-size: 0.24rem
      font-family: -apple-system, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif
    textarea:-ms-input-placeholder
      color: #999
      font-size: 0.24rem
      font-family: -apple-system, "PingFang SC", "Helvetica Neue", Helvetica, STHeiTi, sans-serif
    span
      position:absolute
      right: 0.3rem
      top: 4.58rem
      color: #626262
</style>