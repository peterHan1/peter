<template>
  <div class="ucSet">
    <td-header title="实名认证"/>
    <div class="txt">您已通过实名认证，如需帮助请联系客服</div>
    <ul>
      <li>
        <span>真实姓名</span>
        <span>**云 </span>
      </li>
      <li>
        <span>身份证号</span>
        <span>330***********001X</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .ucSet
    padding-top: 88px
    .txt
      height: 100px
      font-size: $fontsize-medium
      color: $color-gray3 
      padding-left: 70px
      line-height: 100px
      position: relative
    .txt:before
      content: ''
      display: block
      width: 32px
      height: 32px
      background: url(../../../assets/images/my-center/iBg.png) no-repeat
      background-size: 100% 100%
      position: absolute
      left: 30px
      top: 50%
      margin-top: -16px
    ul
      padding: 0 30px
      background-color: $color-white
      li
        border-bottom: 1px solid $color-gray5
        overflow: hidden
        height: 100px
        span
          font-size: $fontsize-medium
          display: block
          line-height: 100px
        span:nth-child(1)
          color: $color-gray1
          float: left
        span:nth-child(2)
          color: $color-gray3 
          float: right
      li:last-child
        border: none
</style>
