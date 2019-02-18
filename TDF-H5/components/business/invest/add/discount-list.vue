<template>
  <div class="disBox">
    <div class="disList">
      <div class="listTop">
        <p class="listTlt">
          <b>提醒：单笔出借仅限使用1张优惠券</b>
          <span @click="closeList">
            <i v-if="selectVal != null">确认</i>
            <i v-else>关闭</i>
          </span>
        </p>
        <p class="listTab">
          <span 
            :class="tabCom==='Voucher' ? 'on':''" 
            @click="showFn('Voucher')">抵用券</span>
          <span 
            :class="tabCom==='Interest' ? 'on':''" 
            @click="showFn('Interest')">加息券</span>
        </p>
      </div>
      <div 
        :is="tabCom" 
        :disType="type" 
        :disId="selectId" 
        :money="moneys"
        :period="periods"
        @listFn="selectFn"/>
    </div>
    <div class="shade"/>
  </div>
</template>

<script>
import Voucher from './list-voucher.vue'
import Interest from './list-interest.vue'
export default {
  props: {
    disId: {
      type: String,
      default: ''
    },
    disType: {
      type: String,
      default: ''
    },
    disTxt: {
      type: String,
      default: ''
    },
    moneys: {
      type: String,
      default: ''
    },
    periods: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabCom: 'Voucher',
      selectVal: null,
      selectId: null,
      voucherId: null,
      type: null
    }
  },
  created() {
    this.selectVal = this.disTxt
    this.selectId = this.disId
    this.type = this.disType
    if (this.disType != null) {
      this.tabCom = this.disType
      console.log(this.disType)
    }
  },
  mounted() {},
  methods: {
    showFn(a) {
      this.tabCom = a
    },
    selectFn(...data) {
      this.selectVal = data[0]
      this.selectId = data[1]
      this.voucherId = data[2]
      this.type = data[3]
    },
    closeList() {
      this.$emit(
        'colseFn',
        this.selectVal,
        this.selectId,
        this.voucherId,
        this.type
      )
    }
  },
  components: {
    Voucher,
    Interest
  }
}
</script>

<style lang="stylus" scoped>
.disBox
  .disList
    height: 60%
    position: fixed
    bottom: 0
    left: 0
    right: 0
    z-index: 999
    background-color: $color-white
    .listTop
      position: absolute
      top: 0
      left: 0
      right: 0
    .listTlt
      line-height: 78px
      background-color: $color-background
      padding: 0 30px
      overflow: hidden
      b
        font-size: $fontsize-medium 
        color: $color-gray3
        float: left
      span
        font-size: $fontsize-large-xx
        color: $color-primary
        float: right
    .listTab
      display: flex
      border-bottom: 2px solid $color-gray5
      line-height: 88px
      span
        flex: 1
        text-align: center
        font-size: $fontsize-large-xx
        color: $color-gray3
        background-color: $color-white
      .on
        border-bottom: 4px solid $color-primary
        color: $color-primary
    .list
      position: absolute
      top: 166px
      left: 0
      right: 0
      bottom: 0
      overflow: auto
      ul
        padding: 10px 30px 30px
        li
          border-bottom: 1px solid $color-gray5
          padding: 28px 0
          display: flex
          align-items: center
          div
            display: inline-block
            font-size: $fontsize-small-ss
            color: $color-gray3
            flex: 1
            text-align: left
            p:nth-child(1)
              color: $color-gray1
              padding-bottom: 5px
              b
                font-size: $fontsize-large-xxxxxx
          span
            display: inline-block
            color: $color-gray3
            flex: 1
            text-align: right
          .on
            color: $color-primary
        li:last-child
          border: none
  .shade
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.5)
    z-index: 99          
</style>
