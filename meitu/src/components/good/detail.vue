<template lang="html">
  <div class="detail-page" >
    <mt-header>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <swiper :options="swiperOption2" ref="mySwiper">
      <swiper-slide v-for="img in goodInfo.imgSrc" key="img.id">
        <img :src="img" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="good-info">
      <p class="good-text">{{goodInfo.title}}</p>
      <p class="good-price">￥{{goodInfo.price}}</p>
    </div>
    <div class="selection-fittings">
      <dl class="dl">
        <dt class="dt" >规格:</dt>
        <dd v-for="(spe, index) in goodInfo.specification"
        @click="selectFit" :id="index" class="dd">{{spe}}</dd>
      </dl>
      <dl class="dl">
        <dt class="dt">数量:</dt>
        <span @click="subNum" class="btn sub">-</span>
        <span class="selectedNum">{{buyNum}}</span>
        <span @click="addNum" class="btn add">+</span>
      </dl>
    </div>
    <div class="good-promise">
      <ul class="promises">
        <li class="item">
          <i class="icon zp"></i>
          正品保障
        </li>
        <li class="item">
          <i class="icon lb"></i>
          全国联保
        </li>
        <li class="item">
          <i class="icon th"></i>
          无忧退换货
        </li>
        <li class="item">
          <i class="icon by"></i>
          99包邮
        </li>
      </ul>
    </div>
    <div class="detail-info">
      <mt-navbar v-model="selected">
        <mt-tab-item  id="1">商品详情</mt-tab-item>
        <mt-tab-item  id="2">规格参数</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item  id="1">
          <div class="mt-cell" v-for="detailImg in goodInfo.detailImg">
            <img :src="detailImg" alt="">
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="mt-cell" v-for="speImg in goodInfo.speImg">
            <img :src="speImg" alt="">
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="detail-basebar">
      <span class="toCart">
        <router-link to='/cart'>
          <i class="icon buycart"></i>
        </router-link>
        <em class="buynumber">{{count}}</em>
      </span>
      <span @click="add_cart" :id='goodInfo.id' class="cart-btn">
        加入购物车
      </span>
      <span @click="buyNow" class="buy-btn">
        立即购买
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buyNum: 1,
      selected: '1',
      goodInfo:[],
      url:'',
      swiperOption2: {
        autoplay: 3000,
        initialSlide: 1,
        loop: true,
        paginationClickable :true,
        pagination: '.swiper-pagination',
      }
    }
  },
  mounted (){
    this.url = this.$store.state.cart.toUrl || 'doll'
    this.axios.get('https://easy-mock.com/mock/59435cf68ac26d795f180379/detail/'+ this.url)
      .then((response) => {
        this.goodInfo = response.data.goodInfo
        console.log(this.goodInfo)
      })
  },
	watch: {
		selected: function(val) {
			this.selected = val;
      console.log(this.selected);
		}
  },
  computed : {
    count () {
      return this.$store.state.cart.cartInfos.total_nums
    }
  },
  methods: {
    selectFit: function (e) {
      console.log(e.target)
      const selected = document.querySelector('.selected')
      if(selected) {
        selected.classList.remove('selected')
        if(!e.currentTarget.classList.contains('selected')) {
          e.currentTarget.classList.add('selected')
        }
      } else {
        if(!e.currentTarget.classList.contains('selected')) {
          e.currentTarget.classList.add('selected')
        }
      }

    },
    subNum: function () {
      if(this.buyNum > 1) {
        this.buyNum --
      } else {
        return
      }
    },
    addNum: function () {
      this.buyNum ++
    },
    add_cart: function(e) {
      const selected = document.querySelector('.selected')
      if(!selected){
        this.$toast({
          message:'请选择商品规则',
          position: 'top',
          duration: 1000
        })
      } else {
        this.$toast({
          message: '已添加到购物车',
          position: 'top',
          duration: 1000,
          className: 'toast'
        })
        let goodId = document.querySelector('.selected').id
        let Id = e.currentTarget.id
        console.log(goodId)
        this.$store.commit('CHECK_CART',Id)
        let curIndex = this.$store.state.cart.curIndex
        const goodTitle = document.querySelector('.good-text').innerHTML
        const productType = document .querySelector('.selected').innerHTML
        const imgSrc = this.goodInfo.imgSrc[goodId]
        const goodPrice = this.goodInfo.price
        const productInfo ={
          id: Id,
          goodId: goodId,
          imgSrc: imgSrc,
          title: goodTitle,
          price: goodPrice,
          perNum: this.buyNum,
          type: productType,
          selected: false
        }
        if(curIndex != -1 && this.$store.state.cart.cartList[curIndex].goodId === goodId ) {
          this.$store.dispatch('add_cart')
        }else {
          this.$store.commit('CREATE_CART',productInfo)
        }
      }

    },
    buyNow: function () {
      this.add_cart()
    }
  }
}
window.onscroll = function() {
	var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop
  var  mtNavbar= document.querySelector('.mint-navbar')
	if (scrollTop >520) {
    mtNavbar.style.position = 'fixed'
    mtNavbar.style.top = 0
    mtNavbar.style.left = 0
	} else {
    mtNavbar.style.position = 'relative'
	}
	}
</script>

<style lang="css"  scoped>
.swiper-container{
  background-color: #fff;
  overflow: hidden;
  position: relative;
}
 .swiper-slide img {
  width: 18rem;
  height: 18rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 1rem;
}
 .detail-page .swiper-pagination-bullet{
   width: 0.8rem;
   height: 0.8rem;
   background-color: #ff8282 !important;
}
.good-info {
  width: 100%;
  background-color: #fff;
}
.good-info .good-text{
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
}
.good-info .good-price{
  text-align: center;
  font-size: 1.6rem;
  color: #f55669;
}
.selection-fittings{
  width: 100%;
  padding-top: 1rem;
}
.selection-fittings .dl {
  padding-left: 1rem;
  margin-bottom: 1rem;
  margin-right: 2rem;
}
.selection-fittings .dl .dt {
  display: inline-block;
  font-size: 1.6rem;
  margin-right: 2rem;
  color: #a2a0a3;
}
.selection-fittings .dl .dd {
  font-size: 1.6rem;
  color: #3c363e;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: .5rem;
  margin-right:  2rem;
  margin-bottom: 1rem;
  display: inline-block;
}
.selection-fittings .dl .dd.selected {
  border-color: #f55669;
}
.selection-fittings .btn {
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  display: inline-block;
  text-align: center;
  line-height: 3rem;
  font-size: 1.8rem;
}
.selection-fittings .selectedNum {
  width: 5rem;
  height: 3rem;
  display: inline-block;
  background-color: #fff;
  margin-left: 1rem;
  margin-right: 1rem;
  text-align: center;
  line-height: 3rem;
}
.good-promise {
  width: 100%;
  height: 4.4rem;
  line-height: 4.4rem;
  background-color: #fff;
}
.good-promise .promises{
  width: 100%;
  margin: 0 auto;
}
.good-promise .item {
  width: 24%;
  height: 4.4rem;
  display: inline-block;
  font-size: 1.2rem;
  color: #c3c3c3;
  text-align: center;
}
.good-promise .icon {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  background-size: cover;
  background-repeat: no-repeat;
}
.zp {
  background: url(../../assets/images/正品.png);
}
.lb{
  background: url(../../assets/images/保.png);
}
.th{
  background: url(../../assets/images/定位 .png);
}
.by{
  background: url(../../assets/images/顺丰.png);
}
.detail-info {
  margin-bottom: 6rem;
}
.detail-basebar {
  width: 100%;
  height: 5rem;
  background-color: #fff;
  z-index: 10;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
}
.detail-basebar span {
  width: 33.33333%;
  height: 100%;
  display: block;
  text-align: center;
  line-height: 5rem;
  margin-left: 0;
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
}
.detail-basebar .toCart .buycart{
  position: relative;
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  margin-top: 1.6rem;
  margin-left: 2rem;
  background: url(../../assets/images/iconCar.png) center center no-repeat;
  background-size: cover;
}
.detail-basebar .toCart .buynumber {
  position: absolute;
  background: #f74554;
  min-width: 1rem;
  height: 1.4rem;
  line-height: 1.4rem;
  font-size: 12px;
  color: #fff;
  top: .3rem;
  left: 1.4rem;
  text-align: center;
  padding: 0 .3rem;
  border-radius: 1rem;
  box-sizing: border-box;
  font-style: normal;
}
.detail-basebar .cart-btn {
  background: #ff8c4d;
}
.detail-basebar .buy-btn {
  background: #f55669;
}
.detail-info {
  width: 100%;
  margin-top: 1rem;
}

.mt-cell img {
  width: 100%;
  display: block;
}
.mt-cell span {
  margin-left: 2rem;
  margin-top: 1rm;
  font-size: 1.4rem;
  color: #333;
}
.mint-navbar{
  width: 100%;
  border-bottom:1px solid #ececec;
  font-size: 1.6rem;
  z-index: 10;
}
.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid #f55669;
    color: #f55669;
    font-size: 1.6rem;
}
.toast {
    font-size: 1.6rem ;
    width: 80%;
    margin: 0 auto;
  }
</style>
