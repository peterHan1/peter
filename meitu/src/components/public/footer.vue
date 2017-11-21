<template lang="html">
  <div class="footer">
    <div class="links">
      <router-link to='' class="link">关于美图</router-link>
      <span class="sep">|</span>
      <router-link to='' class="link">加入美图</router-link>
      <span class="sep">|</span>
      <router-link to='' class="link">美图App</router-link>
      <span class="sep">|</span>
      <router-link to='' class="link">联系我们</router-link>
    </div>
    <p class="copyrights">
      ©2017&nbsp;Meitu&nbsp;美图公司版权所有<br>
      <router-link to='' class="link">增值电信业务经营许可证：B2-20040192</router-link>
      <br>
      <router-link to=''>网络文化经营许可证：闽网文﹝2015﹞1661-028号</router-link>
      <br>
      <router-link to=''>闽公网安备 35020302000186号</router-link>
    </p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.footer {
  clear: both;
  width: 100%;
  height: 18rem;
}
.links{
  text-align: center;
  padding-top: 3rem;
  margin: 1rem;
}
.links .link{
  font-size: 1.4rem;
  color: #6a6a6a;
}
.footer .copyrights,.footer .copyrights a {
    color: #a2a2a2;
    font-size: 1.2rem;
    margin: 0 auto;
    line-height: 2rem;
    padding-bottom:2rem;
    text-align: center;
}
</style>
