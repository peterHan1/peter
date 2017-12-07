<template>
	<scroll class="wrapper" :pulldown="pulldown" @pulldown="getApp" :listenScroll="listenScroll">
		<div class="sift">
			<div class="intro">
				<h3>项目简介</h3>
				<p>{{items.intro}}</p>
			</div>
			<div>
				<h3>计划详情</h3>
				<p><span>姓名</span> <i v-if="items != null">{{items.name}}</i></p>
				<p><span>职业</span> <i v-if="items != null">{{items.job}}</i></span></p>
				<p><span>性别</span> <i v-if="items != null">{{items.sex | sexType}}</i></span></p>
				<p><span>学历</span> <i v-if="items != null">{{items.education}}</i></span></p>
				<p><span>籍贯</span> <i v-if="items != null">{{items.census}}</i></p>
			</div>
			<div class="car">
				<h3>车辆信息</h3>
				<p><span>车辆品牌</span> <i v-if="items != null">{{items.carBrand}}</i></p>
				<p><span>车辆估价</span> <i v-if="items != null">{{items.secondCarPrice}}元</i></p>
				<p><span>购买价格</span> <i v-if="items != null">{{items.buyPrice}}元</i></p>
				<p><span>购买时间</span> <i v-if="items != null">{{items.buyTime | timeType}}</i></p>
			</div>
			<div class="listimg">
				<h3>审核资料</h3>
				<div class="imglist" ref="wrapimg">
					<ul>
						<li v-for="(item,index) in imgSrc">
							<img :src=item.picUrl @click="getImgUrl(index,$event)">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import Scroll from './../../scroll'
	import BScroll from 'better-scroll'
	export default {
		data () {
			return {
				apiUrl: 'api/router/app/getAppBorrowExpand',
				imgUrl: 'api/router/getPicListByPcode',
				items: [],
				pulldown: true,
				listenScroll: true,
				scroll: '',
				imgSrc: [
					{
						'id': 44,
						'productId': null,
						'productCode': '20131200002',
						'picUrl': 'https://www.51tuodao.com/upload/data/upfiles/images/2017-07/20/11_attestations_attestation_1500522147898.jpg',
						'orderNum': 1,
						'reamark': null
					},
					{
						'id': 45,
						'productId': null,
						'productCode': '20131200002',
						'picUrl': 'https://www.51tuodao.com/upload/data/upfiles/images/2017-05/20/11_attestations_attestation_1495254129360.jpg',
						'orderNum': 1,
						'reamark': null
					},
					{
						'id': 44,
						'productId': null,
						'productCode': '20131200002',
						'picUrl': 'https://www.51tuodao.com/upload/data/store/2016-12/01/store_new_1480597592249.jpg',
						'orderNum': 1,
						'reamark': null
					},
					{
						'id': 44,
						'productId': null,
						'productCode': '20131200002',
						'picUrl': 'https://www.51tuodao.com/upload/data/upfiles/images/2017-05/20/11_attestations_attestation_1495254129360.jpg',
						'orderNum': 1,
						'reamark': null
					},
					{
						'id': 44,
						'productId': null,
						'productCode': '20131200002',
						'picUrl': 'https://www.51tuodao.com/upload/data/upfiles/images/2017-05/20/11_attestations_attestation_1495254129360.jpg',
						'orderNum': 1,
						'reamark': null
					}
				],
				imgList: []
			}
		},
		mounted() {
			this.addHtml()
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wrapimg, {
					scrollX: true
				})
			})
		},
		http: {
			headers: {
				accessId: 'accessId',
				accessKey: 'accessKey',
				requestType: 'APP'
			}
		},
		methods: {
			addHtml() {
				let vm = this
				vm.$http.post(vm.apiUrl, {productCode: '123'}).then((response) => {
					vm.items = response.body.content
				})
				vm.$http.post(vm.imgUrl, {productCode: '1'}).then((response) => {
					vm.imgList = response.body.content
				})
			},
			getApp() {
				this.getInvestList()
			},
			getInvestList() {
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_PullDetailNib', {}, function (response) {
						})
					})
				}
			},
			getImgUrl(index, event) {
				event.preventDefault()
				event.stopPropagation()
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					this.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_ShowBigImage', {
							'detailImgArr': this.imgSrc,
							'currentIndex': index
						}, function (response) {
						})
					})
				}
			},
			setupWebViewJavascriptBridge(callback) {
				if (window.WebViewJavascriptBridge) {
					return callback(window.WebViewJavascriptBridge)
				}
				if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback)
				}
				window.WVJBCallbacks = [callback]
				let WVJBIframe = document.createElement('iframe')
				WVJBIframe.style.display = 'none'
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
				document.documentElement.appendChild(WVJBIframe)
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			}
		},
		components: {
			'scroll': Scroll
		},
		filters: {
			sexType(type) {
				switch (type) {
				case 0:
					return '男'
				case 1:
					return '女'
				default: return ''
				}
			},
			timeType(type) {
				let date = new Date(type)
				let Y = date.getFullYear()
				let m = date.getMonth() + 1
				let d = date.getDate()
				let H = date.getHours()
				let i = date.getMinutes()
				let s = date.getSeconds()
				if (m < 10) {
					m = '0' + m
				}
				if (d < 10) {
					d = '0' + d
				}
				if (H < 10) {
					H = '0' + H
				}
				if (i < 10) {
					i = '0' + i
				}
				if (s < 10) {
					s = '0' + s
				}
				let t = Y + '-' + m + '-' + d
				return t
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.wrapper
		position:absolute
		top:0
		left:0
		bottom:0
		right:0
		overflow:hidden
	.sift
		div
			padding:0 0.3rem 0.2rem
			background-color:$color-font-f
			overflow:hidden
			margin-bottom:0.2rem
		h3
			font-size:0.28rem
			color:#212a36
			line-height:0.8rem
			border-bottom:1px solid #e4e4e4	
			margin-bottom:0.3rem
		p
			font-size:0.24rem
			color:#7e7e7e
			line-height:0.4rem
			margin-bottom:0.22rem
			span
				color:#b6b5b6
				display:inline-block
				width:0.9rem
		.car
			p
				span
					width:1.4rem
		.intro
			p
				// padding-left:0.3rem
				position:relative
				b
					position:absolute
					left:0
					top:16%
					display:inline-block
					width:6px			
					height:6px
					border-radius:50%
					background-color:#cacaca
			p:nth-child(2)
				b	
					top:10%
			p:last-child
				b	
					top:30%
		.listimg
			padding:0 0.3rem
		.imglist
			position:relative
			overflow:auto
			height:1.8rem
			padding:0
			display:block
			white-space:nowrap
			margin:0
		ul
			position:absolute
			left:0
			top:0
		li
			display:inline-block
			margin-right:0.2rem
		img
			width:2.1rem
			height:1.4rem
			
</style>