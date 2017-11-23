<template>
	<div class="about">
		<div class="tab">
			<router-link tag="div" class="tab-item" to="/about_td">
				<span class="tab-link">平台信息</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/about_frame">
				<span class="tab-link">组织架构</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/about_staff">
				<span class="tab-link">人员信息</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/about_papers">
				<span class="tab-link">相关证件</span>
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
	.about
		max-width: 414px;
		margin:0 auto;
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
				&.router-link-active
					.tab-link
						color: $color-font-orange
						border-bottom: 2px solid $color-font-orange
		.about_com
			margin-top:0.18rem
			overflow:hidden
			background-color:$color-background-f
</style>