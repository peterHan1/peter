<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">出借回款</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.出借后什么时候开始计息？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>满标复审后开始计息。</p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.如何查看出借合同？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>出借成功后会生成电子合同，可在【我的账户】—【我的出借】— 出借记录详情页查看。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.一次出借可以使用几张优惠券？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>一笔出借只能使用一张优惠券。</p>
          </div>
        </li>
        <li>
          <a @click="active4 = !active4">
            <span class="fl">4.手动投标时候标的还有资金，为什么出借不出去？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>同一个项目，有可能多人同时在出借，当剩余可投金额少于用户的输入金额时，系统会提示您无法出借。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">5.项目到期，如何还款？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>还款方式根据项目种类不同，分为如下两种：</p>
            <p>1）按月付息，到期还本：收益会在付息日当天到达您的资金账户，本金是在到期当天。</p>
            <p>2）等额本息：根据期限，每期还款相同的金额，期满全部还清。每期归还部分本金和收益，因本金在每期都会有归还，已归还的部分本金在之后将不再计息。</p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">6.借款人逾期了怎么办，本息什么时候回来？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>借款人一旦逾期不还，将由线下专门的风控部门进行催收，变现资产，在回款当日返回到出借人的账户里。</p>
          </div>
        </li>
        <li>
          <a @click="active7 = !active7">
            <span class="fl">7.什么是新手标？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>拓道金服针对在本平台暂未出借过的新用户设立的项目，享受3%的额外加息奖励，主要是为了让新用户体验充值、出借等环节，也是平台对新用户出借的一种奖励。</p>
          </div>
        </li>
        <li>
          <a @click="active8 = !active8">
            <span class="fl">8.什么是自动标？</span>
            <i class="iconfont fr" :class="{deg: active8}">&#xe6a3;</i>
          </a>
          <div v-show="active8">
            <p>拓道金服为了避免用户资金闲置，由用户预先设定投标规则，可以在无需自己操作的情况下系统按用户设定自动代为投标的项目。</p>
          </div>
        </li>
        <li>
          <a @click="active9 = !active9">
            <span class="fl">9.什么是积分标？</span>
            <i class="iconfont fr" :class="{deg: active9}">&#xe6a3;</i>
          </a>
          <div v-show="active9">
            <p>是拓道金服为出借用户专门设定的积分奖励项目，出借该标的用户可以获得基础积分倍数奖励。</p>
          </div>
        </li>
        <li>
          <a @click="active10 = !active10">
            <span class="fl">10.手动标发布时间？</span>
            <i class="iconfont fr" :class="{deg: active10}">&#xe6a3;</i>
          </a>
          <div v-show="active10">
            <p>1、每日10：00 、11：30、13：30、15：00、17：00、20：00为发标时间。</p>
            <p>2、可以手动购买相关标的，主要包含新手标、活动标、积分标等特殊标（数量较少）。</p>
          </div>
        </li>
        <li>
          <a @click="active11 = !active11">
            <span class="fl">11.今天标到期了，什么时候回款呢？</span>
            <i class="iconfont fr" :class="{deg: active11}">&#xe6a3;</i>
          </a>
          <div v-show="active11">
            <p>拓道金服所有的项目都是真实借款标的，是根据线下借款人的还款时间，来进行回款的。回款为当天内到账，可关注手机短信通知，回款时间是从早上8：30开始，一直到24：00结束，陆续回款的，请您耐心等待。</p>
          </div>
        </li>
        <li>
          <a @click="active12 = !active12">
            <span class="fl">12.标的提前还款，怎么计息呢？</span>
            <i class="iconfont fr" :class="{deg: active12}">&#xe6a3;</i>
          </a>
          <div v-show="active12">
            <p>提前还款的时间距离上一个回款日，大于15天，出借人可收到30天的利息；小于等于15天，出借人可收到15天的利息。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '出借回款'
  },
  data () {
    return {
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false,
      active8: false,
      active9: false,
      active10: false,
      active11: false,
      active12: false
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
    padding-top: 0.88rem
    overflow: hidden
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