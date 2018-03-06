<template>
	<div class="box">
		拓道业务管理系统H5
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
		font-size:16px
		color:$color-background-orange
</style>
