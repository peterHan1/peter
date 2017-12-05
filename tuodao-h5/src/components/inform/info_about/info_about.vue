<template>
	<div class="about">
		<div class="tab">
			<div class="tab-item" :class="{active:selected==index}" v-for="(tabs,index) in tabList" @click="tabClick(index,tabs.view)">
				<span class="tab-link">{{tabs.title}}</span>
			</div>
		</div>
		<div class="about_com" :is="currentView"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import aboutTd from './templates/about_td'
	import aboutFrame from './templates/about_frame'
	import aboutStaff from './templates/about_staff'
	import aboutPapers from './templates/about_papers'
	export default {
		data () {
			return {
				currentView: 'about1',
				selected: 0,
				tabList: [
					{
						title: '平台信息',
						view: 'about1'
					},
					{
						title: '组织架构',
						view: 'about2'
					},
					{
						title: '人员信息',
						view: 'about3'
					},
					{
						title: '相关证件',
						view: 'about4'
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
			'about1': aboutTd,
			'about2': aboutFrame,
			'about3': aboutStaff,
			'about4': aboutPapers
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.about
		max-width: 414px
		margin:0 auto
		font-family: 'PingFang-SC-Medium'
		.tab
			display: flex
			height: 0.8rem
			line-height: 0.8rem
			font-size: 0.26rem
			background-color:$color-background-f
			.tab-item
				flex: 1
				text-align: center
				padding:0 3%
				.tab-link
					display:block
					height:0.8rem
					color: $color-font-main
					box-sizing: border-box
			.active
				.tab-link
					color: $color-font-orange
					border-bottom: 2px solid $color-font-orange
		.about_com
			overflow:hidden
</style>