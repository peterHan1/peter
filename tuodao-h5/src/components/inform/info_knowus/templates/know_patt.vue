<template>
	<div>
		<div class="patt">
			<div class="patt_bg"></div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.patt
		padding:0.8rem 1.1rem 0.7rem
		background-color:$color-background-f
		overflow:hidden
		.patt_bg
			width:4.65rem
			height:9rem
			background:url(../../../../image/inform/patt_bg.png) no-repeat
			background-size:100% 100%
</style>