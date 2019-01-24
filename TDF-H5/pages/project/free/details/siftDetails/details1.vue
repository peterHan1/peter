<template>
  <cube-scroll
    :scrollEvents="['scroll']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div 
      class="free_intro">
      <div class="free_list summary">
        <div class="deatils_title"><span/>项目概述</div>
        <div class="summary_list">
          <div>
            <p><span/>省心投介绍：</p>
            <p>省心投是本平台推出的自动投标工具。经由出借人授权，通过系统为出借人实现自动投标以提高出借效率</p>
          </div>
          <div>
            <p><span/>使用规则：</p>
            <p>加入省心投产品，即享有自动投标的权益。实际标的匹配成功，即行使借款人的出借权益</p>
          </div>
        </div>
      </div>
      <div class="free_list carDeta">
        <div class="deatils_title"><span/>车辆信息</div>
        <div class="carDeta_money">
          <div>
            <p>预计项目总额</p>
            <p>2,000,000.00元</p>
          </div>
          <div>
            <p>起投金额</p>
            <p>100.00元</p>
          </div>
          <div>
            <p>单笔限额</p>
            <p>2,000,000.00元</p>
          </div>
        </div>
      </div>
      <div class="free_list issue">
        <div class="deatils_title"><span/>常见问题</div>
        <ul>
          <li>
            <p>1. 省心投是怎么计息的？</p>
            <p>省心投是自动投标工具，只加入省心投未匹配到底层标的资 金不计息；加入省心投匹配底层标的资金，当匹配的底层满 标复审则开始计息。</p>
          </li>
          <li>
            <p>2. 省心投匹配规则？</p>
            <p>系统会根据出借时间、资金性质（是否为已清算资金）和标 量进行先后匹配，处于冻结中未匹配的资金不计息。 备注说明：若周五充值加入省心投，因为该充值资金属于未 清算资金，需等到下一个工作日（周一/法定节假日除外） 清算完毕后，系统才会开始匹配。</p>
          </li>
          <li>
            <p>3. 是否可以及时查看使用省心投出借的标的？</p>
            <p>加入省心投的资金所匹配的每个标的，都可以在相应的出借 详情页查看其具体金额、起止时间以及相关协议。</p>
          </li>
          <li>
            <p>4. 省心投是否可以使用优惠券？</p>
            <p>加息券和抵用券均可以使用。 举例：500000金额加入3个月期限的省心投(3月标年化利率 9%)，若使用3%加息券，则预计所得到期收益=500000* （9%+3%）/12*3=15000元</p>
          </li>
          <li>
            <p>5. 省心投的收益来源是什么？</p>
            <p>省心投仅是自动投标工具，本身并不产生收益，实际收益以 及权益以最终所匹配到的标的为准。</p>
          </li>
          <li>
            <p>6. 通过省心投出借的标的是否可以转让？</p>
            <p>通过省心投所匹配的每一个标的，均可以按照本平台债权转 让规则进行转让。</p>
          </li>
          <li>
            <p>7. 省心投未匹配成功的资金有收益吗？</p>
            <p>未匹配成功的资金不产生收益。</p>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>
<script>
export default {
  data() {
    return {
      options: {
        pullDownRefresh: {
          threshold: 20,
          stop: 0,
          txt: ''
        },
        pullUpLoad: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  methods: {
    onScroll(pos) {
      if (pos.y > 20) {
        this.pullTxt = '松手，返回标的信息'
        this.pullY = pos.y
      } else {
        this.pullTxt = '下拉释放，返回标的信息'
        this.pullY = pos.y
      }
    },
    onPullingDown() {
      setTimeout(() => {
        this.$emit('downFn')
      }, 100)
    }
  }
}
</script>
<style lang="stylus" scoped>
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.free_list
  background-color: $color-white
  .deatils_title
    font-size: $fontsize-medium 
    color: $color-gray1
    height: 0.7rem
    line-height: 0.7rem
    border-bottom: 1px solid #E0E0E0
    padding-left: 0.3rem
    -webkit-box-sizing: border-box
    -moz-box-sizing: border-box
    box-sizing: border-box
    span
      display: inline-block
      width: 0.06rem
      height: 0.24rem
      background-color: $color-primary
      border-radius: 20px
      margin-right: 0.14rem
  .summary_list div
    padding: 0 0.3rem
    p span
      display: inline-block
      width: 0.08rem
      height: 0.08rem
      background-color: $color-primary
      border-radius: 0.08rem
      margin-right: 0.15rem
      position: absolute
      left: 0
      top: 45%
    &:nth-child(1)
      padding-top: 0.07rem
    &:nth-child(2)
      padding-bottom: 0.25rem
    p:nth-child(1)
      font-size: $fontsize-small-s
      color: $color-gray3
      margin-top: 0.17rem
      line-height: 0.37rem
      padding-left: 0.23rem
      position: relative
    p:nth-child(2)
      font-size: $fontsize-small-s
      color: $color-gray1
      line-height: 0.37rem
      margin-top: 0.07rem
      padding-left: 0.23rem
.carDeta
  margin-top: 0.2rem
  .carDeta_money
    padding: 0.07rem 0 0.26rem
    div
      overflow: hidden
      padding: 0 0.3rem
      line-height: 0.37rem
      margin-top: 0.17rem
      p
        font-size: $fontsize-small-s
        &:nth-child(1)
          color: $color-gray3
          float: left
        &:nth-child(2)
          color: $color-gray1
          float: right
.issue
  margin-top: 0.2rem
  ul
    margin-bottom: 30px
    li
      padding: 0 0.3rem
      overflow: hidden
      &:last-child
        padding-bottom: 0.35rem
        border-bottom: 0.2rem solid $color-background
    p
      font-size: $fontsize-small-s
      line-height: 0.4rem
      &:nth-child(1)
        color: $color-gray1
        margin-top: 0.27rem
      &:nth-child(2)
        color: $color-gray3
        margin-top: 0.16rem
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none  
</style>
