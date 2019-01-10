<template>
  <div class="resultBox">
    <td-header title="出借结果"/>
    <div class="result_status">
      <!--类名：wx_ok 成功、xw_no 失败、 xw_load 处理中-->
      <div class="relust_icon xw_ok"/>
      <p>出借成功</p>
      <div class="result_btn">
        <!--投资成功显示两个按钮-->
        <span class="result_left">
          <div class="btnBorder btnGo">继续出借</div>
        </span>
        <span class="result_right">
          <div class="btnBorder btnRecord">查看出借记录</div>
        </span>
        <!--投资失败和处理中显示一个按钮-->
        <!-- <span class="result_return">
          <div class="btnBorder">返回</div>
        </span> -->
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
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
.resultBox
	width: 100%
	padding-top: 88px
	background-color: $color-white
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
			font-size: $fontsize-large-xx
			color: $color-gray2
			margin-top: 40px
		.result_btn
			margin: 60px 0 120px
			span
				display: inline-block
			.result_left
				margin-right: 40px
	.result_list
		border-top: 20px solid #F2F3F7
		p
			font-size: $fontsize-medium
			color: $color-gray1
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
				font-size: $fontsize-small-ss
				div:nth-child(1)
					float: left
					color: $color-gray2
				div:nth-child(2)
					float: right
					color: $color-gray1
			li:last-child
				border: none
	.btnBorder
		width: 440px
		display: inline-block
		line-height: 0.74rem
		text-align: center
		font-size: $fontsize-large-x
		border-radius: 37px
		color: $color-primary
		background-color: $color-white
		border: 2px solid $color-primary
	.btnGo,.btnRecord
			width: 260px
	.btnGo
		background-color: $color-primary
		color: $color-white
</style>
