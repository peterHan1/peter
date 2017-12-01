<template>
	<div>
		<div class="plat_invest">
			<div class="ranking_top">
				<h3>今日投资风云榜</h3>
				<ul>
					<li v-for="tolist in todayList">
						<p>{{tolist.phone}}</p>
						<p>投资{{tolist.tenderAccount}}元</p>
					</li>
				</ul>
			</div>
			<div class="ranking_com">
				<h3>本月投资风云榜</h3>
				<ul>
					<li v-for="molist in monthList">
						<p>{{molist.phone}}</p>
						<p>投资{{molist.tenderAccount}}元</p>
					</li>
				</ul>
			</div>
			<div class="ranking_bot">
				<h3>借款排行榜</h3>
				<table>
					<tr class="tr_color">
						<th colspan="3">前10名借款人分布</th>
					</tr>
					<tr class="tr_colors">
						<th class="th_l">排名</th>
						<th class="th_c">待还金额</th>
						<th class="th_r">占比</th>
					</tr>
					<tr v-for="(tenlist,index) in tenList">
						<td>{{arrList[index]}}</td>
						<td>{{tenlist.amount}}万元</td>
						<td>{{tenlist.proportion}}%</td>
					</tr>
				</table>
				<p class="txt_p">备注：当前第一名借款人为二手车经销商，车辆库存质押</p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				todayList: [],
				monthList: [],
				tenList: [],
				arrList: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名', '其他'],
				todayUrl: '../../../static/rankingsToday.json',
				monthUrl: '../../../static/rankingsMonth.json',
				tenUrl: '../../../static/rankingsTen.json'
			}
		},
		mounted() {
			this.dataSum()
		},
		methods: {
			dataSum() {
				this.$http.get(this.todayUrl).then((res) => {
					this.todayList = res.body.content.list
				}, (err) => {
					console.log(err)
				})
				this.$http.get(this.monthUrl).then((res) => {
					this.monthList = res.body.content.list
				}, (err) => {
					console.log(err)
				})
				this.$http.get(this.tenUrl).then((res) => {
					this.tenList = res.body.content.list
				}, (err) => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	h3
		line-height: 0.8rem
		font-size: 0.26rem
		color: #212a36
		background-color: white
		border-bottom: 1px solid #e4e4e4;
	.ranking_top
		padding: 0 0.3rem
		background-color: white
	li
		height: 0.8rem
		line-height: 0.8rem
		font-size: 0.26rem
		color: #626262
		border-bottom: 1px solid #e4e4e4
		padding: 0 0.1rem 0 0.58rem
		p:nth-child(1)
			float:left
		p:nth-child(2)
			float:right
	li:nth-child(1)
		background: url(../../../../image/inform/one.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	li:nth-child(2)
		background: url(../../../../image/inform/two.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	li:nth-child(3)
		background: url(../../../../image/inform/three.png) no-repeat
		background-size: 5% 40%
		background-position: 1% 50%
	.ranking_com
		padding: 0 0.3rem
		background-color: white
		margin-top: 0.2rem
	.ranking_bot
		padding: 0 0.3rem
		background-color: white
		margin-top: 0.2rem
		table
			width: 100%
			border-collapse: collapse
			.tr_color
				background-color: #e4e4e4
			.tr_colors
				background-color: #efefef
			tr
				height: 0.8rem
				line-height: 0.8rem
				th
					color: #212a36
					font-size: 0.26rem
				.th_l
					width: 40%
					padding-left: 0.25rem
					text-align: left
				.th_c
					width: 45%
					text-align: left
				.th_r
					width: 15%
					text-align: right
					padding-right: 0.25rem
				td
					color: #626262
					font-size: 0.24rem
					border-bottom: 1px solid #e4e4e4
				td:nth-child(1)
					width: 40%
					padding-left: 0.25rem
					text-align: left
				td:nth-child(2)
					width: 45%
					text-align: left
				td:nth-child(3)
					width: 15%
					text-align: right
					padding-right: 0.25rem
	.txt_p
		line-height: 0.8rem
		font-size: 0.2rem
		color: #7e7e7e
		margin-top: 0.1rem
		padding-left: 0.25rem
</style>