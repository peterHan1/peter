<template>
  <cube-scroll
    :scrollEvents="['scroll']"
    :options="options"
    @scroll="onScroll"
    @pulling-down="onPullingDown">
    <p class="topTxt">{{ pullTxt }}</p>
    <div
      class="scatter_item introduce">
      <div class="loan_info">
        <div class="title">
          <span/> 借款人信息
        </div>
        <div class="info_details">
          <p><span><i>姓名</i><b>张**</b></span><span><i>年龄</i><b>46</b></span></p>
          <p><span><i>性别</i><b>男</b></span><span><i>籍贯</i><b>河南</b></span></p>
          <p><span><i>职业</i><b>个体</b></span><span><i>学历</i><b>大专</b></span></p>
          <p><span><i>婚姻状况</i><b>已婚</b></span></p>
        </div>
      </div>
      <div class="item_overview">
        <div class="title">
          <span/> 项目概述
        </div>
        <div class="overview_info">
          <ul>
            <li>
              <div>风险评估：</div>
              <p>项目风险评估结果：A</p>
            </li>
            <li>
              <div>征信报告：</div>
              <p>该借款人征信报告中无逾期记录，符合风控要求；</p>
            </li>
            <li>
              <div>基本状况：</div>
              <p>主要从事个体行业，借款期间无重大支出，信誉状况良好，无不良记录</p>
            </li>
            <li>
              <div>生产经营状况：</div>
              <p>借款人从事个体行业，现业务运转正常</p>
            </li>
            <li>
              <div>借款用途及还款来源：</div>
              <p>借款人因经营需要，申请借款2000000元，用于经营流动。还款来源为经营收入</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="car_info">
        <div class="title">
          <span/> 车辆信息
        </div>
        <div class="info_details">
          <p><span><i>车辆品牌</i><em>宝马X3</em></span><span><i>车辆估价</i><em>200000</em></span></p>
          <p><span><i>购买价格</i><em>300000</em></span><span><i>行驶公里</i><em>31217公里</em></span></p>
        </div>
      </div>
      <div class="check_information">
        <div class="title">
          <span/> 审核资料
        </div>
        <div class="information_pic">
          <cube-scroll
            ref="scroll"
            :options="optionsH"
            :scrollEvents="['scroll']"
            direction="horizontal"
            class="horizontal-scroll-list-wrap "
            @scroll="stopHor">
            <ul class="list-wrapper">
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
              <li><img
                src="http://upload-images.jianshu.io/upload_images/1455933-e9e2967f4988eb7f.JPG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240"
                @click="bigImg"></li>
            </ul>
          </cube-scroll>
        </div>
      </div>
      <div class="store_info">
        <div class="title">
          <span/> 门店信息
        </div>
        <div class="img_area">
          <img
            src="~/assets/images/invest/store.png"
            alt="" >
        </div>
        <p class="name"><i class="iconfont">&#xe839;</i>门店名称: <span>嘉兴桐乡店</span></p>
        <p class="addr"><i class="iconfont">&#xe838;</i>地址: <span>浙江省嘉兴市桐乡市银菊路6-10号</span></p>
        <p class="call"><i class="iconfont">&#xe837;</i>联系电话: <a href="tel:400-85-666-85">400-85-666-85</a></p>
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
        }
      },
      optionsH: {
        scrollX: true
      },
      pullTxt: '下拉释放，返回标的信息',
      pullY: ''
    }
  },
  methods: {
    bigImg() {
      this.$emit('bigImg')
    },
    stopHor() {
      this.$emit('stopHor')
    },
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
.title
  width:100%
  height: 70px
  line-height: 70px
  font-size: $fontsize-medium
  color: $color-gray1
  border-bottom: 1px solid $color-gray7
  span
    display: inline-block
    width: 6px
    height: 24px
    background-color: $color-primary
    border-radius: 4px
    margin: 0 14px 0 30px
    vertical-align: middle
.topTxt
  font-size: $fontsize-small-ss
  color: $color-gray4
  text-align: center
  line-height: 60px
.scatter_item
  width: 100%
  background-color: $color-white
  .info_details
    width: 100%
    border-bottom: 20px solid $color-background
    padding: 24px 0 15px
    p
      line-height: 37px
      font-size: $fontsize-small-s
      padding: 0 30px
      margin-bottom: 12px
      display: flex
    span
      flex: 1
      i
        margin-right: 47px
        color: $color-gray3
      b
        color: $color-gray1
  .item_overview
    overflow: hidden
    .overview_info
      width:100%
      padding: 25px 0 10px
      border-bottom: 20px solid $color-background
      .ts
        margin: 15px 40px 0 40px
        font-size: $fontsize-small-ssss
        color: $color-gray3
      ul
        padding: 0 40px 0 53px
      li
        position: relative
        margin-bottom: 16px
        &:after
          content: ""
          display: block
          position: absolute
          width: 8px
          height: 8px
          border-radius: 8px
          background-color: $color-primary
          left: -25px
          top: 18px
        div
          font-size: $fontsize-small-s
          color: $color-gray3
          margin-bottom: 7px
          line-height: 37px
        p
          font-size: $fontsize-small-s
          color: $color-gray1
          line-height: 37px
  .car_info
    overflow: hidden
    .info_details
      width:100%
      border-bottom: 20px solid $color-background
      em
        color: $color-gray1
        font-style: normal
  .check_information
    width: 100%
    overflow: hidden
    border-bottom: 20px solid $color-background
    .information_pic
      padding: 30px 20px
      white-space: nowrap
      .horizontal-scroll-list-wrap
        align-items: center
        display: flex
      ul
        display: inline-block
      li
        display: inline-block
        width: 190px
        height: 142px
        margin-right: 20px
        img
          width: 100%
          height: 100%
  .store_info
    width: 100%
    overflow: hidden
    border-bottom: 100px solid $color-background
    .img_area
      padding: 30px 30px 23px
      img
        width: 100%
        height: 388px
    p
      line-height: 40px
      margin-bottom: 17px
      font-size: $fontsize-small-s
      color: $color-gray3
      padding-left: 30px
      span
        color: $color-gray1
      a
        color: $color-primary
      i
        color: $color-primary
        margin-right: 20px
/deep/ .cube-pullup-wrapper
  display: none
/deep/ .cube-pulldown-wrapper
  display: none
</style>
