<template>
	<div class="help">
		<div class="help_bot">
			<ul>
				<li>
					<a>P2P限贷之后，为何更加看好车贷行业?<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li>
					<a>P2P网贷行业首部业务规范指导细则出...<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li>
					<a>想不通我们为什么要理财？进来给你看...<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li>
					<a>没有数字化的理财规划，等于毫无规划<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li>
					<a>100万10年后还剩下多少？<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li>
					<a>人生几件大事：生活上找对人，事业上...<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a>
				</li>
				<li><a>有一种理想叫钱多事少离家近<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a></li>
				<li><a>【拓道科普】住房公积金的7种提取使...<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a></li>
				<li><a>我负责开源，你负责节流，完美……<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a></li>
				<li><a>这样做就能赚钱！普通人一学就会，...<br /><span>2017-05-08 14:09:00</span><span class="iconfont">&#xe69b;</span></a></li>
			</ul>
			<ul>
				<li v-for="site in sites">
					<a href="site.url">{{ site.title }}<br /><span>{{ site.publishTime }}</span><span class="iconfont">&#xe69b;</span></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				sites: [],
				accessId: '',
				accessKey: '',
				apiUrl: 'http://72.127.2.140:8080/api/router/op/selectContentByContentRemark'
			}
		},
		created () {
			this.getUertInfo()
		},
		methods: {
			toggle: function (data) {
				this.flag[data] = !this.flag[data]
			},
			getData() {
				let vm = this
				vm.$http({url: vm.apiUrl, method: 'POST', params: {'contentRemark': 2, 'pageSize': 1000, 'currentPage': 1}, headers: {accessId: vm.accessId, accessKey: vm.accessKey}, emulateJSON: true})
				.then((res) => {
					let listData = res.data.content.list
					for (var i = 0; i < listData.length; i++) {
						if (listData[i].title.length >= 19) {
							listData[i].title = listData[i].title.substring(0, 17) + '...'
						}
					}
					vm.sites = listData
				}, (res) => {
					console.log('请求失败！')
				})
			},
			getUertInfo() {
				let vm = this
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					vm.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GetUserInfo', {}, function (response) {
							vm.accessId = response.accessId
							vm.accessKey = response.accessKey
							alert(vm.accessId)
							vm.getData()
						})
					})
				}
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.help
		max-width:414px
		margin:0 auto
		font-size:0.28rem
		overflow:hidden
		background: #ffffff
		font-family: PingFang-SC-Medium
		ul
			li
				font-size: 0.28rem
				color: #212a36
				line-height: 0.5rem
				padding: 0rem 0.3rem 0rem 0.28rem
				border-bottom: 1px solid #e4e4e4
				a
					width: 100%
					background-color:white
					display:block
					color: #212a36
					padding: 0.15rem 0rem 0.1rem 0rem
					position: relative
					span
						color: #b6b5b6
						font-size: 0.24rem
						&.iconfont
							color: #212a36
							position:absolute
							right:0rem
							top:50%
							margin-top: -0.25rem
							font-size: 0.3rem
</style>