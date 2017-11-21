<template lang="html">
  <div>
    <div class="goods-list">
      <ul class="list" v-for="good in goodlist2">
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
      goodlist2: [
        {
          imgSrc: 'http://mshopimg4.meitudata.com/5694bafec3f0072720.jpg?thumb220',
          title: '美图V4透明手机壳',
          price: 49,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/5577fd94756dc86653.jpg?thumb220',
          title: '美图V4皮革手机壳',
          price: 69,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/5621b27b8b2e886188.jpg?thumb220',
          title: '美图V8潮牌手机壳',
          price: 129,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg2.meitudata.com/5555a36cde5d272584.jpg?thumb220',
          title: '美图M4手机壳',
          price: 49,
          url:'phoneShell'
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/5555a19d6f46e70436.jpg?thumb220',
          title: '美图M4编织手机壳',
          price: 99,
          url:'phoneShell'
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
