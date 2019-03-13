<template>
  <div>
    <scroller class="main-list" :style="{ height: listHeight + 'px' }">
      <div v-for="(item, itemIndex) in list">
        <div class="item">
          <!-- 商品信息 -->
          <div class="item-header">
            <!-- <a :href="'/shop/sku/' + (item.skuId) + '.html?shopId=' + shopId" class="item-header-box"> -->
            <div class="item-header-box" @click="goodsDetailAction(item.skuId, shopId)">
                <image class="item-header-image" :src="item.imgUrl + '.190x190.png'"></image>
                <div class="goods-info-box">
                  <text class="goods-info-box-title" lines="2">[{{item.brand}}]{{item.skuName}}</text>
                  <div class="goods-info-price-box">
                    <text class="goods-info-price-box-price">¥{{item.shopPrice}}</text>
                    <text class="goods-info-price-box-original-price">¥{{item.originalPrice}}</text>
                  </div>
                </div>
              </div>
              <!-- </a> -->

              <!-- 分享 -->
              <div v-if="!isWeb" class="share-box" @click="goodsShareAction(item)">
                <image class="share-box-icon" src="//cdn1.showjoy.com/images/3b/3bfab532d3014c4cb72d6b81323844d3.png.50x50.png"></image>
              </div>
            </div>
            <!-- 工具栏 -->
            <div v-if="shopId != 0" class="item-main-footer">
              <image class="item-footer-tool-image" src="//cdn1.showjoy.com/images/64/647fa222afaf478face1a980537e2f04.png"></image>
              <div class="item-footer">
                <div class="tool-box">
                  <text class="tool-box-online">{{item.shelvesCountTip}}</text>
                </div>
                <!-- 上下架操作 -->
                <div class="tool-earning-operation-box">
                  <div class="tool-earning-box">
                    <text class="tool-earning-box-status">收益:</text>
                    <text class="tool-earning-box-num">{{item.commission}}</text>
                  </div>
                  <div  v-if="item.select == true" class="tool-operation-box">
                    <text class="tool-operation-box-status" >已上架</text>
                    <div class="tool-operation-box-button-online" @click="goodsStatusOperationOfflineAction(item)">
                      <div class="tool-operation-box-button-icon-right"></div>
                    </div>
                  </div>
                  <div  v-if="item.select == false" class="tool-operation-box">
                    <text class="tool-operation-box-status" >未上架</text>
                    <div class="tool-operation-box-button-offline" @click="goodsStatusOperationOnlineAction(item)">
                      <div class="tool-operation-box-button-icon-left"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>

      <!-- 加载更多 -->
      <loading class="loading" @loading="loadItems" :display="loadingStatus" style="background-color: transparent">
        <loading-indicator style="width: 50px; height: 50px; color: #ccc;"></loading-indicator>
      </loading>
    </scroller>
  </div>
</template>

<style scoped>

.main-list{

}
.item{
  margin-top: 10px;
  left: 0;
  right: 0;
}

/*start 商品信息样式*/
.item-header{
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  left: 0;
  right: 0;
  margin-left: 40px;
  margin-top: 30px;
}
.item-header-box{
  flex-direction: row;
}
.item-header-image{
  width: 190px;
  height: 190px;
}
.goods-info-box{
  margin-left: 14px;
  margin-top: 30px;
  margin-bottom: 20px;
  width: 390px;
}
.goods-info-box-title{
  lines: 2;
  color:rgb(0, 0, 0);
  font-size: 32px;
  text-overflow: ellipsis;
}
.goods-info-price-box{
  flex-direction: row;
  align-items: center;
  margin-top: 36px;
}
.goods-info-price-box-price{
  font-size: 28px;
  color: rgb(249, 52, 80);
}
.goods-info-price-box-original-price{
  margin-left: 20px;
  text-decoration: line-through;
  font-size: 24px;
  color: rgb(158, 158, 158);
}
.share-box{
  align-self: center;
  justify-content: center;
  width: 96px;
  height: 72px;
  background-color: black;
  border-top-left-radius: 48px;
  border-bottom-left-radius: 48px;
}
.share-box-icon{
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
/*end*/

/*start 工具栏样式*/
.item-main-footer{
  margin-top: 10px;
  margin-left: 20px;
  height: 64px;
  width: 690px;
}
.item-footer-tool-image{
  height: 64px;
  width: 690px;
}
.item-footer{
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  padding-top: 13px;
}
.tool-box{
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
}
.tool-box-online{
  color: rgb(109, 109, 109);
  font-size: 28px;
}
.tool-earning-operation-box{
  flex-direction: row;
  align-items: center;
}
.tool-earning-box{
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
}
.tool-earning-box-status{
  font-size: 28px;
  color: rgb(0, 0, 0);
}
.tool-earning-box-num{
  margin-left: 10px;
  font-size: 28px;
  color: rgb(249, 52, 80);
}
.tool-operation-box{
  flex-direction: row;;
  align-items: center;
  justify-content: flex-end;
  margin-right: 6px;
}
.tool-operation-box-status{
  margin-right: 8px;
  font-size: 28px;
  color: rgb(0, 0, 0);
}
.tool-operation-box-button-online{
  width: 98px;
  height: 38px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  background-color: #F63754
}
.tool-operation-box-button-offline{
  width: 98px;
  height: 38px;
  border-radius: 100px;
  flex-direction: row;
  align-items: center;
  background-color: #D5D5D5
}
.tool-operation-box-button-icon-left{
  background-color: rgb(255, 255, 255);
  margin-left: 4px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
.tool-operation-box-button-icon-right{
  background-color: rgb(255, 255, 255);
  margin-left: 64px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
}
/*end*/

/*start 加载更多*/
.loading {
  width: 750px;
  height: 60px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
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
      // {
      //     "commission": "99.90",
      //     "imgUrl": "//cdn1.showjoy.com/images/a3/a38947bed236481f848af7ec663351e0.png",
      //     "inventory": 17,
      //     "originalPrice": 1200,
      //     "select": false,
      //     "shelvesCount": 931,
      //     "shopPrice": 999,
      //     "skuId": 7335,
      //     "skuName": "邂逅柔情女士淡香水（预售5天） 100.0ml"
      // },
      // {
      //     "commission": "9.80",
      //     "imgUrl": "//cdn1.showjoy.com/images/a9/a9794f0ef5f347d083dbc436c86da8f6.png",
      //     "inventory": 33,
      //     "originalPrice": 108,
      //     "select": false,
      //     "shelvesCount": 935,
      //     "shopPrice": 98,
      //     "skuId": 148026,
      //     "skuName": "杜蕾斯27只高潮情动组合 "
      // },
      // {
      //     "commission": "6.80",
      //     "imgUrl": "//cdn1.showjoy.com/images/9d/9d0e8914be744de4a7d344e1a1ec97b8.png",
      //     "inventory": 0,
      //     "originalPrice": 158,
      //     "select": true,
      //     "shelvesCount": 4349,
      //     "shopPrice": 68,
      //     "skuId": 15815,
      //     "skuName": "鲜亮焕采泡沫洁面乳 30.0ml"
      // },
      // {
      //     "commission": "6.50",
      //     "imgUrl": "//cdn1.showjoy.com/images/bd/bd917033be2e49908f9e3bbe2a3a2710.png",
      //     "inventory": 7571,
      //     "originalPrice": 288,
      //     "select": false,
      //     "shelvesCount": 1896,
      //     "shopPrice": 65,
      //     "skuId": 105692,
      //     "skuName": "红石榴美肤套装【赠价值59元卡姿兰大眼睛持久液体眼线笔】 320.0ml"
      // },
      // {
      //     "commission": "6.80",
      //     "imgUrl": "//cdn1.showjoy.com/images/05/0531885951894362af155ea6d8deea34.png",
      //     "inventory": 45,
      //     "originalPrice": 298,
      //     "select": false,
      //     "shelvesCount": 558,
      //     "shopPrice": 68,
      //     "skuId": 149209,
      //     "skuName": "粉色零束缚无钢圈内衣 "
      // },
      // {
      //     "commission": "28.20",
      //     "imgUrl": "//cdn1.showjoy.com/images/4b/4b083bba25b941b2b6dcb410e9c25376.png",
      //     "inventory": 0,
      //     "originalPrice": 288,
      //     "select": false,
      //     "shelvesCount": 827,
      //     "shopPrice": 188,
      //     "skuId": 149358,
      //     "skuName": "高档加绒自发热亲肤塑身保暖内衣套装（均码） "
      // }
      ],
      mainTitle: '',
      subHead: '',
      shopId: ''
    }
  },

  created: function(){
    shopBase.userTrack({key:'home_hot_recommend', params:{}});
    var self = this;
    // 设置
    self.isWeb = weex.config.env.platform == 'Web' ? true : false;
    // 渲染首屏数据
    self.requestHotRcommendData();
    // 设置list的高度
    this.setListHeight();
  },

  mounted: function () {
    var self = this;
  },

  methods: {
    //适配列表
    setListHeight: function () {
      let self = this;
      let deviceHeight = parseInt(weex.config.env.deviceHeight);
      let rate = weex.config.env.deviceWidth / 750;
      let deviceScale = weex.config.env.scale;

     if (weex.config.env.platform.toLowerCase() === 'web') {
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate);
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
    //网络请求
    request: function (page, cb) {
      let self = this;
      stream.fetch({
        method: 'GET',
        url: "/api/shop/activityExposure/allSku?type="+ weex.config.type +"&page=" + page + "&pageSize=" + self.pageSize,
        type: 'json'
      }, function (response) {
        shopBase.hideLoading();
        if (response.ok) {
          if (response.data.isSuccess) {
            self.initData = true;
            if (response.data.data.skuInfos != null) {
              response.data.data.skuInfos.forEach(function (item, i) {
                item.shopPrice = parseFloat(item.shopPrice).toFixed(2);
                item.originalPrice = parseFloat(item.originalPrice).toFixed(2);
                item.shelvesCountTip = self.goodsOnlineNumHandle(item.shelvesCount);
                item.commission = parseFloat(item.commission).toFixed(2);
              });
              self.list = self.list.concat(response.data.data.skuInfos);
            }
            self.mainTitle = response.data.data.mainTitle;
            self.subHead = response.data.data.subHead;
            self.shopId = response.data.data.shopId;
            shopBase.setTitle(self.mainTitle);

            if (response.data.data.skuInfos == null && page != 1) {
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
    requestHotRcommendData: function(){
      let self = this;
      shopBase.showLoading();
      self.request(self.pageIndex, function (length) {
        //分享页面
        self.pageShareAction();
        if (length === 0) {
          self.noData = true;
        }
      });
    },
    //上架数量处理
    goodsOnlineNumHandle: function(num){
      var result;
      if(num < 10000){
        result = '已被'+ num +'位店主上架'
      }else{
        var miriadeLineCount = num / 10000
        result = '已被'+ miriadeLineCount.toFixed(1)+'万位店主上架'
      }
      return result
    },
    //页面分享
    pageShareAction: function(){
      let self = this;
      //线上线下
      shopBase.isOnline(function(data) {
      if(data.data) {
          shopBase.shareInfo({'title': self.mainTitle, 'desc':self.subHead, 'link':'http://shop.m.showjoy.com/shop/activityExposure/hotRecommendWeex.html?shopId=' + self.shopId + '&type='+ weex.config.type,  'imgUrl': 'http://cdn1.showjoy.com/images/fe/fec026f0c0d045ed8daaf845a7e8bbc9.png'});
        } else {
          shopBase.shareInfo({'title': self.mainTitle, 'desc':self.subHead, 'link':'http://shop.m.showjoy.com/shop/activityExposure/hotRecommendWeex.html?shopId=' + self.shopId + '&type='+ weex.config.type,  'imgUrl': 'http://cdn1.showjoy.com/images/fe/fec026f0c0d045ed8daaf845a7e8bbc9.png'});
        }
      });
    },
    //商品分享
    goodsShareAction: function(skuInfo){
        shopBase.userTrack({key:'home_hot_recommend_detail_share', params:{}});
        shopBase.shareDetail(skuInfo);
    },
    //商品详情
    goodsDetailAction: function(skuId, shopId){
      shopBase.userTrack({key:'home_hot_recommend_detail', params:{}});
      let url = '/shop/sku/' + skuId + '.html?shopId=' + shopId;
      shopBase.openUrl(url);
    },
    //上架操作
    goodsStatusOperationOnlineAction: function(skuId){
      let self = this;
      self.requestOnlineGoods(skuId);
    },
    //下架操作
    goodsStatusOperationOfflineAction: function(skuId){
      let self = this;
      self.requestOfflineGoods(skuId);
    },
    //上架请求
    requestOnlineGoods: function (item) {
      let self = this;
      stream.fetch({
        method: 'GET',
        url: "/api/shop/shopProduct/select?type=3&skuId=" + item.skuId,
        type: 'json'
      }, function (response) {
        if (response.ok) {
          if (response.data.isSuccess) {
              item.select = true;
          } else {
            if (response.data.msg != null) {
              shopModal.toast({ message: response.data.msg, "duration": 2 });
            }
          }
        } else {
          shopModal.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
        }
      });
    },
    //下架请求
    requestOfflineGoods: function (item) {
      let self = this;
      item.select = false;
      stream.fetch({
        method: 'GET',
        url: "/api/shop/shopProduct/unselect?skuId=" + item.skuId,
        type: 'json'
      }, function (response) {
        if (response.ok) {
          if (response.data.isSuccess) {
            item.select = false;
          } else {
            if (response.data.msg != null) {
              shopModal.toast({ message: response.data.msg, "duration": 2 });
            }
          }
        } else {
          shopModal.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
        }
      });
    },

  }
};
</script>
