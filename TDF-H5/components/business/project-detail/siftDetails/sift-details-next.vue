<template>
  <div class="sift">
    <div class="tab">
      <cube-tab-bar
        ref="tabNav"
        v-model="selectedLabel"
        :use-transition="disabled"
        :data="tabLabels"
        show-slider/>
    </div>
    <div class="content">
      <cube-slide
        ref="slide"
        :loop="loop"
        :initial-index="initialIndex"
        :auto-play="autoPlay"
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
              class="free_intro">
              <div class="free_list summary">
                <div class="deatils_title"><span/>项目概述</div>
                <div class="summary_list">
                  <div>
                    <p><span/>省心投介绍：</p>
                    <p>省心投≠计划类产品，且底层散标与省心投的借款周期一致；<br>省心投是本平台推出的自动投标工具。经由出借人授权，通过系统为出借人实现自动投标以提高出借效率。</p>
                  </div>
                  <div>
                    <p><span/>使用规则：</p>
                    <p>加入省心投产品，即享有自动投标的权益。实际标的匹配成功，即行使借款人的出借权益。</p>
                  </div>
                </div>
              </div>
              <div class="free_list carDeta">
                <div class="deatils_title"><span/>车辆信息</div>
                <div class="carDeta_money">
                  <div>
                    <p>预计项目总额</p>
                    <p>{{ amount }}元</p>
                  </div>
                  <div>
                    <p>起投金额</p>
                    <p>{{ minTenderFormat }}元</p>
                  </div>
                  <div>
                    <p>单笔限额</p>
                    <p>{{ amount }}元</p>
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
                    <p>系统会根据出借时间和标量进行先后匹配，处于冻结中未匹配的资金不计息。</p>
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
              class="free_comp">
              <div class="deatils_title"><span/>保障措施</div>
              <div class="summary_list">
                <div>
                  <p><span/>业务保障：</p>
                  <p>汽车抵押借贷具有实物抵押保障、借款金额少、周期短等 显著优势。 </p>
                </div>
                <div>
                  <p><span/>风控保障：</p>
                  <p>通过详尽的贷前审查、谨慎的贷中排查、完善的贷后跟踪， 进行严格的风险控制，把风险控制渗入每一个环节中。坚 持追求所有标的真实、有效，可追溯、可审查。 </p>
                </div>
                <div>
                  <p><span/>平台保障：</p>
                  <p>卓越的系统架构：使用稳定高效的阿里云服务器，采用双 服务器运行，每15分钟自动备份保存平台数据； <br >管理标准：人员、制度、系统、运营均具备完善的管理标 准体系。 </p>
                </div>
              </div>
            </div>
          </cube-scroll>
        </cube-slide-item>
        <cube-slide-item>
          <cube-scroll
            v-if="items.length>0"
            ref="joinScroll"
            :scrollEvents="['scroll']"
            :options="options"
            :data="items"
            class="moudle3"
            @scroll="onScroll"
            @pulling-down="onPullingDown"
            @pulling-up="onPullingUp">
            <p class="topTxt">{{ pullTxt }}</p>
            <div class="scatter_item">
              <ul
                id="borrow_record"
                class="borrow_record">
                <li
                  v-for="(item,index) in items"
                  :key="index">
                  <div>{{ item.mobile }}</div>
                  <div>
                    <p>{{ item.amountFormat }}</p>
                    <p>{{ item.addTimeFormat }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </cube-scroll>

          <data-status
            v-else
            status="null"
            statusTxt="暂无内容"/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { findIndex } from '../../../src/common/util.js'
import { commenParams } from '~/api/config.js'
import { joinList } from '~/api/project.js'
let pageNum = 1
export default {
  created() {
    this.getJoinList()
  },
  data() {
    return {
      selectedLabel: '项目介绍',
      disabled: false,
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
      loop: false,
      autoPlay: false,
      showDots: false,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      secondStop: 26,
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
      pageNum = 1
      setTimeout(() => {
        this.$emit('pullFn')
      }, 100)
    },
    onPullingUp() {
      pageNum++
      console.log(this.pages)
      console.log(`当前：${pageNum}`)
      console.log('\\\\\\\\\\\\')
      // yccVXW3ncug%3D
      // console.log(encodeURIComponent(this.$route.params.id))
      // // 更新数据
      setTimeout(async () => {
        if (pageNum <= this.pages) {
          // 如果有新数据
          const { content } = await joinList(this.$axios, {
            desId: encodeURIComponent(this.$route.params.id),
            page: pageNum,
            item: 10
          })
          this.$store.commit('project/joinList', content)
        } else {
          // 如果没有新数据
          this.$refs.joinScroll.forceUpdate()
        }
      }, 1000)
    },
    async getJoinList() {
      // console.log(encodeURIComponent(this.$route.params.id))
      const { content } = await joinList(
        this.$axios,
        {
          desId: encodeURIComponent(this.$route.params.id),
          page: 1,
          item: 10
        },
        commenParams
      )
      this.$store.commit('project/joinListNull')
      if (content != undefined) {
        this.$store.commit('project/joinList', content)
      }
      // console.log(content)
    },
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
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
    ...mapState({
      amount: state => state.project.freeDetail.amount,
      minTenderFormat: state => state.project.freeDetail.minTenderFormat,
      items: state => state.project.joinList,
      pages: state => state.project.joinListPages
    })
  },
  components: {}
}
</script>
<style lang="stylus" scoped>
.sift
  padding: 88px 0 100px
  overflow-x: hidden
  overflow-y: auto
  height: 100%
  width: 100%
  .tab
    line-height: 88px
    background-color: $color-white
    text-align: center
    font-size: $fontsize-medium
    border-bottom: 1px solid $color-gray5
    /deep/ .cube-tab-bar
      height: 0.88rem
      .cube-tab-bar-slider
        width: 50px
        margin-left: 95px
  .content
    position: fixed
    top: 176px
    left: 0
    right: 0
    bottom: 100px
    white-space: normal
    /deep/ .cube-slide-group
      white-space: normal
    .topTxt
      font-size: $fontsize-small-ss
      color: $color-gray4
      text-align: center
      line-height: 60px
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
    .moudle1
      .free_list
        background-color: $color-white
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
    .moudle2
      .free_comp
        background-color: $color-white
        padding-bottom: 0.35rem
        .summary_list div:nth-child(2)
          padding-bottom: 0
      /deep/ .cube-pullup-wrapper
        display: none
      /deep/ .cube-pulldown-wrapper
        display: none
    .moudle3
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
      // /deep/ .cube-pullup-wrapper
      //   display: none
      /deep/ .cube-pulldown-wrapper
        display: none
</style>
