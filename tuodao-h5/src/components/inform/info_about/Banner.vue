<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="imglist in listImg" >
            <img :src=imglist>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	export default {
		props: ['listImg'],
		mounted() {
			var swiper = new Swiper('.swiper-container', {
				paginationClickable: true,
				loop: true,
				speed: 600,
				autoplay: 4000,
				onTouchEnd: function() {
					swiper.startAutoplay()
				}
			})
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .swiper-container
        width: 100%
        height: 100%
        .swiper-wrapper
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
        .swiper-slide 
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
        .swiper-pagination-bullet
            width:0.833rem
            height: 0.833rem
            display: inline-block
            background: #7c5e53
</style>