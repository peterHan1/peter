<template lang="html">
  <div class="user-page">
    <mt-header title="个人中心">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="user-info">
      <div class="avatar">
      </div>
      <div class="loginInfo">
        <p class="nickname">mt_zsq</p>
        <p class="userId">UID:666666</p>
      </div>
      <i class="icon goto"></i>
    </div>
    <div class="flowNav">
      <ul class="nav">
        <li class="nav-item">
          <router-link to='/myorder'>
            <i v-show="hasOrder" class="order-number">{{orderNum}}</i>
            <i class="icon orders"></i>
            <p class="item-name">全部订单</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to=''>
            <i class="icon paying"></i>
            <p class="item-name">待付款</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to=''>
            <i class="icon trunk"></i>
            <p class="item-name">待收货</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to=''>
            <i class="icon received"></i>
            <p class="item-name">已收货</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="menu-list">
      <mt-cell title="我的代金券" is-link>
        <i slot="icon" class="icon jq"></i>
      </mt-cell>
      <mt-cell title="我的预约" is-link to='/book'>
        <i slot="icon" class="icon yy"></i>
      </mt-cell>
      <mt-cell title="VIP会员" is-link>
        <i slot="icon" class="icon vip"></i>
      </mt-cell>
      <mt-cell title="服务与支持" is-link>
        <i slot="icon" class="icon support"></i>
      </mt-cell>
      <mt-cell title="收货地址" is-link>
        <i slot="icon" class="icon address"></i>
      </mt-cell>
      <mt-cell title="退出登录">
        <i slot="icon"  @click="logout" class="icon logout"></i>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasOrder: false
    }
  },
  mounted() {
    if(this.$store.state.cart.order_num > 0) {
      this.hasOrder = true
    } else {
      this.hasOrder = false
    }
  },
  computed: {
    orderNum () {
      return this.$store.state.cart.order_num
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      history.go(-1)
    },
    toBook: function() {
      console.log('111')
      this.$router.push({path:'/book'})
    }
  }
}
</script>

<style lang="css" scoped>
.mint-cell-title {
  display: inline-block !important;
}
.user-info {
  width: 100%;
  height: 9rem;
  background-color: #fff;
  margin-top: 1rem;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.user-info .avatar {
  width: 6rem;
  height: 6rem;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin: auto .5rem;
  background: url(../../assets/images/avatar.jpg) center center no-repeat;
  background-size:cover;
}
.user-info .loginInfo{
  margin:auto 0;
  flex: 1;
}
.user-info .loginInfo .nickname,.userId {
  font-size: 1.6rem;
}
.flowNav {
  width: 100%;
  height: 10rem;
  background-color: #fff;
}
.nav {
  display: flex;
}
.nav .nav-item {
  padding: 2rem 0;
  width: 25%;
  height: 100%;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  position: relative;

}
.nav .nav-item .item-name {
  text-align: center;
}
.nav .nav-item .icon {
  width: 2.5rem;
  height: 2.5rem;
  display: block;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
}
.orders {
  background: url(../../assets/images/order.png);
}
.paying {
  background: url(../../assets/images/代付款.png);
}
.trunk{
  background: url(../../assets/images/trunk.png);
}
.received {
  background: url(../../assets/images/收货.png);
}
.nav .nav-item  .item-name {
  font-size: 1.6rem;
  color: #333;
  margin-top: .5rem;

}
.menu-list {
  margin-top: 1rem;
}
.mint-cell {
  width: 100%;
  height: 5rem;
  justify-content: center;
  align-items: center;
}
.mint-cell-title {
  margin-top: 1rem;
}
.mint-cell-text {
  display: inline-block;
}
.mint-cell .icon {
  width: 2rem;
  height: 2rem;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.jq {
  background: url(../../assets/images/代金券.png);
}
.yy {
  background: url(../../assets/images/预约.png);
}
.vip {
  background: url(../../assets/images/vip.png);
}
.support {
  background: url(../../assets/images/笑脸.png);
}
.address {
  background: url(../../assets/images/location.png);
}
.logout {
  background: url(../../assets/images/logout.png);
}
.order-number {
  position: absolute;
  right:1rem;
  top: 1rem;
  width: 1.8rem;
  height: 1.8rem;
  display: block;
  border-radius: 50%;
  background: #f55669;
  color: #fff;
  text-align: center;
  line-height: 1.8rem;
  font-size: 1.6rem;
}
</style>
