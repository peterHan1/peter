<template>
	<div>
		<div class="plat_echart">
			<div class="echart_top">
				<h3>平台7日数据播报</h3>
				<p>成交量（万元）</p>
				<div id="ranking"></div>
			</div>
			<div class="echart_bot">
				<h3>平台月度数据播报</h3>
				<p>成交量（万元）</p>
				<div id="monthsData"></div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/bar')
	export default {
		data () {
			return {
				todayList: [],
				todayData: [],
				todayMoney: [],
				monthList: [],
				monthData: [],
				monthMoney: [],
				todayUrl: 'api/router/getPlatfromWeekVolumeChart',
				monthUrl: 'api/router/getPlatfromMonthVolumeChart'
			}
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'PC'
			}
		},
		mounted() {
			this.dataList()
		},
		methods: {
			dataList() {
				let vm = this
				vm.$http.post(vm.todayUrl).then((res) => {
					vm.todayData = res.body.content.key
					vm.todayMoney = res.body.content.val
					vm.charts()
				}, (err) => {
					console.log(err)
				})
				vm.$http.post(vm.monthUrl).then((res) => {
					console.log(res)
					vm.monthData = res.body.content.key
					vm.monthMoney = res.body.content.val
					vm.chartsM()
				}, (err) => {
					console.log(err)
				})
			},
			charts() {
				let myChart = echarts.init(document.getElementById('ranking'))
				let seven = this.todayData
				let sevenM = this.todayMoney
				myChart.setOption({
					grid: {
						left: '1%',
						right: '2%',
						top: '10%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: seven,
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#e4e4e4'
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#626262',
								fontSize: 12,
								fontStyle: 'normal',
								fontFamily: 'PingFang-SC-Medium'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ['#e4e4e4'],
								width: 0.5,
								type: 'solid'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#fff',
								width: 1
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#626262',
								fontSize: 12,
								fontStyle: 'normal',
								fontFamily: 'PingFang-SC-Medium'
							}
						}
					}],
					series: [{
						name: '成交量',
						type: 'bar',
						data: sevenM,
						barWidth: 12,
						itemStyle: {
							normal: {
								barBorderRadius: [10, 10, 0, 0],
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#ff3501'
								}, {
									offset: 0.2,
									color: '#ff9741'
								},
								{
									offset: 1,
									color: '#ffd6b3'
								}
								]),
								label: {
									show: true,
									position: ['-15', '-15'],
									textStyle: {
										fontSize: 12,
										color: '#ff7400',
										fontStyle: 'normal',
										baseline: 'top',
										fontFamily: 'PingFang-SC-Medium'
									}
								}
							}
						}
					}]
				})
			},
			chartsM() {
				let myCharts = echarts.init(document.getElementById('monthsData'))
				let seven = this.monthData
				let sevenM = this.monthMoney
				myCharts.setOption({
					grid: {
						left: '0',
						right: '2%',
						top: '10%',
						bottom: '1%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						data: seven,
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								color: '#e4e4e4'
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#626262',
								fontSize: 12,
								fontStyle: 'normal',
								fontFamily: 'PingFang-SC-Medium'
							}
						}
					}],
					yAxis: [{
						type: 'value',
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ['#e4e4e4'],
								width: 0.5,
								type: 'solid'
							}
						},
						axisLine: {
							lineStyle: {
								color: '#fff',
								width: 1
							}
						},
						axisLabel: {
							show: true,
							textStyle: {
								color: '#626262',
								fontSize: 12,
								fontStyle: 'normal',
								fontFamily: 'PingFang-SC-Medium'
							}
						}
					}],
					series: [{
						name: '成交量',
						type: 'bar',
						data: sevenM,
						barWidth: 12,
						itemStyle: {
							normal: {
								barBorderRadius: [10, 10, 0, 0],
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: '#ff3501'
								},
								{
									offset: 0.2,
									color: '#ff9741'
								},
								{
									offset: 1,
									color: '#ffd6b3'
								}
								]),
								label: {
									show: true,
									position: 'top',
									textStyle: {
										fontSize: 12,
										color: '#ff7400',
										fontStyle: 'normal',
										fontFamily: 'PingFang-SC-Medium'
									}
								}
							}
						}
					}]
				})
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.plat_echart
		.echart_top
			background-color: white
			padding: 0 0.3rem
		h3
			line-height: 0.8rem
			font-size: 0.26rem
			color: #212a36
			background-color: white
			border-bottom: 1px solid #e4e4e4
		p
			font-size:0.2rem
			color:#626262
			margin-top:0.4rem
			text-align:left
		#ranking
			width: 100%
			height: 4.5rem
			box-sizing: border-box
			padding-bottom:0.4rem
		.echart_bot
			background-color: white
			margin-top: 0.2rem
			padding: 0 0.3rem
		#monthsData
			width: 100%
			height: 4.5rem
			padding-bottom: 0.4rem
			box-sizing: border-box
</style>