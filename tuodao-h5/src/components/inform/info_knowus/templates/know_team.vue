<template>
	<div>
		<div class="team">
			<div v-for="teamcom in teamList" :class="teamcom.clas">
				<dl>
					<dt></dt>
					<dd>
						<h3>{{teamcom.name}}</h3>
						<p>{{teamcom.position}}</p>
					</dd>
				</dl>
				<p>{{teamcom.txt}}</p>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				teamList: [
					{
						clas: 'team_zlj',
						name: '张罗军',
						position: '创始人 董事长',
						txt: '先后创立杭州罗晨网络科技有限公司、杭州仁润科技有限公	司（已成功上市新三板），凭借丰富的企业创新管理经验及敏锐的商业嗅觉，通过整合互联网资源与金融资产，带领拓道金服在三年内进入全国网贷平台50强。被《浙商》杂志评为“2017浙商新领军者”。'
					},
					{
						clas: 'team_fxy',
						name: '范爔云',
						position: '联合创始人 总经理',
						txt: '在金融行业及企业管理领域拥有近10年经验，练就了出色的商务沟通及统筹协调能力，在规范化管理、市场资源整合等方面有突出表现及独到见解。现任浙江省区域经济合作企业发展促进会副会长，同时是浙江省女企业家协会、浙商财智女人会会员。'
					},
					{
						clas: 'team_ll',
						name: '刘磊',
						position: '副总裁',
						txt: '在互联网运营及推广领域拥有8年的丰富经验，善于整合互联网金融行业资源。凭借突出的市场策略掌控能力，统筹并主导拓道金服产品运营体系的搭建，帮助拓道成功实现业绩的全面提升。'
					}
				]
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.team
		div
			background-color:$color-background-f
			margin-bottom:0.2rem
			padding:0.3rem
		dl
			overflow:hidden
			border-bottom:1px solid #e4e4e4
			margin-bottom:0.12rem
			padding-bottom:0.2rem
			dt
				width:1.08rem
				height:1.08rem
				float:left
				margin-right:0.2rem
			dd
				float:left
			h3
				font-size:0.32rem
				color:#212a36
				margin:0.08rem 0
		p
			font-size:0.24rem
			color:#626262
			line-height:0.4rem
		.team_zlj
			dt
				background:url(../../../../image/inform/team_zlj.png) no-repeat
				background-size:100% 100%
		.team_fxy
			dt
				background:url(../../../../image/inform/team_fxy.png) no-repeat
				background-size:100% 100%
		.team_ll
			dt
				background:url(../../../../image/inform/team_ll.png) no-repeat
				background-size:100% 100%
		
</style>