<template>
  <div class="pointExchange">
    <Header navLeftTxt="icon">积分兑换</Header>
    <div class="header">
      <div class="top">
        <!-- <p>2<span>%加息</span></p> -->
        <img :src="imgSrc" alt="">
      </div>
      <div @click="exchange" class="exchange" :class="{exchangeBg: active}">{{ title }}</div>
    </div>
    <div class="content">
      <div class="title">
        <img src="../../assets/images/found/jxq4.png" alt="">&nbsp;2%加息券
      </div>
      <dl>
        <dt><i></i>适用金额</dt>
        <dd>无限额</dd>
        <dt><i></i>有效期</dt>
        <dd>2018.05.10-2018.06.30</dd>
        <dt><i></i>适用条件</dt>
        <dd>出借期限无限制</dd>
      </dl>
    </div>
  </div>
</template>
<script>
import img1 from '../../assets/images/found/jxq1.png'
import img2 from '../../assets/images/found/jxq2.png'
import img3 from '../../assets/images/found/jxq3.png'
export default {
  metaInfo: {
    title: '积分兑换'
  },
  data () {
    return {
      title: '还差100积分可以兑换',
      active: false,
      imgSrc: ''
    }
  },
  methods: {
    exchange () {
      this.active = true
    }
  },
  mounted () {
    if (this.$route.query.id === 1) {
      this.imgSrc = img1
    } else if (this.$route.query.id === 2) {
      this.imgSrc = img2
    } else {
      this.imgSrc = img3
    }
  }
}
</script>
<style lang="stylus" scoped>
  .pointExchange
    height: 100%
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    overflow: hidden
    background-color: #fff
    padding-top: 0.88rem
    font-family: PingFangSC-Regular
    .header
      .top
        text-align: center
        padding-top: 0.09rem
        img
          width: 5.5rem
          height: 3.75rem
      .exchange
        width: 4.4rem
        height: 0.74rem
        line-height: 0.74rem
        text-align: center
        color: #fff
        font-size: 0.3rem
        border-radius: 0.6rem
        margin: 0 auto 0.6rem
        background: -webkit-linear-gradient(left, #e2e2e2 , #ccc)
        background: -o-linear-gradient(right, #e2e2e2, #ccc)
        background: -moz-linear-gradient(right, #e2e2e2, #ccc)
        background: linear-gradient(to right, #e2e2e2 , #ccc)
      .exchangeBg
        background: -webkit-linear-gradient(left, #FC8D26 , #F87C3A)
        background: -o-linear-gradient(right, #FC8D26, #F87C3A)
        background: -moz-linear-gradient(right, #FC8D26, #F87C3A)
        background: linear-gradient(to right, #FC8D26 , #F87C3A)
    .content
      font-family: PingFangSC-Regular
      padding: 0 0.4rem
      border-top: 0.2rem solid #F2F3F7
      .title
        margin: 0.4rem 0 0.35rem
        font-size: 0.3rem
        letter-spacing: 1px
        color: #333
        img
          width: 0.35rem
          height: 0.25rem
      dl
        padding-left: 0.17rem
        dt
          font-size: 0.26rem
          color: #999
          line-height: 0.5rem
          i
            display: inline-block
            width: 8px
            height: 8px
            border-radius: 8px
            background-color: #ccc
            vertical-align: middle
            margin-right: 0.2rem
        dd
          font-size: 0.26rem
          color: #333
          line-height: 0.5rem
          margin-bottom: 0.1rem
          padding-left: 0.3rem
</style>