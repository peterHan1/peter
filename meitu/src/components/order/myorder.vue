<template lang="html">
  <div class="order-page">
    <mt-header title="我的订单">
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="tab-nav">
      <ul class="nav">
        <li  class="item active" >
          <router-link to='/allorder'>
            <span @click="changeView"class="txt active">全部</span>
          </router-link>
        </li>
        <li  class="item">
          <router-link to='/notPaid'>
            <span @click="changeView" class="txt">待付款</span>
          </router-link>
        </li>
        <li class="item">
          <router-link to='/delivered'>
            <span @click="changeView" class="txt">待收货</span>
          </router-link>
        </li>
        <li class="item">
          <router-link to='/success'>
            <span @click="changeView"  class="txt">已收货</span>
          </router-link>
        </li>
      </ul>
    </div>
    <allOrder v-if="show"></allOrder>
    <router-view></router-view>
  </div>
</template>

<script>
import allOrder from './allorder'
export default {
  data() {
    return {
      show: true
    }
  },
  computed: {
    products  () {
      return this.$store.state.cart.cartList
    }
  },
  methods: {
    changeView: function (e) {
      // console.log(e)
      this.show = false
      document.querySelector('.active').classList.remove('active')
      if(!e.target.classList.contains('active')){
        e.target.classList.add('active')
      }
    }
  },
  components: {
    allOrder
  }
}
</script>

<style lang="css" scoped>
.tab-nav {
  width: 100%;
  height: 4rem;
  background-color: #fff;
  margin-top: 1rem;
}
.tab-nav .nav {
  display: flex;
}
.tab-nav .nav .item {
  width: 25%;
  height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  position: relative;
}
.tab-nav .nav .item .txt.active:after{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #f55669;
}
.tab-nav .nav .item .txt.active{
  color: #f55669;
}
.tab-nav .nav .item .txt{
  display: block;
  color: #3c363e;
  height: 4rem;
  line-height: 4rem;
}

</style>
