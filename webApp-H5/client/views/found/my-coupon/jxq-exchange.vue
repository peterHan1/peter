<template>
  <div class="jxqChange">
    <Header navLeftTxt="icon">兑换加息券</Header>
    <p class="point">可兑换的积分：<span>{{point}}积分</span></p>
    <div class="main">
      <p class="title1">我要兑换：</p>
      <ul>
        <li :class="{on:active[0]}" @click="select(1)"></li>
        <li :class="{on:active[1]}" @click="select(2)"></li>
        <li :class="{on:active[2]}" @click="select(3)"></li>
      </ul>
      <div class="title2">
        <img src="../../../assets/images/found/jxq4.png" alt="">兑换{{jxq}}%的加息券将扣除您{{ need }}积分
      </div>
      <div class="btn">立即兑换</div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '兑换加息券'
  },
  data () {
    return {
      point: 3600.00,
      active: [true, false, false],
      need: 100,
      jxq: 1
    }
  },
  methods: {
    select (num) {
      if (num === 1) {
        this.active = [true, false, false]
        this.need = 100
        this.jxq = 1
      } else if (num === 2) {
        this.active = [false, true, false]
        this.need = 300
        this.jxq = 2
      } else {
        this.active = [false, false, true]
        this.need = 600
        this.jxq = 3
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .jxqChange
    font-family: PingFang SC
    height: 100%
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    padding-top: 0.88rem
    background: #fff
    overflow: hidden
    .point
      height: 1.2rem
      line-height: 1.2rem
      border-bottom: 1px solid #E8E8E8
      font-size: 0.36rem
      color: #666
      padding: 0 0.3rem
      span
        color: #FF7102
        font-weight: bold
    .main
      padding: 0 0.3rem
      .title1
        font-size: 0.3rem
        height: 0.96rem
        line-height: 0.96rem
        color: #666
      ul
        overflow: hidden
        display: flex
        margin-bottom: 0.3rem
        justify-content: space-between
        li
          width: 2.16rem
          height: 1.1rem
          float: left
          position: relative
          &:nth-child(1)
            background: url(../../../assets/images/found/jxq-change-1.png)center no-repeat
            background-size: 100%
          &:nth-child(2)
            background: url(../../../assets/images/found/jxq-change-2.png)center no-repeat
            background-size: 100%
          &:nth-child(3)
            background: url(../../../assets/images/found/jxq-change-3.png)center no-repeat
            background-size: 100%
          &.on:after
            content: " "
            width: 0.59rem
            height: 0.46rem
            position: absolute
            background: url(../../../assets/images/found/jxq-change-4.png)center no-repeat
            background-size: 100%
            z-index: 10
            bottom: 0
            right: 0
      .title2
        font-size: 0.26rem
        color: #999
        img
          width: 0.35rem
          height: 0.25rem
          margin-right: 0.13rem
          vertical-align: middle
      .btn
        width: 4.4rem
        height: 0.74rem
        line-height: 0.74rem
        color: #fff
        text-align: center
        font-size: 0.3rem
        margin: 0.6rem auto 0
        background: -webkit-linear-gradient(left, #FC8D26 , #F87B3C)
        background: -o-linear-gradient(right, #FC8D26, #F87B3C)
        background: -moz-linear-gradient(right, #FC8D26, #F87B3C)
        background: linear-gradient(to right, #FC8D26 , #F87B3C)
        border-radius: 0.37rem
</style>