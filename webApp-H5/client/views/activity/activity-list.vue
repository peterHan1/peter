<template>
  <div class="list">
    <Header navLeftTxt="icon">活动专区</Header>
    <!-- <v-scroll :load-top="loadTop" :load-bottom="loadBottom" :all-loaded="allLoaded"> -->
      <div class="con">
        <a class="item1 opacity" href="https://www.51tuodao.com/html5/app/five_index">
          <img src="//www.51tuodao.com/upload/data/upfiles/images/2018-10/31/106102_scrollpic_new_1540980224508.png">
          <p>五周年庆典</p>
          <span>2018-10-31</span>
          <i>进行中</i>
        </a>
        <a class="item1 opacity" href="https://www.51tuodao.com/html5/app/five_index">
          <img src="//www.51tuodao.com/upload/data/upfiles/images/2018-10/31/106102_scrollpic_new_1540980224508.png">
          <p>五周年庆典</p>
          <span>2018-10-31</span>
          <i>进行中</i>
        </a>
      </div>
    <!-- </v-scroll> -->
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '活动专区'
  },
  data () {
    return {
      allLoaded: true
    }
  },
  methods: {
    loadTop (done) {
      done() // call done
    },
    loadBottom (done) {
      done()
    }
  }
}
</script>
<style lang="stylus" scoped>
  .list
    padding-top: 0.88rem
    .con
      overflow: hidden
      background: #f2f3f7
      a
        display: block
        width: 94%
        padding: 4% 4% 0
        background: #fff
        margin: 0.3rem auto
        border-radius: .1rem
        position: relative
        overflow: hidden
        img
          width: 100%
          display: block
        p
          padding: 0.22rem 0
          border-bottom: 1px solid #eee
          font-weight: normal
          color: #333
          font-size: 0.3rem
        span
          color: #a3a3a3
          display: block
          padding: 0.2rem 0
          font-weight: normal
          font-size: 0.24rem
        i
          transform: rotate(40deg)
          display: block
          background: #ff711c
          text-align: center
          line-height: 40px
          height: 40px
          padding: 0 1rem 0 1.5rem
          position: absolute
          top: 0.15rem
          right: -0.95rem
          font-style: normal
          font-size: 0.28rem
          color: #fff
</style>