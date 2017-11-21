<template lang="html">
  <div class="info-page">
    <div class="header">
      <router-link to='/phone'>
        <i class="icon back"></i>
      </router-link>
      <div class="head-title">
        <p class="title">美图M8</p>
        <div v-show ="triShow" @click="showSubmenu" class="triangle1"></div>
        <div v-show ="!triShow" class="triangle2" @click="hideSubmenu"></div>
      </div>
      <router-link to='/'>
        <i class="icon index"></i>
      </router-link>
    </div>
    <div class="phone-submenu" v-show="submenu">
      <ul class="submenu">
        <router-link to='/summary'>
          <li @click="changeMenu" class="menu selected">概述</li>
        </router-link>
        <router-link to='/photo'>
          <li @click="changeMenu" class="menu">相关视频</li>
        </router-link>
        <router-link to='/photo'>
          <li @click="changeMenu" class="menu">高清图集</li>
        </router-link >
        <router-link to='/param'>
          <li @click="changeMenu" class="menu">详细参数</li>
        </router-link>
        <li @click="changeMenu" class="menu">S码通道</li>
      </ul>
    </div>
    <phoneSummary v-show="showDefault"></phoneSummary>
    <router-view></router-view>
  </div>
</template>

<script>
import phoneSummary from './summary'
export default {
  data () {
    return {
      submenu: false,
      triShow: true,
      showDefault: true,
    }
  },
  methods: {
    showSubmenu: function(){
      this.submenu = true
      this.triShow = false
    },
    hideSubmenu: function(){
      this.triShow = true
      this.submenu = false
    },
    changeMenu: function(e) {
      document.querySelector('.selected').classList.remove('selected')
      if(!e.currentTarget.classList.contains('selected')) {
        e.currentTarget.classList.add('selected')
      }
      this.showDefault= false
      this.hideSubmenu()
      console.log('123')
    }
  },
  components:{
    phoneSummary
  }
}
</script>

<style lang="css" scoped>
.header {
  display: flex;
  background-color: #120f0f;
  justify-content: center;
  align-items: center;
}
.header {
  border-bottom: #282828 1px solid;
}
.header .icon {
  width: 2rem;
  height: 2rem;
  display: block;
}
.header .head-title {
  flex:1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header .icon.back{
  margin-left: 1rem;
  background: url(../../assets/images/return.png) no-repeat;
  background-size: cover;
}
.header .icon.index{
  margin-right: 1rem;
  background: url(../../assets/images/index.png) no-repeat;
  background-size: cover;
}
.head-title .title{
  color: #fff;
  font-size: 1.4rem;
}
.head-title .triangle1 {
  width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-top: 0.8rem solid #cac9c9;
    /*margin-top: 1rem;*/
    margin-left: 1rem;
}
.head-title .triangle2 {
  width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.8rem solid #cac9c9;
    /*margin-top: 1rem;*/
    margin-left: 1rem;
}
.phone-submenu {
  width: 100%;
  background-color: #120f0f;
  position: absolute;
  top: 4rem;
  left: 0;
  padding-left: 4rem;
  padding-right: 4rem;
  box-sizing: border-box;
  animation: fade-in;
  animation-duration: 1.5s;
  z-index: 999;
}
@keyframes fade-in {
  0%{
    transform: translate(0,-5rem);
  }
  50% {
    transform: translate(0,0);
  }
  100% {
    transform: translate(0,0);
  }
}
.phone-submenu .submenu .menu{
   width: 100%;
   height: 5rem;
   line-height: 5rem;
   font-size: 1.6rem;
   font-weight: 500;
   color: #fff;
   position: relative;
}
.phone-submenu .submenu .menu.selected {
  color: #f55669;
}
.phone-submenu .submenu .menu:after {
  content:'';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #282828;
}

</style>
