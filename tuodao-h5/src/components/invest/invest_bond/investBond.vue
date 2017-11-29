<template>
	<div class="invest">
		<div class="tab">
			<router-link tag="div" class="tab-item" to="/bond_intr">
				<span class="tab-link">项目介绍</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/bond_safe">
				<span class="tab-link">安全保障</span>
			</router-link>
			<router-link tag="div" class="tab-item" to="/bond_addList">
				<span class="tab-link">投资记录</span>
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
	.invest
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
				padding:0 8%
				box-sizing: border-box
				overflow:hidden
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
</style>