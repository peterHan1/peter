<template>
	<div class="plat_data">
		<div class="tab">
			<router-link tag="div" class="tab-item" to="/plat_data">
				<span class="tab-link">数据汇总</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/plat_invest">
				<span class="tab-link">投资/借款详情</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/plat_echart">
				<span class="tab-link">数据播报</span>
			</router-link>
		</div>
		<div class="about_com">
			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.plat_data
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
					padding:0 0.1rem
				&.router-link-active
					.tab-link
						color: $color-font-orange
						border-bottom: 2px solid $color-font-orange
		.about_com
			margin-top:0.18rem
			overflow:hidden
</style>