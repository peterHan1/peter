<template>
	<div class="certificate">
		<div class="papers" v-if="showImgList">
			<div class="flex">
				<div class="div_img">
					<img src="../../../image/inform/certificate_bg1.png" @click="bigImgFn($event,0)">
					<div class="txt_p">
						<p>北京银行存管协议-1</p>
					</div>
				</div>
				<div class="div_img">
					<img src="../../../image/inform/certificate_bg2.png" @click="bigImgFn($event,1)">
					<div class="txt_p">
						<p>北京银行存管协议-2</p>
					</div>
				</div>
			</div>
			<div class="flex">
				<div class="div_img">
					<img src="../../../image/inform/certificate_bg3.png" @click="bigImgFn($event,2)">
					<div class="txt_p">
						<p>拓道金服营业执照</p>
					</div>
				</div>
				<div class="div_img">
					<img src="../../../image/inform/certificate_bg4.png" @click="bigImgFn($event,3)">
					<div class="txt_p">
						<p>ICP证</p>
					</div>
				</div>
			</div>
			<div class="flex">
				<div class="div_img">
					<img class="img_only" src="../../../image/inform/certificate_bg5.png" @click="bigImgFn($event,5)">
					<div class="txt_p">
						<p>信息系统安全等级证书</p>
					</div>
				</div>
				<div class="div_img"></div>
			</div>
		</div>
		<div class="bigShow" v-if="showBigImg" @click="minImgFn()">
			<div class="big">
				<ul>
					<li class="bigImg" v-for="imglist in imgList">
						<img :src=imglist>
					</li>
				</ul>
			</div>
		</div>
		<div class="swiper-container swiper-container-horizontal swiper-container-ios">
			<div class="swiper-wrapper">
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
				<div class="swiper-slide">Slide 4</div>
				<div class="swiper-slide">Slide 5</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Swiper from '../../../../static/swipeslider.min.js'
	let galleryTop
	let galleryThumbs
	export default {
		data () {
			return {
				showImgList: true,
				showBigImg: false,
				num: 0,
				imgList: [
					require('../../../image/inform/certificate_bg1.png'),
					require('../../../image/inform/certificate_bg2.png'),
					require('../../../image/inform/certificate_bg3.png'),
					require('../../../image/inform/certificate_bg4.png'),
					require('../../../image/inform/certificate_bg5.png')
				]
			}
		},
		mounted () {
			this.lunbo()
		},
		methods: {
			lunbo () {
				galleryTop = new Swiper('.swiper-container')
				galleryThumbs = new Swiper('.gallery-thumbs', {
					spaceBetween: 10,
					autoplay: 4000,
					initialSlide: 1,
					centeredSlides: true,
					slidesPerView: 'auto',
					touchRatio: 0.2,
					slideToClickedSlide: false,
					autoplayDisableOnInteraction: false,
					grabCursor: true
				})
				galleryThumbs.params.control = galleryTop
			},
			bigImgFn(e, index) {
				this.showImgList = false
				this.showBigImg = true
				this.num = index
				console.log(index)
			},
			minImgFn() {
				this.showImgList = true
				this.showBigImg = false
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	@import '../../../../static/swiper-3.4.2.min.css'
	
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
			.big
				height: 100%
				position: relative
				overflow: hidden
				display: block
				padding-top: 0!important
				user-select: none
				ul
					padding: 0
					list-style: none
					width: 100%
					height: 100%
					white-space: nowrap
					font-size: 0
					-webkit-transform: translateX(0)
					transform: translateX(0)
					position: absolute
					bottom: 0
					li
						width: 100%
						height: 100%
						display: inline-block
						position: relative
						img
							position: absolute
							display: block
							height: auto
							top: 50%
							left: 50%
							transform: translate(-50%, -50%)
							max-height: 100%
							max-width: 100%
							margin-left: auto
							margin-right: auto
							user-select: none
</style>