<template>
  <div class="totalMoney">
    <Header :navLeftTxt="'icon'">累计收益</Header>
    <div class="scale">
      <div class="total_money">
        <p>123456789.66</p>
        <p>累计收益(元)</p>
      </div>
      <div id="scale"></div>
    </div>
    <ul>
      <li>
        <span>出借收益</span>
        <b>123456.12元</b>
      </li>
      <li>
        <span>优惠券</span>
        <b>123456789.12元</b>
      </li>
      <li>
        <span>平台奖励</span>
        <b>1234567.12元</b>
      </li>
      <li>
        <span>邀请奖励</span>
        <b>123456.12元</b>
      </li>
    </ul>
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
            radius: ['90%', '75%'],
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
            color: ['#ffb059', '#ff7568', '#8cd079', '#8bd1d1'],
            data: [
              {value: 335, name: '优惠券'},
              {value: 310, name: '代收金额'},
              {value: 666, name: '平台奖励'},
              {value: 234, name: '邀请奖励'}
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
    min-height: 100%
    box-sizing: border-box
    overflow: hidden
    .scale
      width: 100%
      height: 390px
      background-color: #fff
      margin-top: 88px
      position: relative
      #scale
        width: 100%
        height: 100%
      .total_money
        position: absolute
        left: 50%
        top: 50%
        font-size: 36px
        color: #333
        text-align: center
        transform: translateX(-50%) translateY(-50%)
        p:nth-child(2)
          font-size: 28px
    li
      font-size: 32px
      background-color: #fff
      padding: 0 30px 0 116px
      position: relative
      overflow: hidden
      margin-top: 20px
      color: #666
      span
        display: block
        line-height: 88px
        float: left
      b
        display: block
        line-height: 88px
        float: right
        font-weight: normal
    li:before
      content: ''
      display: block
      width: 35px
      height: 35px
      position: absolute
      left: 40px
      top: 50%
      margin-top: -18px
    li:nth-child(1):before
      background-color: #ffb059
    li:nth-child(2):before
      background-color: #ff7568
    li:nth-child(3):before
      background-color: #8cd079
    li:nth-child(4):before
      background-color: #8bd1d1
</style>
