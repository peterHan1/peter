<template lang="html">
  <div class="cart-page">
    <mt-header title="购物车">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="cart-list">
      <router-link to='/goods'>
        <p v-show="descShow" class="cart-desc">购物车中还没有东西,现在去挑选吧~</p>
      </router-link>
      <div class="product-wrapper">
        <ul class="products-list" >
          <li class="item" v-for="(product, index) in products">
            <div class="item-left">
              <i :id="product.id" @click="selectOne" class="icon select" v-bind:class="{selected:product.selected}"></i>
              <img :src="product.imgSrc" alt="">
            </div>

            <div class="product-info">
              <p class="product-title">{{product.title}}</p>
              <p class="product-type">{{product.type}}</p>
              <p class="product-price">￥{{product.price}}</p>
              <span @click="sub" :id="product.id" class="sub">-</span>
              <span class="perNum">{{product.perNum}}</span>
              <span @click="add" :id="product.id" class="add">+</span>
            </div>
            <div class="operate">
              <i :id="product.id" @click="controlInform" class="icon delete"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-basebar">
      <div class="selectAll">
        <div class="select-left">
          <i @click="selectAll" class="icon select" v-bind:class="{selected: isSelected}"></i>
          <span >全选</span>
        </div>
        <div class="select-right">
          <p class="price-total">合计：¥
            <span class="price-number">{{total_price}}</span>
          </p>
        </div>
      </div>
      <div class="pay-box">
        <router-link :to="goPath">
          <span @click="submitOrder" class="topay-btn active">去结算</span>
        </router-link>
      </div>
    </div>
    <div v-show="informShow" class="inform-modal"></div>
    <div v-show="informShow" class="delete-inform">
      <div class="dialog">
        <div class="head">
          <p class="title">提示</p>
          <span @click="controlInform" class="close">X</span>
        </div>
        <div class="content">
          <span class="img"></span>
          <p class="message">商品很抢手,确定要删除吗</p>
        </div>
        <div class="foot">
          <span  @click="deleteProduct" class="btn sure">确定</span>
          <span @click="controlInform" class="btn return">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSelected: false,
      informShow: false
    }
  },
  computed : {
    descShow () {
      if(this.$store.state.cart.cartList.length > 0) {
        return false
      } else {
        return true
      }
    },
    products () {
      return this.$store.state.cart.cartList
    },
    total_price () {
      this.$store.dispatch('totalprice')
      let total_price = this.$store.state.cart.cartInfos.total_price
      return total_price
    },
    goPath () {
      if(!this.$store.state.cart.login) {
        return '/login'
      } else {
        return '/checkorder'
      }
    }
  },
  methods: {
    selectOne: function (e) {
      let id = e.target.id
      document.querySelector('.pay-box').style.backgroundColor = '#f55669'
      this.$store.dispatch('check_cart', id)
      this.$store.dispatch('change_state')
    },
    selectAll: function () {
      if(!this.isSelected) {
        this.$store.dispatch('change_all_state')
        this.isSelected = true
        document.querySelector('.pay-box').style.backgroundColor = '#f55669'
      }else {
      this.isSelected = false
      document.querySelector('.pay-box').style.backgroundColor = '#a2a0a3'
      }
    },
    deleteProduct: function (e) {
      const id = localStorage.getItem('id')
      this.$store.commit('DELETE_CART', id)
      this.informShow = ! this.informShow
    },
    controlInform: function (e) {
      const id = e.target.id
      console.log(id)
      localStorage.setItem('id', id)
      this.informShow = ! this.informShow
    },
    sub: function (e) {
      let Id = e.target.id
      console.log(e.target.id)
      if (document.querySelector('.perNum').innerHTML <= 1) {
        return
      } else {
        this.$store.dispatch('check_cart',Id)
        this.$store.dispatch('reduce_cart')
      }
    },
    add : function (e) {
      let goodId = e.target.id
      this.$store.dispatch('check_cart', goodId)
      this.$store.dispatch('add_cart')
      console.log(this.$store.state.cart.curIndex)
    },
    submitOrder: function (e) {
      if(this.$store.state.cart.cartList.length === 0) {
        e.preventDefault()
        this.$toast({
          message: '购物车空空如也~',
          position: 'top',
          duration: 1000
        })
      } else {
        if(!this.$store.state.cart.login) {
          this.$toast({
            message: '请先登录,再提交订单',
            position: 'top',
            duration: 5000
          })
        }
      }
      if(!document.querySelector('.selected')) {
        this.$toast({
          message: '你还没有选中要支付的宝贝哦~',
          position: 'top',
          duration: 5000
        })
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="css" scoped>
.cart-list {
  width: 100%;
  background-color: #fff;
  text-align: center;
  margin-top: 1rem;
}
 .cart-desc {
   height: 40rem;
   padding-top: 5rem;
   color: #333 ;
   font-size: 1.4rem;
}
.cart-basebar {
  width: 100%;
  height: 5rem;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
}
.cart-basebar .selectAll {
  flex:1;
  display: flex;
  background-color: #fff;
}
.selectAll .select-left{
  flex:1;
  width: 11rem;
  height: 100%;
  text-align: center;
  font-size: 1.4rem;
}
.selectAll .select-left .select,.products-list .item .item-left .select {
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 auto;
  margin-top: 1rem;
  border: 1px solid #a2a0a3;
  border-radius: 50%;
}
.selected {
  background: #fc3c60 url(../../assets/images/selected.png) no-repeat;
  background-size: cover;
}
.select-right {
  font-size: 1.4rem;
  padding-right: .5rem;
  box-sizing: border-box;
}
.pay-box{
  width: 11rem;
  height: 100%;
  line-height: 5rem;
  background: #a2a0a3;
  text-align: center;
}
.pay-box .topay-btn  {
  width: 100%;
  font-size: 2rem;
  color: #fff;
}
.product-wrapper {
  width: 100%;
  margin-bottom: 5rem;
}
.products-list {
  width: 100%;
}
.products-list .item{
  width: 100%;
  display: flex;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
  -webkit-transition: all 1s ease-in-out;
  transition: all 1s ease-in-out;
}
.products-list .item:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: .1rem;
  background-color: #bfbfbf;
}
.products-list .item .item-left {
  display: flex;
  margin-right: 1rem;
}
.products-list .item img {
  width: 6rem;
  height: 6rem;
  display: block;
}
.products-list .item .product-info {
  flex:1
}
 .product-info .product-title {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: left;
  line-height: 2;
}
.product-info .product-type {
  color: #a2a0a3;
  font-size: 1.2rem ;
  line-height: 2;
  text-align: left;
}
.product-info .product-price {
  color: #f55669;
  text-align: left;
  font-size: 1.4rem;
  line-height: 2;
}
.product-info .perNum {
  margin: 0 1.5rem;
  display: inline-block;
}
.product-info .add, .sub {
  width: 2rem;
  height: 2rem;
  border: 1px solid #bfbfbf;
  color: #bfbfbf;
  font-size: 1.6rem;
  display: inline-block;
}
.operate .delete {
  width: 2.2rem;
  height: 2.2rem;
  display: block;
  background: url(../../assets/images/delete.png) no-repeat;
  background-size: cover;
}
.inform-modal {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #000;
  opacity: .3;
  z-index: 999;
}
.delete-inform {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
.delete-inform .dialog {
  width: 26rem;
  /*margin-left: 2.5rem;*/
  margin: 0 auto;
  background: #fff;
  margin-top: 20rem;
}
.dialog .head {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  position: relative;
}
.dialog .head:after,.content:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #cecece;
}
.dialog .head .title {
  color: #3c3c3c;
  font-size: 1.6rem;
  text-align: center;
}
.dialog .head .close {
  color: #000;
  font-size: 1.6rem;
  position: absolute;
  display: inline-block;
  top: 0;
  right: 1rem;
}
.dialog .content {
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dialog .content .img {
  margin-top: 1rem;
  margin-left: 2rem;
  width: 6rem;
  height: 6rem;
  display: block;
  background: url(../../assets/images/informbg_03.png) no-repeat;
  background-size: cover;
}
.dialog .content .message {
  color: #333;
  font-size: 1.6rem;
  margin-left: 1rem;
  margin-right: 1rem;
  text-align: left;
}
.dialog .foot {
  display: flex;
  width: 100%;
  height: 4rem;
}
.dialog .foot .btn {
  width: 50%;
  display: block;
  text-align: center;
  font-size: 1.6rem;
  line-height: 4rem;
}
.dialog .foot .btn:first-child {
  position: relative;
}
.dialog .foot .btn:first-child:after {
  position: absolute;
  content:'';
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  background-color: #cecece;
}

</style>
