<template>
  <div class="tags-img">
    <!-- {{ type }} -->
    <img
      v-if="type==13"
      src="~/assets/images/tags/new.png">
    <img
      v-if="type==3"
      src="~/assets/images/tags/new.png">
    <img
      v-if="type==11473"
      src="~/assets/images/tags/parter.png">
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="stylus">
.tags-img
  width: 105px
  height: 36px
  margin-left: 17px
  overflow: hidden
  img
    width: 100%
</style>
