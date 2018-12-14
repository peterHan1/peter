<template>
  <div class="oper">
    <Header navLeftTxt="icon">运营报告</Header>
    <div class="oper_tab">
      <div class="oper_date" @click="isShow = !isShow">
        <span class="fl date_year">{{ year }}年</span>
        <span class="fr iconfont">&#xe6a3;</span>
      </div>
      <transition name="fade">
        <div class="oper_year" v-if="isShow">
          <ul>
            <li :class="{li_on: active[0]}" @click="select(2018)">
              <span class="fl">2018年</span>
              <span class="fr iconfont" v-if="selectedOne == year">&#xe6a9;</span>
            </li>
            <li :class="{li_on: active[1]}" @click="select(2017)">
              <span class="fl">2017年</span>
              <span class="fr iconfont" v-if="selectedTwo == year">&#xe6a9;</span>
            </li>
            <li :class="{li_on: active[2]}" @click="select(2016)">
              <span class="fl">2016年</span>
              <span class="fr iconfont" v-if="selectedThree == year">&#xe6a9;</span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="oper_list">
      <transition name="fade" v-if="year === 2018">
        <div class="year">
          <router-link to="/inform/oper-report/oper-2018-m10"><img src="../../assets/images/oper/m10-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m09"><img src="../../assets/images/oper/m9-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m08"><img src="../../assets/images/oper/m8-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m07"><img src="../../assets/images/oper/m7-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m06"><img src="../../assets/images/oper/m6-banner.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m05"><img src="../../assets/images/oper/m5-banner.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m04"><img src="../../assets/images/oper/m4-banner.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m03"><img src="../../assets/images/oper/m3-banner.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m02"><img src="../../assets/images/oper/m2-banner.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2018-m01"><img src="../../assets/images/oper/m1-banner.jpg"></router-link>
        </div>
      </transition>
      <transition name="fade" v-else-if="year === 2017">
        <div class="year">
          <router-link to="/operations_report_2017"><img src="../../assets/images/oper/2017year-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-m12"><img src="../../assets/images/oper/m-12.jpg"></router-link>
          <router-link to="/inform/oper-report/oper-2017-m11"><img src="../../assets/images/oper/m-11.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-m10"><img src="../../assets/images/oper/m-10.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-q3"><img src="../../assets/images/oper/sanji-2017.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-m08"><img src="../../assets/images/oper/m-8.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-m07"><img src="../../assets/images/oper/m-7.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-q2"><img src="../../assets/images/oper/erji-2017.png"></router-link>
          <router-link to="/inform/oper-report/oper-2017-q1"><img src="../../assets/images/oper/yiji-2017.png"></router-link>
        </div>
      </transition>
      <transition name="fade" v-else>
        <div class="year">
          <router-link to="/inform/oper-report/oper-2016"><img src="../../assets/images/oper/2016year-banner.png"></router-link>
          <router-link to="/inform/oper-report/oper-2016-q4"><img src="../../assets/images/oper/siji.png"></router-link>
          <router-link to="/inform/oper-report/oper-2016-q3"><img src="../../assets/images/oper/sanji.png"></router-link>
          <router-link to="/inform/oper-report/oper-2016-q2"><img src="../../assets/images/oper/erji.png"></router-link>
          <router-link to="/inform/oper-report/oper-2016-q1"><img src="../../assets/images/oper/yiji.png"></router-link>
        </div>
      </transition>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../assets/images/inform/signature-2.png" alt="">
    </div>
    <div class="dasahe" v-if="show = isShow" @click="close"></div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '运营报告'
  },
  data () {
    return {
      isShow: false,
      year: 2018,
      show: false,
      selectedOne: 2018,
      selectedTwo: 2017,
      selectedThree: 2016,
      active: [true, false, false]
    }
  },
  methods: {
    select (year) {
      this.year = year
      this.isShow = !this.isShow
      if (this.year === 2018) {
        this.active = [true, false, false]
      } else if (this.year === 2017) {
        this.active = [false, true, false]
      } else {
        this.active = [false, false, true]
      }
    },
    close () {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="stylus" scoped>
  img
    width:6.9rem
    height:2.5rem
  .oper
    position:relative
    width:100%
    padding-top: 0.88rem
    background-color: #ffffff
    .fr
      float: right
    .fl
      float: left
    .oper_tab
      z-index: 99
      position:relative
      .oper_date
        padding:0 0.3rem
        line-height:0.6rem
        background-color:#f2f3f7
        font-size:0.26rem
        color:#212a36
        overflow: hidden
    .oper_year
      width:100%
      padding:0 0.3rem
      position:absolute
      background-color: white
      box-sizing: border-box
      li
        width:100%
        height:0.8rem
        line-height:0.8rem
        border-bottom: 1px solid #e4e4e4
        &.li_on span
          color:#FF7400
          .iconfont
            display:block
        &:last-child
          border:none
      span
        font-size:0.24rem
        color:#212a36
    .oper_list
      padding:0 0.3rem
      overflow: hidden
      padding-bottom:0.4rem
      a
        display:block
        margin-top:0.4rem
  .dasahe
    position:absolute
    left:0
    top:0
    width:100%
    height:100%
    background-color:#000
    opacity:0.5
    z-index: 9
  .inform_signature
    background-color: #fff
    border-top: 0.2rem solid #f2f3f7
    border-bottom: 0.2rem solid #f2f3f7
    h3
      font-size: 0.28rem
      color: #212a36
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid #e4e4e4
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
  .fade-enter-active, .fade-leave-active
    transition: opacity 0.2s ease
  .fade-enter, .fade-leave-to
    opacity: 0
</style>