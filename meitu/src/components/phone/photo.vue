<template lang="html">
  <div class="photo">
    <div class="photo-wrapper">
      <h1 class="title">美图M8高清图集</h1>
      <div class="photo-box" v-for="img in imgs">
        <img :src="img" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgs:[
        'http://mshopimg3.meitudata.com/59102afaa6f8857036.jpg!thumb640',
        'http://mshopimg4.meitudata.com/59102b31169c778677.jpg!thumb640',
        'http://mshopimg2.meitudata.com/59102c8119d4644767.jpg!thumb640',
        'http://mshopimg2.meitudata.com/59102cb9e80fc37064.jpg!thumb640',
        'http://mshopimg2.meitudata.com/59102d050ea5365667.jpg!thumb640',
        'http://mshopimg3.meitudata.com/59102d59f2c0b68689.jpg!thumb640',
        'http://mshopimg3.meitudata.com/59102f468082d55495.jpg!thumb640',
        'http://mshopimg1.meitudata.com/59102f761579743611.jpg!thumb640',
        'http://mshopimg1.meitudata.com/59102fa0d349235703.jpg!thumb640'
      ]
    }

  }
}
</script>

<style lang="css" scoped>
  .photo-wrapper{
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background: #1e1b1a ;
  }
  .photo-wrapper .title {
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .photo-box {
    width: 100%;
  }
  .photo-box img {
    width: 100%;
    margin-bottom: 1rem;
  }
</style>
