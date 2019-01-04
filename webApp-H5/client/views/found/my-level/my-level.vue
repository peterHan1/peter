<template>
  <div class="main">
    <Header navLeftTxt="icon">我的等级</Header>
    <div class="header">
      <div class="head"></div>
      <div class="myLev">
        我的VIP等级
        <img src="../../../assets/images/found/V0.png" v-if="lev === 0" />
        <img src="../../../assets/images/found/V1.png" v-else-if="lev === 1" />
        <img src="../../../assets/images/found/V2.png" v-else-if="lev === 2" />
        <img src="../../../assets/images/found/V3.png" v-else-if="lev === 3" />
        <img src="../../../assets/images/found/V4.png" v-else-if="lev === 4" />
        <img src="../../../assets/images/found/V5.png" v-else-if="lev === 5" />
        <img src="../../../assets/images/found/V6.png" v-else-if="lev === 6" />
        <img src="../../../assets/images/found/V7.png" v-else />
      </div>
    </div>
    <ul class="title">
      <li><p>等级</p></li>
      <li><p>条件</p></li>
      <li><p>出借利息管理费</p></li>
      <li>免费提现次数</li>
    </ul>
    <div class="con">
      <div class="progress" :class="{maxLev: lev == 7?true:false}">
        <div class="lev_num" :style="{height: progressHeight + 'rem'}"></div>
        <div class="circle" :style="{top: progressHeight + 'rem'}"></div>
      </div>
      <div class="lev lev0">
        <div class="left" :class="{border: lev >= 0?true:false}">V0<span class="left_span"></span></div>
        <div class="right" :class="{active: lev >= 0?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p><1000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>0</i>次</p>
            <p>--</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 0">
        <div class="lev_info">
          <div class="top">
            <div class="fl">
              <p>截止-</p>
              <p>累计待收金额0元</p>
            </div>
            <div class="fr">
              <p>在V0等级剩余时间</p>
              <p>-</p>
            </div>
          </div>
          <div class="bottom">距离下一级VIP还差1000.00元</div>
        </div>
      </div>
      <div class="lev lev1">
        <div class="left" :class="{border: lev >= 1?true:false}">V1<span class="left_span"></span></div>
        <div class="right" :class="{active: lev >= 1?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>1000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>1</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 1">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 2?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>100000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>2</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 2">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 3?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>300000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>4</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 3">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 4?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>500000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>6</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 4">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 5?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>5000000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>7</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 5">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 6?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>10000000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>7</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <div class="clear" v-if="lev === 6">
        <div class="lev_info">
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
        <div class="right" :class="{active: lev >= 7?true:false}">
          <div class="fl">
            <p>待收金额</p>
            <p>1000元</p>
          </div>
          <div class="fl middle">0</div>
          <div class="fl">
            <p>每月免费提现次数<i>8</i>次</p>
            <p>有神秘生日礼物</p>
          </div>
        </div>
      </div>
      <!-- <div class="clear" v-if="lev === 7">
        <div class="lev_info">
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
      </div> -->
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
      lev: 0,
      progressHeight: 0
    }
  },
  mounted () {
    this.progressHeight = 1.1 + this.lev * 1.29
    if (this.lev === 7) {
      this.progressHeight = this.lev * 1.29
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
        width: 1rem
        height: 1rem
        background: url(../../../assets/images/found/member.png)center no-repeat
        background-size: 100%
        margin:0 auto
      .myLev
        width: 3rem
        height: 0.6rem
        line-height: 0.6rem
        font-size: 0.3rem
        color: #fff
        background-color: #676B76
        border-radius: 0.7rem
        margin: 0.2rem auto 0
        img
          width: 0.4rem
          height: 0.4rem
          vertical-align: middle
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
          border-right: 1px solid #f2f3f7
          box-sizing: border-box
    .con
      padding: 0.3rem 0.1rem 0rem 0rem
      position: relative
      .progress
        width: 0.02rem
        height: 11.64rem
        position: absolute
        top: 0.8rem
        z-index: 10
        background: #AFAFAF0
        left: 0.55rem
        &.maxLev
          height: 9.52rem
        .lev_num
          width: 100%
          background: #F97D09
          height: 5.4rem
        .circle
          width: 0.1rem
          height: 0.1rem
          background: #F97D09
          border-radius: 0.1rem
          position: absolute
          top: 5.4rem
          left: -0.04rem
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
          margin-top: 0.245rem
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
          width: 6.51rem
          box-sizing: border-box
          padding: 0 0.2rem 0 0.2rem
          float: right
          font-size: 0.26rem
          color: #666
          height: 0.99rem
          position: relative
          background: url(../../../assets/images/found/kuang1.png)center no-repeat
          background-size: 100%
          div.fl
            float: left
            height: 100%
            p
              height: 0.5rem
              line-height: 0.5rem
              i
                color: #000
          div.middle
            line-height: 1rem
          div:nth-child(1)
            width: 25%
          div:nth-child(2)
            width: 30%
            text-align: center
          div:nth-child(3)
            width: 45%
            text-align: right
          &.active
            background: url(../../../assets/images/found/kuang2.png)center no-repeat
            background-size: 100%
      .clear
        overflow: hidden
        margin-bottom: 0.5rem
        .lev_info
          width: 6.69rem
          padding: 0 0.2rem
          float: right
          font-size: 0.26rem
          color: #666
          height: 1.62rem
          position: relative
          clear:both
          background: url(../../../assets/images/found/kuang3.png)center no-repeat
          background-size: 100%
          .top
            height: 1rem
            position: relative
            z-index: 11
            overflow: hidden
            .fl
              float: left
              p
                height: 0.5rem
                line-height: 0.7rem
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
            line-height: 0.62rem
            border-top:1px solid #E7E7E7
    .btn
      display: block
      width: 90%
      height: 0.7rem
      font-size: 0.3rem
      line-height: 0.7rem
      color: #fff
      background-color: #FC5B17
      text-align: center
      margin:0 auto 0.4rem
      border-radius: 5px
</style>