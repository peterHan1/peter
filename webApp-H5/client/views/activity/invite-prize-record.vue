<template>
  <div class="prize_record">
    <Header navLeftTxt="icon">邀请奖励记录</Header>
    <div class="prize_top">
      <div class="tops">
        <p class="til">400.00</p>
        <p class="font">7月3日待收返现总奖励(元)</p>
      </div>
      <div class="flex">
        <dl class="flex-1">
          <dt>1288.5</dt>
          <dd>已收返现奖励(元)</dd>
        </dl>
        <dl class="flex-1">
          <dt>800</dt>
          <dd>抵用券奖励(元)</dd>
        </dl>
      </div>
      <div class="flex">
        <router-link class="flex-1" to="/invite-people-record">
          <dl>
            <dt>6</dt>
            <dd>直接邀请人数&nbsp;<i class="iconfont">&#xe83d;</i></dd>
          </dl>
        </router-link>
        <router-link class="flex-1" to="/invite-people-record">
          <dl>
            <dt>3</dt>
            <dd>间接邀请人数&nbsp;<i class="iconfont">&#xe83d;</i></dd>
          </dl>
        </router-link>
      </div>
      <p class="tab">
        <span :class="{on:active}" @click="change('soon')">待收返现明细</span>
        <span :class="{on:!active}" @click="change()">已收返现明细</span>
      </p>
    </div>
    <div class="prize_bot">
      <div class="data_info" v-if="show">
        <load-more  :load-top="loadTop" :load-bottom="loadBottom" :all-loaded="allLoaded">
          <p class="item"><span>奖励金额(元)</span><span>奖励类型</span><span>奖励来源人</span><span>产生时间</span></p>
          <div>
            <ul id="prize_record">
              <li v-for="item in items">
                <span>{{item.money}}</span>
                <span>{{item.type}}</span>
                <span>{{item.source}}</span>
                <span>{{item.time}}</span>
              </li>
            </ul>
          </div>
        </load-more>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '邀请奖励记录'
  },
  data () {
    return {
      show: true, // 数据是否有无
      active: true,
      allLoaded: true,
      items: [{'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}, {'money': 1.23, 'type': '直接奖励', 'source': '152****2131', 'time': '4月1日'}]
    }
  },
  methods: {
    loadTop (done) {
      done()
    },
    loadBottom (done) {
      done()
    },
    change (type) {
      if (type === 'soon') {
        this.active = true
        // this.items = []
      } else {
        this.active = false
        // this.items = []
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  a
    outline:none
    -moz-outline-style:none
  .prize_record
    padding-top: 0.88rem
    font-family: PingFangSC-Regular, sans-serif
    .prize_top
      width:100%
      background-color: #fff
      padding: .22rem 0 .33rem
      overflow: hidden
      height:4.92rem
      position: fixed
      top:0.88rem
      left:0
      z-index: 50
      .tops
        clear: both
        .til
          font-family:PingFangSC-Medium
          font-size: .64rem
          text-align: center
          color:#FF780E
        .font
          font-size: .24rem
          color: #999999
          text-align: center
      .flex
        display: flex
        .flex-1
          flex: 1
      dl
        text-align: center
        margin: .18rem 0 .09rem 0
        dt
          font-size: .4rem
          font-family:PingFangSC-Medium
          color:#FF780E
        dd
          font-size: .24rem
          color:#999999
          position: relative
          i
            font-size: .24rem
            vertical-align: middle
            position: absolute
            right:.9rem
            top:.04rem
      .tab
        width:100%
        height:1.1rem
        position:absolute
        bottom:0
        left:0
        border-top: 0.2rem solid #f2f3f7
        background-color: #fff
        border-bottom:1px solid #E0E0E0
        span
          display: block
          float:left
          width:50%
          height:.9rem
          line-height: .9rem
          font-size: .28rem
          color:#666
          text-align: center
          &.on
            color:#FF780E
            position: relative
          &.on:after
            content:''
            position: absolute
            width:.68rem
            height:.06rem
            background-color: #FF780E
            border-radius:.03rem
            bottom:0
            left:50%
            margin-left: -0.34rem
    .prize_bot
      width:100%
      margin-top: 4.92rem
      overflow: auto
      .data_info
        width: 100%
        .item
          height:.79rem
          overflow: hidden
          background-color: #fff
          border-bottom:1px solid #e0e0e0
          padding: 0 .3rem
          span
            display: block
            float:left
            width:25%
            height:100%
            line-height: .79rem
            font-size: .24rem
            color:#999999
            text-align: left
            &:nth-child(2)
              padding-right: 0.5rem
              text-align: center
            &:nth-child(3)
              text-align: center
            &:last-child
              text-align: right
      .data_info ul
        padding: 0 .3rem
        background-color: #fff
        overflow: hidden
        li
          height:.9rem
          color:#333333
          font-size: .28rem
          text-align: left
          border-bottom:1px solid #e0e0e0
          &:last-child
            border:none
          span
            display: block
            float:left
            width:25%
            height:100%
            line-height:.9rem
            &:nth-child(2)
              padding-right: 0.5rem
              text-align: center
            &:nth-child(3)
              text-align: center
            &:last-child
              text-align: right
</style>