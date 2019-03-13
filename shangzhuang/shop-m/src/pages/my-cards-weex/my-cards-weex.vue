<template>
  <div :class="[noData ? 'nodata' : 'page']">
    <wait-list v-if="showWait"></wait-list>
    <no-list desc="您没有可用的优惠券哦~" v-if="noData"></no-list>
    
    <list class="list" :style="{height: listHeight + 'px'}">
      <header v-if="showTip" class="tip">
        <div class="tip-wrap">
          <text class="tip-text">{{tip}}</text>
          <a class="tip-go" href="/shopCart.html">
            <text class="tip-go-text">去购物袋下单 ></text>
          </a>
        </div>
      </header>
      <cell v-for="item in coupons">      
        <div class="cell">
          <div class="cell-left">
            <div class="cell-left-line"></div>
            <text class="cell-left-num">￥{{item.discountPrice}}</text>
            <text class="cell-left-condition">满{{item.consumptionLimit}}可用</text>
          </div>
          <div class="cell-right">
            <text class="cell-right-scope">{{item.name}}</text>
            <text class="cell-right-start">开始日期{{item.startTime}}</text>
            <text class="cell-right-end">有效期至{{item.endTime}}</text>
          </div>
          <div class="cell-overtime"  v-if="item.aboutOverTime">
            <image class="cell-overtime-img" src="//cdn1.showjoy.com/images/4b/4bf79fb9ebe9456a8cf1ff67206404b9.png"></image>  
          </div>
          <div class="cell-cirtop"></div>       
          <div class="cell-cirbottom"></div> 
        </div> 
      </cell>
    </list>
  </div>
</template>

<style scoped>
  .page {
    background-color: rgb(239, 239, 239);     
  }
  .nodata {
    background-color: #ffffff;       
  }
  .list {
    width: 750px;
  }
  .cell {
    position: relative;
    width: 720px;
    height: 200px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
  }
  .tip {
    height: 84px;
    width: 750px;
  }
  .tip-wrap {
    height: 64px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: rgb(254, 248, 216);
  }
  .tip-text {
    width: 536px;
    color: #000;
    font-size: 24px;
    margin-left: 20px;
  }
  .tip-go {
    width: 170px;
    height: 64px;
    display: flex;
    flex-direction: row;    
    align-items: center;
    margin-right: 20px;
  }
  .tip-go-text {
    font-size: 24px;
    color: rgb(255, 141, 87);
  }
  .cell-overtime {
    position: absolute;
    width: 108px;
    height: 108px;
    right: 0;
    top: 0;
  }
  .cell-overtime-img {
    width: 108px;
    height: 108px;
  }
  .cell-cirtop {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -15px;
    left: 186px;
    background-color: red;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: rgb(239, 239, 239);
  }
  .cell-cirbottom {
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: -15px;
    left: 186px;
    background-color: red;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: rgb(239, 239, 239);
  }
  .cell-left {
    position: absolute;
    left: 0;
    top: 0;
    width: 200px;
    height: 200px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: #ffffff;  
  }
  .cell-left-line {
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 200px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: rgb(255, 124, 143);
  }
  .cell-left-num {
    width: 200px;
    text-align: center;
    margin-top: 66px;
    font-size: 64px;
    color: rgb(248, 51, 79);
  }
  .cell-left-condition {
    width: 200px;
    text-align: center;
    font-size: 24px;
    color: rgb(109, 109, 109);
  }
  .cell-right {
    position: absolute;
    right: 0;
    top: 0;
    width: 520px;
    height: 200px;
    border-left-style: dashed;
    border-left-width: 2px;
    border-left-color: rgb(228, 228, 228);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #ffffff;
    padding-left: 52px;
  }
  .cell-right-scope {
    margin-top: 60px;
    font-size: 32px;
    font-weight: bold;
    color: rgb(55, 55, 55);
  }
  .cell-right-start,
  .cell-right-end {
    margin-top: 8px;
    font-size: 24px;
    color: rgb(109, 109, 109);
  }
</style>

<script>
  var noList = require('components/weex-no-list/weex-no-list');
  var waitList = require('components/weex-wait-list/weex-wait-list');

  var stream = weex.requireModule('stream');
  var dialog = weex.requireModule('shopModal');
  var shopBase = weex.requireModule('shopBase');

  export default {    
    components: {
      noList: noList, 
      waitList: waitList
    },
    data: function() {
      return {
        listHeight: 300,
        error_msg: false,
        noData: false,
        tip: '',
        showTip: false,
        showWait: true,          
        coupons: [
          // {
          //     "aboutOverTime": true,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": false,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": true,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": false,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": true,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": false,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": true,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // },{
          //     "aboutOverTime": false,
          //     "consumptionLimit": 100,
          //     "discountPrice": 1,
          //     "duringTime": true,
          //     "endTime": 1509010620000,
          //     "exchangeRate": 1,
          //     "id": 1750178,
          //     "isAppPlatform": false,
          //     "name": "满100元减1元",
          //     "overdue": true,
          //     "platform": 0,
          //     "source": "满100-1 测试奖品",
          //     "startTime": 1477388220000
          // }
        ]
      }
    },
    methods: {
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
        self.listHeight = self.listHeight;
      },

      requset: function() {
        let self = this;
        let reqApi = '/api/getMyCoupon';
        stream.fetch({
          method: 'GET',
          type: 'json',
          url: reqApi
        }, function(res) {
          shopBase.hideLoading();
          if(res.ok) {
            self.showWait = false;
            self.dataHandling(res.data);
          } else {
            dialog.toast({ message: '小店被挤爆啦! 请稍后再试~' });
          }
        });
      },

      addZero: function(num) {
        if(num < 10) {
          return '0' + num;
        } else {
          return num;
        }
      },

      parseTime: function(time) {
        let self = this;
        let year = new Date(time).getFullYear();
        let month = new Date(time).getMonth() + 1;
        let date = new Date(time).getDate();
        let hour = new Date(time).getHours();
        let minute = new Date(time).getMinutes();
        let second = new Date(time).getSeconds();

        return (year + '-' + self.addZero(month) + '-' + self.addZero(date) + '   ' 
          + self.addZero(hour) + ':' +  self.addZero(minute) + ':' +  self.addZero(second));
      },

      dataHandling: function(json) {
        let self = this;
        if(!json.data) {
          self.noData = true; 
          return false;
        }
        if(!json.data.coupons) {
          self.noData = true;   
          return false;       
        }
        if(json.data.tip) {
          self.tip = json.data.tip;
          self.showTip = true;
        }

        json.data.coupons.forEach(function(item, i) {
          item.startTime = self.parseTime(item.startTime);
          item.endTime = self.parseTime(item.endTime);
        });          
        self.coupons = json.data.coupons;
      }
    },
    created: function () {
      let self = this;    
      
      self.setListHeight();
    },
    mounted: function() {
      var self = this;

      shopBase.setTitle('我的卡券');
      shopBase.showLoading('加载中');
      self.requset();
    }

  }
</script>

