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
          <span :class="tabCom==='Voucher' ? 'on':''" @click="showFn('Voucher')">抵用券</span>
          <span :class="tabCom==='Interest' ? 'on':''" @click="showFn('Interest')">加息券</span>
        </p>
      </div>
      <div :is="tabCom" @listFn="selectFn" :disType="type" :disId="selectId"></div>
    </div>
    <div class="shade"></div>
  </div>
</template>

<script>
import Voucher from './list-voucher.vue'
import Interest from './list-interest.vue'
export default {
  props: ['disId', 'disType', 'disTxt'],
  data () {
    return {
      tabCom: 'Voucher',
      selectVal: null,
      selectId: null,
      type: null
    }
  },
  created () {
    this.selectVal = this.disTxt
    this.selectId = this.disId
    this.type = this.disType
    if (this.disType != null) {
      this.tabCom = this.disType
      console.log(this.disType)
    }
  },
  mounted () {
  },
  methods: {
    showFn (a) {
      this.tabCom = a
    },
    selectFn (...data) {
      this.selectVal = data[0]
      this.selectId = data[1]
      this.type = data[2]
    },
    closeList () {
      this.$emit('colseFn', this.selectVal, this.selectId, this.type)
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
    background-color: #fff
    .listTop
      position: absolute
      top: 0
      left: 0
      right: 0
    .listTlt
      line-height: 78px
      background-color: #F2F3F7
      padding: 0 30px
      overflow: hidden
      b
        font-size: 28px
        color: #999
        float: left
      span
        font-size: 32px
        color: #F97C3C
        float: right
    .listTab
      display: flex
      border-bottom: 2px solid #E8E8E8
      line-height: 88px
      span
        flex: 1
        text-align: center
        font-size: 32px
        color: #999
        background-color: #fff
      .on
        border-bottom: 4px solid #F97C3C
        color: #F98C55
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
          border-bottom: 1px solid #e8e8e8
          padding: 28px 0
          display: flex
          align-items: center
          div
            display: inline-block
            font-size: 24px
            color: #999
            flex: 1
            text-align: left
            p:nth-child(1)
              color: #333
              padding-bottom: 5px
              b
                font-size: 48px
          span
            display: inline-block
            color: #999
            flex: 1
            text-align: right
          .on
            color: #F97C3C
        li:last-child
          border: none    
</style>
