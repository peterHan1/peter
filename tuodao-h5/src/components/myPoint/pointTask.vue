<template>
	<div class="main">
		<div class="task_menu" v-bind:class="bor_bom">
			<a v-bind:class="activeObj1" style="margin-right:2.5rem;" v-on:click="tabCut(1)">日常任务</a>
			<a v-bind:class="activeObj2" v-on:click="tabCut(2)">新手任务</a>
		</div>
		<div v-show="new_title" class="explain">在注册30天内完成任务即可获得对应的积分</div>
		<div class="task">
			<div v-if="showValue">
				<ul>
					<li v-for="task in taskNormalData">
						<div class="list_left">
							<span class="sp1">{{ task.taskName }}</span>
							<span class="sp2">{{ task.score }}积分</span>
						</div>
						<a v-on:click="alertEvent(task.code)" v-bind:class="[errorClass ,task.isComplete=='yes' || task.isOverdue=='yes' ? activeClass : '']" v-bind:href="task.url">{{ task.todo }}</a>
					</li>
				</ul>
			</div>
			<div v-else>
				<ul>
					<li v-for="task in taskNewData">
						<div class="list_left">
							<span class="sp1">{{ task.taskName }}</span>
							<span class="sp2">{{ task.score }}积分</span>
						</div>
						<a v-on:click="alertEvent(task.code)" v-bind:class="[errorClass ,task.isComplete=='yes' || task.isOverdue=='yes' ? activeClass : '']" v-bind:href="task.url">{{ task.todo }}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	data () {
		return {
			errorClass: '',
			activeClass: 'isOver',
			showValue: true,
			activeObj1: 'on',
			activeObj2: '',
			new_title: false,
			bor_bom: 'bor_bom',
			taskNormalData: [],
			taskNewData: [],
			apiNormalUrl: '../../../static/task.json',
			apiNewUrl: '../../../static/taskNew.json'
		}
	},
	created () {
		this.getData(1)
	},
	methods: {
		tabCut (type) {
			// var vm = this
			if (type === 1) {
				this.showValue = true
				this.activeObj1 = 'on'
				this.activeObj2 = ''
				this.new_title = !this.new_title
				this.bor_bom = 'bor_bom'
				this.getData(1)
			} else {
				this.showValue = false
				this.activeObj1 = ''
				this.activeObj2 = 'on'
				this.new_title = !this.new_title
				this.bor_bom = ''
				this.getData(2)
			}
		},
		getData(type) {
			// var vm = this
			var apiUrl = ''
			if (type === 1) {
				apiUrl = this.apiNormalUrl
			} else {
				apiUrl = this.apiNewUrl
			}
			this.$http.get(apiUrl)
			.then((res) => {
				var listData = res.body.content.list
				console.log(listData)
				for (var i = 0; i < listData.length; i++) {
					if (listData[i].isOverdue === 'yes') {
						listData[i].todo = '已过期'
						listData[i].url = 'javascript:;'
					}
					if (listData[i].isComplete === 'yes') {
						listData[i].todo = '已完成'
						listData[i].url = 'javascript:;'
					}
					if (listData[i].url === null) {
						listData[i].url = 'javascript:;'
					}
				}
				if (type === 1) {
					this.taskNormalData = listData
				} else {
					this.taskNewData = listData
				}
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
			} else if (code === 4) {
				for (var i = 0; i < this.taskNormalData.length; i++) {
					if (this.taskNormalData[i].code === 4) {
						var obj = this.taskNormalData[i]
						obj.todo = '已完成'
						obj.isComplete = 'yes'
						this.taskNormalData.splice(i, 1, obj)
					}
				}
			}
		}
	}
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.main
		max-width: 414px
		margin:auto
		overflow:hidden
		background: #ffffff
		font-family: PingFang-SC-Medium
		font-size:0.24rem
		.bor_bom
			border-bottom:0.2rem solid #f2f3f7
		.task_menu
			height:0.8rem
			text-align:center
			a
				display:inline-block
				padding-bottom:0.2rem
				margin-top:0.28rem
				font-size:0.28rem
				&.on
					color:$color-font-orange
					border-bottom:0.04rem solid $color-font-orange
		.explain
			font-size:0.2rem
			color:#bd8147
			text-align:center
			height:0.6rem
			line-height:0.6rem
			background:#fff7e0
		ul
			width:100%
			li
				overflow:hidden
				border-bottom: 1px solid #e4e4e4
				font-size: 0.24rem
				height: 1.5rem
				padding-left: 0.3rem
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
					margin-right: 0.3rem
					width: 1.2rem
					height: 0.5rem
					line-height: 0.5rem
					-webkit-border-radius:0.04rem
					-moz-border-radius:0.04rem
					border-radius:0.04rem
					text-align: center
					color: #ffffff
					background:$color-font-orange
					margin-top:0.5rem
					&.isOver
							background: #b6b5b6
</style>