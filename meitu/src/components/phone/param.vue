<template lang="html">
  <div class="param">
    <div class="param-wrapper">
      <h1 class="title">
        美图M8相关参数
      </h1>
      <div class="param-box">
        <swiper :options="swiperOption4" ref="mySwiper">
          <swiper-slide>
            <img src="http://img1.app.meitudata.com/meitushop/v4/pc_img/m8/size-5.2.png?v=201705021910" alt="">
          </swiper-slide>
          <swiper-slide>
            <img src="http://img1.app.meitudata.com/meitushop/v4/pc_img/m8/size-5.15.png?v=201705021910" alt="">
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <div class="param-content">
          <div class="content">
            <h3 class="subtitle">基本信息</h3>
            <div class="clearfix">
      				<label class="paramter-name">名称</label>
      				<div class="paramter-value">美图M8</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">价格</label>
      				<div class="paramter-value">¥2599（标准版）¥2799（Hello Kitty特别版）</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">外观</label>
      				<div class="paramter-value">双面玻璃</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">颜色</label>
      				<div class="paramter-value">月光白 樱花粉 闪耀紫 魅影红</div>
      			</div>
          </div>
          <div class="content">
            <h3 class="subtitle">cpu,存储和参数</h3>
            <div class="clearfix">
      				<label class="paramter-name">CPU</label>
      				<div class="paramter-value">MT6797m，十核 2.1GHz</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">GPU</label>
      				<div class="paramter-value">MALI T880</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">系统</label>
      				<div class="paramter-value">MEIOS3.6（基于Android M）</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">RAM</label>
      				<div class="paramter-value">4GB</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">ROM</label>
      				<div class="paramter-value">64G</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">电池容量</label>
      				<div class="paramter-value">3000mAh 锂聚合物充电电池（不可更换）</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">SIM卡</label>
      				<div class="paramter-value">本手机仅支持标准Nano-SIM卡（使用非标准卡可能导致手机卡座损坏）</div>
      			</div>
          </div>
          <div class="content">
            <h3 class="subtitle">拍摄与拍照</h3>
            <div class="clearfix">
      				<label class="paramter-name">前置摄像头</label>
      				<div class="paramter-value">1200万DualPD，SONY IMX362</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">后置摄像头</label>
      				<div class="paramter-value">2100万，PDAF，SONY IMX230</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">图形处理器</label>
      				<div class="paramter-value">索喜（原富士通）Milbeaut专业图像处理芯片</div>
      			</div>
            <div class="clearfix">
      				<label class="paramter-name">补光灯</label>
      				<div class="paramter-value">第三代前置智能补光灯</div>
      			</div>
          </div>
        </div>
      </div>
      <footBar></footBar>
    </div>
  </div>
</template>

<script>
import footBar from '../public/footer'
export default {
  data() {
    return {
      swiperOption4: {
        autoplay: 3000,
        initialSlide: 1,
        loop: true,
        paginationClickable :true,
        pagination: '.swiper-pagination',
      },
    }
  },
  components:{
    footBar
  }
}
</script>

<style lang="css" scoped>
.param-wrapper {
  width: 100%;
  background: #1e1b1a;
  padding-top: 2rem;
  box-sizing: border-box;
}
.param-wrapper .title {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
.param-content .content .subtitle {
  color: #fff;
  font-size: 1.6rem;
  padding: 0 10px;
  background-color: #2A2929;
  box-sizing: border-box;
  line-height: 1.5;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.clearfix {
   color: #acabac;
   font-size: 1.4rem;
   position: relative;
   display: flex;
   line-height: 2rem;
}
.clearfix .paramter-name {
  width: 8rem;
  text-align: right;
  margin-right: 2rem;
}
 .clearfix .paramter-value {

 }
 .clearfix:after {
   clear: both;
 }
 .param-box {
   width: 100%;
   margin-bottom: 3rem;
 }
 .swiper-pagination-bullet {
   width: 0.8rem;
   height: 0.8rem;
   background-color: #fff;
 }
</style>
