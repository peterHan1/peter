<template>
	<div class="max_width">
		<div class="inform">
			<router-link tag="div" class="a-item" to="/info_about">
				<img src="../../image/inform/inform1.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_platform">
				<img src="../../image/inform/inform2.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_oper">
				<img src="../../image/inform/inform3.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_law">
				<img src="../../image/inform/inform4.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_risk">
				<img src="../../image/inform/inform5.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_safety">
				<img src="../../image/inform/inform6.png">
			</router-link>
			<router-link tag="div" class="a-item" to="/info_knowus">
				<img src="../../image/inform/inform7.png">
			</router-link>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
	</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.max_width
		max-width: 414px
		margin: 0 auto
		.inform
			margin: 0 4%
			padding-top:0.16rem
			.a-item
				img
					height:1.2rem
					margin-top: 0.2rem
</style>