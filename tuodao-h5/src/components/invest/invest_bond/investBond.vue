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
	import bondIntr from './templates/bond_intr'
	import bondSafe from './templates/bond_safe'
	import bondList from './templates/bond_addList'
	export default {
		data () {
			return {
				counter: 1,
				num: 15,
				pageStart: 0,
				pageEnd: 0,
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
						view: 'list'
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
			'inte': bondIntr,
			'safe': bondSafe,
			'list': bondList
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.invest
		max-width: 414px;
		margin:0 auto;
		font-family: 'PingFang-SC-Medium'
		.tab
			width:100%
			display: flex
			height: 0.8rem
			line-height: 0.8rem
			font-size: 0.26rem
			background-color:$color-background-f
			z-index:9999
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