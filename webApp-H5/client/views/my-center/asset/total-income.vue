<template>
  <div class="totalMoney">
    <Header :navLeftTxt="'icon'">累计收益</Header>
    <div class="totalTop">
      <div class="top_left">
        <p>累计收益(元)</p>
        <h3>510000.00</h3>
        <ul>
          <li>出借收益</li>
          <li>优惠券</li>
          <li>平台奖励</li>
          <li>邀请奖励</li>
        </ul>
      </div>
      <div class="top_right">
        <div id="scale"></div>
      </div>
    </div>
    <div class="totalBot">
      <ul>
        <li>
          <span class="balance">出借收益</span>
          <span>1.00元</span>
        </li>
        <li>
          <span class="dueIn">优惠券</span>
          <span>12.00元</span>
        </li>
        <li>
          <span class="frozen">平台奖励</span>
          <span>12345.00元</span>
        </li>
        <li>
          <span class="frozen">邀请奖励</span>
          <span>123456.00元</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
      }
    },
    mounted () {
      let myChart = echarts.init(document.getElementById('scale'))
      myChart.setOption({
        series: [
          {
            name: '总资产',
            type: 'pie',
            hoverAnimation: false,
            radius: ['90%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            color: ['#F2836E', '#6A7BE6', '#FFC466', '#34D9DE'],
            data: [
              {value: 0, name: '出借收益'},
              {value: 0, name: '优惠券'},
              {value: 0, name: '平台奖励'},
              {value: 0, name: '邀请奖励'}
            ]
          }
        ]
      })
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .totalMoney
    position: absolute
    min-height: 100%
    box-sizing: border-box
    padding-top: 0.88rem
    background-color: #fff
    .totalTop
      padding: 0 40px 45px
      box-sizing: border-box
      width: 100%
      background: url(../../../assets/images/my-center/total-bg.png) no-repeat
      -webkit-background-size: 100% 100%
      background-size: 100% 100%
      div
        display: inline-block
      .top_left
        width: 60%
        p
          font-size: 28px
          color: #333
          line-height: 40px
          padding-top: 26px
        h3
          font-size: 59px
          color: #333
          line-height: 71px
          margin-top: 5px
        ul
          padding-top: 38px
          width: 100%
          li
            font-size: 28px
            color: #999
            line-height: 40px
            display: inline-block
            width: 48%
            margin-top: 15px
            position: relative
            padding-left: 30px
          li:before
            content: ''
            display: block
            width: 16px
            height: 16px
            border-radius: 100%
            position: absolute
            left: 0
            top: 50%
            margin-top: -8px
          li:nth-child(1):before
            background-color: #F2836E
          li:nth-child(2):before
            background-color: #6A7BE6
          li:nth-child(3):before
            background-color: #FFC466
          li:nth-child(4):before
            background-color: #34D9DE
      .top_right
        width: 35%
        text-align: right
        div
          display: inline-block
          width: 235px
          height: 235px
    .totalBot
      li
        font-size: 28px
        padding-left: 70px
        margin-top: 70px
        span
          display: inline-block
          color: #333
          line-height: 40px
        span:nth-child(1)
          width: 30%
          text-align: left
          position: relative
          &:before
            content: ''
            display: block
            width: 10px
            height: 20px
            border-radius: 20px
            position: absolute
            left: -20px
            top: 50%
            margin-top: -10px
        span:nth-child(2)
          width: 32%
          text-align: right
        .balance
          color: #F2836E
          &:before
            background-color: #F2836E
        .dueIn
          color: #6A7BE6
          &:before
            background-color: #6A7BE6
        .frozen
          color: #FFC466
          &:before
            background-color: #FFC466
</style>
