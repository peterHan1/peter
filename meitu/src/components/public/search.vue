<template lang="html">
  <div class="search-page">
    <div class="header">
      <router-link to='/'>
        <span class="gohome"></span>
      </router-link>
      <div class="input-box">
        <input type="text" class="keywords" placeholder="美图M8">
      </div>
        <span  class="search-btn">搜索</span>
    </div>
    <div class="result-box">
      <p class="tips">
        共有
        <span class="digit">{{phonelist.length}}</span>
        件商品
      </p>
      <div v-show="!hasResult" class="result-list">
        <img src="http://img1.app.meitudata.com/meitushop/v4/mobile_img/pic_error_emoji@2x.png" alt="" class="notFound">
        <p class="desc">
          亲 抱歉,未找到与关键词"
          <span class="keywords">{{keywords}}</span>
          "相关的产品,<br>
          请尝试切换关键词吧(比如手机/美图M8~)!
        </p>
      </div>
      <div class="result-content">
        <ul class="phones">
          <li class="item" v-for="phone in phonelist">
            <img :src="phone.imgSrc" alt="">
            <p class="phone-title">{{phone.title}}</p>
            <p class="phone-price">￥{{phone.price}}</p>
          </li>
        </ul>
      </div>
    </div>
    <footBar></footBar>
  </div>

</template>

<script>
import footBar from './footer'
export default{
  data () {
    return {
      keywords:'',
      hasResult: false,
      phonelist:[]
    }
  },
  mounted() {
    this.keywords = localStorage.getItem('keywords')
    if(this.keywords === '美图M8' ||this.keywords === '手机' ) {
      this.hasResult = true
      this.axios.get('http://easy-mock.com/mock/59435cf68ac26d795f180379/detail/phoneList')
        .then((response) => {
          this.phonelist = response.data.phoneList
          console.log(this.phonelist)
        })
    } else {
      this.hasResult= false
    }
  },
 components: {
   footBar
 }
}
</script>

<style lang="css" scoped>
.header{
  align-items: center;
}
.search-page .header .gohome{
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background: url(../../assets/images/home.png) no-repeat;
  background-size: cover;
}
.search-page .header {
  display: flex;
}
.search-page .header .input-box {
  flex:1;
  width: 20rem;
  height: 3rem;
  border: 1px solid #cdced1;
  padding: .8rem;
  box-sizing: border-box;
}
.search-page .header .search-btn {
  width: 4.4rem;
  height: 4.4rem;
  line-height: 4.4rem;
  text-align: center;
  color: #817e83;
  font-size: 1.4rem;
}
.result-box .tips {
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  padding-left: 2rem;
  box-sizing: border-box;
  font-size: 1.6rem;
  color: #acacac;
}
.tips .digit {
  color: #f55669;
}
.result-list .desc {
  text-align: center;
  font-size: 1.6rem;
  padding-bottom: 2rem;
  box-sizing: border-box;
}
.desc .keywords {
  color: #f55669;
}
.result-list {
  width: 100%;
  background-color: #fff;
}
.notFound {
  width: 10rem;
  height: 10rem;
  display: block;
  margin: 0 auto;
  padding-top: 5rem;
  margin-bottom: 2rem;
}
.result-content{
  width: 100%;
}
.result-content .phones{
  width: 100%;
}
.phones .item {
  float: left;
  width: 50%;
  background-color: #fff;
  position: relative;
}
.phones .item:after{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #eee;
}
.phones .item:nth-child(2n):before{
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background: #eee;
}
.phones .item img {
  width: 8rem;
  height: 8rem;
  display: block;
  margin: 0 auto;
}
.phones .item p{
  text-align: center;
}
.phone-title{
  font-size: 1.6rem;

}
.phone-price{
  color: #f55669;
  font-size: 1.4rem;
}
</style>
