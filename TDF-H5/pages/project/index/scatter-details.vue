<template>
  <transition name="ssss">
    <div class="detail">
      <div class="scatter-enter">
        <td-header
          :title="title"
          class="header"/>
        <transition :name="transitionName">
          <!-- <Scatter @pullFn="cutFn"/> -->
          <!-- <scatter
            @pullFn="cutFn"
            @bigImgs="imgFn"/> -->
          <div
            :is="conTxt"
            @pullFn="cutFn"
            @bigImgs="imgFn"/>
        </transition>
        <footer >{{ btnName }}</footer>
        <BigImg
          v-if="imgBig"
          @imgMin="imgMin"/>
      </div>
    </div>
  </transition>
</template>
<script>
import Scatter from '~/components/business/project-detail/scatter/details'
import Scatters from '~/components/business/project-detail/scatter/details-next'
import { freeBorrowDetail } from '~/api/project.js'
// import BigImg from './big-img.vue'

export default {
  async asyncData({ app, params, store }) {
    const desId = encodeURIComponent(params.id)
    // console.log('//////')
    // console.log(desId)
    // const { content } = await freeBorrowDetail(app.$axios, desId)
    // console.log(content)
    // store.commit('project/freeDetailData', content)
  },
  data() {
    return {
      transitionName: '',
      btnName: '立即出借',
      conTxt: 'Scatter',
      // slideOptions: {
      //   listenScroll: true,
      //   probeType: 3,
      //   directionLockThreshold: 0
      // },
      imgBig: false,
      items: [
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
        },
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
        },
        {
          image:
            'https://www.51tuodao.com/upload/data/upfiles/images/2017-09/18/11_attestations_attestation_1505699492057.jpg'
        }
      ]
    }
  },
  computed: {
    title() {
      return 'dfsdfs'
    }
  },
  created() {},
  methods: {
    cutFn() {
      if (
        this.transitionName === '' ||
        this.transitionName === 'slide-bottom'
      ) {
        this.transitionName = 'slide-top'
        this.conTxt = 'Scatters'
      } else {
        this.transitionName = 'slide-bottom'
        this.conTxt = 'Scatter'
      }
    },
    imgFn() {
      this.imgBig = true
    },
    imgMin() {
      this.imgBig = false
    }
  },
  mounted() {},
  components: {
    Scatter,
    Scatters
    // BigImg
  }
}
</script>

<style lang="stylus">
.detail
  position: fixed
  z-index: 100
  width: 100%
  height: 100%
  background: $color-background
  top: 0
  left: 0
  right: 0
  bottom: 0
.ssss-enter-active, .ssss-leave-active
  transition: all 0.3s
.ssss-enter, .ssss-leave-to
  transform: translate3d(100%, 0, 0)


.scatter-enter
  position: fixed
  left: 0
  top: 0
  background: $color-background
  z-index: 100
  width: 100%
  height: 100%
  .header
    header
      background: linear-gradient(to right, #F66F4A , #FC8D26)
      color: $color-white
      border-bottom: none
      .iconfont
        color: $color-white
  footer
    width: 100%
    height: 100px
    line-height: 100px
    color: $color-white
    background: $color-primary
    text-align: center
    font-size: $fontsize-large-xxx
    position: fixed
    left:0
    bottom: 0
    z-index: 999
.slide-bottom-enter-active,.slide-bottom-leave-active,.slide-top-enter-active,.slide-top-leave-active
  will-change: transform
  transition: all 500ms ease
  position: absolute
  width: 100%
.slide-bottom-enter,.slide-top-leave-active
  transform: translate3d(0, -100%, 0)
.slide-bottom-leave-active,.slide-top-enter
  transform: translate3d(0, 100%, 0)
</style>
