<template>
  <div class="myPoint">
    <header>
      <div class="header">
        <div  class="top">
          我的积分
          <span class="iconfont" @click="back">&#xe687;</span>
          <router-link to="/found/point-rule">使用说明</router-link>
        </div>
        <p class="point">{{ point }}</p>
        <div class="btns">
          <router-link class="margin" to="/found/jxq-exchange">去兑换<img src="../../assets/images/found/point2.png" alt=""></router-link>
          <router-link to="/found/get-point">赚积分<img class="imgs" src="../../assets/images/found/point3.png" alt=""></router-link>
        </div>
      </div>
      <ul>
        <li :class="{on: active}" @click="change">已获取</li>
        <li :class="{on: !active}" @click="change">已支出</li>
      </ul>
    </header>
    <div class="details" v-if="state">
      <table>
        <tr>
          <th width="17%">积分</th>
          <th width="48%">来源</th>
          <th>时间</th>
        </tr>
        <tr v-for="item in items">
          <td>{{item.point}}</td>
          <td>{{item.source}}</td>
          <td>{{item.time}}</td>
        </tr>
      </table>
    </div>
    <div class="details" v-else>
      <table>
        <tr>
          <th width="17%">积分</th>
          <th width="48%">用途</th>
          <th>时间</th>
        </tr>
        <tr v-for="item in itemss">
          <td>{{item.point}}</td>
          <td>{{item.source}}</td>
          <td>{{item.time}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '我的积分'
  },
  data () {
    return {
      point: 1006,
      active: true,
      state: true,
      items: [{point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}, {point: '+1', source: '签到', time: '2017/05/10 12:30'}],
      itemss: [{point: '-100', source: '兑换1张1%加息券', time: '2017/05/10 12:30'}, {point: '-100', source: '兑换1张1%加息券', time: '2017/05/10 12:30'}, {point: '-100', source: '兑换1张1%加息券', time: '2017/05/10 12:30'}]
    }
  },
  methods: {
    change () {
      this.active = !this.active
      this.state = !this.state
    },
    back () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .myPoint
    font-family: PingFangSC-Regular
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    padding-top: 5.47rem
    height: 100%
    header
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      color: #fff
      height: 5.47rem
      border-bottom: 0.22rem solid #f2f3f7
      overflow: hidden
      .header
        height: 4.37rem
        background: url(../../assets/images/found/point1.png) no-repeat
        background-size: 100%
        .top
          height: 1.28rem
          line-height: 0.4rem
          letter-spacing: 1px
          padding-top: 0.6rem
          width: 100%
          text-align: center
          font-size: 0.36rem
          z-index: 98
          span
            position: absolute
            left: 0.3rem
            color: #fff
            font-size: 0.34rem
          a
            position: absolute
            right: 0.3rem
            color: #fff
            font-size: 0.26rem
        p
          font-size: 0.7rem
          font-family: DIN
          color: #fff
          font-weight: bold
          text-align: center
          margin: 0.33rem 0 0.4rem
        .btns
          display: flex
          justify-content: center
          font-family: PingFang SC
          a
            display: inline-block
            width: 1.92rem
            height: 0.64rem
            text-align: center
            line-height: 0.64rem
            font-size: 0.3rem
            color: #fff
            border: 1px solid #fff
            border-radius: 0.32rem
            img
              width: 0.3rem
              height: 0.26rem
              vertical-align: middle
              margin-left: 0.1rem
              margin-bottom: 2px
              &.imgs
                width: 0.31rem
                height: 0.31rem
            &.margin
              margin-right: 0.4rem
      ul
        width: 100%
        background-color: #fff
        overflow: hidden
        display: flex
        justify-content: space-around
        li
          text-align: center
          font-size: 0.32rem
          color: #999
          height: 0.88rem
          line-height: 0.88rem
          position: relative
          &.on
            color: #ff7102
          &.on:after
            content: " "
            width: 0.64rem
            height: 0.06rem
            background-color: #ff7102
            position: absolute
            left: 50%
            margin-left: -0.32rem
            bottom: 0
            border-radius: 3px
            z-index: 5
    .details
      background-color: #fff
      padding: 0 0.3rem
      table
        tr
          border-bottom: 1px solid #F2F3F7
          th,td
            height: 0.775rem
            line-height: 0.775rem
            font-size: 0.28rem
            font-weight: normal
            color: #999
            &:first-child
              padding-left: 5px
          th
            color: #333
            text-align: left
</style>