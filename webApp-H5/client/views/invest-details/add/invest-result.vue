<template>
  <div class="resultBox">
    <Header :navLeftTxt="'icon'">出借结果</Header>
		<div class="result_status">
			<!--类名：wx_ok 成功、xw_no 失败、 xw_load 处理中-->
			<div class="relust_icon xw_load"></div>
			<p>出借成功</p>
			<div class="result_btn">
				<!--投资成功显示两个按钮-->
				<!-- <a href="javascript:;" class="result_left">继续出借</a> -->
				<!-- <a href="javascript:;" class="result_right">查看出借记录</a> -->
				<!--投资失败和处理中显示一个按钮-->
				<a href="" class="result_return">返回</a>
			</div>
		</div>
		<!--成功显示列表，失败和处理中隐藏 -->
		<div class="result_list ">
			<p>奥迪A4L抵押标</p>
			<ul>
				<li>
					<div>出借金额</div>
					<div>4000.00元</div>
				</li>
				<li>
					<div>预计收益</div>
					<div>45.56元</div>
				</li>
					<li>
					<div>已使用抵用券</div>
					<div>30元</div>
				</li>
					<li>
					<div>已使用加息券</div>
					<div>3%</div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
.resultBox
	width: 100%
	padding-top: 88px
	background-color: #fff
	.result_status
		text-align: center
		font-size: 0
		.relust_icon
			display: inline-block
			height: 167px
			width: 167px
			margin-top: 146px
		.xw_ok
			background: url(../../../assets/images/xw-bank/xw-ok.png) no-repeat
			background-size: 100% 100%
		.xw_no
			background: url(../../../assets/images/xw-bank/xw-no.png) no-repeat
			background-size: 100% 100%
		.xw_load
			background: url(../../../assets/images/xw-bank/xw-load.png) no-repeat
			background-size: 100% 100%
		p
			font-size: 34px
			color: #666
			margin-top: 40px
		.result_btn
			margin: 60px 0 120px
			a
				display: inline-block
				width: 260px
				line-height: 74px
				font-size: 30px
				border-radius: 34px
			.result_left
				color: #fff
				background: linear-gradient(to right,#FC8D26,#F87B3C)
				border-radius: 37px
				margin-right: 40px
			.result_right
				color: #FF7102
				border: 2px solid #FF7102
			.result_return
				width: 4.8rem
				color: #FF7102
				border: 2px solid #FF7102
	.result_list
		border-top: 20px solid #F2F3F7
		p
			font-size: 28px
			color: #333
			border-bottom: 1px solid #E8E8E8
			padding-left: 37px
			line-height: 80px
		ul
			padding: 0 30px
			li
				border-bottom: 1px solid #E8E8E8
				overflow: hidden
				line-height: 80px
				padding: 0 7px
				font-size: 24px
				div:nth-child(1)
					float: left
					color: #666
				div:nth-child(2)
					float: right
					color: #333
			li:last-child
				border: none		
</style>