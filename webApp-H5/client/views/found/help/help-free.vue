<template>
  <div class="help">
    <Header navLeftTxt="icon" navRightTxt="意见反馈">省心投</Header>
    <div class="help_bot">
      <ul class="content_ul ul_sx">
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.省心投多长时间匹配完成呢？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>省心投匹配时间是1-15个工作日，未匹配资金将在15个工作日自动退回账户余额。省心投正常匹配时间是根据线下标量实际情况来匹配的，一般在1-3个工作日匹配完成，最快当天计息。</p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.加入省心投的资金一般匹配几个标的？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>省心投是自动投标工具，加入的资金由系统进行自动匹配的，一般是匹配单个标的或者多个标的。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.省心投匹配规则？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>系统会根据出借时间和标量进行先后匹配，处于冻结中未匹配的资金不计息。</p>
            </div>
        </li>
        <li>
          <a @click="active4 = !active4">
            <span class="fl">4.省心投是怎么计息的？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>省心投是自动投标工具，只加入省心投未匹配到底层标的资金不计息；加入省心投匹配底层标的资金，当匹配的底层满标复审则开始计息。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">5.省心投的安全性如何？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>省心投仅是高效的自动投标工具，通过省心投匹配的标的，均经拓道金服多层风控把关、严格筛选，并且确保资金与标的一一匹配。</p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">6.省心投发布时间？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>省心投发布会根据每天标的的情况，不定时更新</p>
          </div>
        </li>
        <li>
          <a @click="active7 = !active7">
            <span class="fl">7.省心投的收益来源是什么？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>省心投仅是自动投标工具，本身并不产生收益，实际收益以及权益以最终所匹配到的标的为准。</p>
          </div>
        </li>
        <li>
          <a @click="active8 = !active8">
            <span class="fl">8.通过省心投投资的标的是否可以转让？</span>
            <i class="iconfont fr" :class="{deg: active8}">&#xe6a3;</i>
          </a>
          <div v-show="active8">
            <p>通过省心投所匹配的每一个标的，均可以按照拓道金服债权转让规则进行转让。</p>
          </div>
        </li>
        <li>
          <a @click="active9 = !active9">
            <span class="fl">9.省心投是否要收取管理费用？</span>
            <i class="iconfont fr" :class="{deg: active9}">&#xe6a3;</i>
          </a>
          <div v-show="active9">
            <p>不收取</p>
          </div>
        </li>
        <li>
          <a @click="active10 = !active10">
            <span class="fl">10.是否可以及时查看使用省心投投资的标的？</span>
            <i class="iconfont fr" :class="{deg: active10}">&#xe6a3;</i>
          </a>
          <div v-show="active10">
            <p>加入省心投的资金所匹配的每个标的，都可以在相应的投资详情页查看其具体金额、起止时间以及相关协议。</p>
          </div>
        </li>
        <li>
          <a @click="active11 = !active11">
            <span class="fl">11.省心投未匹配成功的资金有收益吗？</span>
            <i class="iconfont fr" :class="{deg: active11}">&#xe6a3;</i>
          </a>
          <div v-show="active11">
            <p>未匹配成功的资金不产生收益。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '省心投'
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
      active11: false
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
    table
      width:100%
      border-collapse:collapse
      tr
        line-height:0.5rem
      th
        border:1px solid #d8d8d8
        padding:0 0.1rem
      td
        border:1px solid #d8d8d8
        padding:0 0.1rem
    margin:0.2rem 0 1.23rem
    h3
      font-size: 0.28rem
      color: #212a36
      height: 0.8rem
      line-height: 0.8rem
      border-bottom: 1px solid #e4e4e4
      padding:0 0.3rem
      background-color:white
    li a
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
    li
      div
        font-size:0.24rem
        color:#626262
        padding:0.22rem 0.3rem
        p
          line-height:0.4rem
          text-align: justify
        #tables
          text-align: center
          margin: 0.15rem 0
          tr
            line-height: 0.4rem
            th
              color: #333
          th,td
            padding: 0rem
            overflow: hidden
            height: 1.04rem
            vertical-align: middle
          tr p
            text-align: center
      .invest_txt
        font-size:0.2rem
        padding:0
        color:#999
        margin: 0.16rem 0
</style>