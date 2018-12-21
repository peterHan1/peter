<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">自动投标</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.设置自动投标后能投手动标项吗？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>自动标和手动标是分开的，设置自动投标仍然可以投手动标的。</p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.自动投标如何设置？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>APP端：进入拓道APP端→点击发现→自动投标→打开按钮→设置想要的标的信息。</p>
            <p>PC端：点击右上角“我的账户”→“自动投标”→打开开关，点击设置“设置”，</p>
            <p>设置想要的标的信息。</p>
            <p>备注:1.每次投标注金额为最大出借金额，且需要大于100元小于等于99950元。</p>
            <p>2.勾选保留排名后只做排名的保留不出借，且要保留排名账户资金需大于100元。</p>
            <p>3.打散资金后有任何标的剩余资金都将投出，并且重新排队。</p>
            <p>4.手动选择加息券或抵用券，要在加息券或抵用券上勾选后，方可使用。</p>
            <p>5.自动投标设置的开关，在每次开启时需要授权操作。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.保留排名是什么意思？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>当您的账户可用余额大于100元时，勾选了保留排名，只能帮您进行自动投标的排队，但资金不会投出去。</p>
          </div>
        </li>
        <!-- <li>
          <a @click="active4 = !active4">
            <span class="fl">4.为什么我选择有平台奖励，就是投不出去？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>当选择有平台奖励的时候，自动投标系统只会出借有平台奖励的标的。如需投1月标，而1月普通标的年化9%无任何平台奖励（1月标的3%奖励只针对新人标）。所以自动投标不会进入投标状态。建议选择（全部）。</p>
          </div>
        </li> -->
        <li>
          <a @click="active5 = !active5">
            <span class="fl">4.不打散资金是什么意思？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>勾选【不打散资金】后，会按照那您设置的每次投标金额投出，如不勾选【不打散资金】，账户余额会分多笔出借出去，（出借任意一笔资金都会重新排队）。</p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">5.为什么我选择保留排名，我的排名还往后？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>账户余额资金须至少100元，才能进行自动排队。小于100元资金，保留排名功能将无法激活，不能进行有效排队！</p>
          </div>
        </li>
        <!-- <li>
          <a @click="active7 = !active7">
            <span class="fl">7.为什么勾选了手动加息券没有使用成功？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>勾选手动加息券的时候，系统会显示个人账户里面所有加息券，按出借顺序必须点击或勾选才能使用。</p>
          </div>
        </li> -->
        <li>
          <a @click="active8 = !active8">
            <span class="fl">6.我的回款金额怎么投出去了？</span>
            <i class="iconfont fr" :class="{deg: active8}">&#xe6a3;</i>
          </a>
          <div v-show="active8">
            <p>前期设置了自动投标，所以导致后期回款自动投出去了，建议当成功自动投标后，记得关闭自动投标功能。</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '自动投标'
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
      active8: false
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