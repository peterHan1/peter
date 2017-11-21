<template lang="html">
  <div class="good-page">
    <div class="header">
      <router-link to='/'>
        <span class="gohome"></span>
      </router-link>
      <div class="input-box">
        <input type="text" placeholder="美图M8">
      </div>
      <span class="search-btn">搜索</span>
    </div>
    <div class="swiper-container2">
      <div class="swiper-wrapper">
        <div class="swiper-slide slide1">
          <span class="type" >分类:</span>
        </div>
        <div class="swiper-slide slide2">
          <router-link to='/goods'>
            <span id="all" v-on:click="selectType" class="type Active" >全部</span>
          </router-link>

        </div>
        <div class="swiper-slide slide3">
          <router-link to="/list2">
            <span v-on:click="selectType" class="type" >充电器</span>
          </router-link>
        </div>
        <div class="swiper-slide slide4">
          <router-link to="/list3">
            <span v-on:click="selectType" class="type" >手机壳</span>
          </router-link>
        </div>
        <div class="swiper-slide slide5">
          <router-link to="/listError">
            <span v-on:click="selectType" class="type" >贴膜</span>
          </router-link>
        </div>
        <div class="swiper-slide slide6">
          <router-link to="/listError">
            <span v-on:click="selectType" class="type" >玩具手办</span>
          </router-link>
        </div>
        <div class="swiper-slide slide7">
          <router-link to="/list4">
            <span v-on:click="selectType" class="type" >耳机</span>
          </router-link>
        </div>
        <div class="swiper-slide slide8">
          <router-link to="/list2">
            <span v-on:click="selectType" class="type">时尚服饰</span>
          </router-link>
        </div>
        <div class="swiper-slide slide9">
          <router-link to="/listError">
            <span v-on:click="selectType" class="type" >遥控器</span>
          </router-link>
        </div>
        <div class="swiper-slide slide10">
          <router-link to="/listError">
            <span v-on:click="selectType" class="type" >补光灯</span>
          </router-link>
        </div>
        <div class="swiper-slide slide11">
          <router-link to="/list3">
            <span v-on:click="selectType" class="type">自拍架</span>
          </router-link>
        </div>
      </div>
    </div>
      <List1 v-show="allShow"></List1>
      <router-view></router-view>
      <footBar></footBar>
  </div>
</template>

<script>
import List1 from './list1'
import footBar from '../public/footer'
export default {
  data () {
    return {
      isActive: false,
      typeSwiper: null,
      allShow: true
    }
  },
  mounted () {
    this.typeSwiper = new Swiper('.swiper-container2', {
      freeMode: true
    })
  },
  methods: {
    selectType: function (e) {
      if(e.target.id === 'all') {
        this.allShow = true
      } else {
        this.allShow = false
      }
      document.querySelector('.Active').classList.remove('Active')
      if(!e.target.classList.contains('Active')) {
        e.target.classList.add('Active')
      }
  }
},
  components: {
    List1,
    footBar
  }
}
</script>
<style lang="css">
.good-page .header{
  align-items: center;
}
.good-page .header .gohome{
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background: url(../../assets/images/home.png) no-repeat;
  background-size: cover;
}
.good-page .header {
  display: flex;
}
.good-page .header .input-box {
  flex:1;
  width: 20rem;
  height: 3rem;
  border: 1px solid #cdced1;
  padding: .8rem;
  box-sizing: border-box;
}
.good-page .header .search-btn {
  width: 4.4rem;
  height: 4.4rem;
  line-height: 4.4rem;
  text-align: center;
  color: #817e83;
  font-size: 1.4rem;
}
.Active {
  padding: .4rem;
  border-radius: .3rem;
  color: #fff !important;
  background: #f55669;
}
.good-page .swiper-container2{
  width: 100%;
  overflow-x: hidden;
  height: 4rem;
  line-height: 4rem;
  background: #fff;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
}
.good-page .swiper-container2 .swiper-wrapper{
  width: 100%;
}
.good-page .swiper-container2 .swiper-slide {
  float: left;
  width: 7rem !important;
  text-align: center;
}
.good-page .swiper-container2 .swiper-slide .type{
  width: 100%;
  font-size: 1.4rem;
  color: #444;
}

.type-list {
  width: 100%;
  margin: 0 auto;
  overflow-x: auto;
  background: #fff;
  border-top: 1px solid #eee;
  position: relative;
}
.type-list .types {
  width: 100%;
  padding: 1rem;
  display: table;
  table-layout: fixed;
  overflow-x: auto

}
.type-list .types .type {
  margin-left: 1rem;
  font-size: 1.4rem;
  float: left;
}

</style>
