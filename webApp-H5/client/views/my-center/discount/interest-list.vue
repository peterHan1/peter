<template>
  <div class="interestList">
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
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
  .interestList
    ul
      padding: 0 30px
      li
        background-size: 100% 100%
        overflow: hidden
        margin-top: 20px
        background: url(../../../assets/images/my-center/ticket_coupon.png) no-repeat
        background-size: 100% 100%
        div
          display: inline-block
          float: left
        .discountLeft
          width: 30%
          font-size: 80px
          color: #fff
          line-height: 200px
          padding: 0 40px 0 50px
        .discountRight
          height: 200px
          width: 65%
          padding-left: 30px
          p:nth-child(1)
            padding-top: 36px
            span
              font-size: 32px
              color: #333
              line-height: 45px
            a
              display: inline-block
              float: right
              padding: 0 16px
              line-height: 44px
              font-size: 26px
              color: #fff
              border-radius: 22px
              background-color: #F97C3C
          p:nth-child(2)
            margin-top: 18px
            font-size: 22px
            color: #999
</style>
