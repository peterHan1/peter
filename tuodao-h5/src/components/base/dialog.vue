<template>
  <div>
    <div class="dialog-wrap">
      <div class="dialog-cover"  v-if="isShow"></div>
      <transition name="drop">
        <div class="dialog-content"  v-if="isShow">
        	<div class="dialog-top">您的积分不足，无法抽奖</div>
        	<div class="dialog-bottom" @click="closeMyself">确定</div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
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
		width: 5.12rem
		height: 2.26rem
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
			width: 5.12rem
			height: 2.26rem
			background: #fff
			top: 50%
			left: 50%
			margin-left: -2.61rem
			margin-top: -1.13rem
			z-index: 10
			.dialog-top
				width:100%
				height:1.46rem
				border-bottom: 1px solid #e4e4e4
				text-align:center
				line-height:1.46rem
				font-size:.28rem
				color:#212a36
			.dialog-bottom
				width:100%
				height:.79rem
				line-height:.79rem
				text-align:center
				font-size:.30rem
				color:#ff7400
</style>
