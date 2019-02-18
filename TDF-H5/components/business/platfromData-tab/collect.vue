<template>
  <cube-scroll>
    <div class="platform_a">
      <div class="platform_a_top">
        <p class="data_time">数据统计日期：2018-06-06</p>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.account | toFixeds }}</dt>
            <dd>累计撮合金额（元）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.borrowNum }}</dt>
            <dd>累计撮合个数（个）</dd>
          </dl>
        </div>
        <div class="flex platform_num">
          <dl class="flex-1">
            <dt>{{ totalData.borrowerNum }}</dt>
            <dd>累计借款人数（人）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.investorNum }}</dt>
            <dd>累计出借人数（人）</dd>
          </dl>
        </div>
      </div>
      <div class="platform_a_com">
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.nowBorrowAmount | toFixeds }}</dt>
            <dd>当前借款余额（元）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.nowBorrowerNum }}</dt>
            <dd>当前借款人数（人）</dd>
          </dl>
        </div>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.nowBorrowNum }}</dt>
            <dd>当前借款个数（个）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.nowInvestorNum }}</dt>
            <dd>当前出借人数（人）</dd>
          </dl>
        </div>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.todayBorrowNum }}</dt>
            <dd>今日已发标数量（个）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.todayBorrowAmount | toFixeds }}</dt>
            <dd>今日已发标金额（元）</dd>
          </dl>
        </div>
      </div>
      <div class="platform_a_bot">
        <p class="data_tlt">数据更新：每月月初更新</p>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ percent }}</dt>
            <dd>逾期率<br>(累计逾期金额/累计交易总额)</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.overdueAmount | toFixeds }}</dt>
            <dd>累计逾期金额（元）</dd>
          </dl>
        </div>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.overdueNinetyNum }}</dt>
            <dd>累计逾期90天（不含） <br>以上个数（个）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.overdueNinetyAmount | toFixeds }}</dt>
            <dd>累计逾期90天（不含） <br>以上金额（元）</dd>
          </dl>
        </div>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.overdueNum }}</dt>
            <dd>累计逾期个数（个）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.compensationAmount | toFixeds }}</dt>
            <dd>累计代偿金额（元）</dd>
          </dl>
        </div>
        <div class="flex">
          <dl class="flex-1">
            <dt>{{ totalData.compensationNum }}</dt>
            <dd>累计代偿个数（个）</dd>
          </dl>
          <dl class="flex-1">
            <dt>{{ totalData.correlationBorrowAmount | toFixeds }}</dt>
            <dd>关联关系借款余额（元）</dd>
          </dl>
        </div>
        <div class="">
          <dl class="">
            <dt>{{ totalData.correlationBorrowNum }}</dt>
            <dd>关联关系借款个数（个）</dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="~assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
import { platfromData } from '~/api/home.js'
export default {
  data() {
    return {
      totalData: {},
      percent: ''
    }
  },
  filters: {
    toFixeds(val) {
      return Number(val).toFixed(2)
    }
  },
  mounted() {
    platfromData(this.$axios).then(res => {
      this.totalData = res.content.platData
      this.percent = this.totalData.overdueRate + '%'
    })
  }
}
</script>
<style lang="stylus" scoped>
  .platform_a
    margin-top 0.2rem
  .platform_a_top
    padding-bottom:0.58rem
    background-color:$color-white
    .data_time
      font-size: $fontsize-small-ssss
      color:$color-gray8
      text-align:center
      line-height:0.84rem
    dl
      text-align:center
    dt
      font-size: $fontsize-large-xxx
      color:$color-primary
      font-weight: bold
      margin-bottom:0.1rem
    dd
      font-size: $fontsize-small-sss
      color:#7e7e7e
  .platform_num
    margin-top:0.55rem
    .boundary
      display: inline-block
      height:0.8rem
      width:1px
      background-color:$color-gray5
      margin:0.05rem 0
  .platform_a_com
    padding-top:0.6rem
    margin-top:0.2rem
    background-color:$color-white
    overflow: hidden
    &>div
      width:100%
      margin-bottom:0.5rem
    dl
      width:50%
      text-align:center
    dt
      font-size: $fontsize-large-x
      color:$color-primary
      margin-bottom:0.12rem
    dd
      font-size: $fontsize-small-ssss
      color:$color-gray8
  .platform_a_bot
    margin-top:0.2rem
    background-color:$color-white
    overflow: hidden
    .data_tlt
      font-size: $fontsize-small-sss
      color:$color-gray2
      text-align: center
      line-height:0.62rem
      padding-bottom:0.16rem
    &>div
      width:100%
      margin-bottom:0.6rem
    dl
      width:50%
      text-align:center
    dt
      font-size: $fontsize-large-x
      color:$color-gray1
      margin-bottom:0.12rem
    dd
      font-size: $fontsize-small-ssss
      color:$color-gray8
  .flex
    display: flex
    overflow: hidden
    .flex-1
      flex: 1
  h3
    line-height:0.8rem
    font-size: $fontsize-small-s
    color:$color-gray1
    font-weight: normal
    background-color:$color-white
    border-bottom: 1px solid $color-gray5
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid $color-background
    border-bottom: 0.2rem solid $color-background
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
</style>
