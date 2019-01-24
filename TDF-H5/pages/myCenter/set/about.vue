<template>
  <div class="tdAbout">
    <td-header title="关于拓道"/>
    <div class="logo"/>
    <ul>
      <li>
        <span>官方微信</span>
        <span>公众号：tuodao666</span>
      </li>
      <li>
        <span>客服电话</span>
        <a :href="'tel:40085-666-85'">40085-666-85</a>
      </li>
      <li>
        <span>客服服务时间</span>
        <span>
          <b>工作日9:00-20:00</b><br>
          <b>法定假日9:00-18:00</b>
        </span>
      </li>
      <li>
        <span>官方网址</span>
        <span>https://www.51tuodao.com</span>
      </li>
      <li>
        <span>下载APP</span>
        <i class="iconfont">&#xe6f2;</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
  .tdAbout
    background-color: $color-white
    padding-top: 88px
    .logo
      width: 260px
      height: 132px
      background: url(../../../assets/images/my-center/logo.png) no-repeat
      background-size: 100% 100%
      margin: 70px auto 80px
    ul
      padding-left: 30px
      li
        width: 100%
        border-bottom: 1px solid $color-gray5
        font-size: $fontsize-medium
        padding-right: 30px
        color: $color-gray1
        display: flex
        justify-content: space-between
        line-height: 100px
        span:nth-child(2)
          color: $color-gray3
        a
          color: $color-primary
      li:nth-child(3)
        display: flex
        align-items: center
        span:nth-child(1)
          flex: 1
          line-height: 120px
          text-align: left
        span:nth-child(2)
          flex: 1
          line-height: 40px
          text-align: right
      li:last-child
        border: none    
</style>
