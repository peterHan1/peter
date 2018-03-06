<template>
	<div class="box">
		这是列表页
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
	.box
		font-size:12px
</style>
