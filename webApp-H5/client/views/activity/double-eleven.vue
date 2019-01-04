<template>
  <div class="main">
    <div class="header">
      <div class="header-con">
        <p class="title"></p>
        <p class="time">活动标时间  10点  13点  15点  20点整</p>
        <!-- 跳转到散标页 -->
        <router-link to="">去出借</router-link>
      </div>
    </div>
    <div class="con">
      <img class="img1" src="../../assets/images/activity/double-eleven/double6.png" alt="">
      <img class="img2" src="../../assets/images/activity/double-eleven/double7.png" alt="">
      <div class="info">
        <a class="rule" @click="ruleShow = true">活动规则</a>
        <div class="title"></div>
        <div class="gan"></div>
        <div class="tables"></div>
        <!-- 跳转到省心投 -->
        <router-link to="" class="btn">去出借</router-link>
      </div>
      <div class="welfare">
        <div class="title"></div>
        <ul>
          <li>
            <img class="img" src="../../assets/images/activity/double-eleven/double5.png" alt="">活动时间：2018年11月1日0点 - 结束时间提前3天通知;
          </li>
          <li>
            <div><img src="../../assets/images/activity/double-eleven/double5.png" alt=""></div>
            <p>活动期间邀请好友注册，根据有效被邀请人人数，邀请人获得最高1150元奖励。</p>
          </li>
        </ul>
        <!-- 跳转到公告详情 -->
        <a class="explain" href="https://www.51tuodao.com/html5/app/nt_detail?id=15343&typeId=gonggao">查看活动详情</a>
      </div>
    </div>
    <Layer v-show="ruleShow">
      <div class="rules">
        <div class="bg">
            <div class="title">活动规则</div>
            <div>1、双11出借金额：计算双11当天出借散标及加入省心投的总金额。新手标及债权转让的金额不计算在内。
            </div>
            <div>2、省心投按照加入时间和加入金额计算。</div>
            <div>3、活动奖励将在活动结束后发放，5天内有效，满千元可用。</div>
            <div>4、最终解释权归拓道金服所有。</div>
        </div>
        <img class="close" @click="ruleShow = false" src="../../assets/images/activity/double-eleven/close.png" alt="">
      </div>
    </Layer>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '接棒五周年，狂欢双十一'
  },
  data () {
    return {
      ruleShow: false
    }
  }
}
</script>
<style lang="stylus" scoped>
  .main
    font-family: 'FZLTZHK--GBK1-0','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
    width: 100%
    height: 21.5rem
    background: #F43934
    overflow: hidden
    .header
        width: 100%
        height: 10.8rem
        background-image: url(../../assets/images/activity/double-eleven/double1.png)
        background-repeat: no-repeat
        background-position:center
        background-size: 100%
        overflow: hidden
        .header-con
          padding-left: 1.2rem
          width: 6.2rem
          box-sizing: border-box
          text-align: center
          margin:6.7rem auto 0
          .title
            width: 1.99rem
            height: 0.36rem
            background: url(../../assets/images/activity/double-eleven/double3.png)
            background-position:center
            background-size: 100%
            background-repeat: no-repeat
            margin: auto
          .time
            font-size: 0.24rem
            color: #7D3230
            font-weight:600
            margin: 0.12rem 0
          a
              -webkit-appearance: none
              -webkit-tap-highlight-color: transparent
              display: block
              cursor: pointer
              text-decoration: none
              color: #fff
              font-size: 0.3rem
              font-family: 'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
              font-weight: 500
              text-align: center
              width:2.74rem
              height:0.54rem
              line-height: 0.54rem
              letter-spacing: 0.05rem
              border-radius:0.27rem
              background: #F75341
              background: -webkit-linear-gradient(#F96A4B, #F43934)
              background: -o-linear-gradient(#F96A4B, #F43934)
              background: -moz-linear-gradient(#F96A4B, #F43934)
              background: linear-gradient(#F96A4B, #F43934)
              margin: auto
              box-shadow: 0 0.1rem 0.2rem rgba(249,138,134,1)
    .con
      position: absolute
      top: 8.7rem
      background: transparent
      width: 100%
      .info
        overflow: hidden
        width: 6.9rem
        height: 8.1rem
        border-radius:0.3rem
        background: #fff
        background: -webkit-linear-gradient(#fff, #FFDADA)
        background: -o-linear-gradient(#fff, #FFDADA)
        background: -moz-linear-gradient(#fff, #FFDADA)
        background: linear-gradient(#fff, #FFDADA)
        text-align: center
        box-sizing: border-box
        padding: 0.36rem 0 0.41rem
        position: relative
        margin:auto
        .title
          width: 4.14rem
          height:0.36rem
          background: url(../../assets/images/activity/double-eleven/double4.png)
          background-position:center
          background-size: 100%
          background-repeat: no-repeat
          margin:0 auto 0.3rem
        .gan
          width: 6.5rem
          height: 0.16rem
          background-color:  #C80C05
          border-radius: 0.08rem
          margin: 0 auto
        .rule
          -webkit-appearance: none
          -webkit-tap-highlight-color: transparent
          display: inline-block
          cursor: pointer
          text-decoration: none
          color: #F94A44
          font-size: 0.2rem
          font-family: 'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
          text-align: center
          width:1.11rem
          padding-left: 0rem
          height:0.36rem
          line-height: 0.36rem
          border-radius:0.3rem 0 0 0.3rem
          border:0.02rem solid #FDBFB1
          position: absolute
          top: 0.36rem
          right: 0.02rem
          border-right: none
          background: #FFECE7
        .tables
          width: 6.28rem
          height:5.74rem
          position: absolute
          top:1.08rem
          z-index:10
          margin-left: -3.14rem
          left: 50%
          border-radius:0.04rem 0.04rem 0.14rem 0.14rem
          background: url(../../assets/images/activity/double-eleven/double2.png)
          background-position:top
          background-size: 100%
          background-repeat: no-repeat
          box-shadow: 0 0.1rem 0.2rem rgba(249,138,134,1)
        .btn
          position: absolute
          left: 50%
          margin-left: -1.37rem
          bottom:0.41rem
          display: block
          cursor: pointer
          text-decoration: none
          color: #fff
          font-size: 0.3rem
          font-family: 'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
          font-weight: 500
          text-align: center
          width:2.74rem
          height:0.54rem
          line-height: 0.54rem
          letter-spacing: 0.05rem
          border-radius:0.27rem
          background: #F75341
          background: -webkit-linear-gradient(#F96A4B, #F43934)
          background: -o-linear-gradient(#F96A4B, #F43934)
          background: -moz-linear-gradient(#F96A4B, #F43934)
          background: linear-gradient(#F96A4B, #F43934)
          box-shadow: 0 0.1rem 0.2rem rgba(249,138,134,1)
      .img1
        position: absolute
        left: 0rem
        top: 7.4rem
        width: 0.72rem
        height: 0.99rem
        z-index: 10
      .img2
        position: absolute
        right: 0rem
        top: 7.22rem
        width: 1.38rem
        height: 1.34rem
        z-index: 10
      .welfare
        width: 6.9rem
        height: 3.7rem
        border-radius:.3rem
        background: #fff
        background: -webkit-linear-gradient(#fff, #FFDADA)
        background: -o-linear-gradient(#fff, #FFDADA)
        background: -moz-linear-gradient(#fff, #FFDADA)
        background: linear-gradient(#fff, #FFDADA)
        box-sizing: border-box
        padding: 0.4rem 0 0.3rem
        margin: .33rem auto 0
        .title
          width: 3.9rem
          height:0.39rem
          background: url(../../assets/images/activity/double-eleven/double8.png)
          background-position:center
          background-size: 100%
          background-repeat: no-repeat
          margin:0 auto 0.3rem
        ul
          padding-left: 0.3rem
          font-size: 0.24rem
          color: #7D3230
          overflow: hidden
          font-weight: 600
          li
            margin-bottom: 0.28rem
            overflow: hidden
            div
              float: left
              width: 0.24rem
            p
              float: left
              width: 6.14rem
              padding-left: 0.15rem
            img
              width: .24rem
              height: .24rem
              vertical-align: middle
              &.img
                margin-right: 0.15rem
        a
          -webkit-appearance: none
          -webkit-tap-highlight-color: transparent
          display: block
          width: 2.74rem
          height: 0.64rem
          line-height: 0.64rem
          border:0.03rem solid rgba(244,57,52,1)
          border-radius:0.4rem
          background: #FFDDDE
          font-size:0.3rem
          font-family:'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
          font-weight:500
          text-align: center
          margin: 0.15rem auto 0
          color: #F43934
          text-decoration: none
    .rules
      overflow: hidden
      padding-bottom: 0.05rem
      font-size: .28rem
      color: #7D3230
      font-family:'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
      font-weight:500
      text-align: center
      .bg
        text-align: left
        width: 6.9rem
        height: 7.76rem
        background: url(../../assets/images/activity/double-eleven/double9.png)
        background-position:center
        background-size: 100%
        background-repeat: no-repeat
        margin:0rem auto .03rem
        padding: 0rem 1.06rem 0
        box-sizing: border-box
        .title
          height:.49rem
          font-size:.52rem
          font-family:'PingFang SC','Microsoft YaHei','Hiragino Sans GB',Helvetica,Arial,'Lucida Grande',sans-serif
          font-weight:600
          padding: .64rem 0 1.42rem
          color: #FFF9F1
          text-align: center
      div
        line-height: 0.42rem
      img
        width: .76rem
        height: .76rem
        cursor: pointer
</style>