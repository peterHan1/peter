<template>
  <div class="index_box">
    <div class="index_top">
      <Banner :banner-img="imgArr" class="banner"></Banner>
      <div class="oper_box">
        <ul class="oper_list">
          <li>
            <router-link to="">
              <div class="novice"></div>
              <p>新手专区</p>
            </router-link>
          </li>
          <li>
            <router-link to="">
              <div class="invite"></div>
              <p>邀请好友</p>
            </router-link>
          </li>
          <li>
             <router-link to="">
              <div class="inform"></div>
              <p>信息披露</p>
            </router-link>
          </li>
          <li @click="downApp">
            <div class="downApp"></div>
            <p>下载APP</p>
          </li>
        </ul>
        <router-link to="" class="td_message">
          <span class="message_bg"></span>
          <span class="message_txt">扫尾送积分,最低200起送！</span>
          <i class="iconfont">&#xe83d;</i>
        </router-link>
        </div>
    </div>
    <div class="finance_list">
      <router-link to="">
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
          <Button :btnClass="'btnRule'">立即加入</Button>
        </div>
      </router-link>
    </div>
    <div class="finance_list">
      <router-link to="">
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
          <Button :btnClass="'btnRulegary'">立即加入</Button>
        </div>
      </router-link>
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
      <div class="indexLink">
        <span>电脑版</span>|
        <span @click="downApp">下载APP</span>|
        <span>帮助中心</span>
      </div>
      <div class="tdNum">
        <p>Copyright Reserved 2013-2018</p>
        <p>浙ICP备 13034095号</p>
        <p>增值电信业务经营许可证编号：浙B2-20160394</p>
      </div>
    </div>
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
      downApp () {
        this.$App('<p>您确定下载以下内容吗？</p><p>拓道金服V3.9.2 54MB &nbsp;</p>')
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
    padding-bottom: 150px
    .index_top
      position: relative
      height: 626px
      overflow: hidden
      margin-bottom: 20px
      .banner
        position: absolute
        top: 0
        left: 0
        right: 0
        height: 54%
      .oper_box
        position: absolute
        left: 0
        right: 0
        top: 290px
        height: 53%
        background: url(../../assets/images/index/banner_botBgs.png) no-repeat
        background-size: 100% 100%
        .oper_list
          display: flex
          align-items: center
          width: 100%
          height: 256px
          border-bottom: 1px solid #E8E8E8
          li
            flex: 1
            text-align: center
            line-height: 0
            a
              display: block
            p
              font-size: 24px
              color: #333
              line-height: 33px
            div
              display: inline-block
              width: 118px
              height: 118px
              margin-top: 33px
            .novice
              background: url(../../assets/images/index/novice_bg.png) no-repeat
              background-size: 100% 100%
            .invite
              background: url(../../assets/images/index/invite_bg.png) no-repeat
              background-size: 100% 100%
            .downApp
              background: url(../../assets/images/index/down_bg.png) no-repeat
              background-size: 100% 100%
            .inform
              background: url(../../assets/images/index/inform_bg.png) no-repeat
              background-size: 100% 100%
      .td_message
        display: block
        width: 100%
        line-height: 0
        overflow: hidden
        span
          display: block
          float: left
          font-size: 28px
          color: #666
          line-height: 77px
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
      background-color: #fff
      width: 100%
      padding: 0 30px 30px
      margin-bottom: 20px
      a
        display: block
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
          p.rate
            font-size: 68px
            color: #FF7102
            span
              font-size: 32px
        div.list:nth-child(1)
          text-align: left
      .finance_btn
        margin-top: 20px    
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
      .indexLink
        text-align: center
        font-size: 22px
        color: #E8E8E8
        span
          margin: 0 38px
          color: #5887FF
        span:nth-child(2)
          padding-left: 20px
          margin-right: 44px
      .tdNum
        font-size: 24px
        color: #999
        line-height: 33px
        text-align: center
        p:nth-child(1)
          padding: 39px 0 23px
        p:nth-child(2)
          padding-bottom: 8px
</style>
