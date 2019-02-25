<template>
  <div class="scatter">
    <div class="box">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
      <div class="content">
        <cube-slide
          ref="slide"
          :loop="false"
          :showDots="false"
          :initial-index="initialIndex"
          :auto-play="false"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <cube-slide-item>
            <cube-scroll
              :scrollEvents="['scroll']"
              :options="options"
              class="moudle1"
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
                    <p><span><i>姓名</i><b>{{ data.realname }}</b></span><span><i>年龄</i><b>{{ data.age }}</b></span></p>
                    <p><span><i>性别</i><b>{{ data.sex }}</b></span><span><i>籍贯</i><b>{{ data.census }}</b></span></p>
                    <p><span><i>职业</i><b>{{ data.job }}</b></span><span><i>学历</i><b>{{ data.education }}</b></span></p>
                    <p><span><i>婚姻状况</i><b>{{ data.marriage }}</b></span></p>
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
                        <p>主要从事{{ data.repaySource }}，借款期间无重大支出，信誉状况良好，无不良记录</p>
                      </li>
                      <li>
                        <div>生产经营状况：</div>
                        <p>借款人从事{{ data.repaySource }}，现业务运转正常</p>
                      </li>
                      <li>
                        <div>借款用途及还款来源：</div>
                        <p>借款人因经营需要，申请借款{{ data.account }}元，用于经营流动。还款来源为{{ data.repaySource }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="car_info">
                  <div class="title">
                    <span/> 车辆信息
                  </div>
                  <div class="info_details">
                    <p><span><i>车辆品牌</i><em>{{ data.carBrand }}</em></span><span><i>车辆估价</i><em>{{ data.secondCarPrice }}</em></span></p>
                    <p><span><i>购买价格</i><em>{{ data.buyPrice }}</em></span><span><i>行驶公里</i><em>{{ data.driveKilometers }}公里</em></span></p>
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
                      <div class="view-wrapper">
                        <div class="imgs-container">
                          <img
                            v-for="(img, index) in imgs"
                            :src="img"
                            :key="img"
                            @click="showHello(index)">
                        </div>
                      </div>
                    </cube-scroll>
                  </div>
                </div>
                <div class="store_info">
                  <div class="title">
                    <span/> 门店信息
                  </div>
                  <div class="img_area">
                    <img
                      :src="data.imgUrlStr"
                      alt="" >
                  </div>
                  <p class="name"><i class="iconfont">&#xe839;</i>门店名称: <span>{{ data.storeName }}</span></p>
                  <p class="addr"><i class="iconfont">&#xe838;</i>地址: <span>{{ data.storeRemark }}</span></p>
                  <p class="call"><i class="iconfont">&#xe837;</i>联系电话: <a href="tel:400-85-666-85">{{ data.storePhone }}</a></p>
                </div>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll
              :scrollEvents="['scroll']"
              :options="options"
              class="moudle2"
              @scroll="onScroll"
              @pulling-down="onPullingDown">
              <p class="topTxt">{{ pullTxt }}</p>
              <div
                class="scatter_item">
                <div class="safeguard_step">
                  <div class="title">
                    <span/> 保障措施
                  </div>
                  <div class="step_info">
                    <p>1.车辆完成合法抵押手续；</p>
                    <p>2.车辆在车管所进行登记并安装Gps追踪器，由风控部门进行全程监控；</p>
                    <p> 3.多家专业车辆评估机构对比评估，保证评估价格合理；</p>
                    <p> 4.电话核实商业保单正常；</p>
                    <p> 5.如借款人在借款期间，出现征信异常将通过站内信的方式给予出借人提示。</p>
                  </div>
                </div>
                <div class="money_mange">
                  <div class="title">
                    <span/> 资金分账管理
                  </div>
                  <div class="mange_info">
                    拓道金服坚守信息中介平台定位，不设资金池。实现平台自有资金与用户资金的账户分设管理和风险隔离，平台与会员资金交易变动交由银行进行管理与监督，平台无法接触交易资金。
                  </div>
                </div>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll
              :scrollEvents="['scroll']"
              :options="options"
              class="moudle3"
              @scroll="onScroll"
              @pulling-down="onPullingDown">
              <p class="topTxt">{{ pullTxt }}</p>
              <div
                v-if="items.length>0"
                class="scatter_item">
                <ul
                  id="borrow_record"
                  class="borrow_record">
                  <li
                    v-for="(item,index) in items"
                    :key="index">
                    <div>{{ item.username }}</div>
                    <div>
                      <p>{{ item.accountTender }}</p>
                      <p>{{ item.addtime }}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <data-status
                v-else
                status="null"
                statusTxt="暂无内容"/>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
  </div>
</template>
<script>
import { findIndex } from '~/components/src/common/util.js'

export default {
  data() {
    return {
      selectedLabel: '项目介绍',
      disabled: true,
      tabLabels: [
        {
          label: '项目介绍'
        },
        {
          label: '透明合规'
        },
        {
          label: '出借记录'
        }
      ],
      showDots: false,
      slideOptions: {},
      showIndex: 0,
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
  mounted() {
    this.slideOptions = {
      scrollX: true
    }
  },
  methods: {
    showHello(index) {
      this.showIndex = index
      const params = {
        $props: {
          imgs: this.imgs,
          showIndex: 'initialIndex', // 响应式数据的key名
          loop: false
        },
        $events: {
          change: i => {
            // 必须更新 showIndex
            this.showIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },
    stopHor() {
      this.$refs.slide.refresh()
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
        this.$emit('pullFn')
      }, 100)
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
      // console.log(current)
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = (x / slideScrollerWidth) * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    }
  },
  computed: {
    initialIndex() {
      let index = 0
      index = findIndex(
        this.tabLabels,
        item => item.label === this.selectedLabel
      )
      return index
    },
    data() {
      return this.$store.state.project.scatterDetail
    },
    imgs() {
      let imgs = this.data.imgUrlStr.split('|')
      return imgs
    },
    items() {
      return this.$store.state.project.scatterDetail.dataRows
    }
  }
}
</script>
<style lang="stylus" scoped>
.scatter
  position: fixed
  bottom: 0
  left: 0
  right: 0
  top: 88px
  .box
    display: flex
    flex-direction: column
    height: 100%
    /deep/ .cube-tab-bar
      display: flex
      justify-content: center
      height: 88px
      .cube-tab
        line-height: 88px
        background-color: $color-white
        font-size: $fontsize-medium
      .cube-tab-bar-slider
        width: 50px
        margin-left: 95px
  .content
    flex: 1
    overflow: hidden
    z-index: 1
    /deep/ .cube-slide-group
      white-space: normal
      z-index: 1
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
    .moudle1
      .view-wrapper
        width: 100%
        .imgs-container
          > img
            width: 200px
            height: 100px
            margin: 0 10px 16px 10px
            border-radius: 4px
        .tips
          margin-top 50px
          text-align center
          font-size 30px
          color #222
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
      .scatter_item
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
    .moudle2
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
      .scatter_item
        .safeguard_step
          .step_info
            height: 342px
            padding: 24px 51px 7px 31px
            font-size: $fontsize-small-s
            color: $color-gray1
            border-bottom: 20px solid $color-background
            p
              line-height: 40px
              text-align: justify
        .money_mange
          .mange_info
            padding: 24px 30px
            font-size: $fontsize-small-s
            color: $color-gray1
            line-height: 40px
      /deep/ .cube-pullup-wrapper
        display: none
      /deep/ .cube-pulldown-wrapper
        display: none
    .moudle3
      .scatter_item
        .borrow_record
          margin-bottom: 100px
          border-bottom: 20px solid $color-background
          li
            margin: 0 30px
            height: 137px
            border-bottom: 1px solid $color-gray7
            font-size: $fontsize-medium
            color: $color-gray1
            display: flex
            justify-content: space-between
            align-items: center
            &:last-child
              border:none
            div:nth-child(2)
              text-align: right
            p
              line-height: 40px
            p:nth-child(2)
              font-size: $fontsize-small-sss
              color: $color-gray3
            span
              display: inline-block
              vertical-align: middle
              width: 60px
              height: 30px
              zoom: 0.5
      /deep/ .cube-pullup-wrapper
        display: none
      /deep/ .cube-pulldown-wrapper
        display: none
</style>
