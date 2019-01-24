<template>
  <cube-scroll
    :options="options"
    @pulling-down="onPullingDown"
    @pulling-up="onPullingUp">
    <ul>
      <li>
        <div class="discountLeft">3%</div>
        <div class="discountRight">
          <p>
            <span>邀友福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p class="time">有效期2018.7.6-2018.11.11</p>
        </div>
      </li>
      <li>
        <div class="discountLeft">2%</div>
        <div class="discountRight">
          <p>
            <span>邀友福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p class="time">有效期2018.7.6-2018.11.11</p>
        </div>
      </li>
      <li>
        <div class="discountLeft">1%</div>
        <div class="discountRight">
          <p>
            <span>邀友福利</span>
            <router-link to="" >去使用</router-link>
          </p>
          <p class="time">有效期2018.7.6-2018.11.11</p>
        </div>
      </li>
    </ul>
    <div 
      class="discountBottom" 
      @click="downApp">
      <span>查看已使用</span> | <span>已失效</span>
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
      },
      clickBlooe: true
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
    background: url(../../../../assets/images/my-center/ticket_coupon.png) no-repeat
    background-size: 100% 100%
    div
      display: inline-block
      float: left
    .discountLeft
      width: 30%
      font-size: 80px
      color: $color-white
      line-height: 200px
      padding: 0 40px 0 50px
    .discountRight
      height: 200px
      width: 65%
      padding-left: 30px
      p:nth-child(1)
        padding-top: 36px
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
      p:nth-child(2)
        margin-top: 18px
        font-size: $fontsize-small-sss
        color: $color-gray3
.discountBottom
    font-size: $fontsize-small-ss
    color: $color-gray4
    text-align: center
    margin-top: 60px
    span
      color: $color-primary
      margin: 0 40px
</style>
