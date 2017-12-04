<template>
	<div class="main">
		<p class="nav"><img src="../../image/newComer_01.png" alt=""></p>
		<div class="shaw" style="margin-bottom:0.4rem;">
			<div class="content">
				<ul>
					<li class="col212">新手大礼包</li>
					<li class="colmain">注册即可获得<span>398</span>元红包</li>
				</ul>
				<img src="../../image/newComer_prize.png" alt="">
			</div>
			<div class="btn" @click="skipLink(1)">注册并领取红包</div>
		</div>
		<div class="shaw">
			<div class="content" style="padding: 0 0.6rem 0.6rem 0.4rem;">
				<ul>
					<li class="col212">新手专享标</li>
					<li class="baio_num"><span style="font-size:0.87rem">9</span>%+3%</li>
					<li class="last_li">预期年化</li>
				</ul>
				<div class="explain">
					<p>1个月期限</p>
					<p>100元起投</p>
				</div>
			</div>
			<div class="btn" @click="skipLink(2)">立即投资</div>
		</div>
		<p class="nav"><img src="../../image/newComer_02.png" alt=""></p>
		<div class="task" id="task">
			<div class="task_top">在注册30天内完成任务即可获得对应的积分</div>
			<div class="content">
				<ul id="content_ul">
					<li v-for="task in taskData">
						<div class="list_left">
							<span class="sp1">{{ task.taskName }}</span>
							<span class="sp2">{{ task.score }}积分</span>
						</div>
						<a v-on:click="alertEvent(task.code)" v-bind:class="[errorClass ,task.isComplete=='yes' || task.isOverdue=='yes' ? activeClass : '']" v-bind:href="task.url">{{ task.todo }}</a>
					</li>
				</ul>
			</div>
		</div>
		<p class="nav"><img src="../../image/newComer_03.png" alt=""></p>
		<div class="measure">
			<ul>
				<li>拓道金服教你如何让小金库翻一番，且安全... <span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
				<li>如何查看自己的每日收益？<span class="iconfont">&#xe69b;</span></li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				errorClass: '',
				activeClass: 'isOver',
				taskData: [],
				apiUrl: '../../../static/task.json',
				userInfoUrl: '../../../static/userInfo.json'
			}
		},
		created () {
			this.getData()
		},
		methods: {
			getData() {
				var vm = this
				vm.$http.get(vm.apiUrl, 1)
				.then((res) => {
					var listData = res.body.content.list
					for (var i = 0; i < listData.length; i++) {
						if (listData[i].isOverdue === 'yes') {
							listData[i].todo = '已过期'
							listData[i].url = 'javascript:;'
						} else if (listData[i].isComplete === 'yes') {
							listData[i].todo = '已完成'
							listData[i].url = 'javascript:;'
						}
						if (listData[i].url === null) {
							listData[i].url = 'javascript:;'
						}
					}
					vm.taskData = listData
				}, (res) => {
					console.log('请求失败！')
				})
			},
			alertEvent(code) {
				if (code === 1) {
					console.log('弹窗1')
				} else if (code === 2) {
					console.log('弹窗2')
				} else if (code === 3) {
					console.log('弹窗3')
				}
			},
			skipLink(type) {
				var vm = this
				vm.$http.get(vm.userInfoUrl)
				.then((res) => {
					// 是否为新手
					if (res.body.content.isNewbie === 1) {
						// 是否投资
						if (res.body.content.investFlag === 1) {
							if (type === 1) {
								vm.$router.push({path: '/pointTask'})
							} else {
								vm.$router.push({path: '/lottery_prize'}) // 列表
							}
						} else {
							if (type === 1) {
								vm.$router.push({path: '/pointTask'})
							} else {
								vm.$router.push({path: '/lottery_prize'}) // 列表
							}
						}
					} else {
						if (res.body.content.investFlag === 1) {
							if (type === 1) {
								vm.$router.push({path: '/pointTask'})
							} else {
								vm.$router.push({path: '/lottery_prize'}) // 列表
							}
						} else {
							if (type === 1) {
								vm.$router.push({path: '/pointTask'})
							} else {
								vm.$router.push({path: '/lottery_prize'}) // 列表
							}
						}
					}
				}, (res) => {
					console.log('请求失败！')
				})
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.main
		max-width:414px
		padding:0 0.3rem 0.5rem 0.3rem
		margin:auto
		overflow:hidden
		background: -webkit-linear-gradient(top, #f743a2, #5E02B6 100%)
		font-family: PingFang-SC-Medium
	.nav
		text-align:center
		padding: 0.5rem 0 0.1rem
		img
			height:0.9rem
			width:4rem
	.shaw
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		padding:0.6rem 0.3rem 0.6rem 0.31rem
		background:#ffffff
		.content
			padding: 0 0.6rem 0.6rem 0.4rem
			overflow: hidden
			ul
				float: left
				margin-top: 0.25rem
				.last_li
					font-size:0.24rem
					color: #b6b5b6
			img
				float: right
				height:1.25rem
				width:1.59rem
			.explain
				float: right
				font-size: 0.24rem
				margin-top: 0.9rem
				p
					color: #626262
					margin-top: 0.3rem
	.btn
		display: block
		width:6.3rem
		font-size:0.3rem
		color:#ffffff
		text-align:center
		height:0.8rem
		line-height:0.8rem
		background:#FFB02B
		border-radius:0.04rem
		margin:auto
	.col212
		color:#212a36
		font-size: 0.3rem
		margin-bottom: 0.2rem
	.colmain
		font-size:0.24rem
		color: $color-font-main
		span
			color:#f743a2
			font-weight:bold
			font-size:0.48rem
	.baio_num
		font-family: PingFang SC Bold
		color: #f743a2
		font-size: 0.33rem
		margin-bottom: 0.3rem
		span
			font-size: 0.87rem
	.task
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		background: #ffffff
		overflow:hidden
		.task_top
			height: 0.6rem
			line-height: 0.6rem
			background: #f2f3f7
			text-align: center
			color: #626262
			font-size: 0.2rem
		.content
			position: relative
			max-height:6.08rem
			overflow-y: auto
			&::-webkit-scrollbar
				width: 0.06rem
			&::-webkit-scrollbar-thumb
				width:0.05rem
				heigth:0.5rem
				border-radius:0.04rem
				background:#b6b5b6
			ul
				li
					overflow:hidden
					border-bottom: 1px solid #e4e4e4
					font-size: 0.24rem
					height: 1.5rem
					padding-left: 0.3rem
					overflow:hidden
					.list_left
						margin-top: 0.45rem
						float:left
						span
							display: block
					.sp1
						margin-bottom: 0.2rem
						font-size: 0.28rem
						color: #212a36
					.sp2
						color: #b6b5b6
					a
						display: block
						float: right
						margin-right: 0.6rem
						width: 1.2rem
						height: 0.5rem
						line-height: 0.5rem
						-webkit-border-radius:0.04rem
						-moz-border-radius:0.04rem
						border-radius:0.04rem
						text-align: center
						color: #ffffff
						background:#FFB02B
						margin-top:0.5rem
						&.isOver
							background: #b6b5b6
	.measure
		-webkit-border-radius:0.04rem
		-moz-border-radius:0.04rem
		border-radius:0.04rem
		background: #ffffff
		overflow:hidden
		ul li
			height: 1rem
			line-height: 1rem
			font-size: 0.28rem
			color: #212a36
			border-bottom: 1px solid #e4e4e4
			padding: 0 0.3rem 0 0.28rem
			span
				float: right

</style>