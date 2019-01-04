<template>
  <div class="myCouponUseless">
    <Header navLeftTxt="icon">已失效优惠券</Header>
    <ul class="header">
      <li :class="{on: active}" @click="change">加息券</li>
      <li :class="{on: !active}" @click="change">抵用券</li>
    </ul>
    <div v-if="datas">
      <ul class="jxq" v-if="state">
        <li v-for="item in jxq">
          <div class="fl left">
            {{item.num}}%
          </div>
          <div class="fl right">
            <p>{{item.source}}</p>
            <p>有效期：{{item.time}}</p>
            <img src="../../../assets/images/found/useless.png" alt="">
          </div>
        </li>
      </ul>
      <ul class="dyq" v-else>
        <li v-for="item in dyq">
          <div class="fl left">
            <p><span>{{item.num}}</span>元</p>
            <p>满{{item.money}}元可用</p>
          </div>
          <div class="fl right">
            <p>{{item.source}}</p>
            <p>有效期：{{item.time}}</p>
            <p>使用条件：{{item.condition}}</p>
            <img src="../../../assets/images/found/useless.png" alt="">
          </div>
        </li>
      </ul>
    </div>
    <!-- <div class="dataNone" v-else>
      <img src="../../../assets/images/no_data.png" alt="">
      <p>{{couponType}}</p>
    </div> -->
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '已失效优惠券'
  },
  data () {
    return {
      state: true,
      active: true,
      dyq: [{num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}, {num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}, {num: 20, money: 1000, source: '端午节福利', time: '2016.6.6-2016.6.12', condition: '理财期限6个月及以上使用'}],
      jxq: [{num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}, {num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}, {num: 1, source: '端午节福利', time: '2016.6.6-2016.6.12'}],
      datas: true,
      couponType: '暂无加息券'
    }
  },
  methods: {
    change () {
      this.active = !this.active
      this.state = !this.state
    }
  }
}
</script>
<style lang="stylus" scoped>
  .myCouponUseless
    font-family: PingFangSC-Regular
    font-size: 0.32rem
    padding-top: 0.88rem
    color: #666
    .fl
      float: left
    .header
      height: 0.88rem
      width: 100%
      margin: 0 0 0.3rem
      background: #fff
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
          background: url(../../../assets/images/found/coupon3.png)center no-repeat
          background-size: 100%
          color: #fff
          p:first-child
            font-size: 0.3rem
            span
              font-size: 0.8rem
              font-family: DIN
              font-weight: bold
          p:last-child
            font-size: 0.24rem
        .right
          width: 4.87rem
          height: 2rem
          padding-top: 0.37rem
          box-sizing: border-box
          position: relative
          color: #999
          background: url(../../../assets/images/found/coupon4.png)center no-repeat
          background-size: 100%
          font-size: 0.24rem
          padding-left: 0.2rem
          p:nth-child(1)
            color: #333
            font-size: 0.32rem
            margin-bottom: 0.15rem
            font-weight: bold
          p:nth-child(2)
            margin-bottom: 0.05rem
          img
            width: 1.08rem
            height: 1.08rem
            position: absolute
            top: 0.11rem
            right: 0.13rem
            z-index: 10
    .jxq li
      .left
        padding-top: 0
        line-height: 2rem
        font-size: 0.8rem
        font-family: DIN
        font-weight: bold
        background: url(../../../assets/images/found/coupon3.png)center no-repeat
        background-size: 100%
    .dataNone
      padding-top: 1.61rem
      text-align: center
      color: #666
      font-size: 0.28rem
      img
        width: 3.2rem
        height: 3.2rem
      p
        margin-top: 0.15rem
</style>