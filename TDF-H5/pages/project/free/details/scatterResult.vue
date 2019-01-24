<template>
  <div class="resultBox">
    <td-header title="出借结果"/>
    <div class="result_status">
      <result 
        status="no" 
        resultTxt="出借失败！"/>
      <div class="btn">
        <div>
          <td-button 
            value="继续出借"/>
        </div>
        <div>
          <td-button 
            :border="true" 
            value="查看出借记录"/>
        </div>
        <!-- <div>
          <td-button 
            :border="true" 
            value="返回"
            @btnFn="btnSub"/>
        </div> -->
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
	padding-top: 88px
	background-color: $color-white
	position: absolute
	left: 0
	top: 0
	right: 0
	bottom: 0
	.result_status
		padding: 146px 0 120px
		.btn
			margin-top: 60px
			text-align: center
			div
				display: inline-block
			div:nth-last-child(1):first-child
				width: 64%
			div:nth-last-child(2):first-child,
			div:nth-last-child(2):first-child ~ div
				width: 34%
				margin-left: 40px
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
