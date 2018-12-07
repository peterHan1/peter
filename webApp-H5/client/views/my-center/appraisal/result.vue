<template>
  <div class="resule">
    <Header :navLeftTxt="'&#xe9ba;'" :fontX="'fontX'" @navLeftFn="navLeftFn()" :navRightTxt="'说明'" @navRightFn="navRightFn()">风险测评</Header>
		<p class="resule_txt">您的评估结果为</p>
    <div class="resule_com">
      <p>谨慎型</p>
    </div>
    <p class="resule_time">测评结果有效期截止至2018年12月18日</p>
    <div class="resule_accom">
      <router-link to="/ucSet" class="resule_btn">完成</router-link>
    </div>
    <router-link to="/appraisal/list" class="resule_rest">重新测评</router-link>
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
    overflow: auto
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: #fff
    .resule_txt
      color: #777
      font-size: 30px
      margin-top: 116px
    .resule_time
      color: #a3a3a3
      font-size: 25px
      margin-top: 60px
    .resule_accom
      padding: 0 40px
    .resule_btn
      display: block
      width: 100%
      background-color: #ff711c
      color: #fff
      font-size: 32px
      line-height: 88px
      text-align: center
      border-radius: 5px
      margin-top: 108px
    .resule_rest
      display: block
      font-size: 26px
      color: #ff711c
      margin-top: 50px
    .resule_com
      height: 378px
      line-height: 378px
      width: 415px
      margin: 55px auto 0
      color: #333
      font-size: 63px
      text-align: center
      background: url(../../../assets/images/my-center/result_com.png) no-repeat
      background-size: 100% 100%
      p
        font-weight: bold
</style>
