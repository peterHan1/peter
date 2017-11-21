<template lang="html">
    <div>
      <div class="goods-list">
        <ul class="list" v-for="good in allgoods">
          <li class="item" @click="toDetail" :data-id="good.url">
            <div class="item-image">
              <img :src=good.imgSrc alt="">
            </div>
            <div class="item-info">
              <h4 class="goodtitle">{{good.title}}</h4>
              <span class="price">¥ {{good.price}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      allgoods: [
        {
          imgSrc: 'http://mshopimg3.meitudata.com/58aea5cca616828350.jpg?thumb220',
          title: 'MeituFamily抱枕',
          price: 79,
          url:'bolster'
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5640736873a2c18944.jpg?thumb220',
          title: '限量版美图公仔',
          price: 59,
          url:'doll'
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/5621b27b8b2e886188.jpg?thumb220',
          title: '美图潮牌手机',
          price: 129,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5436601baee3893413.jpg?thumb220',
          title: 'Meitu x MLGB 2017',
          price: 288,
          url: 'clothes'
        },
        {
          imgSrc: 'http://mshopimg4.meitudata.com/582e95ef1b25279092.jpg?thumb220',
          title: '气球恐龙帽',
          price: 56,
          url:'hat'
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/561e03a60e3cb47662.jpg?thumb220',
          title:'美图手机专属耳机',
          price:79,
          url:'headSet'
        },
        {
          imgSrc: 'http://mshopimg4.meitudata.com/5694bafec3f0072720.jpg?thumb220',
          title: '美图V4透明手机壳',
          price: 49
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/563745f67f45545765.jpg',
          title:'美图遥控器第二代',
          price:89
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/577f007c56ea942623.jpg',
          title:'MeituFamily印花移动电源',
          price:189
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/58f821664f7cc70281.jpg?thumb220',
          title:'美图T8钢化玻璃贴膜',
          price:39
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/57fe0a266385b34439.jpg?thumb220',
          title:'MeituFamily潮趣手机壳',
          price:99
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5795a7a49ed5238759.jpg?thumb220',
          title:'美图M6/美图M6s/美图T8手机数据线',
          price:39
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/58aea5cca616828350.jpg?thumb220',
          title: 'MeituFamily抱枕',
          price: 49,
          url:'bolster'
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5640736873a2c18944.jpg?thumb220',
          title: '限量版美图公仔',
          price: 59,
          url:'doll'
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/5621b27b8b2e886188.jpg?thumb220',
          title: '美图潮牌手机',
          price: 129,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg1.meitudata.com/5436601baee3893413.jpg?thumb220',
          title: 'Meitu x MLGB 2017',
          price: 168,
          url: 'clothes'
        },
        {
          imgSrc: 'http://mshopimg4.meitudata.com/582e95ef1b25279092.jpg?thumb220',
          title: '气球恐龙帽',
          price: 56,
          url:'hat'
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/561e03a60e3cb47662.jpg?thumb220',
          title:'美图手机专属耳机',
          price:79,
          url:'headSet'
        }
      ]
    }
  },
  methods: {
    toDetail: function(e) {
      let url = e.currentTarget.dataset.id
      console.log(url)
      this.$store.commit('TO_DETAIL', url)
      this.$router.push({path:'/detail'})
    }
  }
}
</script>

<style lang="css">
</style>
