<template lang="html">
  <div class="summary">
    <div class="info-wrapper">
      <img class="img" src="http://img1.app.meitudata.com/meitushop/v4/mobile_img/m8/hellokitty/mt-m8-hk.png?v=201704281757" alt="">
      <p class="desc">64GB | ￥2799</p>
      <router-link class="rushBtn" to='/rush'>立即抢购</router-link>
    </div>
    <div class="info-more">
      <h2 class="main-title">
        美图M8 Hello Kitty特别版，
        <br>可爱与时尚的完美碰撞。
      </h2>
      <p class="desc">美图手机第四次携手Hello Kitty官方，推出美图M8<br>Hello Kitty特别版，一举萌化你的心。</p>
    </div>
    <div class="look-info">
      <img src="http://img1.app.meitudata.com/meitushop/v4/mobile_img/m8/hellokitty/m8-hk-tit.png?v=201705040939" alt="" class="img">
      <p class="desc">白色纯真可爱，粉色青春无敌，再搭配不同的Hello<br>Kitty造型，让你无法抗拒它的魅力。</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.info-wrapper {
  width: 100%;
  padding-top: 3rem;
  height: 50rem;
  background: url(http://img1.app.meitudata.com/meitushop/v4/mobile_img/m8/hellokitty/bg-1.jpg?v=201705031820) no-repeat;
  background-size:cover;
  box-sizing: border-box;
}
 .img {
  display: block;
  width: 20rem;
  margin: 0 auto;
  margin-bottom: 1rem;
}
.info-wrapper .desc {
  text-align: center;
  font-size: 1.8rem;
  color: #000;
  font-weight: 500;
}
.info-wrapper .rushBtn {
  width: 10rem;
  height: 3rem;
  line-height: 3rem;
  display: block;
  margin: 0 auto;
  color: #fff;
  background: #ff6495;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.4rem;
}
.info-more {
  width: 100%;
  height: 50rem;
  background: url(http://img1.app.meitudata.com/meitushop/v4/mobile_img/m8/hellokitty/bg-3.jpg?v=201705031820) no-repeat;
  background-size: cover;
  padding-top: 3rem;
  box-sizing: border-box;
}
.info-more .main-title {
  color: #ff6495;
  text-align: center;
  font-size: 2.5rem;
  font-weight: normal;
}
.desc {
  text-align: center;
  margin-top: 2rem;
  color: #666;
  font-size: 1.4rem;
}
.look-info {
  width: 100%;
  height: 50rem;
  background: url(http://img1.app.meitudata.com/meitushop/v4/mobile_img/m8/hellokitty/bg-4.jpg?v=201705031820)no-repeat;
  background-size: cover;
}
</style>
