<template>
  <div class="platform">
    <Header navLeftTxt="icon">平台数据</Header>
    <tabs :value="tabValue" @change="handleChangeTab">
      <tab label="数据汇总" index="1">
        <div class="platform_a platform_bot">
          <div class="platform_a_top">
            <p class="data_time">数据统计日期：2018-06-06</p>
            <div class="flex">
              <dl class="flex-1">
                <dt>104840.66万</dt>
                <dd>累计撮合金额（元）</dd>
              </dl>
              <dl class="flex-1">
                <dt>1000</dt>
                <dd>累计撮合个数（个）</dd>
              </dl>
            </div>
            <div class="flex platform_num">
              <dl class="flex-1">
                <dt>69</dt>
                <dd>累计借款人数（人）</dd>
              </dl>
              <dl class="flex-1">
                <dt>18888</dt>
                <dd>累计出借人数（人）</dd>
              </dl>
            </div>
          </div>
          <div class="platform_a_com">
            <div class="flex">
              <dl class="flex-1">
                <dt>104840.66万</dt>
                <dd>当前借款余额（元）</dd>
              </dl>
              <dl class="flex-1">
                <dt>104840</dt>
                <dd>当前借款人数（人）</dd>
              </dl>
            </div>
            <div class="flex">
              <dl class="flex-1">
                <dt>1000</dt>
                <dd>当前借款个数（个）</dd>
              </dl>
              <dl class="flex-1">
                <dt>104840</dt>
                <dd>当前出借人数（人）</dd>
              </dl>
            </div>
            <div class="flex">
              <dl class="flex-1">
                <dt>69</dt>
                <dd>今日已发标数量（个）</dd>
              </dl>
              <dl class="flex-1">
                <dt>651.72万</dt>
                <dd>今日已发标金额（元）</dd>
              </dl>
            </div>
          </div>
          <div class="platform_a_bot">
            <p class="data_tlt">数据更新：每月月初更新</p>
            <div class="flex">
              <dl class="flex-1">
                <dt>2.34%</dt>
                <dd>逾期率<br>(累计逾期金额/累计交易总额)</dd>
              </dl>
              <dl class="flex-1">
                <dt>0.00</dt>
                <dd>累计逾期金额（元）</dd>
              </dl>
            </div>
            <div class="flex">
              <dl class="flex-1">
                <dt>69</dt>
                <dd>累计逾期90天（不含） <br>以上个数（个）</dd>
              </dl>
              <dl class="flex-1">
                <dt>104840.66万</dt>
                <dd>累计逾期90天（不含） <br>以上金额（元）</dd>
              </dl>
            </div>
            <div class="flex">
              <dl class="flex-1">
                <dt>0</dt>
                <dd>累计逾期个数（个）</dd>
              </dl>
              <dl class="flex-1">
                <dt>1104840.66万</dt>
                <dd>累计代偿金额（元）</dd>
              </dl>
            </div>
            <div class="flex">
              <dl class="flex-1">
                <dt>69</dt>
                <dd>累计代偿个数（个）</dd>
              </dl>
              <dl class="flex-1">
                <dt>0.00</dt>
                <dd>关联关系借款余额（元）</dd>
              </dl>
            </div>
            <div class="">
              <dl class="">
                <dt>0</dt>
                <dd>关联关系借款个数（个）</dd>
              </dl>
            </div>
          </div>
        </div>
      </tab>
      <tab label="出借/借款详情" index="2">
        <div class="platform_b platform_bot">
          <div class="ranking_top">
            <h3>今日投标风云榜</h3>
            <ul>
              <li v-for="(item, index) in items1" :key="index" :class="[index === 0?'one':'', index === 1?'two':'', index === 2?'three':'']">
                <p>{{item.phone}}</p>
                <p>出借{{item.money}}元</p>
              </li>
            </ul>
          </div>
          <div class="ranking_com">
            <h3>本月投标风云榜</h3>
            <ul>
              <li v-for="(item, index) in items2" :key="index" :class="[index === 0?'one':'', index === 1?'two':'', index === 2?'three':'']">
                <p>{{item.phone}}</p>
                <p>出借{{item.money}}元</p>
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
              <tr v-for="(item, index) in items3" :key="index">
                <td>{{index | chartBig}}</td>
                <td>{{item.money}}万元</td>
                <td>{{item.point}}</td>
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
      </tab>
      <tab label="数据播报" index="3">
        <div class="platform_c platform_bot">
          <div class="echart_top">
            <h3>平台7日数据播报</h3>
            <v-echarts :myChart="myChart1"></v-echarts>
          </div>
          <div class="echart_bot">
            <h3>平台月度数据播报</h3>
            <v-echarts :myChart="myChart2"></v-echarts>
          </div>
        </div>
      </tab>
    </tabs>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../assets/images/inform/signature-2.png" alt="">
    </div>
  </div>
</template>
<script>
import Echarts from '../../../components/echarts/echarts.vue'
export default {
  metaInfo: {
    title: '平台数据'
  },
  data () {
    return {
      tabValue: '1',
      items1: [{phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}],
      items2: [{phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}],
      items3: [{money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}],
      myChart1: {
        id: 'ranking',
        dataX: ['08-30', '08-31', '09-01', '09-02', '09-03', '09-04', '09-05'],
        series: [1183.69, 1503.12, 1341.7, 952.63, 798.37, 1270.37, 1203.5]
      },
      myChart2: {
        id: 'monthsData',
        dataX: ['03月', '04月', '05月', '06月', '07月', '08月'],
        series: [20066.48, 24480.06, 32809.37, 38141.23, 31667.78, 40349.79]
      }
    }
  },
  filters: {
    chartBig (value) {
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
    }
  },
  methods: {
    handleChangeTab (value) {
      this.tabValue = value
      if (value === '1') {
      } else if (value === '2') {
        // this.items1 = [{phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}, {phone: '133****4126', money: '303198.24'}]
        // this.items2 = [{phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}, {phone: '133****4126', money: '585343.00'}]
        // this.items3 = [{money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}, {money: '58.24', point: '0.05%'}]
      } else if (value === '3') {
        // this.myChart1 = {
        //   id: 'ranking',
        //   dataX: this.$store.state.platform.dataSeven.dataX,
        //   series: this.$store.state.platform.dataSeven.series
        // }
        // this.myChart2 = {
        //   id: 'monthsData',
        //   dataX: this.$store.state.platform.dataMonth.dataX,
        //   series: this.$store.state.platform.dataMonth.series
        // }
      }
    }
  },
  components: {
    'v-echarts': Echarts
  }
}
</script>
<style lang="stylus" scoped>
  .platform
    padding-top: 0.88rem
    h3
      line-height:0.8rem
      font-size:0.26rem
      color:#212a36
      font-weight: normal
      background-color:white
      border-bottom: 1px solid #e4e4e4
  .platform_top
    width:100%
    height:0.8rem
    line-height:0.8rem
    background-color:white
    li
      height:0.8rem
      float:left
      width:30%
      text-align:center
      &:nth-child(2)
        width:40%
      a
        display:block
        width:62%
        height:0.8rem
        font-size:0.28rem
        color:#626262
        box-sizing: border-box
        margin:0 auto
        &.on
          color:#FF7400
          border-bottom:2px solid #FF7a00
  .platform_a_top
    padding-bottom:0.58rem
    background-color:white
    .data_time
      font-size:0.2rem
      color:#626262
      text-align:center
      line-height:0.84rem
    dl
      text-align:center
    dt
      font-size:0.36rem
      color:#ff7400
      font-weight: bold
      margin-bottom:0.1rem
    dd
      font-size:0.22rem
      color:#7e7e7e
  .platform_bot
    margin-top:0.2rem
  .platform_num
    margin-top:0.55rem
    .boundary
      display: inline-block
      height:0.8rem
      width:1px
      background-color:#e4e4e4
      margin:0.05rem 0
  .platform_a_com
    padding-top:0.6rem
    margin-top:0.2rem
    background-color:white
    overflow: hidden
    &>div
      width:100%
      margin-bottom:0.5rem
    dl
      width:50%
      text-align:center
    dt
      font-size:0.3rem
      color:#ff7400
      margin-bottom:0.12rem
    dd
      font-size:0.2rem
      color:#626262
  .platform_a_bot
    margin-top:0.2rem
    background-color:white
    overflow: hidden
    .data_tlt
      font-size:0.22rem
      color:#666
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
      font-size:0.3rem
      color:#212a36
      margin-bottom:0.12rem
    dd
      font-size:0.2rem
      color:#626262
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
  .platform_b li
    height:0.8rem
    line-height:0.8rem
    font-size:0.24rem
    color:#626262
    border-bottom: 1px solid #e4e4e4
    padding:0 0.1rem 0 0.58rem
    &.one
      background:url(../../../assets/images/inform/one.png) no-repeat
      background-size:5% 40%
      background-position:1% 50%
    &.two
      background:url(../../../assets/images/inform/two.png) no-repeat
      background-size:5% 40%
      background-position:1% 50%
    &.three
      background:url(../../../assets/images/inform/three.png) no-repeat
      background-size:5% 40%
      background-position:1% 50%
    &:last-child
      border-bottom: none
    & p:nth-child(1)
      float: left
    & p:nth-child(2)
      float: right
  .ranking_bot
    padding:0 0.3rem
    background-color:white
    margin-top:0.2rem
    .tr_color
      background-color:#e4e4e4
    .tr_colors
      background-color:#efefef
    table
      width:100%
      border-collapse:collapse
      tr
        height:0.8rem
        line-height:0.8rem
      th
        color:#212a36
        font-size:0.26rem
        font-weight: normal
      td
        color:#626262
        font-size:0.24rem
        border-bottom: 1px solid #e4e4e4
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
      font-size:0.2rem
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
      tr
        width: 100%
        font-size: 0.26rem
        color: #333
        th
          width: 30%
          text-align: center
          background-color: #f8f8f8
          padding: 0.17rem 0.1rem
          font-weight: normal
          vertical-align: middle
        td
          text-align: center
          background-color: #fff
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
      font-size: 0.26rem
      color: #666
      line-height: 0.9rem
      padding-bottom: 0.1rem
  .echart_top
    background-color:white
    padding:0 0.3rem
  .echart_bot
    background-color:white
    margin-top:0.2rem
    padding:0 0.3rem
  #ranking
    width:100%
    height:5.1rem
    padding:0.4rem 0
    box-sizing: border-box
  #monthsData
    width:100%
    height:5.1rem
    padding:0.4rem 0
    box-sizing: border-box
  .flex
    display: flex
    overflow: hidden
    .flex-1
      flex: 1
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid #f2f3f7
    border-bottom: 0.2rem solid #f2f3f7
    h3
      font-size: 0.28rem
      color: #212a36
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid #e4e4e4
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
</style>