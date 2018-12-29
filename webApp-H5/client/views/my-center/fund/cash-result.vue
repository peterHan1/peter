<template>
  <div class="resultBox">
    <Header :navLeftTxt="'icon'">提现结果</Header>
		<!-- xw_load xw_ok-->
    <div class="result xw_no">
			<div class="xw_icon resultNo"></div>
			<div class="xw_txt">提现成功！</div>
			<div class="xw_msg">返回提现失败原因</div>
			<div class="xw_btn">
				<!-- <router-link to="/">返回</router-link> -->
				<!-- <router-link to="/">继续提现</router-link> -->
				<!-- <router-link to="/">查看提现记录</router-link> -->
				<router-link to="/">返回</router-link>
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
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: #fff
		.result
			.xw_icon
				width: 150px
				height: 150px
				margin: 106px auto 0
			.xw_txt
				font-size: 34px
				color: #666
				text-align: center
				margin-top: 35px
			.xw_msg
				font-size: 28px
				color: #999
				text-align: center
				margin-top: 20px
			.xw_btn
				margin-top: 60px
				text-align: center
				a
					display: inline-block
					line-height: 74px
					text-align: center
					border: 2px solid #FF7102
					border-radius: 35px
					font-size: 30px
			.resultOk
				background: url(../../../assets/images/xw-bank/xw-ok.png) no-repeat
				background-size: 100% 100%
			.resultNo
				background: url(../../../assets/images/xw-bank/xw-no.png) no-repeat
				background-size: 100% 100%
			.resultLoad
				background: url(../../../assets/images/xw-bank/xw-load.png) no-repeat
				background-size: 100% 100%				
		.xw_load,.xw_no
			.xw_btn
				a
					width: 64%
					color: #FF7102
		.xw_ok
			.xw_btn
				a
					width: 35%
				a:nth-child(1)
					background: linear-gradient(140deg,rgba(252,141,38,1) 0%,rgba(248,123,60,1) 100%)
					color: #fff
				a:nth-child(2)
					color: #FF7102
					margin-left: 35px
</style>