<template lang="html">
<div class="order-page">
  <mt-header title="提交订单">
    <router-link to="/cart" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
  </mt-header>
  <div class="address-box">
    <router-link to="/address" >
      <p v-show="hasAddress" class="message">没有收货地址哦，赶快创建一个吧</p>
      <div class="nameTel">
        <span class="username">{{username}}</span>
        <span class="tel">{{tel}}</span>
      </div>
      <div v-show="!hasAddress" class="address">
        <i class="icon locate"></i>
        <p class="address">{{address}}</p>
      </div>
    </router-link>
  </div>
  <div class="buy-list">
    <ul class="list" >
      <li class="item" v-for="product in products" v-if="product.selected">
        <div class="item-left">
          <img :src="product.imgSrc" alt="">
        </div>
        <div class="product-info">
          <p class="product-title">{{product.title}}</p>
          <p class="product-type">{{product.type}}</p>
        </div>
        <div class="right">
          <P class="product-price">￥{{product.price}}</P>
          <span class="product-num">x{{product.perNum}}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="row">
    <p class="text">配送方式:</p>
    <span class="text">
      手机顺丰包邮<br>其他配件申通/圆通满99元包邮
    </span>
  </div>
  <div class="row">
    <p class="text">发货时间:</p>
    <span class="text">
      付款后72小时内发货(预售商品除外)
    </span>
  </div>
  <div class="total-box">
    <ul class="total">
      <li class="item">
        <p class="desc">商品总额</p>
        <span class="text-value">￥{{total_price}}</span>
      </li>
      <li class="item">
        <p class="desc">运费</p>
        <span class="text-value postage">包邮</span>
      </li>
      <li class="item">
        <p class="desc">优惠折扣</p>
        <span class="text-value">无</span>
      </li>
    </ul>
  </div>
  <div class="basebar">
    <div class="item">
      <p class="total_price">应付总额<span class="price">￥{{total_price}}</span></p>
    </div>
    <div class="item">
      <router-link to='/payment'>
        <span  class="btn submit">提交订单</span>
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
    username() {
      return localStorage.getItem('username')
    },
    tel() {
      return localStorage.getItem('tel')
    },
    address() {
      let address = localStorage.getItem('pca') + localStorage.getItem('address')
      return address
    },
    products () {
      return this.$store.state.cart.cartList
    },
    total_price () {
      this.$store.dispatch('totalprice')
      let total_price = this.$store.state.cart.cartInfos.total_price
      return total_price
    },
    hasAddress() {
      if( localStorage.getItem('username')) {
        return false
      } else {
        return true
      }
    }
  }

}
</script>

<style lang="css" scoped>
.address-box {
  width: 100%;
  background-color: #fff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding: 2rem;
  box-sizing: border-box;
}
.address-box .message {
  font-size: 1.6rem;
  padding: 2rem;
  text-align: center;
  box-sizing: border-box;
}
.nameTel {
  display: flex;
}
.buy-list {
  width: 100%;
}
.buy-list .list .item {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
}
.buy-list .list .item:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #cecece;
}
.buy-list .list .item .product-info{
  flex:1;
  text-align: left;
}
.buy-list .list .item .product-type{
  color: #999;
  font-size: 1.4rem;
  margin-top: 1rem;
}
.buy-list .list .item .product-price {
  color: #f55669;
  font-size: 1.4rem;
}
.buy-list .list .item .product-perNum {
  color: #ccc;
  font-size: 1.4rem;
}
.buy-list .list .item .product-title {
  font-size: 1.6rem;
  font-weight: 500;
}
.buy-list .list .item .right {
  width: 5rem;
}
.row {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  display: flex;
  margin-top: 1rem;
  align-items: center;
}
.row .text:first-child {
  margin-left: 2rem;
  margin-right: 3rem;
}
.row .text {
  font-size: 1.4rem;
  color: #3c363e;
}
.total-box {
  width: 100%;
}

.total-box .total{
  padding: 2rem;
  box-sizing: border-box;
}
.total-box .total .item {
  display: flex;
  height: 3rem;
}
.total-box .total .item .desc{
  flex:1;
}
.total-box .total .item .postage {
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  display: block;
  background: #5cbb32;
  color: #fff;
  border-radius: 5px;
  text-align: center;
}
.basebar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.basebar .item:first-child {
  flex:1;
}
.basebar .item .total_price {
  text-align: center;
  font-size: 1.6rem;
}
.total_price .price {
  color: #f55669;
  font-size: 1.8rem;
}
.basebar .item .submit{
  width: 10rem;
  height: 5rem;
  line-height: 5rem;
  display: block;
  background-color: #f55669;
  color: #fff;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
}
.username,.tel {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 1rem;
}
.username {
  margin-right: 10rem;
  margin-left: 1.4rem;
}
a{
  text-align: left ;
}
.address {
  display: flex;
}
.address .locate {
  width: 1.6rem;
  height: 1.5rem;
  display: inline-block;
  background: url(../../assets/images/location.png) no-repeat;
  background-size: cover;
}
.address .address {
  display: inline-block;
  font-size: 1.4rem;
  color: #333;
  margin-left: 1rem;
}
</style>
