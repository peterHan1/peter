<template>
	<img v-show="isShow" src="../../image/invite/download4phone.png" class="weixin"/>
</template>
<script type="text/ecmascript-6">
	export default{
		data () {
			return {
				isShow: false
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let ua = navigator.userAgent
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					if (ua.match(/MicroMessenger/i) === 'Micromessenger') {
						this.isShow = false
					} else {
						alert(ua)
						// window.location.href = 'https://itunes.apple.com/cn/app/ta-dao-jin-fu/id1030238074?l=zh&ls=1&mt=8'
					}
				} else if (/(Android)/i.test(navigator.userAgent)) {
					if (ua.match(/MicroMessenger/i) === 'micromessenger') {
						this.isShow = true
					} else {
						window.location.href = '/apk/tdjf_jrtt.apk'
					}
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.weixin
	width:100%
	background-color: #0080ff

</style>