<template>
	<div class="knowus">
		<div class="tab">
			<div class="tab-item" :class="{active:selected==index}" v-for="(tabs,index) in tabList" @click="tabClick(index,tabs.view)">
				<span class="tab-link">{{tabs.title}}</span>
			</div>
		</div>
		<div class="knowus_com" :is="currentView"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import knowTd from './templates/know_td'
	import knowPatt from './templates/know_patt'
	import knowAdva from './templates/know_adva'
	import knowTeam from './templates/know_team'
	import knowContact from './templates/know_contact'
	export default {
		data () {
			return {
				currentView: 'konw1',
				selected: 0,
				tabList: [
					{
						title: '公司介绍',
						view: 'konw1'
					},
					{
						title: '运营模式',
						view: 'konw2'
					},
					{
						title: '平台优势',
						view: 'konw3'
					},
					{
						title: '团队介绍',
						view: 'konw4'
					},
					{
						title: '联系我们',
						view: 'konw5'
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
			'konw1': knowTd,
			'konw2': knowPatt,
			'konw3': knowAdva,
			'konw4': knowTeam,
			'konw5': knowContact
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.knowus
		max-width: 414px;
		margin:0 auto;
		font-family: 'PingFang-SC-Medium'
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
		.active
			.tab-link
				color: $color-font-orange
				border-bottom: 2px solid $color-font-orange
		.knowus_com
			margin-top:0.18rem
			overflow:hidden
			padding:0 0.3rem 0.3rem
</style>