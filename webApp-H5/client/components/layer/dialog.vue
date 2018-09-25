<template>
	<transition name="fade">
		<div>
			<div class="dialog-wrap" v-if="isShow">
				<div class="dialog-cover"></div>
				<div class="dialog-content">
					<div class="dialog-title" :is-show="contentTxt.titleShow">{{contentTxt.title}}</div>
					<div class="dialog_txt" v-html="contentTxt.content" :style="contentTxt.style"></div>
					<div class="dialog-bottom" @click="closeMyself">{{contentTxt.btn}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
  export default {
    props: ['isShow', 'contentTxt'],
    data () {
      return {
      }
    },
    methods: {
      closeMyself (a) {
        this.$emit('on-close')
      }
    },
    components: {
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.dialog-wrap
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		z-index: 99
		.dialog-cover
			background: #000
			opacity: .3
			z-index: 98
			width: 100%
			height: 100%
		.dialog-content
			position: fixed
			background: #fff
			top: 50%
			left: 50%
			z-index: 10
			border-radius:5px
			transform:translateX(-50%) translateY(-50%)
			.dialog-title
				font-size:0.32rem
				text-align:center
				color: #000
				line-height: 1rem
			.dialog_txt
				font-size:0.24rem
				padding:0 0.3rem 0.2rem;
				color: #626262
			.dialog-top
				font-size:0.28rem
				color:#212a36
				line-height: 0.5rem
				padding:0 0.3rem
				margin: 0.5rem 0
			.dialog-bottom
				text-align: center
				border-top: 1px solid #E4E4E4
				font-size: 0.32rem
				color: #FF7400
				height: 0.9rem
				line-height: 0.8rem
				box-sizing: border-box
	.fade-enter-active, .fade-leave-active
		transition: opacity .2s
	.fade-enter, .fade-leave-to
		opacity: 0
</style>
