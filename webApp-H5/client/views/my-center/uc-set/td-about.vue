<template>
  <div class="tdAbout">
    <Header :navLeftTxt="'icon'">关于拓道</Header>
    <div class="logo"></div>
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
        <i class="iconfont">&#xe83d;</i>
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
  .tdAbout
    min-height: 100%
    background-color: #fff
    padding-top: 88px
    box-sizing: border-box
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
        border-bottom: 1px solid #e4e4e4
        font-size: 28px
        overflow: hidden
        padding-right: 30px
        span:nth-child(1)
          display: block
          float: left
          color: #333
          line-height: 100px
        span:nth-child(2)
          display: block
          float: right
          color: #999
          line-height: 100px
        i
          display: block
          float: right
          line-height: 100px
        a
          display: block
          float: right
          line-height: 100px
          color: #FF7102
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
