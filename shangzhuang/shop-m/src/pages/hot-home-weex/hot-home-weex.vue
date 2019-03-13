<template>
<scroller class="page" :style="{height: listHeight + 'px'}">
  <div>
      <slider class="slider" auto-play="true" interval="3000">
        <div class="slider-wrap" v-for="banner in bannerList">
          <a v-if="showSlider" :href="banner.url">
            <image class="slider-img" resize="cover" :src="banner.pic"></image>
          </a>
          <image v-else class="slider-img" resize="cover" :src="banner.pic"></image>
        </div>
        <indicator class="indicator" style="display: none"></indicator>
      </slider>
      <div class="adv-area">

        <a v-if="isNative" :href="'/shop/activityExposure/hotmaterialWeex.html'">
          <div class="adv-main">
            <div class="adv-title">
              <text class="adv-title-text">达人店最新推广素材</text>
            </div>
            <div class="adv-desc">
              <text class="adv-desc-text">快来围观吧>></text>
            </div>
            <image class="adv-arr" resize="cover" :src="arrImg"></image>
            <image class="adv-img" resize="cover" :src="advImg"></image>
          </div>
        </a>
        <div v-else class="adv-main">
          <div class="adv-title">
            <text class="adv-title-text">达人店最新推广素材</text>
          </div>
          <div class="adv-desc">
            <text class="adv-desc-text">仅在app上可以使用哦</text>
          </div>
          <image class="adv-img" resize="cover" :src="advImg"></image>
        </div>
      </div>
  </div>
  <div v-for="module in moduleList">
    <div class="goods-area">
      <div class="goods-title">
        <text class="goods-title-line">—</text>
        <text class="goods-title-text">{{module.mainTitle}}</text>
        <text class="goods-title-line">—</text>
      </div>
      <div class="goods-desc">
        <text class="goods-desc-text">{{module.subHead}}</text>
      </div>
        <scroller class="goods-scroller" scrollDirection="horizontal">
          <div class="goods-container" v-for="sku in module.skuInfos">
          <!-- <a :href="'/shop/sku/'+(sku.skuId)+'.html?shopId='+module.shopId"> -->
          <div @click="goodsDetailAction(sku.skuId, module.shopId)">
            <image class="goods-img" resize="cover" :src="sku.imgUrl+'.300x300.png'"></image>
            <div class="goods-name">
              <text class="goods-name-text" lines="1">[{{sku.brand}}]{{sku.skuName}}</text>
            </div>
            <div class="goods-price">
              <text class="goods-price-unit">￥</text>
              <text class="goods-price-text">{{sku.shopPrice}}</text>
            </div>
            <div class="goods-comm">
              <text class="goods-comm-text">赚￥{{sku.commission}}</text>
            </div>
          </div>
          <!-- </a> -->
          </div>
          <a :href="'/shop/activityExposure/hotRecommendWeex.html?type='+module.type">
            <div class="all-container">
              <div class="all-area">
                <text class="all-title-text">查看全部</text>
                <text class="all-desc-text">SEE ALL</text>
              </div>
            </div>
          </a>
        </scroller>
    </div>
  </div>
</scroller>
</template>

<style scoped>
  .page {
    background-color: rgb(243, 243, 243);
  }
  .slider {
    position: relative;
    flex-direction: row;
    width: 750px;
    height: 375px;
  }
  .slider-wrap {
    position: relative;
    width: 750px;
    height: 375px;
  }
  .slider-img {
    width: 750px;
    height: 375px;
  }
  .indicator {
    display: -webkit-flex;
    display: flex;
    position: absolute;
    width: 750px;
    height: 375px;
    top: 173px;
    item-size: 10px;
    item-color: rgba(255, 255, 255, 0.50);
    item-selectedColor: #fff;
  }
  .banner {
    position: relative;
    flex-direction: row;
    width: 750px;
    height: 375px;
  }
  .banner-img {
    width: 750px;
    height: 375px;
  }
  .adv-area {
    width: 750px;
    height: 200px;
    margin-bottom: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .adv-img {
    position: absolute;
    top: -20px;
    left: 10px;
    width: 150px;
    height: 140px;
  }
  .adv-main {
    width: 540px;
    height: 120px;
    padding-left: 58px;
    background-color: rgb(243, 243, 243);
    border-radius: 60px;
  }
  .adv-title {
    flex-direction: row;
    align-content: center;
    justify-content: center;
    margin-top: 26px;
    width: 540px;
    height: 36px;
  }
  .adv-title-text {
    text-align: center;
    color: rgb(77, 77, 77);
    font-size: 28px;
  }
  .adv-desc {
    flex-direction: row;
    align-content: center;
    justify-content: center;
    margin-top: 10px;
    height: 30px;
    width: 540px;
  }
  .adv-desc-text {
    text-align: center;
    font-size: 24px;
    color: rgb(249, 52, 80);
  }
  .adv-arr {
    position: absolute;
    width: 15px;
    height: 30px;
    right: 40px;
    top: 45px;
  }
  .goods-area {
    margin-top: 10px;
    width: 750px;
    height: 552px;
    background-color: #fff;
  }
  .goods-title {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 32px;
  }
  .goods-title-text {
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    font-size: 36px;
    color: rgb(51, 51, 51);
  }
  .goods-title-line {
    margin-top: -2px;
    font-size: 36px;
    color: rgb(204, 204, 204);
  }
  .goods-desc {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .goods-desc-text {
    font-size: 24px;
    text-align: center;
    color: rgb(153, 153, 153);
  }
  .goods-scroller {
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 30px;
    width: 750px;
    height: 402px;
  }
  .goods-container {
    margin-left: 5px;
    margin-right: 5px;
    width: 210px;
  }
  .goods-img {
    width: 210px;
    height: 210px;
  }
  .goods-name {
    flex-direction: row;
    align-items: left;
    justify-content: center;
    margin-top: 15px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .goods-name-text {
    lines: 1;
    font-size: 24px;
    width: 190px;
    color: rgb(77, 77, 77);
    text-overflow: ellipsis;
  }
  .goods-price {
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-top: 18px;
    height: 28px;
  }
  .goods-price-unit {
    font-size: 20px;
    color: rgb(249, 52, 80);
  }
  .goods-price-text {
    font-size: 28px;
    color: rgb(249, 52, 80);
  }
  .goods-comm {
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    margin-top: 8px;
    height: 44px;
  }
  .goods-comm-text {
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 24px;
    text-align: center;
    color: rgb(255, 127, 147);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(255, 127, 147);
    padding-right: 16px;
    padding-left: 16px;
  }
  .all-title-text {
    font-size: 28px;
    color: rgb(26, 26, 26);
    text-align: center;
  }
  .all-container {
    margin-left: 5px;
    margin-right: 5px;
    width: 210px;
    height: 352px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(243, 243, 243);
  }
  .all-area {
    width: 116px;
    height: 65px;
  }
  .all-desc-text {
    margin-top: 4px;
    padding-top: 4px;
    font-size: 24px;
    color: rgb(179, 179, 179);
    text-align: center;
    border-top-width: 2px;
    border-color: rgb(230, 230, 230);
    border-style: solid;
    border-left: none;
    border-right: none;
    border-bottom: none;
  }

</style>

<script>

  var stream = weex.requireModule('stream');
  var dialog = weex.requireModule('shopModal');
  var shopBase = weex.requireModule('shopBase');

  export default {
    data: function() {
      return {
        arrImg: '//cdn1.showjoy.com/images/97/9796a887ac2b491698cae440fbdb5877.png',
        listHeight: 300,
        isNative: true,
        showSlider: false,
        advImg: '//cdn1.showjoy.com/images/66/66a4c388b4684d63b03983da5cb8f180.png.200x200.png',
        noBannerImg: '//cdn1.showjoy.com/images/6f/6f63940a2ad34905be0c228d965cef62.jpg.750x375.jpg',
        bannerList: [
            {
              "pic": "//cdn1.showjoy.com/images/6f/6f63940a2ad34905be0c228d965cef62.jpg.750x375.jpg"
            }
        ],
        moduleList: [

        ]
      }
    },
    methods: {
      setListHeight: function() {
        let self = this;
        let deviceHeight = parseInt(weex.config.env.deviceHeight);
        let rate = weex.config.env.deviceWidth / 750;
        let deviceScale = weex.config.env.scale;

       if (weex.config.env.platform.toLowerCase() === 'web') {
          self.isNative = false;
          self.listHeight = parseInt(weex.config.env.deviceHeight / rate) - 122;
        } else {
          self.listHeight = (deviceHeight - ((64 + 50) * deviceScale)) / rate;
        }

      },

      getData: function() {
        let self = this;
        let bannerApi = '/api/shop/activityExposure/banners';
        let moduleApi = '/api/shop/activityExposure/sku?size=6';
        // let bannerApi = './data.json';
        // let moduleApi = './module.json';

        stream.fetch({
          method: 'GET',
          type: 'json',
          url: bannerApi
        }, function(res) {
          if(res.ok) {
            if(res.data.isSuccess === 1) {
              if(res.data.data.length > 0) {
                self.showSlider = true;
                self.bannerList = res.data.data;
              }
            } else {
              dialog.toast({ message: '小店被挤爆啦! 请稍后再试~'});
            }
          } else {
            dialog.toast({ message: '小店被挤爆啦! 请稍后再试~'});
          }
        });

        stream.fetch({
          method: 'GET',
          type: 'json',
          url: moduleApi,
          data: {
            size: 6
          }
        }, function(res) {
          shopBase.hideLoading();
          if(res.ok) {
            if(res.data.isSuccess === 1) {
              self.moduleDataHandling(res.data.data);
            } else {
              dialog.toast({ message: '小店被挤爆啦! 请稍后再试~'});
            }

          } else {
            dialog.toast({ message: '小店被挤爆啦! 请稍后再试~'});
          }
        });
      },

      moduleDataHandling: function(json) {
        let self = this;
        json.forEach(function(item) {
          item.skuInfos.forEach(function(sku) {
            sku.commission = parseFloat(sku.commission).toFixed(2);
            sku.shopPrice = parseFloat(sku.shopPrice).toFixed(2);
            sku.originalPrice = parseFloat(sku.originalPrice).toFixed(2);
          });
        });

        self.moduleList = json;
      },

      init: function() {
        let self = this;
        self.showSlider = true;

        self.setListHeight();
        self.getData();
      },
      //商品详情
      goodsDetailAction: function(skuId, shopId) {
        shopBase.userTrack({key:'home_hot_detail', params:{}});
        let url = '/shop/sku/' + skuId + '.html?shopId=' + shopId;
        shopBase.openUrl(url);
      },
    },
    created() {
      let self = this;
      shopBase.setTitle('活动首页');
      shopBase.showLoading('加载中');
      self.init();
    }
  }
</script>
