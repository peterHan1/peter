<template lang="html">
  <div class="pay-page">
    <mt-header title="等待支付">
      <router-link to="/checkorder" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/user' slot="right">
        <span class="userhome"></span>
      </router-link>
    </mt-header>
    <div class="account-box">
      <router-link to='/checkorder'>
        <span class="order-info">订单详情</span>
      </router-link>
      <p class="label">请支付(元)</p>
      <p class="total_price">{{total_price}}.00</p>
    </div>
    <div class="pay-methods">
      <h3 class="title">付款方式</h3>
      <ul class="methods">
        <li class="method">
          <div class="left">
            <i class="icon alipay"></i>
            <span class="payName">支付宝</span>
          </div>
          <div class="right">
            <i @click="selectPayWay" class="selectWay selected"></i>
          </div>
        </li>
        <li class="method">
          <div class="left">
            <i class="icon wxpay"></i>
            <span class="payName">微信支付</span>
          </div>
          <div class="right">
            <i @click="selectPayWay"class="selectWay"></i>
          </div>
        </li>
      </ul>
    </div>
    <div class="pay-btn">
      <router-link to='/myorder'>
        <span @click="payMoney" class="text">立即支付</span>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  computed: {
    total_price() {
      this.$store.commit('TotalPrice')
      let total_price =this.$store.state.cart.cartInfos.total_price
      return total_price
    }
  },
  methods: {
    selectPayWay: function (e) {
      document.querySelector('.selected').classList.remove('selected')
      if(!e.target.classList.contains('selected')){
        e.target.classList.add('selected')
      }
    },
    payMoney: function () {
      this.$toast({
        message: '支付成功',
        iconClass: 'icon-success',
        duration: 1000
      })
      this.$store.commit('CREATE_ORDER')
      // console.log(this.$store.state.cart.orderList)
      this.$store.commit('UPDATE_CART')
    }
  }
}
</script>

<style lang="css" scoped>
.userhome {
  width: 2.2rem;
  height: 2.2rem;
  display: block;
  background: url(../../assets/images/iconHome.png) no-repeat;
  background-size: cover;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.account-box{
  width: 100%;
  background: url(http://img1.app.meitudata.com/meitushop/v4/mobile_img/account.png?v=20160923101650) no-repeat;
  position: relative;
  padding: 3rem 1rem;
  box-sizing: border-box;
}
.account-box .label {
  color: #fff;
  font-size: 1.6rem;
  margin-bottom: 1rem;
}
.account-box .total_price {
  font-size: 3.4rem;
  color: #fef7c8;
}
.account-box .order-info {
  position: absolute;
  right: 1rem;
  top: 1rem;
  color:#fed0c8;
  font-size: 1.4rem;
}
.pay-methods {
  width: 100%;
}
.method {
  display: flex;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  position: relative;
  justify-content: center;
  align-items: center;
}
.method:first-child:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #ccc;
}
.method .left {
  flex:1;
}
.left .icon {
  width: 2.5rem;
  height: 2.5rem;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 2rem;
  margin-right: 1rem;
  vertical-align: middle;
}
.alipay {
  background: url(../../assets/images/支付宝.png);
}
.wxpay {
  background: url(../../assets/images/微信支付.png);
}
.left .payName {
  font-size: 1.6rem;
}
.right .selectWay {
  width: 1.6rem;
  height: 1.6rem;
  display: block;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 1rem;
}
.selected{
  background: #f55669 url(../../assets/images/selected.png) no-repeat;
  background-size: cover;
}
.pay-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: #f55669;
}
.pay-btn .text {
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 4rem;
  display: block;
  margin: 0 auto;
}
</style>
