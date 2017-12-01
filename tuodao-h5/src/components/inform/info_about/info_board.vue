<template>
	<div class="board">
		<h3>董事、监事、高级管理人员 </h3>
		<div class="board_div zlj">
			<dl>
				<dt></dt>
				<dd>
					<p class="position">执行董事</p>
					<p class="name">张罗军</p>
				</dd>
			</dl>
		</div>
		<div class="board_div flex">
			<div class="fxy flex-1">
				<dl>
					<dt></dt>
					<dd>
						<p class="position">监事</p>
						<p class="name">范曦云</p>
					</dd>
				</dl>
			</div>
			<div class="ll flex-1">
				<dl>
					<dt></dt>
					<dd>
						<p class="position">高级管理人员</p>
						<p class="name">刘磊</p>
					</dd>
				</dl>
			</div>
		</div>
		</div>
</template>
<script type="text/ecmascript-6">
    export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.board
		max-width: 414px
		padding: 0 0.3rem 0.5rem
		margin: 0.2rem auto
		background-color:$color-background-f
		font-family: 'PingFang-SC-Medium'
		h3
			font-size: 0.28rem
			color: #212a36
			height: 0.8rem
			line-height: 0.8rem
			border-bottom: 1px solid #e4e4e4
		.board_div
			margin-top:0.6rem
			dl
				text-align: center
				dt
					width: 2.6rem
					height: 2.6rem
					margin: 0 auto
				p
					line-height:0.42rem
				.position
					font-size: 0.26rem
					color: #212a36
					margin-top: 0.2rem
				.name
					font-size: 0.24rem
					color: #626262
					margin-top: 0.1rem
		.flex
			display: flex
			margin-top:0.9rem
			.flex-1
				flex: 1
		.zlj
			dt
				background: url(../../../image/inform/zlj.png) no-repeat
				background-size: 100% 100%
		.fxy
			dt
				background: url(../../../image/inform/fxy.png) no-repeat
				background-size: 100% 100%
		.ll
			dt
				background: url(../../../image/inform/ll.png) no-repeat
				background-size: 100% 100%
		
		
</style>