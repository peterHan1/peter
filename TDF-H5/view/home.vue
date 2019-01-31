<template>
  <div class="index_box">
    <div>首页</div>
    <router-link to="/project">项目</router-link>
    <td-footer :navClass="'td'"/>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="stylus" scoped>
div
  margin-bottom: 100px
</style>
