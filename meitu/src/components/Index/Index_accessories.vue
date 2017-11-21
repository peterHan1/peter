<template lang="html">
  <div class="accessories-box">
    <div class="top">
      <h3 class="title">配件</h3>
      <router-link to="/goods"><span class="more">更多</span></router-link>
    </div>
      <div class="goods-list">
        <ul class="list">
          <li class="item" v-for="good in goods">
            <router-link to='./detail'>
              <div class="item-image">
                <img :src=good.imgSrc alt="">
              </div>
              <div class="item-info">
                <h4 class="goodtitle">{{good.title}}</h4>
                <p class="desc">{{good.desc}}</p>
                <span class="price">¥ {{good.price}}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: [
        {
          imgSrc: 'http://mshopimg3.meitudata.com/563745f67f45545765.jpg',
          title:'美图遥控器第二代',
          desc:'',
          price:89
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/577f007c56ea942623.jpg',
          title:'MeituFamily印花移动电源',
          desc:'',
          price:189
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/58f821664f7cc70281.jpg?thumb220',
          title:'美图T8钢化玻璃贴膜',
          desc:'原装正品，品质保证',
          price:39
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/57fe0a266385b34439.jpg?thumb220',
          title:'MeituFamily潮趣手机壳',
          desc:'潮趣手机壳',
          price:99
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5795a7a49ed5238759.jpg?thumb220',
          title:'美图M6/美图M6s/美图T8手机数据线',
          desc:'原装正品，品质保证',
          price:39
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/561e03a60e3cb47662.jpg?thumb220',
          title:'美图手机专属耳机',
          desc:'美图专属耳机',
          price:79
        }

      ]
    }
  }
}
</script>

<style lang="css">
.accessories-box {
  width:100%;
}
.list{
  width: 100%;
  /*height: 10rem;*/
  background-color: #fff;
}
.top{
  position: relative;
  background:  #efefef;
}
.title{
  font-size: 1.6rem;
  height: 4.6rem;
  line-height: 4.6rem;
  color: #666;
  font-weight: 500;
  margin-left: 2rem;
}
 .more {
  font-size: 1.4rem;
  position: absolute;
  right: 2rem;
  top: 2rem;
  color: #666;
}
.goods-list .list .item{
  float: left;
  width: 50%;
  height: 21rem;
  position:relative;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.goods-list .list .item:nth-child(2n+1):before {
  content:'';
  position: absolute;
  top:0;
  right:0;
  bottom:0;
  width:.1rem;
  background: #efefef;
}
.goods-list .list .item:after {
  content:'';
  position: absolute;
  left:0;
  right:0;
  bottom:0;
  height:.1rem;
  background: #efefef;
}
.goods-list .list .item .item-image{
  width: 10rem;
  height: 10rem;
  margin: 2rem auto 0 ;
  /*display: block;*/
}
.item-image img{
  width: 100%;
}
.item-info{
  width: 100%;
  text-align: center;
}
.item-info .goodtitle {
  line-height: 1.5;
  font-size: 1.4rem;
  color: #000;
  font-weight: normal;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.item-info .desc {
  line-height: 1.5;
  font-size: 1.4rem;
  color: #999;
}
.item-info .price {
  line-height: 1.5;
  color:  #f55669;
  font-size: 1.4rem ;
}
</style>
