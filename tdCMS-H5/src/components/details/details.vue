<template>
	<div class="max_width">
		<div class="logo">
			<img src="../../assets/image/img1.png">
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			datas: {},
			dataUrl: 'json/platform/data?t=1520320914881'
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.$http.get(this.dataUrl).then((response) => {
				console.log(response.data.platData)
			})
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.logo
		width: 100%
		img
			display: block
			width: 100%
</style>
