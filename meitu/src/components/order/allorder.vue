<template lang="html">
  <div class="">
    <noOrder v-if="total_nums === 0"></noOrder>
    <div class="order-wrapper" v-if="total_nums > 0">
      <div class="head">
        <p class="desc">共
          <span class="goodsNum">{{total_nums}}</span>
          件商品
        </p>
      </div>
      <div class="order-list">
        <ul class="order" v-for="product in products">
          <li class="item" v-if="product.selected">
            <div class="item-left">
              <img :src="product.imgSrc" alt="">
            </div>
            <div class="item-right">
              <p class="product-title">{{product.title}}</p>
              <p class="product-type">{{product.type}}</p>
              <p class="product-price">￥{{product.price}}</p>
              <p class="product-perNum">x {{product.perNum}}</p>
            </div>
          </li>
        </ul>
        <div class="foot">
          <p class="desc">支付: ￥{{total_price}}</p>
          <span class="paid">已支付</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noOrder from './noOrder'
export default {
  computed : {
    products () {
      return this.$store.state.cart.orderList
    },
    total_nums() {
      return this.$store.state.cart.orderInfos.good_num
    },
    total_price() {
      return this.$store.state.cart.orderInfos.order_price
    }
  },
  components: {
    noOrder
  }

}
</script>

<style lang="css">
.order-wrapper {
  width: 100%;
  margin-top: 2rem;
}
.order-wrapper .head {
  width: 100%;
}
.order-wrapper .head .desc{
  font-size: 1.6rem;
}
.head .desc .goodsNum{
  color: #f55669;
}
.order-wrapper .foot {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}
.order-wrapper .foot .desc {
  flex:1;
  font-size: 1.6rem;
  color: #333;
}
.order-wrapper .foot .paid {
  width: 6rem;
  height: 3rem;
  margin-right: 2rem;
  border-radius: .5rem;
  background: #f55669;
  color: #fff;
  text-align: center;
  font-size: 1.6rem;
  line-height: 3rem;
}
.order-list{
  width: 100%;
  margin-top: 1rem;
}
 .order-list .order {
   width: 100%;
   position: relative;
 }
 .order-list .order:after {
   content: '';
   position: absolute;
   left: 0;
   right: 0;
   bottom: 0;
   height: 1px;
   background: #cacaca;
 }
 .order-list .order p {
   width: 100%;
   text-align: left;
 }
 .order-list .order .item {
   background-color: #fff;
   display: flex;
   padding: 1rem;
   box-sizing: border-box;
 }
 .order-list .order .item .item-left img{
   width: 8rem;
   height: 8rem;
 }
 .order-list .order .item .item-right {
   flex: 1;
 }
 .order .item .item-right p {
   line-height: 2;
   text-align: right;
 }
 .order .item .item-right .product-title {
   font-size: 1.6rem;
 }
 .order .item .item-right .product-type{
   font-size: 1.4rem;
   color: #bbb;
 }
 .order .item .item-right .product-price {
   font-size: 1.6em;
   color: #f55669;
 }
</style>
