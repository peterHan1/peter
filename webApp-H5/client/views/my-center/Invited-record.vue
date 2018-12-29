<template>
  <div class="inviteRecord">
    <Header :navLeftTxt="'icon'">邀请奖励记录</Header>
    <div class="topView">
      <p>400.00</p>
      <p>7月3日待收返现总奖励(元)</p>
        <dl>
          <dt>664.62</dt>
          <dd>已收返现奖励(元)</dd>
        </dl>
        <dl>
          <dt>0</dt>
          <dd>抵用券奖励(元)</dd>
        </dl>
        <dl>
          <dt @click="directly()">10</dt>
          <dd @click="directly()">直接邀请人数 ></dd>
        </dl>
        <dl>
          <dt @click="directly()">12</dt>
          <dd @click="indirect()">间接邀请人数 ></dd>
        </dl>
    </div>
    <div class="bottomView">
      <div>
        <span @click="selectOneTab()" v-if="selectIndexOne" style="color:#FF780E">待收返现明细</span>
        <span @click="selectOneTab()" v-else style="color:#333333" >待收返现明细</span>
        <span @click="selectTwoTab()" v-if="selectIndexOne" style="color:#333333">已收返现明细</span>
        <span @click="selectTwoTab()" v-else style="color:#FF780E">已收返现明细</span>
      </div>
      <div>
        <p class="detailItem">
          <span class="titleItem">奖励金额(元)</span>
          <span class="titleItem">奖励类型</span>
          <span class="titleItem">奖励收入来源</span>
          <span class="titleItemL">产生时间</span>
        </p>
        <ul>
          <li>
            <p class="detailcell">
              <span>3.12</span>
              <span>直接奖励</span>
              <span>182****9661</span>
              <span>12月20号</span>
            </p>
          </li>
          <li>
            <p class="detailcell">
              <span>3.12</span>
              <span>直接奖励</span>
              <span>182****9661</span>
              <span>12月20号</span>
            </p>
          </li><li>
            <p class="detailcell">
              <span>3.12</span>
              <span>直接奖励</span>
              <span>182****9661</span>
              <span>12月20号</span>
            </p>
          </li><li>
            <p class="detailcell">
              <span>3.12</span>
              <span>直接奖励</span>
              <span>182****9661</span>
              <span>12月20号</span>
            </p>
          </li>
      </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '邀请奖励记录'
  },
  methods: {
    directly () {
      console.log('直接邀请人数')
    },
    indirect () {
      console.log('间接邀请人数')
    },
    selectOneTab () {
      this.selectIndexOne = true
      console.log(1)
    },
    selectTwoTab () {
      this.selectIndexOne = false
      console.log(2)
    }
  },
  data () {
    return {
      selectIndexOne: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .inviteRecord
    width: 100%
    padding-top: 88px
    box-sizing: border-box
    div
      padding-top: 20px
      background-color :#fff
      p:nth-child(1)
       color: #FF780E
       font-size: 64px
       text-align: center
      p:nth-child(2)
       color: #666
       font-size: 24px
       text-align: center
      dl
        padding-top: 15px
        padding-bottom: 20px
        background-color :#fff
        width: 50%
        float: left
        text-align: center
        dt 
          color:#FF780E
          font-size: 40px 
        dd
          color:#666
          font-size: 24px
    .bottomView
      div:nth-child(1)
        height: 90px
        span:nth-child(1)
          margin-top: 20px
          background-color :#fff
          color: #FF780E
          width: 50%
          float: left
          font-size: 28px
          line-height: 88px
          text-align: center
          border-bottom: 1px solid #e0e0e0
        span:nth-child(2)
          margin-top: 20px
          background-color :#fff
          color: #FF780E
          width: 50%
          float: right
          font-size: 28px 
          line-height: 88px
          text-align: center
          border-bottom: 1px solid #e0e0e0 
        span::after
          content: ''
          position: absolute
          width: .68rem
          height: .06rem
          background-color: #FF780E
          border-radius: .03rem
          bottom: 0
          left: 50%
          margin-left: -.34rem
      div:nth-child(2)
        p
          .titleItem
            padding-left: 30px
            color: #666
            text-align: left  
            font-size: 18px
            line-height: 80px
            width: 25%
            float: left
            background-color :#fff 
            border-bottom: 1px solid #e0e0e0
          .titleItemL
            padding-right: 30px
            color: #666
            font-size: 18px
            line-height: 80px
            width: 25%
            float: left
            background-color :#fff 
            border-bottom: 1px solid #e0e0e0
            text-align: right   
        ul
          li
            .detailcell 
              span
                padding-left: 30px
                margin-top: 0px 
                color: #333333
                text-align: left 
                font-size: 24px
                line-height: 90px
                width: 25%
                float: left
                background-color :#fff 
                border-bottom: 1px solid #e0e0e0 
              span:nth-child(4)
                padding-right: 30px                 
                text-align: right 
</style>