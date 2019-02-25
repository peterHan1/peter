<template>
  <div class="knowUs">
    <td-header title="了解我们"/>
    <div>
      <img
        src="../../../../assets/images/inform/know-us/know-us1.png"
        class="max_img">
    </div>
    <div class="team">
      <Carousel
        :imgs="imgs"
        @itemIndex="itemIndex">
        <div
          v-if="show === 1"
          class="sc-content">
          <h2>刘磊<b>COO</b></h2>
          <p>近10年互联网行业推广运营整合经验，历任多家互联网平台运营负责人，积累了丰富的互联网运营、客服团队打造和管理经验。具有高度的责任心和敏锐的商业头脑，擅长于优化产品用户体验，互金平台合规运营建设，从而推动公司业务发展，提升客户满意度，建立完整的互联网金融运营生态。</p>
        </div>
        <div
          v-else-if="show === 2"
          class="sc-content">
          <h2>张罗军<b>创始人  CEO</b></h2>
          <p>互联网金融科技领域持续创业者，具备丰富的金融科技企业管理经验，以及深厚的风控体系管理水平。2013年创立拓道金服，以整合优质资产和把控风险为出发点，通过互联网运营，深耕汽车金融市场，以拓宇开疆之势，带领拓道金服跻身“中国汽车金融十强企业”、“互联网金融百强企业”，2017年被评为"浙商新领军者"。</p>
        </div>
        <div 
          v-if="show === 3"
          class="sc-content">
          <h2>范爔云<b>联合创始人</b></h2>
          <p>拥有10年以上企业金融和管理经验，在财务管理、资本管理等金融领域积累了丰富的经验，具有极高专业度，深谙互联网金融行业资金、投融资以及流动性风险管理。现任浙江省区域经济合作企业发展促进会副会长，同时是浙江省女企业家协会、浙商财智女人会会员，获浙江省女企协三十周年优秀创业奖。</p>
        </div>
      </Carousel>
    </div>
    <div>
      <img
        src="../../../../assets/images/inform/know-us/know-us2.png"
        class="max_img">
    </div>
    <div class="data">
      <ul>
        <li>
          <section>
            <div style="margin-top: 21.1px;">
              <img
                src="../../../../assets/images/inform/know-us/know-us3-1.png"
                class="max_img"></div>
            <p>经撮合交易总额</p>
            <p>1,263,258,915元</p>
          </section>
          <section>
            <div><img
              src="../../../../assets/images/inform/know-us/know-us3-3.png"
              class="max_img"></div>
            <p>注册用户</p>
            <p>74,237人</p>
          </section>
        </li>
        <!--<li>
              <section>
                <div><img src="images/know-us/know-us3-2.png" class="max_img"></div>
                <p>为用户赚取</p>
                <p>24,367,642元</p>
            </section>
            <section>
                <div><img src="images/know-us/know-us3-4.png" class="max_img"></div>
                <p>平台运营时间</p>
                <p>993天</p>
            </section>
        </li>-->
      </ul>
    </div>
    <div>
      <img
        src="../../../../assets/images/inform/know-us/know-us4.png"
        class="max_img">
    </div>
    <div>
      <img
        src="../../../../assets/images/inform/know-us/know-us5.png"
        class="max_img">
    </div>
    <!-- <div><img src="../../../../assets/images/inform/know-us/signature_now.png" class="max_img"></div> -->
    <div class="contact">联系我们</div>
    <ol class="ol_bot">
      <li>服务热线：400-85-666-85</li>
      <li>服务时间：9:00–18:00</li>
      <li>微信公众号：拓道金服</li>
      <li>公司地址：杭州市西湖区中节能西溪首座B2裙楼</li>
    </ol>
  </div>
</template>
<script>
import img1 from '../../../../assets/images/inform/know-us/ll.png'
import img2 from '../../../../assets/images/inform/know-us/zlj.png'
import img3 from '../../../../assets/images/inform/know-us/fxy.png'
export default {
  metaInfo: {
    title: '了解我们'
  },
  data() {
    return {
      imgs: {
        src1: img1,
        src2: img2,
        src3: img3
      },
      show: 2
    }
  },
  methods: {
    itemIndex(index) {
      this.show = index
    }
  }
}
</script>
<style lang="stylus" scoped>
  .knowUs
    padding-top: 88px
    background: #45aeff
    font-family:"微软雅黑"
    -webkit-text-size-adjust:none
    color: #a8afb3
    .team
      background:url(../../../../assets/images/inform/know-us/team.png) no-repeat
      background-size: 100%
      margin-bottom: 30px
      height: 643px
      padding:90px 5% 0
      h2
        color: $color-gray1
        font-size: $fontsize-large-x
        margin: 0
        padding: 0
        font-weight: bold
        b
          display: block
          font-size: $fontsize-large-x
          font-weight: normal
          margin-top: 10px
  div img
    margin-bottom: 30px
  div.data
    background:url(../../../../assets/images/inform/know-us/know-us3.png) no-repeat
    background-size: 100%
    margin-bottom: 30px
    height:400px
    li
      display: flex
    li:first-child
      padding-top:120px
      margin-bottom:20px
    section
      width:50%
      text-align:center
      div img
        width:25%
        padding:0
        margin:0
      p
        line-height:40px
        padding:0
        margin:0
        font-size:$fontsize-medium
      p:last-child
        color:#ff411c
  .sc-content
    color: $color-gray1
    font-size: $fontsize-small-ss
    text-align:left
    padding: 0 10px
    margin-top: 10px
    line-height:36px
    h2
      font-weight: bold
      text-align: center
    p
      margin-top: 10px
  div.contact
    font-size: $fontsize-large-xxxx
    color: $color-white
    padding: 0 10px
    text-align: center
    margin-bottom:10px
  ol li
    font-size: $fontsize-small-s
    color: $color-white
    padding: 0 5%
    line-height: 40px
    margin-bottom: 5px
  .ol_bot
    padding-bottom: 40px
  .max_img
    width: 100%
</style>
