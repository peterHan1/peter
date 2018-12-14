<template>
  <div class="main">
    <Header navLeftTxt="icon">积分使用说明</Header>
    <div class="con">
      <p class="title">Q&nbsp;&nbsp;积分兑换规则是什么？</p>
      <div class="text">
        <div class="fl">A</div>
        <ul class="fl">
          <li>100积分可以换取1张1%加息券</li>
          <li>300积分可以换取1张2%加息券</li>
          <li>600积分可以换取1张3%加息券</li>
        </ul>
      </div>
      <p class="title" style="border-top: 1px solid #ff711c;">Q 积分有使用期限吗？</p>
      <div class="text">
        <div class="fl">A</div>
        <ul class="fl">
          <li>积分是没有使用期限的，但是兑换成加息券后，加息券是有使用期限的券</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '积分使用说明'
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
  .main
    overflow: hidden
    height: 100%
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: #fff
    letter-spacing: 1px
    .con
      border-top: 1.2rem solid #f2f3f7
      padding: 0 0.3rem
      background: #fff
      .title
        font-size: 0.32rem
        color:#ff711c
        padding: 0.3rem 0 0.2rem
      .text
        overflow: hidden
        font-size: 0.28rem
        color: #666
        width: 100%
        .fl
          float: left
          &:first-child
            width: 6%
            line-height: 0.4rem
        ul
          width: 94%
          li
            margin-bottom: 0.15rem
            line-height: 0.4rem
</style>