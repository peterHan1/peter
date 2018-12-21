<template>
  <div class="newcomer">
    <Header navLeftTxt="icon">新手专区</Header>
    <div class="header"></div>
    <div class="title">新手抵用券</div>
    <div class="dyq"></div>
    <div class="btns">
      <router-link to="/found/my-coupon" class="btn">点击领取</router-link>
    </div>
    <div class="titles1"><img src="../../assets/images/activity/newcomer/newcomer3.png" alt=""></div>
    <div class="title">新手专享加息</div>
    <div class="jx"></div>
    <div class="btns">
      <!-- 跳转到省心投列表页 -->
      <router-link to="" class="btn">查看详情</router-link>
    </div>
    <div class="titles2"><img src="../../assets/images/activity/newcomer/newcomer4.png" alt=""></div>
    <div class="title">为什么选择我们</div>
    <ul>
      <li class="margin" style="margin-bottom: 1.02rem;">
        <img src="../../assets/images/activity/newcomer/newcomer5.png" style="width: 1.42rem;height: 1.4rem;" alt="">
        <p>互联网金融百强公司</p>
      </li>
      <li class="margin">
        <img src="../../assets/images/activity/newcomer/newcomer6.png" style="width: 1.55rem;height: 1.43rem;" alt="">
        <p>银行资金存管</p>
      </li>
      <li>
        <img src="../../assets/images/activity/newcomer/newcomer7.png" style="width: 1.44rem;height: 1.4rem;" alt="">
        <p>8000万A轮融资</p>
      </li>
      <li>
        <img src="../../assets/images/activity/newcomer/newcomer8.png" style="width: 1.55rem;height: 1.35rem;" alt="">
        <p>盈科、天册律师事务所<br />共同鉴证</p>
      </li>
    </ul>
    <div class="footer"></div>
    <!-- 跳转到新用户出借需知，公告详情页 -->
    <router-link to="" class="footers"></router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .newcomer
    padding: 0.88rem 0 1.24rem
    overflow: hidden
    height: 24.3rem
    position: relative
    background: url(../../assets/images/activity/newcomer/newcomer1.png)0 0.88rem no-repeat
    background-size: 100%
    .header
      width: 100%
      height: 4.25rem
    .title
      text-align: center
      color: #000
      font-size: 0.36rem
      font-weight: bold
      margin:0.15rem 0 0rem
    .dyq
      width: 6.85rem
      height: 3.27rem
      margin: auto
      font-size: 0.24rem
      color: #fff
      overflow:hidden
      padding-left: .38rem
      line-height: .35rem
      background: url(../../assets/images/activity/newcomer/newcomer2.png)center no-repeat
      background-size: 100%
      .top
        font-size: 0.38rem
        color: #fffb65
        margin: .44rem 0 0.17rem
        line-height: normal
        font-weight: 900
    .btns
      position: relative
      height: .425rem
      margin-bottom: 1.0rem
    .btn
      display: block
      width: 2.65rem
      height: .85rem
      position: absolute
      left: 50%
      margin-left: -1.325rem
      top: -0.425rem
      color: #fff
      text-align: center
      line-height: .85rem
      font-size: .33rem
      border-radius: .5rem
      background: -webkit-linear-gradient(#F0B20F, #EA4D25)
      background: -o-linear-gradient(#F0B20F, #EA4D25)
      background: -moz-linear-gradient(#F0B20F, #EA4D25)
      background: linear-gradient(#F0B20F, #EA4D25)
      box-shadow: 0 5px 20px rgba(234,80,36,.8)
    .jx
      width: 5.84rem
      height: 3.5rem
      overflow: hidden
      position: relative
      z-index: 10
      margin: auto
      background: url(../../assets/images/activity/newcomer/newcomer11.png)center no-repeat
      background-size: 100%
    .titles1
      width: 5.66rem
      height: 0.19rem
      margin: auto
      img
        vertical-align: top
        height: 100%
    .titles2
      width: 5.26rem
      height: 0.2rem
      margin: auto
      img
        vertical-align: top
        height: 100%
    ul
      width: 90%
      padding: 0 5%
      margin: .6rem auto .37rem
      overflow: hidden
      font-size: 0.24rem
      color: #999999
      li
        float: left
        width: 50%
        text-align: center
        &.margin
          margin-bottom: 1.05rem
    .footers
      display: block
      width: 100%
      height: 1.24rem
      position: fixed
      bottom: 0
      z-index: 100
      background: url(../../assets/images/activity/newcomer/newcomer9.png)center no-repeat
      background-size: 100%
</style>