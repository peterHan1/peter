<template>
  <div class="main">
    <td-header 
      :returnUrl="false"
      title="我的等级" 
      url="/myCenter/set/ucSet"/>
    <div class="header">
      <div class="head"/>
      <div class="myLev">
        我的VIP等级
        <img
          v-if="lev === 0"
          src="~/assets/images/my-center/V0.png">
        <img
          v-else-if="lev === 1"
          src="~/assets/images/my-center/V1.png">
        <img
          v-else-if="lev === 2"
          src="~/assets/images/my-center/V2.png">
        <img
          v-else-if="lev === 3"
          src="~/assets/images/my-center/V3.png">
        <img
          v-else-if="lev === 4"
          src="~/assets/images/my-center/V4.png">
        <img
          v-else-if="lev === 5"
          src="~/assets/images/my-center/V5.png">
        <img
          v-else-if="lev === 6"
          src="~/assets/images/my-center/V6.png">
        <img
          v-else
          src="~/assets/images/my-center/V7.png">
      </div>
    </div>
    <!-- <p>{{ this.$store.state.myCenter.vipContent }}</p> -->
    <ul class="title">
      <li><p>等级</p></li>
      <li><p>条件</p></li>
      <li><p>出借利息管理费</p></li>
      <li>免费提现次数</li>
    </ul>
    <div class="con">
      <div
        :class="{maxLev: lev == 7?true:false}"
        class="progress">
        <div
          :style="{height: progressHeight + 'rem'}"
          class="lev_num"/>
        <div
          :style="{top: progressHeight + 'rem'}"
          class="circle"/>
      </div>
      <div 
        v-for="(item,index) in this.$store.state.myCenter.vipContent.dataRows"
        :key="index" >
        <div 
          class="lev lev0">
          <div
            :class="{border: lev >= index ? true:false}"
            class="left" >
            {{ item.level }}<span class="left_span"/>
          </div>
          <div
            :class="{active: lev >= index ? true:false}"
            class="right">
            <div class="fl">
              <p>待收金额</p>
              <p>{{ item.await }}元</p>
            </div>
            <div class="fl middle">0元</div>
            <div class="fl">
              <p>{{ item.cashTimes }}</p>
              <p v-if="lev === index">--</p>
              <p>有神秘生日礼物</p>
            </div>
          </div>
        </div>
        <div
          v-if="lev === index && lev != 7"
          class="clear">
          <div class="lev_info">
            <div class="top">
              <div class="fl">
                <p>截止 {{ commitTime }}</p>
                <p>累计待收金额{{ awaits }}元</p>
              </div>
              <div class="fr">
                <p>在V{{ index }}等级剩余时间</p>
                <p>{{ days }}</p>
              </div>
            </div>
            <div class="bottom">距离下一级VIP还差{{ remindMoney }}元</div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      to="/project"
      class="btn">继续出借，享受更多收益</router-link>
  </div>
</template>
<script>
import { getVipDetail } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (app.store.state.isLogin) {
      commenParams.accessId = app.store.state.accessId
      commenParams.accessKey = app.store.state.accessKey
      const { content } = await getVipDetail(app.$axios)
      console.log(content)
      store.commit('myCenter/setVip', content)
    }
  },
  data() {
    return {
      lev: this.$store.state.myCenter.vipContent.vipLevel,
      progressHeight: 0,
      commitTime: this.$store.state.myCenter.vipContent.commitTime,
      awaits: this.$store.state.myCenter.vipContent.await,
      days: this.$store.state.myCenter.vipContent.days,
      remindMoney: this.$store.state.myCenter.vipContent.remindMoney
    }
  },
  mounted() {
    if (this.$store.state.isLogin) {
      this.progressHeight = 1.1 + this.lev * 1.29
      if (this.lev === 7) {
        this.progressHeight = this.lev * 1.29
      }
    } else {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
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
        background: url(../../../assets/images/my-center/member_1.png)center no-repeat
        background-size: 100%
        margin:0 auto
      .myLev
        width: 3rem
        height: 0.6rem
        line-height: 0.6rem
        font-size: $fontsize-large-x
        color: $color-white
        background-color: #676B76
        border-radius: 0.7rem
        margin: 0.2rem auto 0
        img
          width: 0.4rem
          height: 0.4rem
          vertical-align: middle
    .title
      background-color: $color-white
      color: $color-gray2
      font-size: $fontsize-medium
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
          border-right: 1px solid $color-background
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
          background: $color-primary
          height: 5.4rem
        .circle
          width: 0.1rem
          height: 0.1rem
          background: $color-primary
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
          font-size: $fontsize-small-ss
          float: left
          border-radius: 100%
          border: 1px solid #999
          text-align: center
          background-color: $color-gray5
          span
            display: block
            width: 15px
            height: 15px
            border-radius: 100%
            border: 1px solid #999
            background-color: $color-gray5
            position: absolute
            left: -10px
            top: 50%
            margin-top: -7.5px
          &.border
            border: 1px solid $color-primary
            background: $color-white
            color: $color-primary
            span.left_span
              border: 1px solid $color-primary
              background: $color-white
        .right
          width: 6.51rem
          box-sizing: border-box
          padding: 0 0.2rem 0 0.2rem
          float: right
          font-size: $fontsize-small-s
          color: $color-gray2
          height: 0.99rem
          position: relative
          background: url(../../../assets/images/my-center/member_2.png)center no-repeat
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
            background: url(../../../assets/images/my-center/member_3.png)center no-repeat
            background-size: 100%
      .clear
        overflow: hidden
        margin-bottom: 0.5rem
        .lev_info
          width: 6.69rem
          padding: 0 0.2rem
          float: right
          font-size: $fontsize-small-s
          color: $color-gray2
          height: 1.62rem
          position: relative
          clear:both
          background: url(../../../assets/images/my-center/member_4.png)center no-repeat
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
                  color: $color-primary
          .bottom
            line-height: 0.62rem
            border-top:1px solid $color-gray5
    .btn
      display: block
      width: 90%
      height: 0.7rem
      font-size: $fontsize-large-x
      line-height: 0.7rem
      color: $color-white
      background-color: $color-primary
      text-align: center
      margin:0 auto 0.4rem
      border-radius: 5px
</style>
