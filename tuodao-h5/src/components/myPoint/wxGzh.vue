<template>
	<div class="main">
	  	<ul>
	  		<li>1.关注微信公众号“拓道金服”</li>
	  		<li>2.在微信输入文字“口令”并发送</li>
	  		<li>3.获取微信返回的口令并在此提交</li>
		</ul>
		<input type="text" class="code" placeholder="请输入口令">
		<input type="submit" value="提交" class="submit">
	</div>
</template>

<script type="text/ecmascript-6">
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.main
		max-width: 414px
		margin:auto
		padding: 1rem 0.8rem 0
		overflow:hidden
		background: #ffffff
		font-family: PingFang-SC-Medium
		ul
			margin: auto
			width:3.8rem
			padding-bottom: 0.5rem
			li
				font-size: 0.24rem
				color: #626262
				height:0.4rem
				line-height: 0.4rem
		.code
			display: block
			width:100%
			height: 0.8rem
			line-height: 0.8rem
			border:1px solid #9e9e9e
			-webkit-border-radius:0.04rem
			-moz-border-radius:0.04rem
			border-radius:0.04rem
			text-align: center
			color: #303030
			font-size:0.3rem
			margin-bottom: 0.3rem
			out-line:none
		.submit
			display: block
			padding:0 0.8rem
			height: 0.6rem
			line-height: 0.6rem
			text-align: center
			font-size: 0.28rem
			color: #303030
			margin:auto
</style>