<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow"></div>
      <transition name="drop">
        <div class="dialog-content" v-if="isShow">
        	<slot>empty</slot>
        	<div class="close-span" @click="closeMyself"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
			}
		},
		methods: {
			closeMyself () {
				this.$emit('on-close')
			}
		}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.dialog-wrap
		position: fixed
		width: 5.11rem
		height: 5.55rem
		.dialog-cover
			background: #000
			opacity: .3
			position: fixed
			z-index: 5
			top: 0
			left: 0
			width: 100%
			height: 100%
		.dialog-content
			position: fixed
			width: 5.11rem
			height: 5.55rem
			background: #fff
			top: 50%
			left: 50%
			margin-left: -2.56rem
			margin-top: -2.77rem
			z-index: 10
			background-size:100%
			background:url('../../image/lottery/dialog.png') no-repeat
			.close-span
				width:.5rem
				height:.5rem
				background:url('../../image/lottery/close.png') no-repeat
				background-size:100%
				position:absolute
				bottom:-1.21rem
				left:50%
				margin-left:-.25rem
</style>
