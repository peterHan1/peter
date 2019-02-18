<template>
  <cube-scroll>
    <div class="terraces">
      <div class="terrace_top">
        <h3>基本信息</h3>
        <div>
          <p>拓道金服（杭州拓道互联网金融服务有限公司）是中国领先的汽车金融服务平台，成立于2013年11月，注册/实缴资本5000万元。</p>
          <p>2017年，平台完成了8000万A轮融资（由杭州市财政、西湖房产集团、济民资本参股的知名机构帮实资本、虫二文化产业基金领投，蓝山资本、宏桥资本、透视资本等跟投）。在五年的合规发展道路上，拓道金服获得了社会各界和资本市场的认可，相继被评为“中国汽车金融十强企业”、“互联网金融百强企业”。并于同年4月成功接入银行资金存管。目前使用新网银行的资金存管系统。</p>
        </div>
      </div>
      <div class="terrace_bot">
        <h3>企业相关信息</h3>
        <div class="bot_icon">
          <div class="icon_top flex">
            <router-link
              to="/home/inform/aboutTd/children/info"
              class="flex-1">
              <i class="iconfont">&#xe69f;</i>
              <p class="mt">从业机构 </p>
              <p>平台信息</p>
            </router-link>
            <router-link
              to="/home/inform/aboutTd/children/bank"
              class="flex-1">
              <i class="iconfont">&#xe6a2;</i>
              <p class="mt">资金存管 </p>
              <p>新网银行</p>
            </router-link>
            <router-link
              to="/home/inform/aboutTd/children/board"
              class="flex-1">
              <i class="iconfont">&#xe6a0;</i>
              <p class="mt">董事、监事</p>
              <p>高级管理人员</p>
            </router-link>
          </div>
          <div class="icon_bot flex">
            <router-link
              to="/home/inform/aboutTd/children/shareholder"
              class="flex-1">
              <i class="iconfont">&#xe69e;</i>
              <p class="mt">实际控制人与</p>
              <p>持股5%以上股东</p>
            </router-link>
            <router-link
              to="/home/inform/aboutTd/children/record"
              class="flex-1">
              <i class="iconfont">&#xe6cd;</i>
              <p class="mt">备案信息 </p>
            </router-link>
            <router-link
              to="/home/inform/aboutTd/children/great"
              class="flex-1">
              <i class="iconfont">&#xe6a1;</i>
              <p class="mt">从业机构</p>
              <p>重大事项信息</p>
            </router-link>
          </div>
        </div>
      </div>
      <div class="inform_signature">
        <div><h3 class="title">法人签章</h3></div>
        <img src="~/assets/images/inform/signature-2.png">
      </div>
    </div>
  </cube-scroll>
</template>
<style lang="stylus" scoped>
  .terraces
    border-top: 0.2rem solid $color-background
  .terrace_top,.terrace_bot
    background-color: $color-white
    padding: 0 0.3rem
  .terrace_top
    div
      overflow: hidden
      padding-bottom: 0.32rem
     p
      font-size: $fontsize-small-ss
      color: $color-gray8
      line-height: 0.4rem
      margin-top: 0.14rem
  .terrace_bot
    border-top: 0.2rem solid $color-background
    .flex
      display: flex
      padding-top: 0.5rem
      overflow: hidden
      .flex-1
        flex: 1
    .bot_icon
      overflow: hidden
    p
      font-size: $fontsize-small-ss
      color: $color-gray8
      height: 0.3rem
      line-height: 0.3rem
      margin-bottom: 0.1rem
      &.mt
        margin-top: 0.1rem
    a
      text-align: center
    .iconfont
      color: $color-primary
      font-size: 0.6rem
    .icon_top
      margin-top: 0.2rem
    .icon_bot
      margin: 0.3rem 0 0.8rem 0
  .inform_signature
    background-color: $color-white
    border-top: 0.2rem solid $color-background
    border-bottom: 0.2rem solid $color-background
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
  h3
    font-size: $fontsize-medium
    color: $color-gray1
    height: 0.8rem
    line-height: 0.8rem
    border-bottom: 1px solid $color-gray5
    font-weight: normal
</style>
