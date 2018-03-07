<template>
	<div class="max_width">
		<div class="logo">
			<img src="../../assets/image/logo.png">
		</div>
		<div class="title">
			列表页
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
		background-color: #4879BC
		padding: 0.2rem 0.2rem
		img
			display: block
	.title
		font-size: 0.4rem
		text-align: center
		line-height: 2rem
		color: $color-font-orange
</style>
