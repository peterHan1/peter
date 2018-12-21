<template>
  <div class="main">
    <Header navLeftTxt="icon">联系我们</Header>
    <div class="con">
      <div class="flex-1" @click="kfLayer = !kfLayer">
        <img src="../../assets/images/found/phone.png" alt="">
        <p class="margin">客服热线</p>
        <p>40085-666-85</p>
      </div>
      <div class="flex-1"  @click="wxLayer = !wxLayer">
        <img src="../../assets/images/found/wx.png" alt="">
        <p class="margin">官方微信公众号</p>
        <p>tuodao666</p>
      </div>
    </div>
    <div class="footer">
      <div class="time">
        <div class="fl">客服服务时间</div>
        <div class="fr">
          <p>工作日9:00-20:00</p>
          <p>法定假日(含周末)9:00-18:00</p>
        </div>
      </div>
    </div>
    <!-- 客服热线弹窗 -->
    <Layer v-show="kfLayer" close="取消" submit="呼叫" @on-close="kfLayer = !kfLayer" @on-sub="kfSub">
      <div class="kfLayer">40085-666-85</div>
    </Layer>
    <!-- 关注微信弹窗 -->
    <Layer v-show="wxLayer" close="取消" submit="去关注" @on-close="wxLayer = !wxLayer" @on-sub="wxSub">
      <div class="wxLayer">
        关注拓道金服服务号，您的贴身管家，账户状态实时跟进，重大活动及时知晓（<span>已自动复制微信号<br />tuodao666</span>）
      </div>
    </Layer>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '联系我们'
  },
  data () {
    return {
      kfLayer: false,
      wxLayer: false
    }
  },
  methods: {
    kfSub () {
      window.location.href = 'tel:4008566685'
    },
    wxSub () {
      // 动态创建 input 元素
      let aux = document.createElement('input')
      // 获得需要复制的内容
      aux.setAttribute('value', 'tuodao666')
      // 添加到 DOM 元素中
      document.body.appendChild(aux)
      // 执行选中
      // 注意: 只有 input 和 textarea 可以执行 select() 方法.
      aux.select()
      // 执行复制命令
      document.execCommand('Copy')
      // 将 input 元素移除
      document.body.removeChild(aux)
      this.wxLayer = !this.wxLayer
    }
  }
}
</script>
<style lang="stylus" scoped>
  .main
    position: relative
    padding-top: 0.88rem
    overflow: hidden
    .con
      background-color: #fff
      overflow: hidden
      width: 100%
      padding: 0.3rem 0
      display: flex
      .flex-1
        text-align: center
        font-size: 0.28rem
        color: #000
        flex: 1
        img
          width: 0.68rem
          height: 0.68rem
        .margin
          font-size: 0.26rem
          color: #666
          margin: 0.1rem 0 0.15rem
    .footer
      padding: 0 0.2rem
      background-color: #fff
      .time
        height: 1rem
        overflow: hidden
        font-size: 0.26rem
        border-top: 1px solid #f2f3f7
        .fl
          float: left
          line-height: 1rem
        .fr
          float: right
          text-align: right
          p
            color: #000
            height: 0.5rem
            font-size: 0.24rem
            line-height: 0.6rem
            &:last-child
              line-height: 0.4rem
    .kfLayer
      width: 100%
      text-align: center
      padding: 0.3rem 0.3rem 0
      line-height: 0.4rem
      letter-spacing: 1px
    .wxLayer
      width: 100%
      padding: 0.3rem 0.3rem 0.1rem
      line-height: 0.4rem
      letter-spacing: 1px
      span
        color: #FF6600
</style>