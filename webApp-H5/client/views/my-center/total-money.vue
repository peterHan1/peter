<template>
  <div class="totalMoney">
    <Header :navLeftTxt="'icon'">总资产</Header>
    <div class="scale">
      <div class="total_money">
        <p>123456789.66</p>
        <p>总资产(元)</p>
      </div>
      <div id="scale"></div>
    </div>
    <ul>
      <li class="list_balance">
        <span>账户余额</span>
        <b>123456.12元</b>
      </li>
      <li  class="list_coll">
        <span>代收金额</span>
        <b>123456789.12元</b>
      </li>
      <li>
        <span>代收本金</span>
        <b>1234567.12元</b>
      </li>
      <li>
        <span>代收利息</span>
        <b>123456.12元</b>
      </li>
      <li class="list_frozen">
        <span>冻结金额</span>
        <b>1234.56元</b>
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
            color: ['#ffb059', '#ff7568', '#8cd079'],
            data: [
              {value: 0, name: '账户余额'},
              {value: 0, name: '代收金额'},
              {value: 0, name: '冻结金额'}
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
      color: #333
      background-color: #fff
      padding: 0 30px 0 116px
      border-bottom: 1px solid #F2F3F7
      position:relative
      overflow: hidden
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
    .list_balance,.list_frozen
      margin-top: 20px
      border: none
    .list_coll
      margin-top: 20px
    .list_balance:before
      background-color: #ffb059
    .list_coll:before
      background-color: #ff7568
    .list_frozen:before
      background-color: #8cd079
</style>
