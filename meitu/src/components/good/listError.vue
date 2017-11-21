<template lang="html">
  <div>
    <div class="goodlist">
      <div class="Emoji error">
        <img src="http://img1.app.meitudata.com/meitushop/v4/mobile_img/pic_error_emoji@2x.png" alt="">
      </div>
      <p class="errorMsg">没有找到相关的商品</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.Emoji {
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  margin-top: 10rem;
}
.Emoji img {
  width: 100%;
}
.errorMsg {
  text-align: center;
  font-size: 1.4rem;
}
</style>
