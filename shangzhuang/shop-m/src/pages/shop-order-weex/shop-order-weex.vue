<template>
  <div>
    <list loadmoreoffset="200"  :style="{height: listHeight + 'px'}" class="list-container">

      <header class="list-header-wrap">
        <div class="list-header">
          <div class="list-header-div" @click="toggleIncomeInfo">
            <image style="width: 42px; height: 42px;" v-if="isShowIncomeInfo" class="list-header-img" src="//cdn1.showjoy.com/images/8d/8dcb700bb608458ea22635909e84801b.png.42x42.png" resize="cover"></image>
            <image style="width: 42px; height: 42px;" v-else class="list-header-img" src="//cdn1.showjoy.com/images/eb/ebcc50c56a704a09aec26f9fb6afe219.png.42x42.png"></image>
            <text class="list-header-text">本店订单</text>
          </div>
          <div class="list-header-div" @click="openUrl('/u/trade.html')">
             <text class="list-header-text list-header-text-grey">我的订单</text>   
          </div>
        </div>
        <div class="category-header" :style="{ borderWidth: onePixelBorder }">
          <div v-for="(item, itemIndex) in categoryHeader" class="category-header-div" @click="toggleOrderType(itemIndex)">
            <text class="category-header-text">{{item.name}}</text>
            <div v-if="item.show" class="category-tab-bar"></div>
          </div>
        </div>
      </header>
      <cell>
        <no-list desc="没有订单哦~" :visibility="noData"></no-list>
      </cell>
      <cell v-for="(item, index) in list" :key="index">
        <div class="item">
          <div class="item-header" @click="copyOrderNumber(item.orderNumber)">
            <text class="fs-24">订单号：{{item.orderNumber}}</text>
            <text class="fs-24 item-header-date">{{item.timeFormat}}</text>
          </div>
          
          <a :href="'/shop/sku/' + (item.skuId) + '.html?shopId='+(item.sourceShopId)" class="item-detail">
            <image style="width: 124px; height: 124px;" :src="item.imgUrl + '.124x124.png'" class="item-detail-image" resize="cover"></image>
            <div class="item-detail-info">
              <text class="item-detail-info-title">{{item.title}}</text>
              <div class="item-detail-info-price-area">
                <text class="fs-26">单价：￥{{item.price}}</text>
                <text class="fs-26 item-detail-info-price-area-count">x{{item.quantity}}</text>
                <div  v-if=" item.refundCommission > 0" class="item-detail-info-price-area-refund">
                  <text class="fs-24 item-detail-info-price-area-refund-text">退</text>
                </div>
              </div>
              <div class="item-detail-info-commission-area" v-if="isShowIncomeInfo">
                <text class="item-detail-info-commission-area-desc fs-24">收益:</text>
                <text class="item-detail-info-commission-area-num fs-24">￥{{item.commissionCur}}</text>
                <text class="item-detail-info-commission-area-origin fs-24" v-if="item.refundCommission > 0">(￥{{item.commission}})</text>
              </div>
            </div>
            <div class="item-detail-user" v-if="isShowIncomeInfo">
              <image  style="width: 70px; height: 70px;" :src="item.user.image + '.70x70.jpg'" class="item-detail-user-image" resize="cover"></image>
              <text class="item-detail-user-name fs-24">{{item.user.username}}</text>
            </div>
          </a>
          <div class="item-status">

            <text v-if="item.status == 20" class="item-status-text">交易成功</text>
            <text v-if="item.status == -2 && !(item.refundCommission > 0)" class="item-status-text">交易取消</text>
            <text v-if="item.status == -2 && (item.refundCommission > 0)" class="item-status-text">退货成功</text>
            <text v-if="item.status == 21" class="item-status-text">等待支付</text>
            <text v-if="item.status == 22" class="item-status-text">等待发货</text>
            <text v-if="item.status == 23" class="item-status-text">配送中</text>
            <text v-if="item.status == 24" class="item-status-text">售后处理中</text>
            <text v-if="item.status == 25" class="item-status-text">退货关闭</text>
            <text v-if="item.status == 26" class="item-status-text">退货成功</text>
            <text v-if="item.status == 31" class="item-status-text">海关审核失败</text>
            <text v-if="item.status == 30" class="item-status-text">提交海关审核</text>
            <text v-if="item.status == 32" class="item-status-text">海关审核成功</text>
            <text v-if="item.status == 40 || item.status == 41 || item.status == 42" class="item-status-text">订单审查中</text>

            <div class="item-status-control" style="flex-direction: row; ">
              <div v-if=" item.refundCommission > 0" class="item-status-control-refund" :style="{ borderWidth: onePixelBorder + 'px' }" @click="showReturnInfo(item)">
                <text class="item-status-control-refund-text fs-28">退货记录</text>
              </div>
              <a :href="'/trade/getLogistics?orderNumber=' + (item.lorderNumber) + '&skuId=' + (item.skuId)" class="item-status-control-logistic" v-if="item.status == 23 || item.status == 20" :style="{ borderWidth: onePixelBorder + 'px'}">
                <text class="item-status-control-logistic-text fs-28">查看物流</text>
              </a>  
            </div>
            

          </div>
        </div>
      </cell>

      <loading class="loading" @loading="loadItems" :display="loadingStatus" style="background-color: transparent">
        <loading-indicator style="width: 50px; height: 50px; color: #ccc;"></loading-indicator>
      </loading>
    </list>
    <notice :visibility="noticeObj.visibility" :title="noticeObj.title" @cancel="closeNotice">
      <scroller class="notice-return">
        <div v-for="item in returnInfo">
          <text class="notice-return-text">买家：{{item.userName}}</text>
          <text class="notice-return-text">处理时间：{{item.gmtCreate}}</text>
          <text class="notice-return-text">退货商品：{{item.productName}}</text>
          <text class="notice-return-text">数量：x{{item.quantity}}</text>
          <text class="notice-return-text">收回佣金：￥{{item.commission}}</text>
          <text class="notice-return-text" style="margin-bottom: 35px">扣除销售额：￥{{item.refundSale}}</text>  
        </div>
        <text class="notice-return-text notice-return-text-highlight">温馨提示：买家申请退货成功，商品佣金收回</text>
      </scroller>
    </notice>
  </div>
</template>

<style scoped="">

  /*start 查看退货信息弹框*/
  .notice-return {
    padding-left: 24px;
    padding-right: 24px;
    height: 430px;
  }
  .notice-return-text {
    font-size: 26px;
    color: rgb(52, 52, 60);
    margin-bottom: 16px;
    line-height: 30px;
  }
  .notice-return-text-highlight {
    color: rgb(250, 55, 83);
    text-align: center;
    font-size: 22px;
  }
  /*end 查看退货信息弹框*/




  .fs-28 {
    font-size: 28px;
    line-height: 30px;
  }
  .fs-26 {
    font-size: 26px;
    line-height: 28px;
  }
  .fs-24 {
    font-size: 24px;
    line-height: 26px;
  }
  



  /*start 订单列表item样式*/
  .item {
    width: 750px;
    height: 320px;
    padding-right: 40px;
    padding-left: 40px;
    border-bottom-style: solid;
    border-bottom-width: 20px;
    border-bottom-color: #efefef;
    background-color: #fff;
  }

  .item-header {
    height: 84px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .item-header-date {
    color: rgb(81, 84, 86);
  }
  .list-header-img {
    width: 42px;
    height: 42px;
    margin-right: 26px;
  }

  .item-detail {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    height: 150px;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: #efefef;
    align-items: center;
  }
  .item-detail-image {
    width: 124px;
    height: 124px;
  }
  .item-detail-info {
    padding-left: 5px;
    flex: 2;
  }
  .item-detail-info-title {
    font-size: 26px; 
    lines: 2; 
    margin-bottom: 10px; 
    line-height: 28px;
  }
  .item-detail-info-price-area {
    flex-direction: row;  
    margin-bottom: 10px; 
    align-items: center; 
    position: relative;
  }
  .item-detail-info-price-area-count {
    position: absolute;
    right: 80px;
  }
  .item-detail-info-price-area-refund {
    width: 48px; 
    height: 30px; 
    border-radius: 5px; 
    background-color: rgb(242, 97, 118); 
    flex-direction: row; 
    justify-content: center; 
    align-items: center; 
    position: absolute; 
    right: 0;
  }
  .item-detail-info-price-area-refund-text {
    text-align: center; 
    color: #fff;
  }
  .item-detail-info-commission-area {
    flex-direction: row;
  }
  .item-detail-info-commission-area-desc {
    margin-right: 10; 
    color: rgb(249, 52, 80); 
  }
  .item-detail-info-commission-area-num {
    color: rgb(249, 52, 80);
  }
  .item-detail-info-commission-area-origin {
    color: rgb(158, 158, 158); 
    margin-left: 20px; 
    text-decoration: line-through
  }
  .item-detail-user {
    width: 170px;
    position: relative;
  }
  .item-detail-user-image {
    width: 70px; 
    height: 70px; 
    border-radius: 70px; 
    position: absolute; 
    right: 0; 
    top: 0;
  }
  .item-detail-user-name {
    text-align: right; 
    margin-top: 75px; 
  }

  .item-status {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 66px;
  }
  .item-status-text {
    font-size: 28px;
    color: rgb(249, 52, 80);
  }
  .item-status-control {
    flex-direction: row;
  }
  .item-status-control-refund {
    width: 160px; 
    height: 50px;
    border-style: solid; 
    border-color: rgb(244, 39, 100); 
    justify-content: center;
  }
  .item-status-control-refund-text {
    text-align: center; 
    color: rgb(244, 39, 100);
  }
  .item-status-control-logistic {
    width: 160px; 
    height: 50px;
    border-style: solid; 
    border-color: #000; 
    justify-content: center; 
    margin-left: 22px; 
    flex-direction: column;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .item-status-control-logistic-text {
    text-align: center;
  }
  .loading {
    width: 750px;
    height: 100px;
    background-color: transparent;
    align-items: center;
    justify-content: center;
  }
  /*end 订单列表item样式*/


  /*start 顶部信息样式*/
  .list-header-wrap {
    width: 750px;
  }
  .list-header {
    flex-direction: row;
    align-items: center;
    height: 80px;
    background-color: #efefef;
  }
  .list-header-text {
    text-align: center;
    font-size: 28px;
    line-height: 30px;
  }
  .list-header-text-grey {
    color: rgb(158, 158, 158);
  }
  .list-header-div {
    height: 80px;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: row;
  }
  .category-tab-bar {
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #000;
    width: 120px;
    position: absolute;
    bottom: 0px;
    left: 34px;
  }
  .category-header {
    flex-direction: row;
    align-items: center;
    height: 94px;
    border-style: solid; 
    border-color: rgb(239, 239, 239); 
    background-color: #fff;
  }
  .category-header-div {
    height: 94px;
    flex: 1;
    align-items: center;
    position: relative;
    justify-content: center;
  }
  .category-header-text {
    font-size: 28px;
  }
  /*end 顶部信息样式*/



  .list-container {
    -webkit-overflow-scrolling : touch;
  }
</style>

<script>

// 组件
var noList = require('components/weex-no-list/weex-no-list');
var notice = require('components/weex-dialog/weex-dialog').notice;
var header = require('./header.vue');

var stream = weex.requireModule('stream');
var dialog = weex.requireModule('shopModal');
var shopBase = weex.requireModule('shopBase');
var clipboard = weex.requireModule('clipboard');

module.exports = {
  components: {
    noList: noList,
    notice: notice
  },

  data: function () {
    return {
      list: [
        // {
        //   "commission": "0.00",
        //   "imgUrl": "//cdn1.showjoy.com/images/8b/8bb98feebb0141baad0e338b973d4ab1.png",
        //   "isDirect": "true",
        //   "isReward": 0,
        //   "lorderNumber": 1147496897691376,
        //   "orderNumber": 1147496897691376,
        //   "price": 10,
        //   "quantity": 1,
        //   "skuId": 9721,
        //   "sourceShopId": 4880,
        //   "status": 22,
        //   "timestamp": 1474969050000,
        //   "title": "安娜苏梦镜成真女士淡香水30ml",
        //   "timeFormat": '2016年12月23日 12:13',
        //   "user": {
        //     "email": "",
        //     "gmtCreate": 1460444227000,
        //     "gmtModified": 1474968962000,
        //     "id": 714076,
        //     "image": "//file.showjoy.com/images/7f/7f06936400c542cd9d1f7792ec486313.png",
        //     "isEnable": true,
        //     "isFake": 0,
        //     "nick": "tuwei",
        //     "password": "e10adc3949ba59abbe56e057f20f883e",
        //     "sexType": "",
        //     "tel": "18768197429",
        //     "userAuth": "ROLE_ADMIN,ROLE_SHOP_USER,ROLE_USER,ROLE_FINANCE_ADMIN,ROLE_SHOP_ADMIN,ROLE_WAREHOUSE_MASTER",
        //     "username": "tuwei"
        //     }
        //   },
        //   {
        //     "commission": "15.80",
        //     "imgUrl": "//cdn1.showjoy.com/images/8b/8bb98feebb0141baad0e338b973d4ab1.png",
        //     "isDirect": "false",
        //     "isReward": 0,
        //     "lorderNumber": 1147184673744876,
        //     "orderNumber": 1147184673744876,
        //     "price": 158,
        //     "quantity": 1,
        //     "skuId": 9721,
        //     "sourceShopId": 4880,
        //     "status": 20,
        //     "timestamp": 1471846755000,
        //     "title": "安娜苏梦镜成真女士淡香水30ml",
        //     "timeFormat": '2016年12月23日 12:13',
        //     "user": {
        //       "email": "",
        //       "gmtCreate": 1460444227000,
        //       "gmtModified": 1474968962000,
        //       "id": 714076,
        //       "image": "//file.showjoy.com/images/7f/7f06936400c542cd9d1f7792ec486313.png",
        //       "isEnable": true,
        //       "isFake": 0,
        //       "nick": "tuwei",
        //       "password": "e10adc3949ba59abbe56e057f20f883e",
        //       "sexType": "",
        //       "tel": "18768197429",
        //       "userAuth": "ROLE_ADMIN,ROLE_SHOP_USER,ROLE_USER,ROLE_FINANCE_ADMIN,ROLE_SHOP_ADMIN,ROLE_WAREHOUSE_MASTER",
        //       "username": "tuwei"
        //       }
        //     }
      ],
      pageIndex: 1,
      listHeight: 100,
      loadingStatus: 'hide',
      initData: false,
      suffix: '.net',
      isWeb: false,
      noData: false,
      pageSize: 10,
      onePixelBorder: 1,
      noticeObj: {
        visibility: false,
        title: '退款成功'
      },
      categoryTypeParam: 0, // 分类ajax参数值
      categoryHeader: [
        {
          name: '全部',
          number: 0,
          show: true,
          param: 0
        },
        {
          name: '未收货',
          number: 0,
          show: false,
          param: 22
        },
        {
          name: '已收货',
          number: 0,
          show: false,
          param: 20
        },
        {
          name: '退货',
          number: 0,
          show: false,
          param: -2
        }
      ],
      returnInfo: [],
      isShowIncomeInfo: true
    }
  },
  init: function () {},
  created: function () {
    let self = this;

    self.isWeb = weex.config.env.platform == 'Web' ? true : false;

    // 渲染首屏数据
    shopBase.showLoading();
    self.request(self.pageIndex, function (length) {
      shopBase.hideLoading();
      if (length === 0) {
        self.noData = true;
      }
    });

    // 设置list的高度
    this.setListHeight();


    // 设置
    self.isWeb = weex.config.env.platform == 'Web' ? true : false;
  },
  mounted: function () {
    var self = this;
    shopBase.setTitle('本店订单');

    self.$on('notice.onCancel', function (e) {

      
    });
  },
  methods: {
    request: function (page, cb, resetList) {
      let self = this;
      stream.fetch({
        method: 'GET',
        url: "/api/shop/commission/orderList?page=" + page + "&pageSize=" + self.pageSize + "&status=" + self.categoryTypeParam,
        type: 'json'
      }, function (response) {

        if (response.ok) {
          if (response.data.isSuccess) {

            self.initData = true;

            response.data.data.forEach(function (item, i) {
              item.timeFormat = self.getFormatTime(item.timestamp);
              item.commissionCur = (item.commission - item.refundCommission).toFixed(2);
              item.commission = parseFloat(item.commission).toFixed(2);
              item.refundCommission = parseFloat(item.refundCommission).toFixed(2);
              item.price = parseFloat(item.price).toFixed(2);

              if (!item.user) {
                item.user = {
                  image: '//cdn1.showjoy.com/images/f1/f1470821244341018d5dd9fe53c73ab3.png',
                  username: ''
                };
              }
            });
            if (resetList && resetList === true) {
              self.list = response.data.data;
            } else {
              self.list = self.list.concat(response.data.data);
            }

            if (response.data.data.length === 0 && page !== 1) {
              dialog.toast({ message: '最后一页啦' });
            }
            cb(response.data.data.length);
          } else {
            dialog.toast({ message: response.data.msg });
          }
        } else {
          dialog.toast({ message: '被挤爆啦! 请稍后再试~' });
        }
      }, function (response) {});
    },
    loadItems: function () {
      let self = this;
      self.loadingStatus = 'show';
      // shopBase.showLoading();
      self.pageIndex++;
      self.request(self.pageIndex, function () {
        self.loadingStatus = 'hide';

        // weex-vue-render list bug hack
        if (self.isWeb) {
          document.querySelector('.weex-list-inner').style.transform = 'translate3d(0px, 0px, 0px)';
        }
        // shopBase.hideLoading();
      });
    },
    setListHeight: function () {
      let self = this;

      let deviceHeight = parseInt(weex.config.env.deviceHeight);

      let rate = weex.config.env.deviceWidth / 750;
      if (weex.config.env.platform == 'android') {
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate) - 128;
      } else if (weex.config.env.platform == 'Web') { 
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate);
      } else {
        self.listHeight = deviceHeight < 1300 ? 1331 : 1334;
        self.listHeight = self.listHeight - 128;
      }
    },
    openUrl: function (e) {
      let self = this;

      let url = e
      shopBase.loadPage(url);
    },
    getFormatTime: function (timestamp) {

      let getZeroBindNumber = function (num) {
        if (parseInt(num) < 10) {
          return num = '0' + num;
        } else {
          return num;
        }
      };

      let date = new Date(timestamp);
      let gmtYear = date.getFullYear();
      let gmtMonth = date.getMonth() + 1;
      let gmtDate = date.getDate();
      let gmtTime = getZeroBindNumber(date.getHours()) + ':' + getZeroBindNumber(date.getMinutes());

      return gmtYear + '年' + gmtMonth + '月' + gmtDate + '日 ' + gmtTime;
    },
    toggleOrderType: function (index) {
      let self = this;

      // 导航变化逻辑
      var clickIndex = index;
      self.categoryHeader.forEach(function (item, i) {
        item.show = false;
      });
      self.categoryHeader[clickIndex].show = true;

      // 数据变化逻辑
      self.pageIndex = 1;
      self.categoryTypeParam = self.categoryHeader[clickIndex].param;

      // 无数据状态复原
      self.noData = false;

      shopBase.showLoading();
      self.request(self.pageIndex, function (length) {
        shopBase.hideLoading();
        if (length === 0) {
          self.noData = true;
        }
      }, true);
    },
    showReturnInfo: function (e) {
      let self = this;

      var orderNumber = e.orderNumber;
      shopBase.showLoading();

      stream.fetch({
        method: 'GET',
        url: "/api/shop/trade/returnInfo?orderNumber='" + orderNumber + "'",
        type: 'json'
      }, function (response) {
        shopBase.hideLoading();
        if (response.ok) {
          if (response.data.isSuccess) {
            response.data.data.forEach(function (item, i) {
              item.commission = parseFloat(item.commission).toFixed(2);
              item.refundSale = parseFloat(item.refundSale).toFixed(2);
            });
            self.returnInfo = response.data.data;
            self.noticeObj.visibility = true;
          } else {
            dialog.toast({ message: response.data.msg });
          }
        } else {
          dialog.toast({ message: '被挤爆啦! 请稍后再试~' });
        }
      }, function (response) {});
    },
    copyOrderNumber: function (e) {
      var self = this;

      var orderNumber = e + ''; // string

      if (!self.isWeb) {
        clipboard.setString(orderNumber);
        dialog.toast({ message: '已复制' + orderNumber });
      }
    },
    closeNotice: function () {
      let self = this;

      self.noticeObj.visibility = false;
    },
    toggleIncomeInfo: function () {
      var self = this;

      self.isShowIncomeInfo = !self.isShowIncomeInfo;
    }
  }
};</script>

