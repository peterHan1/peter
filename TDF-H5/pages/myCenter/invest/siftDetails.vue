<template>
  <div class="invests">
    <td-header 
      :returnUrl="false"
      title="出借详情" 
      url="/myCenter/invest/myInvest"/>
    <div class="investsTop">
      <span>{{ content.name }}</span>
      <b v-if="content.status === 1 || content.status === '1'">额度已满</b>
      <b v-else>加入中</b>
    </div>
    <ul>
      <li>
        <span>加入金额(元)</span>
        <span>{{ content.joinMoney }}</span>
      </li>
      <li>
        <span>冻结金额(元)</span>
        <span>{{ content.tenderFrost }}</span>
      </li>
      <li>
        <span>优惠券</span>
        <span>{{ content.voucher }}</span>
      </li>
      <li>
        <span>约定利率</span>
        <span>{{ content.apr }}% <b v-if="content.platformApr > 0">+ {{ content.platformApr }}%</b> </span>
      </li>
      <li>
        <span>参考收益(元)</span>
        <span>{{ content.interest }}</span>
      </li>
      <li>
        <span>加入时间</span>
        <span>{{ content.addTime }}</span>
      </li>
      <li>
        <span>预计退出时间</span>
        <span>{{ content.endTime }}</span>
      </li>
      <li>
        <span>还款方式</span>
        <span>{{ content.repaymentType }}</span>
      </li>
      <li>
        <span>省心投授权委托书</span>
        <router-link :to="{path:'/myCenter/invest/siftProtocol',query: {freeBorrowId: content.desId,jionId: content.joinId}}">点击查看</router-link>

      </li>
      <li>
        <span>债权明细</span>
        <router-link :to="{path:'/myCenter/invest/creditorList',query: {tenderId: this.$route.query.tenderId,name: content.name,status: content.status}}">点击查看</router-link>
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
              <td>{{ item.repaymentTime }}</td>
              <td>{{ item.capital }}</td>
              <td>{{ item.interest }}</td>
              <td>{{ item.status | statusTxt }}</td>
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
      :to="{path:'/project/free-details/'+content.desId}" 
      class="linkA">查看原项目</router-link>
  </div>
</template>

<script>
import { siftTenderDetail } from '~/api/myCenter.js'
import { commenParams } from '~/api/config.js'

export default {
  async fetch({ app, store, route }) {
    if (app.store.state.isLogin) {
      let tenderId = route.query.tenderId
      commenParams.accessId = store.state.accessId
      commenParams.accessKey = store.state.accessKey
      const contentTxt = await siftTenderDetail(app.$axios, tenderId)
      if (contentTxt.code === 100000) {
        app.store.commit('myCenter/setSiftDetails', contentTxt.content)
      } else {
        store.commit('setToken', { isLogin: false })
      }
    }
  },
  data() {
    return {
      tenderId: '',
      borrowNid: '',
      content: this.$store.state.myCenter.siftDetails.detail,
      list: this.$store.state.myCenter.siftDetails.dataRows
    }
  },
  mounted() {
    if (!this.$store.state.isLogin) {
      this.$store.commit('srcPath', '/myCenter/center')
      this.$router.push({
        name: 'user-login'
      })
    }
  },
  filters: {
    statusTxt: function(value) {
      switch (value) {
        case 0:
          return '待回款'
          break
        case 1:
          return '已回款'
          break
        default:
          return 'null'
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
