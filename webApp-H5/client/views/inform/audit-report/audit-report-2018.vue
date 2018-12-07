<template>
  <div class="audit">
    <swiper-slide :items="items"></swiper-slide>
  </div>
</template>
<script>
import img1 from '../../../assets/images/inform/audit/audit_01.png'
import img2 from '../../../assets/images/inform/audit/audit_02.png'
import img3 from '../../../assets/images/inform/audit/audit_03.png'
import img4 from '../../../assets/images/inform/audit/audit_04.png'
import img5 from '../../../assets/images/inform/audit/audit_05.png'
import img6 from '../../../assets/images/inform/audit/audit_06.png'
import img7 from '../../../assets/images/inform/audit/audit_07.png'
import img8 from '../../../assets/images/inform/audit/audit_08.png'
import img9 from '../../../assets/images/inform/audit/audit_09.png'
import img10 from '../../../assets/images/inform/audit/audit_10.png'
import img11 from '../../../assets/images/inform/audit/audit_11.png'
import img12 from '../../../assets/images/inform/audit/audit_12.png'
export default {
  metaInfo: {
    title: '审计报告'
  },
  data () {
    return {
      items: [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12]
    }
  }
}
</script>
<style lang="stylus" scoped>
.audit
  width: 100%
  height: 100%
</style>