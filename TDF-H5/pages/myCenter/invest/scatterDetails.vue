<template>
  <div class="invests">
    <td-header title="出借详情"/>
    <div class="investsTop">
      <span>奥迪Q5抵押标</span>
      <b>额度已满</b>
      <!-- 加入中 -->
    </div>
    <ul>
      <li>
        <span>出借金额(元)</span>
        <span>3000.00</span>
      </li>
      <li>
        <span>优惠券</span>
        <span>2%加息券</span>
        <!-- 未使用、10元抵用券 -->
      </li>
      <li>
        <span>约定利率</span>
        <span>12%</span>
      </li>
      <li>
        <span>参考收益(元)</span>
        <span>500.00</span>
      </li>
      <li>
        <span>出借时间</span>
        <span>2018-12-11 18:00</span>
      </li>
      <li>
        <span>到期时间</span>
        <span>2019-01-23</span>
      </li>
      <li>
        <span>还款方式</span>
        <span>按月付息，到期还本</span>
      </li>
      <li>
        <span>借款协议</span>
        <router-link to="" >点击查看</router-link>
      </li>
      <li>
        <span>安存保全</span>
        <router-link to="/creditorList" >点击查看</router-link>
      </li>
    </ul>
    <div>
      <p class="tableTxt">还款计划</p>
      <div class="tableBox">
        <table>
          <tr>
            <th>还款时间</th>
            <th>应还本金</th>
            <th>应还收益</th>
            <th>状态</th>
          </tr>
          <tr>
            <td>2018-12-16</td>
            <td>0.00</td>
            <td>100.00</td>
            <td>已还款</td>
          </tr>
          <tr>
            <td>2019-01-16</td>
            <td>0.00</td>
            <td>100.00</td>
            <td>待还款</td>
          </tr>
          <tr>
            <td>2018-02-16</td>
            <td>30000.00</td>
            <td>100.00</td>
            <td>待还款</td>
          </tr>
          <tr>
            <td 
              colspan="4" 
              class="nullData">暂无数据</td>
          </tr>
        </table>
      </div>	
    </div>
    <router-link 
      to="" 
      class="linkA">查看原项目</router-link>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
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
