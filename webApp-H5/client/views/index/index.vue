<template>
  <div class="index_box">
    <div class="index_top">
      <Banner :banner-img="imgArr" class="banner"></Banner>
      <div class="oper_box">
        <div class="banner_botBg"></div>
        <div class="oper_list">
            <router-link to="">
              <div class="novice"></div>
              <p>新手专区</p>
            </router-link>
            <router-link to="">
              <div class="invite"></div>
              <p>邀请好友</p>
            </router-link>
            <router-link to="">
              <div class="safety"></div>
              <p>安全保障</p>
            </router-link>
            <router-link to="">
              <div class="inform"></div>
              <p>信息披露</p>
            </router-link>
          </div>
            <router-link to="" class="td_message">
              <span class="message_bg"></span>
              <span class="message_txt">扫尾送积分,最低200起送！</span>
              <i class="iconfont">&#xe83d;</i>
            </router-link>
        </div>
    </div>
    <!-- <div class="finance_list">
      <div class="finance_top">
        <span>省心投</span>
         <router-link to="">更多 > </router-link>
      </div>
      <div class="finance_bot">
        <div class="finance_tlt">
          <h3>省心投20170908</h3><span></span>
        </div>
        <div class="loading">
          <div class="loading_top"></div>
          <div class="loading_con"></div>
          <div class="loading_bot"></div>
          <p>项目加载中...</p>
        </div>
      </div>
    </div> -->
    <div class="finance_list">
      <div class="finance_top">
        <span>省心投</span>
         <router-link to="">更多 <i class="iconfont">&#xe83d;</i> </router-link>
      </div>
      <div class="finance_bot">
        <div class="finance_tlt">
          <h3>省心投20170908</h3><img src="../../assets/images/index/finance_type.png" />
        </div>
        <div class="finance_mes">
          <div class="list">
            <div>
              <p class="rate">9.0<span>%+4.00%</span></p>
              <p>约定利率</p>
            </div>
          </div>
          <div class="list list_style">
            <div>
               <p>1个月</p>
              <p>期限</p>
            </div>
          </div>
          <div class="list list_style">
            <div>
              <p>1,870,020.00</p>
              <p>剩余可投</p>
            </div>
          </div>
        </div>
        <div class="finance_btn">
          <router-link to="" class="td_btn td_btnHig">立即加入</router-link>
        </div>
      </div>
    </div>
    <div class="finance_list">
      <div class="finance_top">
        <span>散标项目</span>
         <router-link to="">更多 <i class="iconfont">&#xe83d;</i> </router-link>
      </div>
      <div class="finance_bot">
        <div class="finance_tlt">
          <h3>省心投20170908</h3><img src="../../assets/images/index/finance_type.png" />
        </div>
        <div class="finance_mes">
          <div class="list">
            <div>
              <p class="rate">9.0<span>%+4.00%</span></p>
              <p>约定利率</p>
            </div>
          </div>
          <div class="list list_style">
            <div>
               <p>1个月</p>
              <p>期限</p>
            </div>
          </div>
          <div class="list list_style">
            <div>
              <p>1,870,020.00</p>
              <p>剩余可投</p>
            </div>
          </div>
        </div>
        <div class="finance_btn">
          <router-link to="" class="td_btn td_btnNo">立即加入</router-link>
        </div>
      </div>
    </div>
    <div class="td_box">
      <div class="td_time">已合规运营 <span>4年6个月</span></div>
      <div class="td_data">
        <div>
          <p>92亿9909万</p>
          <p>累计交易额(元)</p>
        </div>
        <div>
          <p>16万7513</p>
          <p>已加入用户(人)</p>
        </div>
        <div>
          <p>3亿6666万</p>
          <p>已为用户赚取(元)</p>
        </div>
      </div>
      <div class="td_deposit"><span>您的资金由银行资金存管系统进行存管</span></div>
    </div>
    <Floating></Floating>
    <footer-nav :navClass="'index'"></footer-nav>
  </div>
</template>

<script>
  import Banner from './../../components/banner/banner.vue'

  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        imgArr: [
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/1.jpg'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/2.jpg'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/3.jpg'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/4.jpg'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/5.jpg'},
          {'bannerA': 'www.51tuodao.com', 'imgUrl': './client/assets/images/banner/6.jpg'}
        ]
      }
    },
    mounted () {
    },
    methods: {
      navLeftFn () {
        console.log('自定义返回按钮')
      },
      navRightFn (attr) {
        console.log(attr)
      }
    },
    components: {
      Banner
    }
  }
</script>

<style lang="stylus" scoped>
  .index_box
    min-height: 100%
    width: 100%
    padding-bottom: 130px
    .index_top
      position: relative
      height: 626px
      overflow: hidden
      background-color: #fff
      .banner
        position: absolute
        top: 0
        left: 0
        right: 0
      .oper_box
        position: absolute
        left: 0
        right: 0
        top: 290px
        height: 285px
        .banner_botBg
          width: 100%
          height: 50px
          background: url(../../assets/images/index/banner_botBg.png) no-repeat
          background-size: 100% 100%
        .oper_list
          display: flex
          width: 100%
          border-bottom: 1px solid #E8E8E8
          padding-bottom: 42px
          background-color: #fff
          a
            flex: 1
            text-align: center
            line-height: 0
            p
              font-size: 24px
              color: #333
              line-height: 33px
            div
              display: inline-block
              width: 118px
              height: 118px
              margin-top: 23px
            .novice
              background: url(../../assets/images/index/novice_bg.png) no-repeat
              background-size: 100% 100%
            .invite
              background: url(../../assets/images/index/invite_bg.png) no-repeat
              background-size: 100% 100%
            .safety
              background: url(../../assets/images/index/safety_bg.png) no-repeat
              background-size: 100% 100%
            .inform
              background: url(../../assets/images/index/inform_bg.png) no-repeat
              background-size: 100% 100%
      .td_message
        display: block
        width: 100%
        height: 70px
        line-height: 0
        overflow: hidden
        span
          display: block
          float: left
          font-size: 28px
          color: #666
          line-height: 70px
          margin-left: 28px
        .message_bg
          display: block
          float: left
          width: 160px
          height: 68px
          background: url(../../assets/images/index/message_bg.png) no-repeat
          background-size: 100% 100%
          vertical-align: middle
          margin-left: 20px
        i
          display: block
          font-size: 26px
          line-height: 70px
          float: right
          color: #666
          margin-right: 30px
    .finance_list
      margin-top: 20px
      background-color: #fff
      width: 100%
      padding-bottom: 30px
      .finance_top
        overflow: hidden
        height: 100px
        border-bottom: 1px solid #E8E8E8
        padding: 0 30px
        box-sizing: border-box
        span
          display: inline-block
          font-size: 32px
          color: #333
          float: left
          line-height: 100px
          position: relative
          padding-left: 20px
          font-weight: bold
        span:after
          content: ''
          display: inline-block
          width: 8px
          height: 28px
          background-color: #FF7102
          border-radius: 5px
          position: absolute
          left: 0
          top: 35%
        a
          display: inline-block
          font-size: 28px
          color: #999
          float: right
          line-height: 100px
          i
            font-size: 24px
      .finance_bot
        padding: 0 30px 4px
        box-sizing: border-box
        .finance_tlt
          padding-top: 19px
          line-height: 0
          h3
            display: inline-block
            font-size: 28px
            color: #333
            line-height: 70px
            font-weight: normal
          img
            display: inline-block
            width: 94px
            height: 36px
            margin-left: 16px
            vertical-align: text-bottom
        .finance_mes
          display: flex
          .list
            flex: 1
            text-align: center
            height: 115px
            position: relative
            div
              position: absolute
              bottom: 0
              left: 0
              right: 0
            p:nth-child(1)
              font-size: 30px
              color: #333
              line-height: 52px
            p:nth-child(2)
              font-size: 24px
              color: #999
              line-height: 33px
              margin-top: 5px
            p.rate
              font-size: 68px
              color: #FF7102
              span
                font-size: 32px
          div.list:nth-child(1)
            text-align: left
        .loading
          margin-top: 20px
          .loading_top,.loading_con,.loading_bot
            width: 40%
            height: 40px
            background-color: #DBDBDB
            border-radius: 20px
            margin-bottom: 30px
            position: relative
            transition: all 0.25s ease-in-out
          .loading_con
            width: 65%
          .loading_bot
            width: 95%
          p
            font-size: 28px
            color: #ccc
          .loading_top:after,.loading_bot:after,.loading_con:after
            display: block
            content:""
            height: 40px
            background: #fff
            border-radius: 20px
            position: absolute
            left: 0
            top: 0
            animation: progshow 1.5s infinite
          @keyframes progshow 
            0%
              width: 0
              opacity: 0.8
            100%
              width: 100%
              opacity: 0.1
    .td_box
      padding: 0 30px
      .td_time
        text-align: center
        font-size: 24px
        color: #999
        padding: 36px 0 28px
        span
          font-size: 30px
          color: #333
          line-height: 42px
      .td_data
        display: flex
        margin-bottom: 64px
        div
          flex: 1
          text-align: center
          p:nth-child(1)
            font-size: 28px
            color: #333
            line-height: 40px
          p:nth-child(2)
            font-size: 22px
            color: #999
            line-height: 30px
            margin-top: 5px
      .td_deposit
        font-size: 24px
        color: #999
        text-align: center
        span
          display: inline-block
          position: relative
        span:before
          content: ''
          position: absolute
          left: -30px
          top: 50%
          display: inline-block
          width: 22px
          height: 26px
          margin-top: -13px
          background: url(../../assets/images/index/td_deposit.png)
          background-size: 100% 100%
</style>
