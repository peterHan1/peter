<template>
  <div class="resultBox">
    <Header :navLeftTxt="'icon'">激活存管处理结果</Header>
		<div class="result_status">
			<!--类名：wx_ok 成功、xw_no 失败、 xw_load 处理中-->
			<div class="relust_icon xw_load"></div>
			<!-- <p>激活存管处理中！</p> -->
			<!-- <p>激活存管成功！</p> -->
			<p>激活存管失败！</p>
			<div class="result_btn">
        <!-- <router-link to="">
					<Button :btnClass="'btnBorder'">返回</Button>
				</router-link> -->
        <!-- <router-link to="">
					<Button :btnClass="'btnBorder'">完成</Button>
				</router-link> -->
        <router-link to="">
					<Button :btnClass="'btnBorder'">请重新激活存管</Button>
				</router-link>
			</div>
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
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
	.result_status
		text-align: center
		font-size: 0
		.relust_icon
			display: inline-block
			height: 167px
			width: 167px
			margin-top: 146px
		.xw_ok
			background: url(../../assets/images/xw-bank/xw-ok.png) no-repeat
			background-size: 100% 100%
		.xw_no
			background: url(../../assets/images/xw-bank/xw-no.png) no-repeat
			background-size: 100% 100%
		.xw_load
			background: url(../../assets/images/xw-bank/xw-load.png) no-repeat
			background-size: 100% 100%
		p
			font-size: 34px
			color: #666
			margin-top: 40px
		.result_btn
			margin: 60px 0 120px
			a
				margin: 0 auto
				display: block
</style>