<template>
  <div class="invests">
    <td-header 
      :returnUrl="false"
      title="出借详情" 
      url="/myCenter/invest/myInvest"/>
    <div class="investsTop">
      <span>{{ content.name }}</span>
      <b>{{ content.status | statusTxt }}</b>
    </div>
    <ul>
      <li>
        <span>出借金额(元)</span>
        <span>{{ content.amount }}</span>
      </li>
      <li>
        <span>优惠券</span>
        <span v-if="content.voucherType">{{ content.voucher }}{{ content.voucherType | voucherTxt }}</span>
        <span v-else>未使用</span>
      </li>
      <li>
        <span>约定利率</span>
        <span>{{ content.apr }}%</span>
      </li>
      <li>
        <span>参考收益(元)</span>
        <span>{{ content.accountInterest }}</span>
      </li>
      <li>
        <span>出借时间</span>
        <span>{{ content.tenderTime }}</span>
      </li>
      <li>
        <span>到期时间</span>
        <span>{{ content.borrowEndTime }}</span>
      </li>
      <li>
        <span>还款方式</span>
        <span>{{ content.borrowStyleText }}</span>
      </li>
      <li>
        <span>借款协议</span>
        <router-link :to="{path:'/myCenter/invest/scatterProtocol',query: {tenderId: this.$route.query.tenderId}}">点击查看</router-link>
      </li>
      <li>
        <span>安存保全</span>
        <router-link :to="{path:'/myCenter/invest/ancun',query: {tenderId: this.$route.query.tenderId}}">点击查看</router-link>
      </li>
    </ul>
    <div>
      <p class="tableTxt">还款计划</p>
      <div class="tableBox">
        <table v-if="list.length > 0">
          <thead> 
            <tr>
              <th>还款时间</th>
              <th>应还本金</th>
              <th>应还收益</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item,index) in list" 
              :key="index">
              <td>{{ item.recoverTime }}</td>
              <td>{{ item.recoverAccount }}</td>
              <td>{{ item.recoverInterest }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
        <table v-else>
          <thead> 
            <tr>
              <th>还款时间</th>
              <th>应还本金</th>
              <th>应还收益</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td 
                colspan="4" 
                class="nullData">暂无数据</td>
            </tr>
          </tbody>
        </table>
      </div>	
    </div>
    <router-link 
      :to="{path:'/project/scatter-details/' + content.desId}"
      class="linkA">查看原项目</router-link>
  </div>
</template>

<script>
import { getBankRecoverPlan } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'
export default {
  async fetch({ app, store, route }) {
    if (app.store.state.isLogin) {
      let tenderId = route.query.tenderId
      commenParams.accessId = app.store.state.accessId
      commenParams.accessKey = app.store.state.accessKey
      const contentTxt = await getBankRecoverPlan(app.$axios, tenderId)
      app.store.commit('myCenter/setScatterDetails', contentTxt.content)
    } else {
      app.router.push({
        name: 'user-login'
      })
    }
  },
  data() {
    return {
      tenderId: '',
      borrowNid: '',
      list: this.$store.state.myCenter.scatterDetails.dataRows,
      content: this.$store.state.myCenter.scatterDetails
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', this.$route.path)
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  filters: {
    statusTxt: function(value) {
      switch (value) {
        case 0:
          return '等待初审'
        case 1:
          return '初审通过'
        case 2:
          return '募集中'
        case 3:
          return '初审失败'
        case 4:
          return '还款中 '
        case 5:
          return '还款成功'
        case 6:
          return '用户撤标'
        case 7:
          return '撤标'
        case 8:
          return '还款成功'
      }
    },
    voucherTxt: function(value) {
      switch (value) {
        case 'jx':
          return '%加息卷'
        case 'dk':
          return '元抵扣卷'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .invests
    width: 100%
    padding-top: 88px
    box-sizing: border-box
		.investsTop
			line-height: 99px
			background-color: #fff
			font-size: 32px
			padding: 0 45px 0 30px
			overflow: hidden
			span
				color: #333
				float: left
			b
				color: #999
				float: right
		ul
			padding: 0 30px
			background-color: #fff
			margin-top: 20px
			li
				line-height: 90px
				border-bottom: 1px solid #E8E8E8
				overflow: hidden
				font-size: 28px
				span:nth-child(1)
					float: left
					color: #666
				span:nth-child(2)
					float: right
					color: #333
				a
					float: right
					color: #FF7102
		.tableTxt
			font-size: 32px
			color: #333
			line-height: 100px
			padding: 0 30px
			border-bottom: 1px solid #E8E8E8
			background-color: #fff
			margin-top: 20px
		.tableBox
			padding: 0 30px
			background-color: #fff
			table
				width: 100%
				border-collapse: collapse
				tr
					border-bottom: 1px solid #E8E8E8
					line-height: 80px
					font-size: 28px
					th
						text-align: center
						color: #999
						font-weight: normal
					td
						text-align: center
						color: #333
					th:first-child,td:first-child
						text-align: left
					th:last-child,td:last-child
						text-align: right
					td.nullData
						text-align: center	
						color: #666
		.linkA
			display: block
			width: 100%
			text-align: center
			line-height: 98px
			background-color: #fff
			color: #FF7102
			font-size: 32px
			margin-top: 20px
</style>
