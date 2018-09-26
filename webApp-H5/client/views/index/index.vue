<template>
  <div class="index_box">
    <Banner :banner-img="imgArr"></Banner>
    <Floating></Floating>
    <footer-nav :navClass="classMsg"></footer-nav>
  </div>
</template>

<script>
  import Banner from './../../components/banner/banner.vue'
  import Floating from './../../components/floating/floating.vue'
  import footerNav from './../../layout/footerNav.vue'
  import Layer from './../../components/layer/layer.js'

  export default {
    data () {
      return {
        imgArr: [
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/1.png'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/2.png'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/3.png'}
        ],
        classMsg: 'index'
      }
    },
    mounted () {
      Layer.Open()
    },
    methods: {
    },
    components: {
      Banner,
      Floating,
      footerNav
    }
  }
</script>

<style lang="stylus" scoped>
	.index_box
		height: 100%
		width: 100%
		.banner
			width: 100%
			height: 340px
</style>

