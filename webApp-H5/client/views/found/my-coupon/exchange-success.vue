<template>
  <div class="exchange_success">
    <Header navLeftTxt="icon">兑换成功</Header>
    <div class="main">
      <img src="../../../assets/images/found/success.png" alt="">
      <p class="title1">兑换成功!</p>
      <p class="title2">恭喜您，成功兑换1张3%加息券</p>
      <div class="btns">
        <router-link to="jxq-exchange">继续兑换</router-link>
        <router-link to="">出借赚积分</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '兑换成功'
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" scoped>
  .exchange_success
    font-family: PingFangSC-Regular
    text-align: center
    padding-top: 0.88rem
    .main
      img
        width: 2.31rem
        height: 1.84rem
        margin: 1.3rem 0 0.37rem
      p
        color: #666
        font-size: 0.4rem
        letter-spacing: 1px
        &.title2
          font-size: 0.3rem
          margin: 0.1rem 0 0.6rem
      .btns
        a
          display: inline-block
          width: 2.19rem
          height: 0.74rem
          border: 1px solid #FF7102
          line-height: 0.74rem
          color: #FF7102
          font-size: 0.3rem
          background-color: #fff
          border-radius: 0.37rem
          &:last-child
            color: #fff
            border: none
            margin-left: 0.4rem
            background: -webkit-linear-gradient(left, #FC8D26 , #F87E37)
            background: -o-linear-gradient(right, #FC8D26, #F87E37)
            background: -moz-linear-gradient(right, #FC8D26, #F87E37)
            background: linear-gradient(to right, #FC8D26 , #F87E37)
</style>