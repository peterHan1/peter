<template>
  <div class="notice">
    <div class="tab">
      <a href="javascript:;" :class="{on: active}" @click="active = !active">公告</a>
      <a href="javascript:;" :class="{on: !active}" @click="active = !active">动态</a>
    </div>
    <load-more :load-top="loadTop" :load-bottom="loadBottom" :all-loaded="allLoaded">
      <div class="left" v-if="active">
        <router-link to="" v-for="item in items1" class="item_notice opacity" :key="item">
          <div><span>{{item.title}}</span><b>{{item.time}}</b></div>
          <section>{{item.explain}}</section>
        </router-link>
      </div>
      <div class="right" v-else>
        <router-link to="" v-for="item in items2" class="item opacity" :key="item">
          <img src="//www.51tuodao.com/upload/data/upfiles/images/2018-09/21/106102_article_new_1537493529289.png">
          <div>
            <p class="t">{{item.title}}</p>
            <p class="d">{{item.time}}</p>
            <p class="c">{{item.explain}}</p>
          </div>
        </router-link>
      </div>
    </load-more>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '公告动态'
  },
  data () {
    return {
      active: true,
      allLoaded: true,
      items1: [{title: '邀请加码，邀请人最高多得', explain: '邀请加码，邀请人最高多得1150元', time: '2018-11-01'}, {title: '邀请加码，邀请人最高多得', explain: '邀请加码，邀请人最高多得1150元', time: '2018-11-01'}, {title: '邀请加码，邀请人最高多得', explain: '邀请加码，邀请人最高多得1150元', time: '2018-11-01'}],
      items2: [{title: '蝉联第一！拓道金服8月合...', explain: '蝉联第一！拓道金服8月合规排行再居榜首！', time: '2018-09-21'}, {title: '蝉联第一！拓道金服8月合...', explain: '蝉联第一！拓道金服8月合规排行再居榜首！', time: '2018-09-21'}, {title: '蝉联第一！拓道金服8月合...', explain: '蝉联第一！拓道金服8月合规排行再居榜首！', time: '2018-09-21'}]
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
  .notice
    height: 100%
    .tab
      width: 100%
      overflow: hidden
      display: flex
      justify-content space-between
      a
        display: inline-block
        flex: 1
        height: 80px
        line-height: 80px
        font-size: 0.3rem
        text-align: center
        color: #333
        text-decoration: none
        background: #fff
        border-bottom: 1px solid #f3f3f3
        &:first-child
          border-right: 1px solid #f2f3f7
        &.on
          border-bottom: 2px solid #ff711c
          color: #ff711c
    .item_notice
      background: #fff
      width: 100%
      display: block
      padding: 3.125%
      box-sizing: border-box
      margin-top: 0.3rem
      div
        span
          width: 70%
          font-size: 0.3rem
          color: #333
          display: inline-block
        b
          display: inline-block
          width: 30%
          text-align: right
          font-size: 0.22rem
          font-weight: normal
          color: #777
      section
        width: 100%
        overflow: hidden
        font-size: 0.24rem
        color: #a3a3a3
        color: #a3a3a3
        margin-top: 0.3rem
    .left,.right
      overflow: hidden
      background: #f2f3f7
    .item
      background: #fff
      width: 100%
      display: block
      overflow: hidden
      padding: 3.125%
      box-sizing: border-box
      margin-top: 0.3rem
      img
        width: 2rem
        height: 2rem
        vertical-align: middle
        display: inline-block
        margin-right: 0.5rem
        float: left
      div
        width: 64%
        float: left
        .t
          font-size: 0.3rem
          padding-top: 0.1rem
          color: #333
        .d
          font-size: 0.22rem
          color: #777
          margin: .15rem 0 .25rem 0
        .c
          font-size: 0.28rem
          color: #a3a3a3
          line-height: 0.4rem
</style>
