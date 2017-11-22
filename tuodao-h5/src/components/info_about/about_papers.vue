<template>
	<div class="certificate">
		<div class="flex">
			<div class="div_fr div_img flex-1">
				<img class="lazy" src="../../image/inform/certificate_bg1.png" num="1">
				<div class="txt_p">
					<p>北京银行存管协议-1</p>
				</div>
			</div>
			<div class="div_img flex-1">
				<img class="lazy" src="../../image/inform/certificate_bg2.png" num="2">
				<div class="txt_p">
					<p>北京银行存管协议-2</p>
				</div>
			</div>
		</div>
		<div class="flex">
			<div class="div_fr div_img flex-1">
				<img class="lazy" src="../../image/inform/certificate_bg3.png" num="3">
				<div class="txt_p">
					<p>拓道金服营业执照</p>
				</div>
			</div>
			<div class="div_img flex-1">
				<img class="lazy" src="../../image/inform/certificate_bg4.png" num="4">
				<div class="txt_p">
					<p>ICP证</p>
				</div>
			</div>
		</div>
		<div class="flex">
			<div class="div_fr div_img flex-1">
				<img class="lazy img_only" src="../../image/inform/certificate_bg5.png" num="5">
				<div class="txt_p">
					<p>信息系统安全等级证书</p>
				</div>
			</div>
			<div class="div_img flex-1">
				
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {

	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.certificate
		padding: 0 0.3rem
		background-color: white
		padding-top: 0.2rem
		.flex
			display:flex
			.flex-1
				flex:1
		.div_fr
			margin-right: 0.3rem
		.div_img
			width: 3.28rem
			height: 4.6rem
			margin-top: 0.18rem
			position: relative
			img
				width: 3.28rem
				height: 4.6rem
			.img_only
				height:2.6rem
				margin-top:1rem
			.txt_p
				width: 100%
				height: 0.48rem
				line-height: 0.48rem
				text-align: center
				position: absolute
				left: 0
				bottom: 0
				background-color: rgba(57,59,63,0.5)
				p
					font-size: 0.22rem
					color: #fff
</style>