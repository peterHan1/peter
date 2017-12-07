<template>
	<div ref="wrapper">
		<div :class="{'down':(state===0),'up':(state==1)}" id="wrap">
			<div class="pull_refresh">
				<span class="down_tip"><span class="iconfont">&#xe843;</span>下拉，返回标的信息</span>
				<span class="up_tip"><span class="iconfont">&#xe844;</span>松开，返回标的信息</span>
			</div>
			<slot></slot>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	export default {
		props: {
			/**
			* 1 滚动的时候会派发scroll事件，会截流。
			* 2 滚动的时候实时派发scroll事件，不会截流。
			* 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
			*/
			probeType: {
				type: Number,
				default: 1
			},
			/**
			* 点击列表是否派发click事件
			*/
			click: {
				type: Boolean,
				default: false
			},
			/**
			* 是否开启横向滚动
			*/
			scrollX: {
				type: Boolean,
				default: false
			},
			/**
			* 是否派发滚动事件
			*/
			listenScroll: {
				type: Boolean,
				default: false
			},
			/**
			* 列表的数据
			*/
			data: {
				type: Array,
				default: null
			},
			/**
			* 是否派发滚动到底部的事件，用于上拉加载
			*/
			pullup: {
				type: Boolean,
				default: false
			},
			/**
			* 是否派发顶部下拉的事件，用于下拉刷新
			*/
			pulldown: {
				type: Boolean,
				default: false
			},
			/**
			* 是否派发列表滚动开始的事件
			*/
			beforeScroll: {
				type: Boolean,
				default: false
			},
			/**
			* 当数据更新后，刷新scroll的延时。
			*/
			refreshDelay: {
				type: Number,
				default: 20
			}
		},
		data () {
			return {
				state: 0
			}
		},
		mounted() {
			// 保证在DOM渲染完毕后初始化better-scroll
			setTimeout(() => {
				this._initScroll()
			}, 100)
		},
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				// better-scroll的初始化
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					scrollX: this.scrollX
				})

				// 是否派发滚动事件
				if (this.listenScroll) {
					this.scroll.on('scroll', (pos) => {
						if (pos.y >= 20) {
							this.state = 1
						} else {
							this.state = 0
						}
						this.$emit('scroll', pos)
					})
				}

				// 是否派发滚动到底部事件，用于上拉加载
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						// 滚动到底部
						if (this.scroll.y <= (this.scroll.maxScrollY)) {
							this.$emit('pullup')
							this.$emit('scrollToEnd')
						}
					})
				}

				// 是否派发顶部下拉事件，用于下拉刷新
				if (this.pulldown) {
					this.scroll.on('touchEnd', (pos) => {
						// 下拉动作
						if (pos.y >= 20) {
							this.state = 1
							this.$emit('pulldown')
							this.$emit('scrollToEnd')
							this.state = 0
						} else {
							this.state = 0
						}
					})
				}

				// 是否派发列表滚动开始的事件
				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
			},
			disable() {
				// 代理better-scroll的disable方法
				this.scroll && this.scroll.disable()
			},
			enable() {
				// 代理better-scroll的enable方法
				this.scroll && this.scroll.enable()
			},
			refresh() {
				// 代理better-scroll的refresh方法
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				// 代理better-scroll的scrollTo方法
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				// 代理better-scroll的scrollToElement方法
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			}
		},
		watch: {
			// 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
			data() {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	#wrap
		min-height:101%
	.pull_refresh
		font-size:0.24rem
		height:1rem
		line-height:1.2rem
		color:#b6b5b6
		text-align:center
		overflow:hidden
	.down_tip,.up_tip
		display: none
	.down
		.down_tip
			display: block
	.up
		.up_tip
			display: block
		
</style>