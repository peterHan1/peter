<template>
	<div class="invest">
		<div class="tab">
		<div class="tab-item" :class="{active:selected==index}" v-for="(tabs,index) in tabList" @click="tabClick(index,tabs.view)">
				<span class="tab-link">{{tabs.title}}</span>
			</div>
		</div>
		<div class="about_com" :is="currentView"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import scatterIntr from './templates/scatter_intr'
	import scatterSafe from './templates/scatter_safe'
	import scatterList from './templates/scatter_addList'
	export default {
		data () {
			return {
				selected: 0,
				currentView: 'inte',
				tabList: [
					{
						title: '项目介绍',
						view: 'inte'
					},
					{
						title: '安全保障',
						view: 'safe'
					},
					{
						title: '投资记录',
						view: 'issue'
					}
				]
			}
		},
		methods: {
			tabClick: function (index, view) {
				this.selected = index
				this.currentView = view
			}
		},
		components: {
			'inte': scatterIntr,
			'safe': scatterSafe,
			'issue': scatterList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.invest
		font-family: 'PingFang-SC-Medium'
		.about_com
			max-width: 414px;
			margin:0 auto;
		.tab
			width:100%
			display: flex
			height: 0.8rem
			line-height: 0.8rem
			font-size: 0.26rem
			background-color:$color-background-f
			z-index:99999
			position:absolute
			top:0
			left:0
			.tab-item
				flex: 1
				text-align: center
				padding:0 8%
				box-sizing: border-box
				overflow:hidden
				color: $color-font-main
				
				.tab-link
					display:block
					height:0.8rem
					box-sizing: border-box
		.active
			.tab-link
				color: $color-font-orange
				border-bottom: 2px solid $color-font-orange
</style>