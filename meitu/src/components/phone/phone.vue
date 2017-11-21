<template lang="html">
  <div class="phone-page">
    <mt-header title="美图手机">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
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
    <footBar></footBar>
  </div>

</template>

<script>
import footBar from '../public/footer'
export default {
  data () {
    return {
      phoneList: [
        {
          imgSrc: 'http://mshopimg1.meitudata.com/59117a033dee368348.jpg?thumb220',
          title: '美图T8',
          desc: '个性定制',
          price: 2588
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/58ac18709298633661.jpg?thumb220',
          title: '美图T8',
          desc: '主流旗舰',
          price: 2788
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/59117a2e0038d81818.jpg?thumb220',
          title: '美图M8(特别版 白月光)',
          desc: 'hello kitty 特别版',
          price: 2788
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/58d4cd34da1a584329.jpg?thumb220',
          title: '美图T8(幻影黑)',
          desc: 'Angelababy参与设计',
          price: 3599
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5844f132a8c7166626.jpg?thumb220',
          title: '美图M6s',
          desc: '让你的自拍清晰又好看',
          price: 2399
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/59117a681974d99035.jpg?thumb220',
          title: '美图M8个性定制',
          desc: '个性定制版',
          price: 2899
        }
      ]
    }
  },
  components: {
    footBar
  }
}
</script>

<style>
.mint-header{
  background-color: #fff;
  height: 4.4rem;
  color: #3c363e;
  font-size: 1.6rem;
  /*align-items: center;*/
}
.mint-header .gohome{
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  background: url(../../assets/images/home.png) no-repeat;
  background-size: cover;
  /*margin-right: 1rem;*/
  position: absolute;
  top: 1rem;
  right: 1rem;

}
.phone-list .item{
  position: relative;
}
.phone-list .item:before{
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: #f1f1f1;
}

</style>
