<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">债权转让</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a @click="active1 = !active1">
          <span class="fl">1.什么是债权转让？</span>
          <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
          <p>债权转让，指出借人将在拓道金服出借的借款项目转让给其他拓道金服用户，并与承接人签订债权转让协议，收回本金和收益的操作。</p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.债权如何转让？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>A:网页端：点击右上角【我的账户】；转跳页面点击左方【我的债权】→【转让债权】选择【可转让的债权】。</p>
            <p>B:手机端：点击下方【资产】；转跳页面点击【我的债权】，点击“可转让”选择债权进行转让。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.债权转让必须符合哪些条件？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>(1) 只有等额本息的标才能申请债权转让。</p>
            <p>(2) 可转让日期为当投标成功，满标复审计息开始30天，可以提出债权转让；承接人持有购买债权，超过30天，才可再次转让。</p>
            <p>(3) 转让时间必须大于距离下一个还款日≥7天。</p>
            <p>(4) 债权转让交易未完成时，借款人提前还款，则自动退标。</p>
            <p>(5) 必须一次性转让所有债权，不能转让部分。</p>
            <p>(6) 转让过的债权可以继续转让，且转让次数不受限制。</p>
            <p>(7) 申请通过的债权转让有48个小时的转让时间，超过时间未完成转让的则做退标处理。</p>
            <p>(8) 债权转让金额必须≥100元。</p>
          </div>
        </li>
        <li>
          <a @click="active4 = !active4">
            <span class="fl">4.债权转让手续费如何收取？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>转让手续费：</p>
            <p>持有＜90天，收取0.5%转让金额手续费；</p>
            <p>持有≥90天，收取0.2%转让金额手续费；</p>
            <p>（最低为1元）；</p>
            <p>ps：转让手续费奖励给承接人，且一次性到账。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">5.单个债权转让标的允许多人出借吗？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>允许。当有多个承接人时，按出借本金比例分配当期未来收益及剩余期数收益。</p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">6.承接人的收益如何计算？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>转让金额以剩下期限，按照等额本息的计算方式获得收益。</p>
          </div>
        </li>
        <li>
          <a @click="active7 = !active7">
            <span class="fl">7.购买债权时有哪些注意事项？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>(1) 如果转让人使用过加息券，转让当月持有天数的收益会进行计算，在转让成功后，平台会对加息券产生的收益进行发放；</p>
            <p>(2) 承接人可以使用加息券。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '债权转让'
  },
  data () {
    return {
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false
    }
  },
  methods: {
    navRightFn () {
      this.$router.push('/found/help/suggestion')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .help
    font-size:0.28rem
    overflow: hidden
    padding-top: 0.88rem
    .fl
      float:left
    .fr
      float:right
  .help_bot
    margin:0.2rem 0 1.23rem
    li
      a
        background-color:white
        display:block
        border-bottom: 1px solid #e4e4e4
        height:0.8rem
        line-height:0.8rem
        font-size:0.24rem
        color:#626262
        padding:0 0.3rem
        .iconfont
          -webkit-transition:.3s
          -moz-transition: .3s
          -ms-transition: .3s
          -o-transition: .3s
          transition: .3s
        .deg
          -webkit-transform:rotate(180deg)
          -moz-transform:rotate(180deg)
          -ms-transform:rotate(180deg)
          -o-transform:rotate(180deg)
          transform:rotate(180deg)
          -webkit-transition:.3s
          -moz-transition: .3s
          -ms-transition: .3s
          -o-transition: .3s
          transition: .3s
      div
        font-size:0.24rem
        color:#626262
        padding:0.22rem 0.3rem
        p
          line-height:0.4rem
          text-align: justify
</style>