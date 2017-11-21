<template lang="html">
  <div class="phone-box">
    <div class="phone-header">
      <h3 class="title">手机</h3>
    </div>
    <div class="phone-list">
      <ul class="list">
        <router-link to='/phoneInfo'>
          <li v-for="phone in phoneList" class="item">
            <div class="item-left">
              <img :src=phone.imgSrc alt="" class="phone-image">
            </div>
            <div class="item-right">
              <h4 class="phonetitle">{{phone.title}}</h4>
              <p class="desc">{{phone.desc}}</p>
              <span class="price">¥ {{phone.price}} 起</span>
            </div>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phoneList: [
        {
          imgSrc: 'http://mshopimg2.meitudata.com/591011329cdb454882.jpg',
          title: '美图T8',
          desc: '个性定制',
          price: 2588
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5910126d54d1369100.jpg',
          title: '美图M8(特别版 白月光)',
          desc: 'hello kitty 特别版',
          price: 2788
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/58d3a217e67a582323.jpg',
          title: '美图T8(幻影黑)',
          desc: 'Angelababy参与设计',
          price: 3599
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/58a2c6f0d039a38843.png',
          title: '美图M6s',
          desc: '让你的自拍清晰又好看',
          price: 2399
        }
      ]
    }
  }
}
</script>

<style lang="css">
.phone-list {
  background-color: #fff;
}
.phone-header .title{
  font-size: 1.6rem;
  height: 4.6rem;
  line-height: 4.6rem;
  color: #666;
  font-weight: 500;
  margin-left: 2rem;
}
.phone-list .list .item{
  width: 100%;
  height: 12rem;
  display: flex;
}
.item-left{
  width: 9.6rem;
  height: 9.6rem;
}
.item-left img{
  display: block;
  width: 8rem;
  height: 8rem;
}
.item-right {
  margin-left: 2rem;
  flex:1;
}
.item-right .phonetitle {
  line-height: 2;
  font-size: 1.6rem;
  font-weight: bold;
  color: #000;
}
.item-right .desc {
  line-height: 2;
  color: #a2a0a3;
  font-size: 1.2rem;
}
.item-right .price {
  line-height: 2;
  color: #f55669;
  font-size: 1.4rem;
}
</style>
