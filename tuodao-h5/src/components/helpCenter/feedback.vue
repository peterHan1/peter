<template>
	<div class="feedback">
		<div class="logo-area">
			<div class="item">
				<div class="logo">
					<router-link to="/newRequire">
						<dl>
							<dt class="iconfont">&#xe6b6;</dt>
							<dd>新手必读</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/loginRegister">
						<dl>
							<dt class="iconfont">&#xe6aa;</dt>
							<dd>注册登录</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/blankDeposit">
						<dl>
							<dt class="iconfont">&#xe6ac;</dt>
							<dd>银行资金存管</dd>
						</dl>
					</router-link>
				</div>
			</div>
			<div class="item">
				<div class="logo">
					<router-link to="/rates">
						<dl>
							<dt class="iconfont">&#xe6ab;</dt>
							<dd>收费标准</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/rechargeCash">
						<dl>
							<dt class="iconfont">&#xe6ad;</dt>
							<dd>充值提现</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/investBack">
						<dl>
							<dt class="iconfont">&#xe6ae;</dt>
							<dd>投资回款</dd>
						</dl>
					</router-link>
				</div>
			</div>
			<div class="item">
				<div class="logo">
					<router-link to="/excellentPlan">
						<dl>
							<dt class="iconfont">&#xe6b7;</dt>
							<dd>精选计划</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/obligations">
						<dl>
							<dt class="iconfont">&#xe6a4;</dt>
							<dd>债权转让</dd>
						</dl>
					</router-link>
				</div>
				<div class="logo">
					<router-link to="/selfInvest">
						<dl>
							<dt class="iconfont">&#xe6a5;</dt>
							<dd>自动投标</dd>
						</dl>
					</router-link>
				</div>
			</div>
		</div>
		<div class="menu">
			<ul>
				<li><router-link to="/pointCoupon">积分与优惠券<span class="iconfont right">&#xe6b9;</span></router-link></li>
				<li><router-link to="/tjReward">推荐奖励<span class="iconfont right">&#xe6b9;</span></router-link></li>
				<li><router-link to="/memberSystem">会员体系<span class="iconfont right">&#xe6b9;</span></router-link></li>
				<li><router-link to="/">理财百科<span class="iconfont right">&#xe6b9;</span></router-link></li>
				<li><router-link to="/normal">常见问题<span class="iconfont right">&#xe6b9;</span></router-link></li>
			</ul>
		</div>
		<div class="relation">
			<p class="service">联系客服</p>
			<p class="service-time">服务时间：9：00-20：30</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6"></script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.feedback
		max-width:414px
		margin:0 auto
		.logo-area
			background-color #fff
			overflow:hidden
			margin-bottom:.2rem
			.item
				width:100%
				margin-bottom:.4rem
				margin-top:.1rem
				overflow:hidden
				.logo
					width:33.33%
					float:left
					text-align:center
					a
						display:block
						width:100%;
						height:100%
						dt
							font-size:.6rem
							color:#ff7400
						dd
							margin-top:.21rem
							font-size:.24rem
							color:#212a36
		.menu
			li
				height:.8rem
				background-color #fff
				border-bottom:1px solid #e4e4e4
				padding-left:.3rem
				font-size:.28rem
				line-height:.8rem
				a
					display:block
					width:100%
					height:100%
					color:#212a36
					.right
						float:right
						margin-right:.3rem
						color:#7f7f7f
			li:last-child
				border:none
				margin-bottom:1.9rem
		.relation
			position:fixed
			width:100%
			border-top:1px solid #e4e4e4
			height:1.23rem
			background-color #fff
			bottom:0
			text-align:center
			.service
				font-size:.28rem
				color:#ff7400
				margin:.26rem 0 .2rem 0
			.service-time
				font-size:.24rem
				color:#626262
</style>