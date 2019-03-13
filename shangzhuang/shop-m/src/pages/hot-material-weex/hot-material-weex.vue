<template>
  <div>
  <scroller class="main-list" :style="{ height: listHeight + 'px' }">
    <div v-for="(item, index) in list">
      <!-- item -->
      <div class="item">
        <!-- 内容 -->
        <div class="item-header-box">
          <div class="item-header-info-box">
            <image class="item-header-info-box-image" :src="item.url + '.80x80.png'"></image>
            <div class="item-header-info-detail-box">
              <text class="item-header-info-detail-box-name">{{item.nick}}</text>
            </div>
          </div>
          <text class="item-header-box-content">{{item.text}}</text>
        </div>
        <!-- 九宫格 -->
        <div class="item-grid-box">
          <div class="item-grid-box-div"  v-for="(picItem, picIndex) in item.picUrl" >
              <image class="item-grid-box-image" :src="picItem + '.230x230.png'" resize="cover" @click="pictureShowAction(item.picUrl, picIndex)"></image>
          </div>
        </div>
        <text class="item-footer-save" @click="saveAllContentAction(item.text, item.picUrl)">一键保存图文</text>
      </div>
    </div>
    <!-- 加载更多 -->
    <loading class="loading" @loading="loadItems" :display="loadingStatus" style="background-color: transparent">
      <loading-indicator style="width: 50px; height: 50px; color: #ccc;"></loading-indicator>
    </loading>
  </scroller>

  <!-- 弹框 -->
  <div class="share-alert" v-if="alertShow" @click="alertShowAction(false)">
    <div class="share-alert-background-box">
      <image class="share-alert-background-image" resize="contain" src="//cdn1.showjoy.com/images/2d/2d5ff4a6474b4068b4c17bb22a2d061d.png"></image>
      <div class="share-alert-box">
        <div class="share-alert-box-button" @click="alertGoWeChatAction"></div>
        </div>
    </div>
  </div>

  </div>
</template>

<style scoped>
.main-list{
  background-color: rgb(243, 243, 243);
}
.item{
  margin-bottom: 10px;
  align-items: center;
  background-color: rgb(255, 255, 255);
}

/*start 素材文案*/
.item-header-box{
  align-self: flex-start;
  margin-top: 47px;
  margin-left: 20px;
  margin-right: 20px;
}
.item-header-info-box{
  flex-direction: row;
  align-items: center;
}
.item-header-info-box-image{
  width: 80px;
  height: 80px;
  border-radius: 40px;
}
.item-header-info-detail-box{
  margin-left: 14px;
  justify-content: center;
}
.item-header-info-detail-box-name{
  font-size: 32px;
  line-height: 32px;
  color: rgb(77, 77, 77);
}
.item-header-box-content{
  font-size: 28px;
  line-height: 40px;
  color: rgb(77, 77, 77);
  margin-top: 30px;
}
/*end*/

/*start 九宫格*/
.item-grid-box {
  width: 720px;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 37px;
}
.item-grid-box-div {
  width: 239px;
  height: 239px;
  justify-content: center;
  align-items: center;
}

.item-grid-box-image {
  background-color: rgb(216, 216, 216);
  width: 230px;
  height: 230px;
}
/*end*/

.item-footer-save{
  background-color: rgb(249, 52, 80);
  color: rgb(255, 255, 255);
  width: 610px;
  height: 90px;
  border-radius: 48px;
  text-align: center;
  font-size: 32px;
  line-height: 90px;
  margin-top: 50px;
  margin-bottom: 70px;
}

/*start 加载更多*/
.loading {
  width: 750px;
  height: 60px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
}
/*end*/

/*start 弹框*/
.share-alert{
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.70);
}
.share-alert-background-box{
  width: 600px;
  height: 818px;
}
.share-alert-background-image{
  width: 600px;
  height: 818px;
}
.share-alert-box{
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  position: absolute;
  justify-content: flex-end;
}
.share-alert-box-button{
  width: 200px;
  height: 200px;
  bottom: 0;
}
/*end*/
</style>

<script>

// 组件
var noList = require('components/weex-no-list/weex-no-list');
var tipOrderClose = require('components/weex-tip-order-close/weex-tip-order-close');
var tipLogistic = require('components/weex-tip-logistic/weex-tip-logistic');

// modules
var stream = weex.requireModule('stream');
var shopModal = weex.requireModule('shopModal');
var shopBase = weex.requireModule('shopBase');
var clipboard = weex.requireModule('clipboard');

module.exports =  {
  data: function () {
    return {
      listHeight: 0,
      pageIndex: 1,
      loadingStatus: 'hide',
      pageSize: 10,
      isWeb: false,
      noData: false,
      initData: false,
      list: [
        //     {
        //   "nick": "小达",
        //   "picUrl": [
        //     "//cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg",
        //     " //cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg",
        //     "\n//cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg"
        //   ],
        //   "text": "“坚持依法治国，首先要坚持依宪治国；坚持依法执政，首先要坚持依宪执政。” 　　 “政府职能转变到哪一步，法治建设就要跟进到哪一步。”　　 从党的十八届四中全会绘就全面推进依法治国的总蓝图，到刚刚闭幕的十二届全国人大五次会议表决通过《中华人民共和国民法总则》，书写新时代的“民事权利宣言”，法治的力量怎样汇聚成“洪荒之力”，标注中华民族伟大复兴的最新高度？敬请收看新华社微视频《法治的力量》。",
        //   "url": "//cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg"
        // },
        // {
        //   "nick": "小傻",
        //   "picUrl": [
        //     "//cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg",
        //     " //cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg"
        //   ],
        //   "text": "　立善法于天下，则天下治。探寻世界近现代史的发展脉络，很多在国际上具有影响力的重要民法典都是在民族复兴、社会转型、国家崛起的关键时期制定出来的，比如1804年的法国民法典、1898年的日本新民法典、1900年的德国民法典、1923年俄罗斯联邦民法典皆是如此。",
        //   "url": "//cdn1.showjoy.com/images/5c/5c5061f55eb746fc993b42de343473f5.jpg"
        // }
      ],
      alertShow: false,
    }
  },
  created: function(){
    var self = this;
    // 设置
    self.isWeb = weex.config.env.platform == 'Web' ? true : false;
    //渲染首屏数据
    shopBase.showLoading();
    self.request(self.pageIndex, function (length) {
      if (length === 0) {
        self.noData = true;
      }
    });
    // 设置list的高度
    this.setListHeight();
  },
  mounted: function () {
    var self = this;
    shopBase.setTitle('推广素材');
  },
  methods: {
    //适配列表
    setListHeight: function () {
      let self = this;
      let deviceHeight = parseInt(weex.config.env.deviceHeight);
      let rate = weex.config.env.deviceWidth / 750;
      let deviceScale = weex.config.env.scale;

     if (weex.config.env.platform.toLowerCase() === 'web') {
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate) - 122;
      } else {
        self.listHeight = (deviceHeight - (64 * deviceScale)) / rate;
      }
    },
    //加载更多
    loadItems: function () {
      let self = this;
      self.loadingStatus = 'show';
      self.pageIndex++;
      // shopBase.showLoading();
      self.request(self.pageIndex, function () {
        // shopBase.hideLoading();
        self.loadingStatus = 'hide';

        // weex-vue-render list bug hack
        if (self.isWeb) {
          document.querySelector('.weex-list-inner').style.transform = 'translate3d(0px, 0px, 0px)';
        }
      });
    },
    //请求数据
    request: function (page, cb) {
      let self = this;
      stream.fetch({
        method: 'GET',
        url: "/api/shop/activityExposure/resource?page=" + page + "&pageSize=" + self.pageSize,
        type: 'json'
      }, function (response) {
        shopBase.hideLoading();
        if (response.ok) {
          if (response.data.isSuccess) {
            self.initData = true;
            self.list = self.list.concat(response.data.data);

            if (response.data.data.length === 0 && page != 1) {
              shopModal.toast({ message: '最后一页啦', "duration": 2 });
              self.pageIndex--;
            }
            cb(response.data.data.length);
          } else {
            shopModal.toast({ message: response.data.msg, "duration": 2 });
            self.pageIndex--;
          }
        } else {
          shopModal.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
          self.pageIndex--;
        }
      }, function (response) {});
    },
    //弹框是否显示
    alertShowAction: function(show){
      var self = this;
      self.alertShow = show;
    },
    //放大图片
    pictureShowAction: function(picUrls, picIndex){
      shopBase.userTrack({key:'home_hot_material_image', params:{}});
      shopBase.openImages({picUrls, picIndex});
    },
    //一键保存
    saveAllContentAction: function(text, picUrls){
      shopBase.userTrack({key:'home_hot_material_save', params:{}});
      var self = this;
      self.alertShowAction(true);
      clipboard.setString(text);
      shopBase.saveImages(picUrls);
    },
    //打开微信
    alertGoWeChatAction: function(){
      shopBase.userTrack({key:'home_hot_material_weixin', params:{}});
      var self = this;
      self.alertShowAction(false);
      shopBase.openApp('weixin://');
    },
  }
};
</script>
