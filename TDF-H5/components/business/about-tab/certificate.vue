<template>
  <cube-scroll>
    <div class="certificate">
      <div
        v-for="(item, index) in imgLists"
        :key="index"
        class="flex">
        <div
          class="div_fr div_img flex-1"
          @click="bigImg(index*2)">
          <img
            :src="item.src1"
            class="lazy">
          <div class="txt_p">
            <p>{{ item.title1 }}</p>
          </div>
        </div>
        <div
          class="div_img flex-1"
          @click="bigImg(index*2+1)">
          <img
            v-if="item.src2"
            :src="item.src2"
            class="lazy">
          <div
            v-if="item.src2"
            class="txt_p">
            <p>{{ item.title2 }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="inform_signature">
      <div><h3 class="title">法人签章</h3></div>
      <img src="~/assets/images/inform/signature-2.png">
    </div>
  </cube-scroll>
</template>
<script>
import img1 from '~/assets/images/inform/certificate/cernew01.png'
import img2 from '~/assets/images/inform/certificate/cernew02.png'
import img3 from '~/assets/images/inform/certificate/cernew03.png'
import img4 from '~/assets/images/inform/certificate/cernew04.jpeg'
import img5 from '~/assets/images/inform/certificate/cernew05.jpeg'
import img6 from '~/assets/images/inform/certificate/cernew06.png'
import img7 from '~/assets/images/inform/certificate/cernew07.png'
import img8 from '~/assets/images/inform/certificate/cernew08.png'
import img9 from '~/assets/images/inform/certificate/cernew09.jpg'
export default {
  data() {
    return {
      imgLists: [
        {
          src1: img1,
          title1: '新网银行存管协议-1',
          src2: img2,
          title2: '新网银行存管协议-2'
        },
        {
          src1: img3,
          title1: '拓道金服营业执照',
          src2: img4,
          title2: '营业许可证(ICP+EDI)-1'
        },
        {
          src1: img5,
          title1: '营业许可证(ICP+EDI)-2',
          src2: img6,
          title2: '营业许可证(ICP+EDI)-3'
        },
        {
          src1: img7,
          title1: '营业许可证(ICP+EDI)-4',
          src2: img8,
          title2: '信息系统安全等级证书'
        },
        {
          src1: img9,
          title1: '信息系统等级测评基本页',
          src2: '',
          title2: ''
        }
      ],
      imgSrc: `imgActive1, imgActive2, imgActive3, imgActive4, imgActive5, imgActive6, imgActive7, imgActive8, imgActive9`
    }
  },
  methods: {
    bigImg() {
      this.$emit('bigImg')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .certificate
    border-top: 20px solid $color-background
    padding: 0 30px
    background-color: white
    padding-top: 20px
    padding-bottom: 65px
    .flex
      display: flex
      overflow: hidden
    .flex-1
      flex: 1
    .div_fr
      margin-right: 30px
    .div_img
      width: 328px
      height: 460px
      margin-top: 18px
      position: relative
      img
        width: 328px
        height: 460px
      a
        display: block
      .txt_p
        width: 100%
        height: 48px
        line-height: 48px
        text-align: center
        position: absolute
        left: 0
        bottom: 0
        background-color: rgba(57,59,63,0.5)
        p
          font-size: 22px
          color: #fff
  .inform_signature
    background-color: $color-white
    border-top: 20px solid $color-background
    border-bottom: 20px solid $color-background
    div
      padding: 0 30px
    img
      width: 100%
      height: 380px
    h3
      font-size: $fontsize-medium
      color: $color-gray1
      height: 80px
      line-height: 80px
      border-bottom: 1px solid $color-gray5
      font-weight: normal
</style>
