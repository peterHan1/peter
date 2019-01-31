<template>
  <div class="myCoupon">
    <td-header title="我的优惠券"/>
    <ul class="header">
      <li
        :class="{on: active}"
        @click="change">加息券</li>
      <li
        :class="{on: !active}"
        @click="change">抵用券</li>
    </ul>
    <div v-if="datas">
      <ul
        v-if="state"
        class="jxq">
        <li
          v-for="(item, index) in jxq"
          :key="index">
          <div class="fl left">
            {{ item.num }}%
          </div>
          <div class="fl right">
            <p>{{ item.source }}</p>
            <p>有效期：{{ item.time }}</p>
            <router-link
              to=""
              class="btn">去使用</router-link>
          </div>
        </li>
      </ul>
      <ul
        v-else
        class="dyq" >
        <li
          v-for="(item, index) in dyq"
          :key="index">
          <div class="fl left">
            <p><span>{{ item.num }}</span>元</p>
            <p>满{{ item.money }}元可用</p>
          </div>
          <div class="fl right">
            <p>{{ item.source }}</p>
            <p>有效期：{{ item.time }}</p>
            <p>使用条件：{{ item.condition }}</p>
            <router-link
              to=""
              class="btn">去使用</router-link>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="dataNone" v-else>
      <img src="../../../assets/images/no_data.png" alt="">
      <p>{{couponType}}</p>
    </div> -->
    <div class="footer">
      <a
        class="btn"
        @click="usedBtn()">查看已使用</a>
      <span/>
      <a
        class="btn"
        @click="uselessBtn()">已失效</a>
    </div>
    <!-- 提示去PC或是APP中打开的弹窗 -->
    <!-- <Layer v-show="layerCode" @on-close="layerCode = !layerCode" @on-sub="codeSub()" close="取消" submit="下载APP">
      <p class="layer">请在电脑端登录官网或在app端查看</p>
    </Layer> -->
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '我的优惠券'
  },
  data() {
    return {
      state: true,
      active: true,
      dyq: `{num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}, {num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}, {num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}`,
      jxq: `{num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}, {num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}, {num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}`,
      datas: true,
      couponType: '暂无加息券',
      layerCode: false
    }
  },
  methods: {
    change() {
      this.active = !this.active
      this.state = !this.state
    },
    usedBtn() {
      if (this.isBrowser()) {
        this.layerCode = true
      } else {
        this.$router.push('/found/my-coupon-used')
      }
    },
    uselessBtn() {
      if (this.isBrowser()) {
        this.layerCode = true
      } else {
        this.$router.push('/found/my-coupon-useless')
      }
    },
    codeSub() {
      window.location.href = ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .myCoupon
    font-family: PingFangSC-Regular
    font-size: $fontsize-large-xx
    padding-top: 0.88rem
    color: $color-gray2
    .fl
      float: left
    .header
      height: 0.88rem
      width: 100%
      margin: 0 0 0.3rem
      background: $color-white
      li
        width: 50%
        text-align: center
        float: left
        line-height: 0.88rem
        position: relative
        &.on
          color: #F98C55
        &.on:after
          content: " "
          width: 0.5rem
          height: 0.06rem
          background-color: #ff7102
          position: absolute
          left: 50%
          margin-left: -0.25rem
          bottom: 0
          border-radius: 3px
          z-index: 5
    .dyq,.jxq
      padding: 0 0.3rem
      li
        width: 100%
        height: 2rem
        overflow: hidden
        margin-bottom: 0.2rem
        &:last-child
          margin-bottom:0
        .left
          width: 2.03rem
          height: 2rem
          padding-top: 0.3rem
          box-sizing: border-box
          text-align: center
          background: url(../../../assets/images/my-center/coupon_2.png)center no-repeat
          background-size: 100%
          color: $color-white
          p:first-child
            font-size: $fontsize-large-x
            span
              font-size: 0.8rem
              font-family: DIN
              font-weight: bold
          p:last-child
            font-size: $fontsize-small-ss
        .right
          width: 4.87rem
          height: 2rem
          padding-top: 0.37rem
          box-sizing: border-box
          color: $color-gray3
          position: relative
          background: url(../../../assets/images/my-center/coupon_3.png)center no-repeat
          background-size: 100%
          font-size: $fontsize-small-ss
          padding-left: 0.2rem
          p:nth-child(1)
            color: $color-gray1
            font-size: $fontsize-large-xx
            margin-bottom: 0.15rem
            font-weight: bold
          p:nth-child(2)
            margin-bottom: 0.05rem
          .btn
            width: 1.1rem
            height: 0.44rem
            line-height: 0.44rem
            text-align: center
            color: $color-white
            border-radius: 0.22rem
            background: #F97C3C
            position: absolute
            z-index: 10
            top: 0.36rem
            right: 0.3rem
            font-size: 0.26rem
    .jxq li
      .left
        padding-top: 0
        line-height: 2rem
        font-size: 0.8rem
        font-family: DIN
        font-weight: bold
        background: url(../../../assets/images/my-center/coupon_1.png)center no-repeat
        background-size: 100%
    .dataNone
      padding-top: 1.61rem
      text-align: center
      color: $color-gray2
      font-size: $fontsize-medium
      img
        width: 3.2rem
        height: 3.2rem
      p
        margin-top: 0.15rem
    .footer
      overflow: hidden
      margin-top: 0.6rem
      font-size: $fontsize-small-ss
      text-align: center
      a
        color: #F97C3C
      span
        display: inline-block
        width: 2px
        height: 0.22rem
        background: $color-gray3
        vertical-align: middle
        margin: 0 0.4rem
    .layer
      width: 100%
      font-size: $fontsize-medium
      color: $color-gray1
      text-align: center
      padding: 0.45rem 0 0.4rem
</style>
