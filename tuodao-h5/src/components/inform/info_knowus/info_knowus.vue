<template>
	<div class="knowus">
		<div class="tab">
			<router-link tag="div" class="tab-item" to="/know_td">
				<span class="tab-link">公司介绍</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/know_patt">
				<span class="tab-link">运营模式</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/know_adva">
				<span class="tab-link">平台优势</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/know_team">
				<span class="tab-link">团队介绍</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/know_contact">
				<span class="tab-link">联系我们</span>
			</router-link>
		</div>
		<div class="knowus_com">
			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.knowus
		max-width: 414px;
		margin:0 auto;
		.tab
			display: flex
			height: 0.8rem
			line-height: 0.8rem
			font-size: 0.28rem
			background-color:$color-background-f
			.tab-item
				flex: 1
				text-align: center
				.tab-link
					display:inline-block
					height:0.8rem
					color: $color-font-main
					box-sizing: border-box
				&.router-link-active
					.tab-link
						color: $color-font-orange
						border-bottom: 2px solid $color-font-orange
		.knowus_com
			margin-top:0.18rem
			overflow:hidden
			padding:0 0.3rem
</style>