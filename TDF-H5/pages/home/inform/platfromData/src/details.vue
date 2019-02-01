<template>
  <cube-scroll>
    <div class="platform_b platform_bot">
      <div class="ranking_top">
        <h3>今日投标风云榜</h3>
        <ul>
          <li
            v-for="(item, index) in items1"
            :key="index"
            :class="[index === 0?'one':'', index === 1?'two':'', index === 2?'three':'']">
            <p>{{ item.usernameX }}</p>
            <p>出借{{ item.amount | toFixeds }}元</p>
          </li>
        </ul>
      </div>
      <div class="ranking_com">
        <h3>本月投标风云榜</h3>
        <ul>
          <li
            v-for="(item, index) in items2"
            :key="index"
            :class="[index === 0?'one':'', index === 1?'two':'', index === 2?'three':'']">
            <p>{{ item.usernameX }}</p>
            <p>出借{{ item.amount | toFixeds }}元</p>
          </li>
        </ul>
        <p class="txt_p">备注：以上排行榜的数据仅展示普通出借人（不含机构资金数据）</p>
      </div>
      <div class="ranking_bot">
        <h3>借款排行榜</h3>
        <table>
          <tr class="tr_color">
            <th colspan="3">前十大借款人分布</th>
          </tr>
          <tr class="tr_colors">
            <th class="th_l">排名</th>
            <th class="th_c">待还本金</th>
            <th class="th_r">占比</th>
          </tr>
          <tr
            v-for="(item, index) in items3"
            :key="index">
            <td>{{ item.username }}</td>
            <td>{{ item.amount/10000 | toFixeds }}万元</td>
            <td>{{ item.proportion }}</td>
          </tr>
        </table>
        <p class="txt_p">备注：借款本金超过20万的均为企业借款人</p>
      </div>
      <div class="inform_charge">
        <div><h3 class="title">收费标准</h3></div>
        <div class="div_table">
          <table>
            <tr class="tr_back">
              <th>业务类型</th>
              <td>资费标准</td>
            </tr>
            <tr>
              <th>用户注册</th>
              <td>免费</td>
            </tr>
            <tr class="tr_back">
              <th>用户激活存管</th>
              <td>免费</td>
            </tr>
            <tr>
              <th>充值</th>
              <td>免费</td>
            </tr>
            <tr class="tr_back">
              <th>提现</th>
              <td class="td_left">成为拓道金服VIP后，可享受每月免费提现次数。（免费提现包含未出借金额）。具体的免费提现次数，请参照会员体系。无免费提现次数：提现金额中含未出借可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取3元/笔的手续费。</td>
            </tr>
            <tr>
              <th>债权转让手续费</th>
              <td class="td_left">
                <p>持有＜90天，收取0.5%转让金额手续费；</p>
                <p>持有≥90天，收取0.2%转让金额手续费；（最低为1元）。</p>
              </td>
            </tr>
            <tr class="tr_back">
              <th>借款人居间服务费+借款人账户管理费合计 （年化利率）</th>
              <td>6% - 13%</td>
            </tr>
          </table>
          <p class="p_txt">备注：借款人实际费用将根据借款人的资信情况按比例收取</p>
        </div>
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../../assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
import {
  platfromDayRank,
  platfromMonthRank,
  platfromBorrowRank
} from '../../../../../plugins/api.js'
export default {
  data() {
    return {
      items1: [],
      items2: [],
      items3: []
    }
  },
  filters: {
    chartBig(value) {
      if (value === 0) {
        return '第一名'
      } else if (value === 1) {
        return '第二名'
      } else if (value === 2) {
        return '第三名'
      } else if (value === 3) {
        return '第四名'
      } else if (value === 4) {
        return '第五名'
      } else if (value === 5) {
        return '第六名'
      } else if (value === 6) {
        return '第七名'
      } else if (value === 7) {
        return '第八名'
      } else if (value === 8) {
        return '第九名'
      } else if (value === 9) {
        return '第十名'
      } else {
        return '其他'
      }
    },
    toFixeds(val) {
      return Number(val).toFixed(2)
    }
  },
  mounted() {
    platfromDayRank(this.$axios).then(res => {
      this.items1 = res.data.content.list
    })
    platfromMonthRank(this.$axios).then(res => {
      this.items2 = res.data.content.list
    })
    platfromBorrowRank(this.$axios).then(res => {
      this.items3 = res.data.content.list
    })
  }
}
</script>
<style lang="stylus" scoped>
  .platform_b
    margin-top 0.2rem
    li
      height:0.8rem
      line-height:0.8rem
      font-size: $fontsize-small-ss
      color:$color-gray8
      border-bottom: 1px solid $color-gray5
      padding:0 0.1rem 0 0.58rem
      &.one
        background:url(../../../../../assets/images/inform/one.png) no-repeat
        background-size:5% 40%
        background-position:1% 50%
      &.two
        background:url(../../../../../assets/images/inform/two.png) no-repeat
        background-size:5% 40%
        background-position:1% 50%
      &.three
        background:url(../../../../../assets/images/inform/three.png) no-repeat
        background-size:5% 40%
        background-position:1% 50%
      &:last-child
        border-bottom: none
      & p:nth-child(1)
        float: left
      & p:nth-child(2)
        float: right
  .ranking_top
    padding:0 0.3rem
    background-color:white
  .ranking_com
    padding:0 0.3rem
    background-color:white
    margin-top:0.2rem
    .txt_p
      line-height: 0.8rem
      font-size: 0.2rem
      color: #7e7e7e
      margin-top: 0.1rem
      padding-left: 0.25rem
  .ranking_bot
    padding:0 0.3rem
    background-color:$color-white
    margin-top:0.2rem
    .tr_color
      background-color:$color-gray5
    .tr_colors
      background-color:#efefef
    table
      width:100%
      border-collapse:collapse
      tr
        height:0.8rem
        line-height:0.8rem
      th
        color:$color-gray1
        font-size: $fontsize-small-s
        font-weight: normal
      td
        color:$color-gray8
        font-size: $fontsize-small-ss
        border-bottom: 1px solid $color-gray5
      .th_l
        width:40%
        padding-left:0.25rem
        text-align:left
      .th_c
        width:45%
        text-align:left
      .th_r
        width:15%
        text-align:right
        padding-right:0.25rem
      td:nth-child(1)
        width:40%
        padding-left:0.25rem
        text-align:left
      td:nth-child(2)
        width:45%
        text-align:left
      td:nth-child(3)
        width:15%
        text-align:right
        padding-right:0.25rem
    .txt_p
      line-height:0.8rem
      font-size: $fontsize-small-ssss
      color:#7e7e7e
      margin-top:0.1rem
      padding-left:0.25rem
  .inform_charge
    background-color: #fff
    margin-top: 0.2rem
    div
      padding: 0 0.3rem
    .div_table
      padding: 0.2rem 0.3rem 0
    table
      width: 100%
      border-collapse: collapse
      border-spacing: 0
      white-space: initial
      tr
        width: 100%
        font-size: $fontsize-small-s
        color: $color-gray1
        th
          width: 30%
          text-align: center
          background-color: #f8f8f8
          padding: 0.17rem 0.1rem
          font-weight: normal
          vertical-align: middle
        td
          text-align: center
          background-color: $color-white
          padding: 0.17rem
          vertical-align: middle
        .td_left
          text-align: justify
      .tr_back
        th
          background-color: #e3e7ee
        td
          background-color: #f5f9ff
    .p_txt
      font-size: $fontsize-small-s
      color: $color-gray2
      line-height: 0.9rem
      padding-bottom: 0.1rem
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
