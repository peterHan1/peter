<template>
  <div class="ucSet">
    <Header :navLeftTxt="'icon'">回款日历</Header>
    <div class="total_money"><span>待回款总额(元)：</span><b>12,345.00</b></div>
    <Data></Data>
    <div class="return_tlt">下方为您显示本月回款明细，点击上方日期查看当天明细</div>
    <div class="return_list">
      <div class="list_tab">
        <div class="tab_left">本月总回款<span>10000.23</span>元</div>
        <div class="tab_right">
          <span :class="{on:'Wait' == tabCom}" @click="tabFn('Wait')">待回</span>
          <span :class="{on:'Yet' == tabCom}" @click="tabFn('Yet')">已回</span>
        </div>
      </div>
      <Wait :is="tabCom" :return-list="returnList"></Wait>
    </div>
  </div> 
</template>
<script>
  import Wait from './monthWait.vue'
  import Yet from './monthYet.vue'
  import Data from './data.vue'

  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        tabCom: 'Wait',
        returnList: {
          totalMoney: '500000.00',
          principal: '300000.00',
          interest: '200000.00',
          calendar: null,
          dayList: [
            {
              dayDate: '8月11日',
              dayTotalMoney: 100.23,
              dayPrincipal: 360.00,
              dayInterest: 40.00,
              show: false,
              list: [
                {
                  money: 100.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第1/3期',
                  name: '宝马X3抵押标'
                }
              ]
            },
            {
              dayDate: '8月12日',
              dayTotalMoney: 200.23,
              dayPrincipal: 360.00,
              dayInterest: 40.00,
              show: false,
              list: [
                {
                  money: 200.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第2/3期',
                  name: '宝马X3抵押标'
                },
                {
                  money: 200.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第2/3期',
                  name: '大众速腾抵押标-省心投201808313'
                }
              ]
            },
            {
              dayDate: '8月13日',
              dayTotalMoney: 300.23,
              dayPrincipal: 360.00,
              dayInterest: 40.00,
              show: false,
              list: [
                {
                  money: 200.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第3/3期',
                  name: '宝马X3抵押标'
                },
                {
                  money: 200.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第2/3期',
                  name: '宝马X3抵押标'
                },
                {
                  money: 200.00,
                  principal: 100.00,
                  interest: 50.00,
                  status: '待回款',
                  periods: '第2/3期',
                  name: '宝马X3抵押标'
                }
              ]
            }
          ]
        }
      }
    },
    mounted () {
    },
    methods: {
      tabFn (com) {
        this.tabCom = com
      }
    },
    components: {
      Wait,
      Yet,
      Data
    }
  }
</script>

<style lang="stylus" scoped>
  .ucSet
    min-height: 100%
    background-color: #F2F3F7
    padding-top: 0.88rem
    box-sizing: border-box
    .total_money
      height: 0.9rem
      line-height: 0.9rem
      font-size: 0.26rem
      background: linear-gradient(to right, #F65B3A, #FD8A17);
      color: #fff
      padding: 0 0.3rem
      b
        font-size: 0.4rem
        vertical-align: sub
    .return_tlt
      font-size: 0.22rem
      color: #ccc
      line-height: 0.68rem
      text-align: center
      background-color: #fff
    .return_list
      background-color: #F8F8FA
      .list_tab
        font-size: 0
        padding: 0 0.3rem
        margin-top: 0.3rem
        overflow: hidden
        div
          display: inline-block;
          font-size: 0.28rem
          color: #333
          line-height: 0.8rem
        .tab_left
          span
            font-size: 0.3rem
            color: #FC862A
        .tab_right
          float: right
          span
            display: inline-block;
            height: 100%
            padding: 0 0.06rem
            box-sizing: border-box
            margin-left: 0.56rem
          .on
            color: #FC862A
            border-bottom: 2px solid #FC862A
    .fix:after
      display:table
</style>
