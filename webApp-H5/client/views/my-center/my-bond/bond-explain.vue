<template>
  <div class="cashBox">
    <Header :navLeftTxt="'icon'">转让说明</Header>
    <div class="con_main">
      <ul>
        <li @click="clickFn('one')" :class="flag.one?'on':''">
          <p>1.什么是债权转让？<i class="iconfont">&#xe6c6;</i></p>
          <div>债权转让，指出借人将在本平台出借的借款项目转让给其他本平台用户，并与承接人签订债权转让协议，收回本金和收益的操作。</div>
        </li>
        <li @click="clickFn('two')" :class="flag.two?'on':''">
          <p>2.债权转让必须符合哪些条件？<i class="iconfont">&#xe6c6;</i></p>
          <div>
            <p>(1) 只有等额本息的标才能申请债权转让。</p>
            <p>(2) 申请转让时间必须转让人持有&gt;=30天，且距离下一个还款日&gt;=7天；</p>
            <p>(3) 债权转让交易未完成时，借款人提前还款，则自动退标。</p>
            <p>(4) 必须一次性转让所有债权，不能转让部分。</p>
            <p>(5) 转让过的债权可以继续转让，且转让次数不受限制。</p>
            <p>(6) 申请通过的债权转让会有48小时的转让时间，超过时间未完成转让的则做退标处理。</p>
            <p>(7) 债权转让金额必须≥100元。</p>
          </div>
        </li>
        <li @click="clickFn('three')" :class="flag.three?'on':''">
          <p>3.债权转让手续费如何收取？<i class="iconfont">&#xe6c6;</i></p>
          <div>
            <p>转让手续费：</p>
            <p>持有＜90天，收取0.5%转让金额手续费，最低收费1元；</p>
            <p>持有≥90天，收取0.2%转让金额手续费，最低收费1元</p>
            <p>ps：转让手续费奖励给受让人，且一次性到账。</p>
          </div>
        </li>
        <li @click="clickFn('four')" :class="flag.four?'on':''">
          <p>4.单个债权转让标的允许多人出借吗？<i class="iconfont">&#xe6c6;</i></p>
          <div>允许。当有多个承接人时，按出借本金比例分配当期未来收益及剩余期数收益。</div>
        </li>
        <li @click="clickFn('five')" :class="flag.five?'on':''">
          <p>5.承接人的收益如何计算？<i class="iconfont">&#xe6c6;</i></p>
          <div>转让金额以剩下期限，按照等额本息的计算方式获得收益。</div>
        </li>
        <li @click="clickFn('six')" :class="flag.six?'on':''">
          <p>6.购买债权时有哪些注意事项？<i class="iconfont">&#xe6c6;</i></p>
          <div>
            <p>(1) 如果转让人使用过加息券，转让当月持有天数的收益会进行计算，在转让成功后，平台会对加息券产生的收益进行发放；</p>
            <p>(2) 承接人可以继续使用加息券。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      flag: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false,
        six: false
      }
    }
  },
  mounted () {
  },
  methods: {
    clickFn (data) {
      this.flag[data] = !this.flag[data]
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.cashBox
  width: 100%
  padding-top: 88px
  box-sizing: border-box
  position: absolute
  height: 100%
  background-color: #fff
  .con_main
    li
      font-size: 28px
      color: #333
      border-bottom: 1px solid #d8d8d8
      padding: 0 30px
      height: 100px
      overflow: hidden
      .iconfont
        display: inline-block
        font-size: 30px
        color: #666
        float: right
        transition: all 0.3s
      p
        line-height: 100px
      div
        padding:10px 0 30px
        p
          line-height: 40px
          text-align: justify
    .on
      height: auto
      .iconfont
        transform: rotate(90deg);
</style>
