<template lang="html">
  <div class="family-box">
    <div class="top">
      <h3 class="title">MeituFamily专区</h3>
      <router-link to="/life"><span class="more">更多</span></router-link>
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
          imgSrc: 'http://mshopimg3.meitudata.com/572dd7f1e9cd873807.jpg',
          title:'MLGB潮服',
          desc:'',
          price:89
        },
        {
          imgSrc: 'http://mshopimg4.meitudata.com/58da17cc0064d36805.jpg',
          title:'美图暖心保温杯',
          desc:'',
          price:189
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/585c8b035111f42937.jpg?thumb220',
          title:'MeituFamily公仔',
          desc:'潮酷公仔',
          price:69
        },
        {
          imgSrc: 'http://mshopimg4.meitudata.com/585b8b976b86749677.jpg?thumb220',
          title:'MeituFamily公仔(达可)',
          desc:'潮酷公仔',
          price:139
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/58e5ddb81d89a24268.jpg?thumb220',
          title:'MeituFamily棒球服',
          desc:'刺绣棒球服',
          price:288
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/579f0829b30f234760.jpg?thumb220',
          title:'美图笔记本',
          desc:'专属记录',
          price:20
        }
      ]
    }
  }
}
</script>

<style lang="css">
.family-box {
  clear: both;
}
</style>
