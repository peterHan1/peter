<template>
	<div class="max_width">
		<div class="logo"></div>
		<p>
			<router-link :to="{ name: 'list', query: { id: urlId }}">测试背景图: /list</router-link>
		</p>
		<p>
			<router-link to="/details">测试img: /details</router-link>
		</p>
		<div class="imgs"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			urlId: '666',
			dataUrl: 'json/platform/datas?t=1520320914881'
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
	.max_width
		font-size:0.4rem
		.logo
			width: 100%
			height: 1rem
			background: #4879BC url(../../assets/image/logo.png) no-repeat 50% 50%
		p
			line-height:0.6rem
			padding:0 0.2rem
</style>
