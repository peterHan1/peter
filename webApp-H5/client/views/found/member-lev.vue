<template>
  <div class="max_width main">
    <Header navLeftTxt="icon">我的等级</Header>
    <div class="header">
      <div class="head"></div>
      <div class="myLev">我的等级<span class="iconfont">&#xe6cb;</span></div>
    </div>
    <ul class="title">
      <li><p>等级</p></li>
      <li><p>条件</p></li>
      <li><p>出借利息管理费</p></li>
      <li>免费提现次数</li>
    </ul>
    <div class="con">
      <div class="progress">
        <div class="lev_num" :style="{height: progressHeight + 'rem'}"></div>
        <div class="circle" :style="{top: progressHeight + 'rem'}"></div>
      </div>
      <div class="lev lev1">
        <div class="left" :class="{border: lev >= 1?true:false}">V1<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 1?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>100000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>1</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 1">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev2">
        <div class="left" :class="{border: lev >= 2?true:false}">V2<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 2?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>300000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>2</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 2">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev3">
        <div class="left" :class="{border: lev >= 3?true:false}">V3<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 3?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>500000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>4</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 3">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev4">
        <div class="left" :class="{border: lev >= 4?true:false}">V4<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 4?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>1000000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>6</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 4">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev5">
        <div class="left" :class="{border: lev >= 5?true:false}">V5<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 5?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>5000000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>7</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 5">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev6">
        <div class="left" :class="{border: lev >= 6?true:false}">V6<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 6?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>10000000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>7</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 6">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
      <div class="lev lev7">
        <div class="left" :class="{border: lev >= 7?true:false}">V7<span class="left_span"></span></div>
        <div class="right" :class="{border: lev >= 7?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>1000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>8</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
          <span class="jiantou on"></span>
        </div>
      </div>
      <div class="clear" v-if="lev === 7">
        <div class="lev_info">
          <span class="jiantou"></span>
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V1等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差100000.00元</div>
        </div>
      </div>
    </div>
    <router-link class="btn" to="">继续出借，享受更多收益</router-link>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '我的等级'
  },
  data () {
    return {
      lev: 5,
      progressHeight: 0
    }
  },
  mounted () {
    this.progressHeight = 0.9 + (this.lev - 1) * 1.5
    if (this.lev === 7) {
      this.progressHeight = 11
    }
  }
}
</script>
<style lang="stylus" scoped>
  .main
    padding-top: 0.88rem
    overflow: hidden
    letter-spacing: 1px
    .header
      width: 100%
      height: 2.3rem
      padding-top: 0.2rem
      background-color: #3C424E
      text-align: center
      .head
        width: 0.8rem
        height: 0.8rem
        border-radius: 100%
        border: 1px solid #6D717A
        margin: auto
      .myLev
        width: 3rem
        height: 0.7rem
        line-height: 0.7rem
        font-size: 0.3rem
        color: #fff
        background-color: #676B76
        border-radius: 0.7rem
        margin: 0.3rem auto 0
        span
          color: #F97D09
          font-size: 0.56rem
          vertical-align: sub
    .title
      background-color: #fff
      color: #666
      font-size: 0.28rem
      overflow: hidden
      li
        padding: 0.1rem 0
        text-align: center
        float: left
        &:first-child
          width: 15%
        &:nth-child(2)
          width: 15%
        &:nth-child(3)
          width: 35%
        &:nth-child(4)
          width: 35%
        p
          width: 100%
          border-right: 1px solid #999
          box-sizing: border-box
    .con
      padding: 0.3rem 0.1rem 0rem 0rem
      position: relative
      .progress
        width: 2px
        height: 11rem
        position: absolute
        top: 1.15rem
        z-index: 10
        background: #AFAFAF
        left: 0.55rem
        .lev_num
          width: 100%
          background: #F97D09
          height: 5.4rem
        .circle
          width: 10px
          height: 10px
          background: #F97D09
          border-radius: 10px
          position: absolute
          top: 5.4rem
          left: -4px
      .lev
        overflow: hidden
        margin-bottom: 0.3rem
        padding-left: 0.3rem
        position: relative
        z-index: 50
        .left
          width: 0.5rem
          height: 0.5rem
          line-height: 0.52rem
          margin-top: 0.35rem
          position: relative
          font-size: 0.24rem
          float: left
          border-radius: 100%
          border: 1px solid #999
          text-align: center
          background-color: #E7E7E7
          span
            display: block
            width: 15px
            height: 15px
            border-radius: 100%
            border: 1px solid #999
            background-color: #E7E7E7
            position: absolute
            left: -10px
            top: 50%
            margin-top: -7.5px
          &.border
            border: 1px solid #F97D09
            background: #fff
            color: #F97D09
            span.left_span
              border: 1px solid #F97D09
              background: #fff
        .right
          width: 6.3rem
          box-sizing: border-box
          padding: 0 0.2rem 0 0.1rem
          float: right
          font-size: 0.26rem
          color: #666
          height: 1.2rem
          border-radius: 5px
          position: relative
          background-color: #E7E7E7
          div.fl
            float: left
            p
              height: 0.6rem
              line-height: 0.7rem
              &:last-child
                line-height: 0.5rem
              i
                color: #000
          div.middle
            line-height: 1.2rem
          div:nth-child(1)
            width: 30%
          div:nth-child(2)
            width: 20%
            text-align: center
          div:nth-child(3)
            width: 50%
            text-align: right
          .jiantou
            display: block
            width: 8px
            height: 7px
            background: #E7E7E7
            transform: rotate(-35deg) skew(25deg)
            border-left:1px solid #E7E7E7
            border-top:1px solid #E7E7E7
            position: absolute
            top: 50%
            margin-top: -4px
            left: -5px
            z-index: 10
          &.border
            border: 1px solid #F97D09
            background: #fff
            .on
              border-left:1px solid #F97D09
              border-top:1px solid #F97D09
              background: #fff
      .clear
        overflow: hidden
        margin-bottom: 0.5rem
        .lev_info
          width: 6.3rem
          padding: 0 0.1rem
          float: right
          font-size: 0.26rem
          color: #666
          border: 1px solid #F0F0F0
          height: 1.8rem
          border-radius: 5px
          position: relative
          clear:both
          background-color: #fff
          .jiantou
            display: block
            width: 6px
            height: 5px
            background: #fff
            transform: rotate(-30deg) skew(31deg)
            border-left:1px solid #F0F0F0
            border-top:1px solid #F0F0F0
            position: absolute
            top: 0.2rem
            left: -4px
            z-index: 10
          .top
            height: 1rem
            position: relative
            z-index: 11
            overflow: hidden
            .fl
              float: left
              p
                height: 0.5rem
                line-height: 0.6rem
                &:last-child
                  line-height: 0.4rem
            .fr
              float: right
              text-align: center
              p
                height: 0.5rem
                line-height: 0.6rem
                &:last-child
                  line-height: 0.4rem
                  color: #F97E0D
          .bottom
            line-height: 0.8rem
            border-top:1px solid #E7E7E7
    .btn
      display: block
      width: 90%
      height: 0.7rem
      line-height: 0.7rem
      color: #fff
      background-color: #FC5B17
      text-align: center
      margin:0 auto 0.4rem
      border-radius: 5px
</style>