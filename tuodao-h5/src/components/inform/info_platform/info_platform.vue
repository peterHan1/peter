<template>
	<div class="plat_data">
		<div class="tab">
			<div class="tab-item" :class="{active:selected==index}" v-for="(tabs,index) in tabList" @click="tabClick(index,tabs.view)">
				<span class="tab-link">{{tabs.title}}</span>
			</div>
		</div>
		<div class="about_com" :is="currentView"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import platData from './templates/plat_data'
	import platInvest from './templates/plat_invest'
	import platEchart from './templates/plat_echart'
	export default {
		data () {
			return {
				currentView: 'plat1',
				selected: 0,
				tabList: [
					{
						title: '数据汇总',
						view: 'plat1'
					},
					{
						title: '投资/借款详情',
						view: 'plat2'
					},
					{
						title: '数据播报',
						view: 'plat3'
					}
				]
			}
		},
		methods: {
			tabClick(index, view) {
				this.selected = index
				this.currentView = view
			}
		},
		components: {
			'plat1': platData,
			'plat2': platInvest,
			'plat3': platEchart
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.plat_data
		max-width: 414px;
		margin:0 auto;
		font-family: PingFang-SC-Medium
		.tab
			display: flex
			height: 0.8rem
			line-height: 0.8rem
			font-size: 0.28rem
			background-color:$color-background-f
			.tab-item
				flex: 1
				text-align: center
				color: $color-font-main
				.tab-link
					display:inline-block
					height:0.8rem
					box-sizing: border-box
					padding:0 0.1rem
		.active
			.tab-link
				color: $color-font-orange
				border-bottom: 2px solid $color-font-orange
		.about_com
			margin-top:0.18rem
			overflow:hidden
</style>