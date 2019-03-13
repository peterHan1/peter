

<template>
  <div>
    <list loadmoreoffset="200" :style="{ height: listHeight + 'px' }">
      <header v-if="!isVisitor" class="list-header-container">
        <div class="list-header">
          <div class="list-header-div" @click="openUrl('/user/tradePage')">
            <text class="list-header-text">本店订单</text>
          </div>
          <div class="list-header-div">
             <text class="list-header-text">我的订单</text>   
             <div class="tab-bar"></div>
          </div>
        </div>
      </header>
      <cell>
        <tip-order-close :visibility="initData && !logisticsaObj.show"></tip-order-close>
      </cell>
      <cell>
        <tip-logistic :visibility="initData && logisticsaObj.show" :info="logisticsaObj.info" @cancel="closeLogistics"></tip-logistic>
      </cell>
      <cell>
        <no-list desc="没有订单哦~" :visibility="noData"></no-list>
      </cell>
      <cell v-if="initData" v-for="(order, orderIndex) in list" :ref="'J_Item' + (orderIndex)" :id-str="'J_Item' + (orderIndex)">
        <div class="item">
          <div class="order-header" v-if="order.branchOrderInfos.length > 1">
            <text class="order-header-text">*此订单为合并订单，达人店为了让您尽快收到货，订单可能会被拆分成多个包裹。</text>
            <a class="order-header-ordernumber" :href="'/u/order/detail/?orderNumber=' + (order.orderNumber)">
              <text class="fs-24">订单号：</text>
              <text class="order-header-ordernumber-num fs-24">{{order.orderNumber}}</text>
            </a>
          </div>
          <div v-for="(ipackage, packageIndex) in order.branchOrderInfos" class="item-body">
            <div class="package-header">

              <text v-if="order.branchOrderInfos.length > 1" class="package-header-title">包裹-{{packageIndex + 1}}</text>
              <a class="package-header-ordernumber" :href="'/u/order/detail/?orderNumber=' + (order.orderNumber)" v-if="order.branchOrderInfos.length === 1">
                <text class="fs-24">订单号：</text>
                <text class="package-header-ordernumber-num fs-24">{{order.orderNumber}}</text>
              </a>

              <!-- 小包裹package状态 -->
              <text v-if="ipackage.branchOrderStatus == 20" class="package-header-status">交易成功</text>
              <text v-if="ipackage.branchOrderStatus == -2" class="package-header-status">交易取消</text>
              <text v-if="ipackage.branchOrderStatus == 21" class="package-header-status">等待支付</text>
              <text v-if="ipackage.branchOrderStatus == 22" class="package-header-status">等待发货</text>
              <text v-if="ipackage.branchOrderStatus == 23" class="package-header-status">配送中</text>
              <text v-if="ipackage.branchOrderStatus == 24" class="package-header-status">售后处理中</text>
              <text v-if="ipackage.branchOrderStatus == 25" class="package-header-status">退货关闭</text>
              <text v-if="ipackage.branchOrderStatus == 26" class="package-header-status">退货成功</text>
              <text v-if="ipackage.branchOrderStatus == 31" class="package-header-status">海关审核失败</text>
              <text v-if="ipackage.branchOrderStatus == 30" class="package-header-status">提交海关审核</text>
              <text v-if="ipackage.branchOrderStatus == 32" class="package-header-status">海关审核成功</text>
              <text v-if="ipackage.branchOrderStatus == 40 || ipackage.branchOrderStatus == 41 || ipackage.branchOrderStatus == 42" class="package-header-status">订单审查中</text>

            </div>

            <div class="package-body">
              <div v-for="(item, itemIndex) in ipackage.orderItems" class="package-body-item" :style="{ borderBottomWidth: (ipackage.orderItems.length-1)==itemIndex?0:3 + 'px' }">
                <image class="package-body-item-image" :src="item.itemImage + '.160x160.png'"></image>
                <text v-if="!item.isGiveaway" class="package-item-desc">{{item.itemName}}</text>
                <text v-if="item.isGiveaway" class="package-item-desc-give">{{item.itemName}}</text>
                <div class="package-item-details">
                  <text class="package-item-details-price">￥{{item.singlePrice}}</text>
                  <text class="package-item-details-count">x{{item.quantity}}</text>
                  <text v-if="item.refundQuantity > 0" class="package-item-details-refund">退货成功 x{{item.refundQuantity}}</text>
                </div>
              </div>
            </div>

            <div class="package-footer">
              <a v-if="ipackage.branchOrderStatus == 23 || ipackage.branchOrderStatus == 20" :href="'/trade/getLogistics?orderNumber=' + (ipackage.branchOrderNumber)" class="package-footer-button">
                <text class="fs-28">查看物流</text>
              </a>
            </div>

          </div>
          <div class="item-footer">
            <div class="post-fee">
              <div class="icon-box">
                <text class="icon-post"></text>
                <text class="icon-post-desc">邮费</text>
              </div>
              <text class="post-fee-price">￥{{order.postFee}}</text>
            </div>
            <div class="order-pay-price">
              <text>实付金额：</text>
              <text>￥{{order.actualPrice}}</text>
            </div>

            <!-- order大订单范围的操作 -->
            <div v-if=" order.status == 23 " @click="confirmRecive(order)" class="order-manage-box">
              <div class="order-manage">
                <text class="order-manage-text">确认收货</text>
              </div>
            </div>

            <a v-if=" order.status == 21 " :href="'/pay/option?orderNumber=' + (order.orderNumber) + '&hasHaiTao=' + (order.isHaiTao)" class="order-manage-box">
              <div class="order-manage">
                <text class="order-manage-text">付款</text>
              </div>
            </a>

          </div>
          
        </div>
      </cell>
      
      <loading class="loading" @loading="loadItems" :display="loadingStatus" style="background-color: transparent">
        <loading-indicator style="width: 50px; height: 50px; color: #ccc;"></loading-indicator>
      </loading>
    </list>
    <!-- <confirm :message="confirmObj.message" :visibility="confirmObj.visibility" :param-obj="confirmObj.paramObj"></confirm> -->
  </div>
</template>

<style scoped="">

  .fs-24 {
    font-size: 24px;
  }
  .fs-26 {
    font-size: 26px;
  }
  .fs-28 {
    font-size: 28px;
  }

  /*start 有多个包裹时的订单头部*/
  .order-header {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 245);
  }
  .order-header-text {
    font-size: 20px; 
    color: red; 
    margin-bottom: 10px;
  }
  .order-header-ordernumber {
    flex-direction: row;
    color: rgb(108, 107, 107);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .order-header-ordernumber-num {
    text-decoration: underline;
  }
  /*end*/



  /*start 包裹样式*/
  .item-body {
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: rgb(245, 245, 245);
  }
  .package-header {
    height: 72px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    align-items: center;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: rgb(239, 239, 239);
  }
  .package-header-title {
    font-size: 28px;
    line-height: 28px;
  }
  .package-header-ordernumber {
    flex-direction: row;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .package-header-ordernumber-num {
    text-decoration: underline;
  }
  .package-header-status {
    font-size: 28px;
    color: rgb(249, 52, 80);
  }
  .package-body {
    padding-left: 40px;
    padding-right: 40px;
  }
  .package-body-item {
    height: 160px;
    flex-direction: row;
    align-items: center;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: rgb(239, 239, 239);
  }
  .package-body-item-image {
    width: 160px;
    height: 160px;
  }
  .package-item-desc {
    font-size: 28px;
    line-height: 44px;
    lines: 2;
    flex: 1;
  }
  .package-item-desc-give {
    color: #f93450;
  }
  .package-item-details-price {
    font-size: 24px;
    color: rgb(158, 158, 158);
    margin-bottom: 5px;
    text-align: right;
  }
  .package-item-details-count {
    font-size: 24px;
    color: rgb(158, 158, 158);
    text-align: right;
  }
  .package-item-details-refund {
    font-size: 22px;
    color: rgb(248, 89, 112);
    text-align: right;
    margin-top: 28px;
  }
  .package-footer {
    /*height: 78;*/
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    border-bottom-color: rgb(239, 239, 239);
  }
  .package-footer-button {
    margin-top: 14px;
    margin-bottom: 14px;
    width: 160px;
    height: 50px;
    border-width: 1px;
    border-style: solid;
    border-color: #000;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  /*end*/

  /*start package底部操作样式*/
  .order-manage-box {
    height: 112px;
    justify-content: center;
    flex-direction: row;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    background-color: #efefef;
  }
  .order-manage {
    width: 310px;
    height: 60px;
    margin-top: 26px;
    background-color: rgb(250, 55, 83);
    justify-content: center;
    align-items: center;
  }
  .order-manage-text {
    font-size: 32px;
    color: #fff;
    text-align: center;
  }
  .order-pay-price {
    height: 74px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom-width: 12px;
    border-bottom-style: solid;
    border-bottom-color: #efefef;
  }
  /*end*/

  /*start header*/
  .list-header-container {
    width: 750px;
  }
  .list-header {
    width: 750px;
    flex-direction: row;
    align-items: center;
    height: 80px;
    background-color: #efefef;
  }
  .list-header-text {
    text-align: center;
    margin-top: 25px;
    font-size: 28px;
    line-height: 30px;
  }
  .list-header-div {
    height: 80px;
    flex: 1;
    align-items: center;
    position: relative;
    background-color: #efefef;
  }
  .tab-bar {
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #000;
    width: 160px;
    position: absolute;
    bottom: 0;
    left: 107px;
  }
  /*end*/

  /*start 订单底部操作*/
  .post-fee {
    height: 84px;
    padding-left: 40px;
    padding-right: 40px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }
  .icon-post {
    font-family: iconfont;
    font-size: 50px;
  }
  .icon-post-desc {
    font-size: 24px;
    margin-left: 10px;
    line-height: 24px;
  }
  .icon-box {
    flex-direction: row;
    align-items: center;
  }
  .post-fee-price {
    font-size: 24px;
    line-height: 24px;
    color: #9e9e9e;
  }
  /*end*/


  /*加载更多style*/
  .loading {
    width: 750px;
    height: 100px;
    background-color: transparent;
    align-items: center;
    justify-content: center;
  }
</style>

<script>

// 组件
var noList = require('components/weex-no-list/weex-no-list');
var tipOrderClose = require('components/weex-tip-order-close/weex-tip-order-close');
var tipLogistic = require('components/weex-tip-logistic/weex-tip-logistic');

// modules
var stream = weex.requireModule('stream');
var dialog = weex.requireModule('shopModal');
var shopBase = weex.requireModule('shopBase');
var domModule = weex.requireModule('dom');

module.exports = {
  components: {
    noList: noList,
    tipOrderClose: tipOrderClose,
    tipLogistic: tipLogistic
  },
  data: function () {
    return {
      listHeight: 333,
      pageIndex: 1,
      loadingStatus: 'hide',
      confirmObj: {
        message: '确认收货?',
        visibility: false,
        paramObj: ''
      },
      pageSize: 10,
      isWeb: false,
      noData: false,
      isVisitor: true,
      initData: false,
      logisticsaObj: {
        info: '',
        show: false
      },
      list: [
        //   {
        //     "actualPrice": "99.0",
        //     "branchOrderInfos": [
        //         {
        //             "branchOrderNumber": "7147815012498539000",
        //             "branchOrderStatus": -2,
        //             "orderItems": [
        //                 {
        //                     "itemImage": "http://cdn1.showjoy.com/images/ff/ffe257c4dd3248e3be1d1cf71d9120ef.png",
        //                     "itemName": "美体小铺维他命E抗氧化调理水200ml",
        //                     "quantity": 1,
        //                     "singlePrice": "89.0",
        //                     "isGiveaway": true,
        //                     "refundQuantity": 2
        //                 },
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/ff/ffe257c4dd3248e3be1d1cf71d9120ef.png",
        //                     "itemName": "美体小铺维他命E抗氧化调理水200ml",
        //                     "quantity": 1,
        //                     "singlePrice": "89.0",
        //                     "refundQuantity": 2
        //                 },
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/ff/ffe257c4dd3248e3be1d1cf71d9120ef.png",
        //                     "itemName": "美体小铺维他命E抗氧化调理水200ml",
        //                     "quantity": 1,
        //                     "singlePrice": "89.0",
        //                     "refundQuantity": 2
        //                 }
        //             ]
        //         }
        //     ],
        //     "isHaiTao": false,
        //     "orderNumber": "7147815012498539",
        //     "postFee": "10.0",
        //     "status": 21
        // },
        // {
        //     "actualPrice": "584.0",
        //     "branchOrderInfos": [
        //         {
        //             "branchOrderNumber": "7147502850352539002",
        //             "branchOrderStatus": -2,
        //             "orderItems": [
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/3a/3a14491334534880a9e44206a299cf34.png",
        //                     "itemName": "美体小铺接骨木眼胶15ml",
        //                     "quantity": 1,
        //                     "singlePrice": "80.0"
        //                 }
        //             ]
        //         },
        //         {
        //             "branchOrderNumber": "7147502850352539001",
        //             "branchOrderStatus": -2,
        //             "orderItems": [
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/cb/cb5befb56453486dba3036400fded42f.png",
        //                     "itemName": "王薇薇风采女士香水100ml",
        //                     "quantity": 1,
        //                     "singlePrice": "504.0"
        //                 }
        //             ]
        //         }
        //     ],
        //     "isHaiTao": false,
        //     "orderNumber": "7147502850352539",
        //     "postFee": "0.0",
        //     "status": 23
        // },
        // {
        //     "actualPrice": "584.0",
        //     "branchOrderInfos": [
        //         {
        //             "branchOrderNumber": "7147502850352539002",
        //             "branchOrderStatus": -2,
        //             "orderItems": [
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/3a/3a14491334534880a9e44206a299cf34.png",
        //                     "itemName": "美体小铺接骨木眼胶15ml",
        //                     "quantity": 1,
        //                     "singlePrice": "80.0"
        //                 }
        //             ]
        //         },
        //         {
        //             "branchOrderNumber": "7147502850352539001",
        //             "branchOrderStatus": -2,
        //             "orderItems": [
        //                 {
        //                     "itemImage": "//cdn1.showjoy.com/images/cb/cb5befb56453486dba3036400fded42f.png",
        //                     "itemName": "王薇薇风采女士香水100ml",
        //                     "quantity": 1,
        //                     "singlePrice": "504.0"
        //                 }
        //             ]
        //         }
        //     ],
        //     "isHaiTao": false,
        //     "orderNumber": "7147502850352539",
        //     "postFee": "0.0",
        //     "status": 23
        // }
      ]
    }
  },
  created: function () {
    var self = this;

    self.isWeb = weex.config.env.platform == 'Web' ? true : false;

    // 渲染首屏数据
    shopBase.showLoading();
    self.request(self.pageIndex, function (length) {
      shopBase.hideLoading();
      if (length === 0) {
        self.noData = true;
      }
    });

    self.renderLogistics();

    self.setIsVisitor(function () {});

    //目前支持ttf、woff文件，不支持svg、eot类型
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('https://cdn1.showjoy.com/assets/f2e/joyf2e/vendor/0.1.7/iconfont/talent-iconfont/fonts/font.woff')"
    });
    domModule.addRule('fontFace', {
      'fontFamily': "iconfont",
      'src': "url('https://cdn1.showjoy.com/assets/f2e/joyf2e/vendor/0.1.7/iconfont/talent-iconfont/fonts/font.ttf')"
    });

    // 根据
    self.setListHeight();
  },
  mounted: function () {
    var self = this;

    shopBase.setTitle('我的订单');

  },
  methods: {
    setListHeight: function () {
      let self = this;

      let deviceHeight = parseInt(weex.config.env.deviceHeight);

      let rate = weex.config.env.deviceWidth / 750;
      let tabbarHeight = self.isVisitor ? 0 : 88;

      if (weex.config.env.platform == 'android') {
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate) - 128;
      } else if (weex.config.env.platform == 'Web') { 
        self.listHeight = parseInt(weex.config.env.deviceHeight / rate);
      } else {
        self.listHeight = deviceHeight < 1300 ? 1331 : 1334;
        self.listHeight = self.listHeight - 128;
      }
    },
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
    request: function (page, cb) {
      let self = this;
      stream.fetch({
        method: 'GET',
        url: "/api/u/orderListBreak?page=" + page + "&pageSize=" + self.pageSize,
        type: 'json'
      }, function (response) {
        
        if (response.ok) {
          if (response.data.isSuccess) {
            self.initData = true;
            self.list = self.list.concat(response.data.data);
            if (response.data.data.length === 0 && page !== 1) {
              dialog.toast({ message: '最后一页啦', "duration": 2 });
            }
            cb(response.data.data.length);
          } else {
            dialog.toast({ message: response.data.msg, "duration": 2 });
            self.pageIndex--;
          }
        } else {
          dialog.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
          self.pageIndex--;
        }
      }, function (response) {});
    },
    confirmRecive: function (item) {
      let self = this;
      let orderNumber = item.orderNumber
      dialog.confirm({ message: '确认收货' }, function () {
        shopBase.showLoading();
        self.confirmRecived(orderNumber, function () {

          item.status = 20;

          item.branchOrderInfos.forEach(function (item) {
            item.branchOrderStatus = 20;
          });
        });
      });
      // self.confirmObj.visibility = true;
      // self.confirmObj.paramObj = {
      //   orderNumber: orderNumber,
      //   index: index
      // };
    },
    setIsVisitor: function (cb) {
      let self = this;

      if (weex.config.env.platform == 'Web') {

        shopBase.getElement('.j_IsOpenShop', function (json) {
          if (json.el.value === 'true') {
            self.isVisitor = false;
          }
          cb();
        });
      } else {
        self.isVisitor = false;
        cb();
      }
    },
    confirmRecived: function (orderNumber, cb) {
      let self = this;

      stream.fetch({
        method: 'GET',
        url: "/shop/order/confirm?orderNumber='" + orderNumber + "'",
        type: 'json'
      }, function (response) {

        shopBase.hideLoading();
        if (response.ok) {
          if (response.data.isSuccess) {
            cb();
          } else {
            dialog.toast({ message: response.data.msg, "duration": 2 });
          }
        } else {
          dialog.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
        }
      }, function (response) {});
    },
    openUrl: function (e) {
      let self = this;
      let url = e;
      shopBase.loadPage(url);
    },
    renderLogistics: function () {
      let self = this;

      stream.fetch({
        method: 'GET',
        url: "/api/notice/get",
        type: 'json'
      }, function (response) {

        if (response.ok) {
          if (response.data.isSuccess) {
            self.logisticsaObj.info = response.data.data;
            self.logisticsaObj.show = true;
          } else {}
        } else {
          dialog.toast({ message: '被挤爆啦! 请稍后再试~', "duration": 2 });
        }
      }, function (response) {});
    },
    closeLogistics: function () {
      let self = this;

      self.logisticsaObj.show = false;
    }
  }
};</script>