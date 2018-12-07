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
        <span>官方网址</span>
        <span>https://www.51tuodao.com/</span>
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
        height: 88px
        padding-right: 30px
        box-sizing: border-box
        span:nth-child(1)
          display: block
          float: left
          color: #333
          line-height: 88px
        span:nth-child(2)
          display: block
          float: right
          line-height: 88px
          color: #666
      li:last-child
        border: none    
</style>
