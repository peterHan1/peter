<template>
  <div class="resultBox">
    <div class="resultTop">
      <div></div>
      <p>注册成功！</p>
      <h3>恭喜您获得新人大礼包</h3>
    </div>
    <ul>
      <li>
        <div class="discountLeft"><span>10</span>元</div>
        <div class="discountRight">
          <p>有效期至：2016.9.21</p>
          <p class="time">单笔金额满1000元且期限1个月及以上使用</p>
        </div>
      </li>
      <li>
        <div class="discountLeft"><span>30</span>元</div>
        <div class="discountRight">
          <p>有效期至：2016.9.21</p>
          <p class="time">单笔金额满1000元且期限1个月及以上使用</p>
        </div>
      </li>
      <li>
        <div class="discountLeft"><span>60</span>元</div>
        <div class="discountRight">
          <p>有效期至：2016.9.21</p>
          <p class="time">单笔金额满1000元且期限1个月及以上使用</p>
        </div>
      </li>
    </ul>
    <div class="resultBtn">
      <div @click="linkIndex">暂不开通</div>
      <router-link to="/deposit">激活存管账户</router-link>
    </div>
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
      linkIndex () {
        this.$router.push({path: '/index'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .resultBox
    width: 100%
    min-height: 100%
    background-color: #fff
    .resultTop
      text-align: center
      padding-top: 100px
      div
        display: inline-block
        width: 180px
        height: 180px
        background: url(../../assets/images/xw-bank/xw-ok.png) no-repeat
        background-size: 100% 100%
      p
        font-size: 40px
        color: #666
        margin-top: 43px
      h3
        margin-top: 82px
        font-size: 32px
        color: #666
        font-weight: normal
        position: relative
      h3:before,h3:after
        content: ''
        position: absolute
        top: 50%
        display: block
        width: 22%
        height: 1px
        border-top: 1px solid #e8e8e8
      h3:before
        left: 30px
      h3:after 
        right: 30px
    ul
      padding: 32px 30px 110px
      background-color: #fff
      li
        width: 100%
        background-size: 100% 100%
        overflow: hidden
        margin-top: 30px
        background: url(../../assets/images/login/list-bg.png) no-repeat
        background-size: 100% 100%
        div
          display: inline-block
          float: left
        .discountLeft
          width: 26%
          font-size: 28px
          color: #fff
          line-height: 152px
          text-align: center
          span
            font-size: 72px
        .discountRight
          height: 152px
          width: 65%
          padding-left: 30px
          p:nth-child(1)
            padding-top: 34px
            font-size: 30px
            color: #333
            line-height: 42px
            font-weight: bold
          p:nth-child(2)
            margin-top: 10px
            font-size: 24px
            color: #999 
    .resultBtn
      position: fixed
      left: 0
      right: 0
      bottom: 0
      display: flex
      text-align: center
      line-height: 100px
      font-size: 36px
      div
        flex: 1
        color: #999
       background-color: #fff
      a
        flex: 2
        font-size: 36px
        color: #fff
        background-color: #FF7102
</style>
