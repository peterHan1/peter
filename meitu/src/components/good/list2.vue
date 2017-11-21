<template lang="html">
    <div>
      <div class="goods-list">
        <ul class="list" v-for="good in goodlist1">
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
      goodlist1:[
        {
          imgSrc: 'http://mshopimg2.meitudata.com/5924f6148e4b810297.jpg?thumb220',
          title: '美图T8/美图M8电源适配器',
          price: 29,
          url: 'charger'
        },
        {
          imgSrc: 'http://mshopimg3.meitudata.com/5795a7f688e8313351.jpg?thumb220',
          title: '美图M6/美图M6s/美图T8手机数据线',
          price: 39,
          url:'dataline'
        }
      ]
    }
  },
  methods: {
    toDetail: function(e) {
      let url = e.currentTarget.dataset.id
      console.log(url)
      this.$store.commit('TO_DETAIL', url)
      this.$router.push({path: '/detail'})
    }
  }
}
</script>

<style lang="css">
</style>
