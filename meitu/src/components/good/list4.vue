<template lang="html">
  <div>
    <div class="goods-list">
      <ul class="list" v-for="good in goodlist3">
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
      goodlist3: [
        {
          imgSrc: 'http://mshopimg3.meitudata.com/561e03a60e3cb47662.jpg?thumb220',
          title: '美图手机专属耳机',
          price: 79,
          url:'headSet'
        }
      ]
    }
  },
  methods:{
    toDetail: function(e){
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
