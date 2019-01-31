<template>
  <div class="oper">
    <td-header title="运营报告"/>
    <div class="oper_tab">
      <div
        class="oper_date"
        @click="isShow = !isShow">
        <span class="fl date_year">{{ year }}年</span>
        <span class="fr iconfont">&#xe6a3;</span>
      </div>
      <div
        v-if="isShow"
        class="oper_year">
        <ul>
          <li
            :class="{li_on: active[0]}"
            @click="select(2018)">
            <span class="fl">2018年</span>
            <span
              v-if="selectedOne == year"
              class="fr iconfont">&#xe6a9;</span>
          </li>
          <li
            :class="{li_on: active[1]}"
            @click="select(2017)">
            <span class="fl">2017年</span>
            <span
              v-if="selectedTwo == year"
              class="fr iconfont">&#xe6a9;</span>
          </li>
          <li
            :class="{li_on: active[2]}"
            @click="select(2016)">
            <span class="fl">2016年</span>
            <span
              v-if="selectedThree == year"
              class="fr iconfont">&#xe6a9;</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="oper_list">
      <transition
        v-if="year === 2018"
        name="fade">
        <div class="year">
          <router-link to="/home/inform/operReport/oper-2018-m12"><img src="../../../../assets/images/oper/2018-m12.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m11"><img src="../../../../assets/images/oper/2018-m11.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m10"><img src="../../../../assets/images/oper/2018-m10.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m09"><img src="../../../../assets/images/oper/2018-m9.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m08"><img src="../../../../assets/images/oper/2018-m8.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m07"><img src="../../../../assets/images/oper/2018-m7.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m06"><img src="../../../../assets/images/oper/2018-m6.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m05"><img src="../../../../assets/images/oper/2018-m5.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m04"><img src="../../../../assets/images/oper/2018-m4.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m03"><img src="../../../../assets/images/oper/2018-m3.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m02"><img src="../../../../assets/images/oper/2018-m2.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2018-m01"><img src="../../../../assets/images/oper/2018-m1.jpg"></router-link>
        </div>
      </transition>
      <transition
        v-else-if="year === 2017"
        name="fade">
        <div class="year">
          <router-link to="/home/inform/operReport/oper-2017"><img src="../../../../assets/images/oper/2017year-banner.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-m12"><img src="../../../../assets/images/oper/2017-m12.jpg"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-m11"><img src="../../../../assets/images/oper/2017-m11.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-m10"><img src="../../../../assets/images/oper/2017-m10.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-q3"><img src="../../../../assets/images/oper/2017-jd3.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-m08"><img src="../../../../assets/images/oper/2017-m8.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-m07"><img src="../../../../assets/images/oper/2017-m7.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-q2"><img src="../../../../assets/images/oper/2017-jd2.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2017-q1"><img src="../../../../assets/images/oper/2017-jd1.png"></router-link>
        </div>
      </transition>
      <transition
        v-else
        name="fade">
        <div class="year">
          <router-link to="/home/inform/operReport/oper-2016"><img src="../../../../assets/images/oper/2016year-banner.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2016-q4"><img src="../../../../assets/images/oper/2016-jd4.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2016-q3"><img src="../../../../assets/images/oper/2016-jd3.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2016-q2"><img src="../../../../assets/images/oper/2016-jd2.png"></router-link>
          <router-link to="/home/inform/operReport/oper-2016-q1"><img src="../../../../assets/images/oper/2016-jd1.png"></router-link>
        </div>
      </transition>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="../../../../assets/images/inform/signature-2.png">
    </div>
    <div
      v-if="show = isShow"
      class="dasahe"
      @click="close"/>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '运营报告'
  },
  data() {
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
    select(year) {
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
    close() {
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
    background-color: $color-white
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
        background-color:$color-background
        font-size:$fontsize-small-s
        color:$color-gray1
        overflow: hidden
    .oper_year
      width:100%
      padding:0 0.3rem
      position:absolute
      background-color: $color-white
      box-sizing: border-box
      li
        width:100%
        height:0.8rem
        line-height:0.8rem
        border-bottom: 1px solid $color-gray5
        &.li_on span
          color:$color-primary
          .iconfont
            display:block
        &:last-child
          border:none
      span
        font-size:$fontsize-small-ss
        color:$color-gray1
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
    background-color: $color-white
    border-top: 0.2rem solid $color-background
    border-bottom: 0.2rem solid $color-background
    h3
      font-size: $fontsize-medium
      color: $color-gray1
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid $color-gray5
    div
      padding: 0 0.3rem
    img
      width: 100%
      height: 3.8rem
</style>
