<template>
  <div class="ucSet">
    <Header :navLeftTxt="'icon'">实名认证</Header>
    <div>您已通过实名认证，如需帮助请联系客服</div>
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
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .ucSet
    min-height: 100%
    background-color: #F2F3F7
    padding-top: 88px
    box-sizing: border-box
    div
      height: 100px
      font-size: 28px
      color: #999
      padding-left: 70px
      line-height: 100px
      position: relative
    div:before
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
      background-color: #fff
      li
        border-bottom: 1px solid #E8E8E8
        overflow: hidden
        height: 100px
        span
          font-size: 28px
          display: block
          line-height: 100px
        span:nth-child(1)
          color: #333
          float: left
        span:nth-child(2)
          color: #999
          float: right
      li:last-child
        border: none
</style>
