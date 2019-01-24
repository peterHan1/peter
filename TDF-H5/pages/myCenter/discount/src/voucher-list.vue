<template>
  <cube-scroll
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul>
      <li>
        <div class="discountLeft">
          <p><span>100</span>元</p>
          <p>满10000元可用</p>
        </div>
        <div class="discountRight">
          <p class="source">
            <span>端午节福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p>有效期2018.7.6-2018.11.11</p>
          <p>理财期限6个月及以上使用</p>
        </div>
      </li>
      <li>
        <div class="discountLeft">
          <p><span>20</span>元</p>
          <p>满10000元可用</p>
        </div>
        <div class="discountRight">
          <p class="source">
            <span>投资福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p>有效期2018.7.6-2018.11.11</p>
          <p>理财期限6个月及以上使用</p>
        </div>
      </li>
      <li>
        <div class="discountLeft">
          <p><span>10</span>元</p>
          <p>满10000元可用</p>
        </div>
        <div class="discountRight">
          <p class="source">
            <span>邀友福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p>有效期2018.7.6-2018.11.11</p>
          <p>理财期限6个月及以上使用</p>
        </div>
      </li>
    </ul>
    <div 
      class="discountBottom" 
      @click="downApp">
      <span >查看已使用</span> | <span>已失效</span>
    </div>
  </cube-scroll>
</template>

<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 60,
          stopTime: 1000,
          txt: '更新成功'
        },
        pullUpLoad: true,
        directionLockThreshold: 0,
        beforePullDown: true
      }
    }
  },
  mounted() {},
  methods: {
    onPullingDown() {
      console.log(111)
    },
    onPullingUp() {
      console.log(222)
    },
    downApp() {
      if (this.clickBlooe) {
        this.$App('请在电脑端登录官网或在APP端查看')
        this.clickBlooe = false
      }
      setTimeout(() => {
        this.clickBlooe = true
      }, 1000)
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
ul
  padding: 0 30px
  li
    background-size: 100% 100%
    overflow: hidden
    margin-top: 20px
    background: url(../../../../assets/images/my-center/ticket_voucher.png) no-repeat
    background-size: 100% 100%
    div
      display: inline-block
      float: left
    .discountLeft
      width: 30%
      text-align: center
      padding: 32px 0 50px
      p:nth-child(1)
        color: $color-white
        font-size: $fontsize-large-x
        span
          font-size: 72px
          line-height: 87px
      p:nth-child(2)
        color: $color-white
        font-size: $fontsize-small-sss
    .discountRight
      height: 200px
      width: 65%
      padding-left: 30px
      p
        font-size: $fontsize-small-sss
        color: $color-gray3
        padding-bottom: 10px
      .source
        padding: 36px 0 18px
        span
          font-size: $fontsize-large-xx
          color: $color-gray1
          line-height: 45px
        a
          display: inline-block
          float: right
          padding: 0 16px
          line-height: 44px
          font-size: $fontsize-small-s
          color: $color-white 
          border-radius: 22px
          background-color: $color-primary
.discountBottom
    font-size: $fontsize-small-ss
    color: $color-gray4
    text-align: center
    margin-top: 60px
    span
      color: $color-primary
      margin: 0 40px          
</style>
