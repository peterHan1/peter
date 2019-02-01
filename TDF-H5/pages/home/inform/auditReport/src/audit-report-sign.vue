<template>
  <bigImg :items="items"/>
</template>
<script>
import bigImg from './big-img.vue'
import img from '../../../../../assets/images/inform/signature-2.png'
export default {
  metaInfo: {
    title: '审计报告'
  },
  data() {
    return {
      items: [
        {
          image: img
        }
      ]
    }
  },
  components: {
    bigImg: bigImg
  }
}
</script>
<style lang="stylus" scoped></style>
