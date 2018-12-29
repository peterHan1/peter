<template>
  <div class="resule">
    <Header :navLeftTxt="'&#xe687; <b>退出</b>'" @navLeftFn="navLeftFn()">风险测评</Header>
		<p class="resule_txt">您的评估结果为</p>
    <div class="resule_com">
      <p>谨慎型</p>
    </div>
    <p class="resule_time">测评结果有效期截止至2018年12月18日</p>
    <div class="resule_accom">
      <router-link to="/ucSet" class="resule_btn">完成</router-link>
    </div>
    <router-link to="/appraisal/list" class="resule_rest">重新测评</router-link>
    <router-link to="/appraisal/explain" class="resule_rest">测评说明</router-link>
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
      navLeftFn () {
        this.$router.push({path: '/ucSet'})
      },
      navRightFn () {
        this.$router.push({path: '/appraisal/explain'})
      }
    },
    components: {
    }
  }
</script>

<style lang="stylus" scoped>
  .resule
    text-align: center
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: #fff
    .resule_txt
      color: #999
      font-size: 30px
      margin-top: 140px
    .resule_time
      color: #999
      font-size: 30px
      margin-top: 50px
    .resule_btn
      display: block
      width: 58%
      background-color: #FF7102
      color: #fff
      font-size: 30px
      line-height: 74px
      text-align: center
      border-radius: 35px
      margin: 108px auto 0
    .resule_rest
      display: block
      font-size: 26px
      color: #FF7102
      margin-top: 50px
    .resule_com
      height: 378px
      line-height: 378px
      width: 415px
      margin: 50px auto 0
      color: #333
      font-size: 63px
      text-align: center
      background: url(../../../assets/images/my-center/result_com.png) no-repeat
      background-size: 100% 100%
      p
        font-weight: bold
</style>
