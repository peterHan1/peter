<template>
  <bigImg :items="items"/>
</template>
<script>
import bigImg from './big-img.vue'
import img1 from '../../../../../assets/images/inform/audit/2018/audit-01.png'
import img2 from '../../../../../assets/images/inform/audit/2018/audit-02.png'
import img3 from '../../../../../assets/images/inform/audit/2018/audit-03.png'
import img4 from '../../../../../assets/images/inform/audit/2018/audit-04.png'
import img5 from '../../../../../assets/images/inform/audit/2018/audit-05.png'
import img6 from '../../../../../assets/images/inform/audit/2018/audit-06.png'
import img7 from '../../../../../assets/images/inform/audit/2018/audit-07.png'
import img8 from '../../../../../assets/images/inform/audit/2018/audit-08.png'
import img9 from '../../../../../assets/images/inform/audit/2018/audit-09.png'
import img10 from '../../../../../assets/images/inform/audit/2018/audit-10.png'
import img11 from '../../../../../assets/images/inform/audit/2018/audit-11.png'
import img12 from '../../../../../assets/images/inform/audit/2018/audit-12.png'
export default {
  metaInfo: {
    title: '审计报告'
  },
  data() {
    return {
      items: [
        {
          image: img1
        },
        {
          image: img2
        },
        {
          image: img3
        },
        {
          image: img4
        },
        {
          image: img5
        },
        {
          image: img6
        },
        {
          image: img7
        },
        {
          image: img8
        },
        {
          image: img9
        },
        {
          image: img10
        },
        {
          image: img11
        },
        {
          image: img12
        }
      ]
    }
  },
  components: {
    bigImg: bigImg
  }
}
</script>
<style lang="stylus" scoped>
</style>
