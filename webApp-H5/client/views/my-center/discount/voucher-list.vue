<template>
  <div class="voucherList">
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
.voucherList
  ul
    padding: 0 30px
    li
      background-size: 100% 100%
      overflow: hidden
      margin-top: 20px
      background: url(../../../assets/images/my-center/ticket_voucher.png) no-repeat
      background-size: 100% 100%
      div
        display: inline-block
        float: left
      .discountLeft
        width: 30%
        text-align: center
        padding: 32px 0 50px
        p:nth-child(1)
          color: #fff
          font-size: 30px
          span
            font-size: 72px
            line-height: 87px
        p:nth-child(2)
          color: #fff
          font-size: 22px
      .discountRight
        height: 200px
        width: 65%
        padding-left: 30px
        p
          font-size: 22px
          color: #999
          padding-bottom: 10px
        .source
          padding: 36px 0 18px
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
</style>
