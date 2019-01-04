<template>
	<div class="audit">
    <Header navLeftTxt="icon">审计报告</Header>
    <swiper-slide :items="items"></swiper-slide>
	</div>
</template>
<script>
import img from '../../../assets/images/inform/signature-2.png'
export default {
  metaInfo: {
    title: '审计报告'
  },
  data () {
    return {
      items: [img]
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>