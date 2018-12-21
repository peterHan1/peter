<template>
  <div class="ensure">
    <Header navLeftTxt="icon">保障措施</Header>
    <div class="header"></div>
    <div class="one">
      <img class="bg" src="../../assets/images/activity/ensure/ensure2.png" alt="">
      <div class="right">
        <ul>
          <li class="title1">平台保障</li>
          <li class="title2"><img src="../../assets/images/activity/ensure/ensure6.png" alt=""></li>
          <li class="session1">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">银行存管</p>
              <p class="sty2">资金银行存管，平台不触碰用户资金</p>
            </div>
          </li>
          <li class="session2">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">法律合规</p>
              <p class="sty2">已和天册律所合作，流程和业务经过专业把控</p>
            </div>
          </li>
          <li class="session3">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">ICP许可证</p>
              <p class="sty2">已获ICP许可证<br />依法展开互联网信息服务</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="two">
      <div class="left">
        <ul>
          <li class="title1">项目保障</li>
          <li class="title2"><img src="../../assets/images/activity/ensure/ensure7.png" alt=""></li>
          <li class="session1">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">标的优质真实</p>
              <p class="sty2">运用大数据严格风控，只做—抵车，车辆价格精准评估</p>
            </div>
          </li>
          <li class="session2">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">资产来源清晰可靠</p>
              <p class="sty2">资产来源于实体经营的门店</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="right"></div>
      <img class="bg" src="../../assets/images/activity/ensure/ensure3.png" alt="">
    </div>
    <div class="three">
      <img class="bg" src="../../assets/images/activity/ensure/ensure4.png" alt="">
      <div class="right">
        <ul>
          <li class="title1">账号保障</li>
          <li class="title2"><img src="../../assets/images/activity/ensure/ensure8.png" alt=""></li>
          <li class="session1">
            <div class="le"><img src="../../assets/images/activity/ensure/ensure5.png" alt=""></div>
            <div class="rg">
              <p class="sty1">交易存证</p>
              <p class="sty2">交易记录由第三方独立存正</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '保障措施'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .ensure
    padding-top: 0.88rem
    .header
      height: 2.89rem
      margin-bottom: 0.9rem
      background: url(../../assets/images/activity/ensure/ensure1.png)center no-repeat
      background-size: 100%
    .one
      overflow: hidden
      margin-bottom: 0.4rem
      position: relative
      .bg
        position: absolute
        left: 0
        top: 0
        width: 3.35rem
        height: 4.07rem
      .right
        float: right
        width: 3.65rem
        margin-right: 0.6rem
        img
          vertical-align: top
          width: 0.3rem
          height: 1.1rem
          margin-top: 0.06rem
        .title1
          font-size: 0.5rem
          color: #f86c0f
          margin-top: 0.1rem
          margin-left: 0.5rem
          font-weight: bold
        .title2
          margin: 0.1rem 0 0.5rem 0.55rem
          width: 2.09rem
          height: 0.16rem
          img
            width: 100%
            height: 100%
        li.session1,li.session2,li.session3
          overflow: hidden
        li
          .le
            float: left
            margin-right: 0.2rem
            height:1rem
          .rg
            float: left
            width: 3.15rem
        .sty1
          font-size: 0.34rem
          color: #fe883a
          margin-bottom: 0.1rem
        .sty2
          font-size: 0.26rem
          color: #ccc
          line-height: 0.4rem
          margin-bottom: 0.24rem
    .two
      position: relative
      overflow: hidden
      margin-bottom: 0.6rem
      .left
        padding-left: 0.43rem
        img
          vertical-align: top
          width: 0.3rem
          height: 1.1rem
          margin-top: 0.06rem
        li.session1,li.session2
          overflow: hidden
          .le
            float: left
            margin-right: 0.2rem
            height:1rem
        li.session1 .rg
          float: left
          width: 3.2rem
        li.session2 .rg
          float: left
          width: 3.3rem
        .title1
          font-size: 0.5rem
          color: #f86c0f
          margin-top: 0.2rem
          font-weight: bold
        .title2
          margin: 0.1rem 0 0.5rem 0rem
          width: 1.56rem
          height: 0.16rem
          img
            width: 100%
            height: 100%
        .sty1
          font-size: 0.34rem
          color: #fe883a
          margin-bottom: 0.1rem
        .sty2
          font-size: 0.26rem
          color: #ccc
          line-height: 0.4rem
          margin-bottom: 0.22rem
      .bg
        position: absolute
        right: 0
        top: 0
        width: 4.3rem
        height: 3.78rem
    .three
      overflow: hidden
      padding-bottom: 2rem
      position: relative
      .bg
        position: absolute
        left: 0
        top: 0
        width: 3.56rem
        height: 4.04rem
      .right
        float: right
        width: 3.65rem
        margin-right: 0.6rem
        img
          vertical-align: top
          width: 0.3rem
          height: 1.1rem
          margin-top: 0.06rem
        .title1
          font-size: 0.5rem
          color: #f86c0f
          margin-top: 0.1rem
          margin-left: 0.5rem
          font-weight: bold
        .title2
          margin: 0.1rem 0 0.5rem 0.55rem
          width: 1.99rem
          height: 0.16rem
          img
            width: 100%
            height: 100%
        li.session1,li.session2
          overflow: hidden
        li
          .le
            float: left
            margin-right: 0.2rem
            height:1rem
          .rg
            float: left
            width: 3.15rem
        .sty1
          font-size: 0.34rem
          color: #fe883a
          margin-bottom: 0.1rem
        .sty2
          font-size: 0.26rem
          color: #ccc
          line-height: 0.4rem
          margin-bottom: 0.24rem
</style>