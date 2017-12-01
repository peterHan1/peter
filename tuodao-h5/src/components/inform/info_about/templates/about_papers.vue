<template>
	<div class="certificate">
		<div class="papers" v-if="showImgList">
			<div class="flex">
				<div class="div_img">
					<img src="../../../../image/inform/certificate_bg1.png" @click="bigImgFn($event,0)">
					<div class="txt_p">
						<p>北京银行存管协议-1</p>
					</div>
				</div>
				<div class="div_img">
					<img src="../../../../image/inform/certificate_bg2.png" @click="bigImgFn($event,1)">
					<div class="txt_p">
						<p>北京银行存管协议-2</p>
					</div>
				</div>
			</div>
			<div class="flex">
				<div class="div_img">
					<img src="../../../../image/inform/certificate_bg3.png" @click="bigImgFn($event,2)">
					<div class="txt_p">
						<p>拓道金服营业执照</p>
					</div>
				</div>
				<div class="div_img">
					<img src="../../../../image/inform/certificate_bg4.png" @click="bigImgFn($event,3)">
					<div class="txt_p">
						<p>ICP证</p>
					</div>
				</div>
			</div>
			<div class="flex">
				<div class="div_img">
					<img class="img_only" src="../../../../image/inform/certificate_bg5.png" @click="bigImgFn($event,4)">
					<div class="txt_p">
						<p>信息系统安全等级证书</p>
					</div>
				</div>
				<div class="div_img"></div>
			</div>
		</div>
		<div class="bigShow" v-if="showBigImg" @click="minImgFn()">
			<app-banner :listImg="imgLists"></app-banner>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Banner from './Banner.vue'
	export default {
		data () {
			return {
				showImgList: true,
				showBigImg: false,
				num: 0,
				imgLists: [],
				listImg: [
					require('../../../../image/inform/certificate_bg1.png'),
					require('../../../../image/inform/certificate_bg2.png'),
					require('../../../../image/inform/certificate_bg3.png'),
					require('../../../../image/inform/certificate_bg4.png'),
					require('../../../../image/inform/certificate_bg5.png')
				]
			}
		},
		components: {
			'app-banner': Banner
		},
		methods: {
			bigImgFn(e, index) {
				this.showImgList = false
				this.showBigImg = true
				this.num = index
				let arr = this.listImg.splice(index)
				this.imgLists = arr.concat(this.listImg)
			},
			minImgFn() {
				this.showImgList = true
				this.showBigImg = false
				this.listImg = [
					require('../../../../image/inform/certificate_bg1.png'),
					require('../../../../image/inform/certificate_bg2.png'),
					require('../../../../image/inform/certificate_bg3.png'),
					require('../../../../image/inform/certificate_bg4.png'),
					require('../../../../image/inform/certificate_bg5.png')
				]
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.certificate
		height:100%
		.papers
			padding: 0 0.3rem
			margin-top:0.2rem
			background-color: white
			.flex
				display:flex
			div:nth-child(odd)
				margin-right: 0.3rem
			.div_img
				flex:1
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
		.bigShow
			opacity: 1
			z-index: 999
			width: 100%
			height: 100%
			padding: 0.8rem 0
			box-sizing: border-box
			background-color: #000
			position: absolute
			top: 0
			left: 0
</style>