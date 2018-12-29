<template>
  <div class="myInvest">
    <Header :navLeftTxt="'icon'">债权明细</Header>
    <div class="bondList">
    	<div class="titleTxt">
				<span>省心投201812018</span>
				<b>加入中</b>
				<!-- 额度已满 -->
			</div>
      <ul>
        <li>
          <p>
            <span>宝马X6抵押续贷标</span>
            <span>还款中</span>
          </p>
          <p>
						<span>加入金额:<b>50000.00</b>元</span>
						<span>加入时间:2018-12-22</span>
					</p>
					<div>
						<router-link to="" >查看协议</router-link>
						<router-link to="" >查看项目</router-link>
					</div>
        </li>
				<li>
          <p>
            <span>宝马X6抵押续贷标</span>
            <span>募集中</span>
          </p>
          <p>
						<span>加入金额:<b>50000.00</b>元</span>
						<span>加入时间:2018-12-22</span>
					</p>
					<div>
						<router-link to="" >查看协议</router-link>
						<router-link to="" >查看项目</router-link>
					</div>
        </li>
				<li>
          <p>
            <span>宝马X6抵押续贷标</span>
            <span>已还款</span>
          </p>
          <p>
						<span>加入金额:<b>50000.00</b>元</span>
						<span>加入时间:2018-12-22</span>
					</p>
					<div>
						<router-link to="" >查看协议</router-link>
						<router-link to="" >查看项目</router-link>
					</div>
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
      navRightFn () {
        this.$router.push({path: '/bondExplain'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
.myInvest
	width: 100%
	padding-top: 88px
	box-sizing: border-box
	.bondList
		.titleTxt
			line-height: 90px
			font-size: 32px
			overflow: hidden
			padding: 0 30px
			span
				color: #333
				float: left
			b
				color: #999
				float: right
		li
			background-color: #fff
			margin-bottom: 20px
			padding: 0 30px
			p
				overflow: hidden
				span:nth-child(2)
					float: right
			p:nth-child(1)
				font-size: 28px
				color: #333
				line-height: 40px
				padding: 30px 0 16px
			p:nth-child(2)
				line-height: 33px
				padding-bottom: 27px
				span
					font-size: 24px
					color: #666
					b
						color: #FF7102
						font-size: 32px
			div
				line-height: 80px
				border-top: 1px solid #E8E8E8
				a
					color: #FF7102
				a:nth-child(2)
					float: right		
</style>
