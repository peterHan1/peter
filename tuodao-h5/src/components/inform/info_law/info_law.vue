<template>
	<div class="law">
		<div v-for="law in lawConcent">
			<h3>{{law.title}}</h3>
			<ul>
				<li v-for="lawCon in law.lawList">
					<router-link tag="div" class="a-item" :to="{ path: lawCon.url }">
						<span>{{lawCon.txt}}</span>
						<i class="iconfont fr">&#xe69b;</i>
					</router-link>
				</li>
			</ul>
		</div>
		
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				lawConcent: [
					{
						title: '法律法规',
						lawList: [
							{
								url: 'law_xx',
								txt: '互联网信息服务管理办法(2011修订)'
							},
							{
								url: 'law_jd',
								txt: '网络借贷信息中介机构业务活动管理暂行办法'
							},
							{
								url: 'law_zjdj',
								txt: '网络借贷信息中介机构备案登记管理指引'
							},
							{
								url: 'law_zjcg',
								txt: '网络借贷资金存管业务指引'
							},
							{
								url: 'law_zjyw',
								txt: '网络借贷信息中介机构业务活动信息披露指引'
							}
						]
					},
					{
						title: '规范性文件',
						lawList: [
							{
								url: 'law_dx',
								txt: '电信和互联网用户个人信息保护规定'
							},
							{
								url: 'law_cj',
								txt: '关于促进互联网金融健康发展的指导意见'
							}
						]
					},
					{
						title: '监管政策',
						lawList: [
							{
								url: 'law_fx',
								txt: 'P2P网络借贷风险专项整治工作实施方案'
							},
							{
								url: 'law_gf',
								txt: '规范互联网信息服务市场秩序若干规定'
							},
							{
								url: 'law_kz',
								txt: '开展互联网金融广告及以投资理财名义从事金融活动风险专项整治工作实施方案'
							}
						]
					},
					{
						title: '司法解释',
						lawList: [
							{
								url: 'law_bl',
								txt: '关于办理非法集资刑事案件适用法律若干问题的意见'
							},
							{
								url: 'law_ff',
								txt: '最高人民法院关于非法集资刑事案件性质认定问题的通知'
							},
							{
								url: 'law_sl',
								txt: '最高人民法院关于审理非法集资刑事案件具体应用法律若干问题的解释'
							},
							{
								url: 'law_mj',
								txt: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定'
							}
						]
					}
				]
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.law
		max-width: 414px
		margin: 0 auto
		overflow: hidden
		font-family: 'PingFang-SC-Medium'
		i
			font-style: normal
		h3
			background-color: white
			margin-top: 0.2rem
			padding: 0 0.3rem
			font-size: 0.28rem
			color: #212a36
			height: 0.8rem
			line-height: 0.8rem
			border-bottom: 1px solid #e4e4e4
		li
			width: 100%
			padding: 0.28rem 0.3rem
			border-bottom: 1px solid #e4e4e4
			background-color: white
			box-sizing: border-box
			position: relative
			.a-item
				display: block
				font-size: 0.24rem
				color: #626262
				span
					width: 90%
					display: inline-block
					line-height:0.34rem
				.iconfont
					font-size: 0.24rem
					position: absolute
					right: 0.3rem
					top: 35%
					float: right
</style>