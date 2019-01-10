<template>
  <div class="invite">
    <td-header title="邀请奖励记录"/>
    <div class="inviteTop">
      <ul>
        <li>
          <div>
            <p class="pFont">100.00</p>
            <p>12月24日待收返现总奖励(元)</p>
          </div>
        </li>
        <li>
          <div>
            <p>50.00</p>
            <p>已收返现奖励(元)</p>
          </div>
          <div>
            <p>60.00</p>
            <p>抵用券奖励(元)</p>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/myCenter/invite/inviteList" >
              <p>6</p>
              <p>直接邀请人数 <i class="iconfont">&#xe6f2;</i></p>
            </router-link>
          </div>
          <div>
            <router-link to="/myCenter/invite/inviteList" >
              <p>8</p>
              <p>间接邀请人数 <i class="iconfont">&#xe6f2;</i></p>
            </router-link>
          </div>
        </li>
      </ul>
    </div>
    <div class="listBox">
      <div class="tabList">
        <span class="on">待收返现明细</span>
        <span>已收返现明细</span>
      </div>
      <div class="inviteList">
        <ul>
          <div class="listTop">
            <li>
              <span>奖励金额(元)</span>
              <span>奖励类型</span>
              <span>奖励来源人</span>
              <span>产生时间</span>
            </li>
          </div>
          <div>
            <li>
              <span>6.66</span>
              <span>直接奖励</span>
              <span>134****9086</span>
              <span>12月20日</span>
            </li>
            <li>
              <span>6.66</span>
              <span>直接奖励</span>
              <span>134****9086</span>
              <span>12月20日</span>
            </li>
            <li>
              <span>8.88</span>
              <span>直接奖励</span>
              <span>134****9086</span>
              <span>12月20日</span>
            </li>
            <li>
              <span>6.66</span>
              <span>直接奖励</span>
              <span>134****9086</span>
              <span>12月20日</span>
            </li>
            <li>
              <span>8.88</span>
              <span>直接奖励</span>
              <span>134****9086</span>
              <span>12月20日</span>
            </li>
          </div>
          <!-- <div class="data-null">
            <div class="nullBg"/>
            <p>暂无待收返现明细</p>
          </div> -->
        </ul>
      </div>
    </div>
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
  .invite
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    .inviteTop
      background-color: $color-white
      padding-bottom: 30px
      li
        display: flex
        div
          flex: 1
          text-align: center
          p:nth-child(1)
            font-size: $fontsize-large-xxxxx
            color: $color-primary
            line-height: 59px
            margin-top: 20px
          p:nth-child(2)
            font-size: $fontsize-medium 
            color: $color-gray3
            line-height: 40px
          p.pFont
            font-size: $fontsize-large-xxxxxxxx
            margin-top: 29px
          a
            display: block
    .listBox
      margin-top: 20px
      .tabList
          height: 88px
          display: flex
          background-color: $color-white
          border-bottom: 1px solid $color-gray5
          span
            flex: 1
            line-height: 88px
            text-align: center
            font-size: $fontsize-large-xx
            color: $color-gray2
            position: relative
          .on
            color: $color-primary
          .on:after
            content: ''
            display: block
            width: 80px
            height: 6px
            background-color: #FF7102
            position: absolute
            bottom: 0
            left: 50%
            transform: translateX(-50%)
            border-radius: 10px  
      .inviteList
        background-color: $color-white
        ul
          div
            padding: 0 30px
          li
            display: flex
            border-bottom: 1px solid #e8e8e8
            span
              flex: 1
              text-align: center
              line-height: 90px
              font-size: $fontsize-medium
              color: $color-gray1
            span:first-child
              text-align: left
            span:last-child
              text-align: right 
          .listTop
            border-bottom: 1px solid #e8e8e8
            li
              border: none
              span
                line-height: 82px
                font-size: $fontsize-small-ss
                color: $color-gray3
          .data-null
            padding-top: 60px
</style>
