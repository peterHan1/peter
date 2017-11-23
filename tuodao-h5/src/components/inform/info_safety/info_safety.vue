<template>
	<div class="safety">
		<div class="safety_com" v-for="safety in safetyList">
			<div :class="safety.clas"></div>
			<h3>{{safety.title}}</h3>
			<p>{{safety.state}}</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				safetyList: [
					{
						clas: 'safety_bg1',
						title: '银行存管',
						state: '拓道金服携手北京银行，成功上线存管系统。银行对用户资金进行独立监督管理，与平台实现有效隔离，确保资金安全。'
					},
					{
						clas: 'safety_bg2',
						title: '专业风控',
						state: '拓道金服以海量数据和智能风控模型为基础，通过全面的风险管理体系，严格审查借款人资质，提前发现并有效规避风险。'
					},
					{
						clas: 'safety_bg3',
						title: '合规发展',
						state: '拓道金服已获得增值电信业务经营许可证（ICP）和公安部信息系统安全等级保护第三级认证，率先响应国家监管政策。'
					},
					{
						clas: 'safety_bg4',
						title: '技术雄厚',
						state: '拓道金服引入阿里金融云技术，并采用最高安全级别国际SSL加密传输方式，维持平台稳定运行，保护用户数据安全。'
					},
					{
						clas: 'safety_bg5',
						title: '法律支持',
						state: '拓道金服与盈科、天册等专业律师事务所深入合作，通过强大的律师团队让用户权益始终受到国家法律的保障。'
					}
				]
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.safety
		max-width:414px
		margin:0 auto
		padding:0.1rem 0.3rem 0
		.safety_com
			background-color:$color-background-f
			padding:0 0.3rem
			height:4.6rem
			margin-top:0.2rem
			overflow:hidden
			h3
				font-size:0.28rem
				color:#212a36
				text-align:center
				margin-bottom:0.15rem
			p
				font-size:0.24rem
				color:#626262
				line-height:0.38rem
			.safety_bg1
				width:1.52rem
				height:1.18rem
				background:url(../../../image/inform/safety_bg1.png) no-repeat
				background-size:100% 100%
				margin:1.12rem auto 0.4rem
			.safety_bg2
				width:1.42rem
				height:0.92rem
				background:url(../../../image/inform/safety_bg2.png) no-repeat
				background-size:100% 100%
				margin:1.46rem auto 0.3rem
			.safety_bg3
				width:1.45rem
				height:0.94rem
				background:url(../../../image/inform/safety_bg3.png) no-repeat
				background-size:100% 100%
				margin:1.36rem auto 0.38rem
			.safety_bg4
				width:1.36rem
				height:0.96rem
				background:url(../../../image/inform/safety_bg4.png) no-repeat
				background-size:100% 100%
				margin:1.16rem auto 0.56rem
			.safety_bg5
				width:1.52rem
				height:1.3rem
				background:url(../../../image/inform/safety_bg5.png) no-repeat
				background-size:100% 100%
				margin:1.06rem auto 0.32rem
</style>