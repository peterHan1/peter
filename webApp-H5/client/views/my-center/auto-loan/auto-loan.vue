<template>
  <div class="ucAuto">
    <Header :navLeftTxt="'&#xe687;'" @navLeftFn="navLeftFn()">自动投标</Header>
    <div class="on_off">
      <span>自动投标</span>
      <div class="switch" :class="switchBlooe?'switchOn':'switchOff'" @click="openAuto()">
        <div class=""></div>
      </div>
    </div>
    <div class="list" v-if="switchBlooe==false">
        <p>自动投标功能说明</p>
        <ul>
          <li>1.保留排名—当您的账户可用余额大于等于100元时,会帮你主动排队，但即使排名上升到第一名也不能进行投标，如要需要进行投标，则取消保留排名即可。因此如果您暂时资金不足，没有中意的借款项目，只要账户余额有100元就可以选择保留排名，方便下次出借。</li>
          <li>2.不打散资金—自动投标只会按照购买金额整笔投入，不会将购买金额分散依次投入（当标的剩余可投金额小于购买金额将不会投出）。若选择打散资金，账户余额会分多笔出借出去，（出借任意一笔资金都会重新排队）导致加息券的浪费。建议小额资金勾选不打散资金。</li>
          <li>3.账户保留金额—当在账户保留金额中输入金额后，若购买金额和保留金额之和大于账户余额，则优先保留账户余额，购买金额相应减少。</li>
          <li>4.每次投标金额—在本平台的每个借款项目都是100元起投，所以要设置为整数，并且是50的倍数，最高是99950元。每次投标金额全部投出后，系统会您重新排名，按照每次投标金额继续出借。每次投标金额即使大于账户余额，仍可以投出，实际投出金额为账户余额减去账户保留金额。</li>
          <li>5.账户余额资金须大于等于100元，才能进行自动排队。小于100元资金，保留排名功能将无法激活，不能进行有效排队！</li>
          <li>6.投标序列按照开启自动投标的时间先后进行排序，关闭自动投标后重新开启，投标序列将发生改变，开启时间以重新开启时间为准。</li>
          <li>7.如果标的为定时标，自动投标会在招标开始前5分钟进行。</li>
        </ul>
    </div>
    <div class="select_list" v-else >
      <div class="ranking">
        <p>137/137</p>
        <p>当前排名</p>
      </div>
      <ul>
        <li>
          <span>账户可用余额(元)</span>
          <span class="ucMoney">0</span>
        </li>
        <li @click="rankingFn()">
          <span>保留排名</span>
          <span>不保留<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>每次投标金额(元)</span>
          <input type="number" value="0">
        </li>
        <li>
          <span>是否打散资金</span>
          <span>不打散<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>还款方式</span>
          <span>全部<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>借款期限</span>
          <span>0个月--0个月<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>平台奖励</span>
          <span>全部<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>优惠券</span>
          <span>不使用<i class="iconfont">&#xe83d;</i></span>
        </li>
        <li>
          <span>账户保留金额(元)</span>
          <input type="number" value="0">
        </li>
      </ul>
    </div>
    <Layer v-show="rankingShow">
      <div class="rankingLayer">
        <radio
        title="单选框列表"
        v-model="values"
        :options="['选项A', '选项B', '选项C']">
        </radio>
        <!-- <p @click="rankingNo"><i class="iconfont on">&#xe61e;</i> 不保留</p> -->
        <!-- <p @click="rankingYes"><i class="iconfont">&#xe622;</i> 保留</p> -->
      </div>
    </Layer>
  </div>
</template>

<script>
  import { Radio } from 'mint-ui'
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
      return {
        values: '',
        switchBlooe: true,
        rankingShow: false
      }
    },
    mounted () {
    },
    methods: {
      openAuto () {
        this.switchBlooe = !this.switchBlooe
      },
      rankingFn () {
        this.rankingShow = true
      }
    },
    components: {
      Radio
    }
  }
</script>

<style lang="stylus" scoped>
  .ucAuto
    padding-top: 88px
    box-sizing: border-box
    .on_off
      padding: 0 30px
      background-color: #fff
      font-size: 28px
      color: #333
    .on_off
      margin: 20px 0
      height: 88px
      line-height: 88px
      .switch
        display: inline-block
        float: right
        margin-top: 10px
        width: 90px
        height: 60px
        border: 2px solid #e8e8e8
        border-radius: 100px
        position: relative
        box-sizing: border-box
        background-color: #fff
        div
          display: inline-block
          width: 55px
          height: 55px
          background-color: #fff
          border-radius: 50%
          box-shadow: 1px 1px 5px #999
      .switchOff
        div
          position: absolute
          left: -5px
          top: 0
      .switchOn
        background-color: #ff711c
        div
          position: absolute
          top: 0
          right: -5px
    .list
      padding: 0 30px 30px
      background-color: #fff
      font-size: 28px
      color: #333
      p
        padding-top: 30px  
      ul
        li
          line-height: 40px
          text-align: justify
          margin-top: 30px
    .select_list
      background-color: #fff
      .ranking
        text-align: center
        border-bottom: 1px solid #e8e8e8
        padding: 30px 0
        p:nth-child(1)
          font-size: 36px
          color: #ff711c
        p:nth-child(2)
          font-size: 26px
          color: #666
      li
        height: 88px
        border-bottom: 1px solid #e8e8e8
        padding: 0 30px
        box-sizing: border-box
        overflow: hidden
        span 
          display: block
          line-height: 88px
        input
          display: block
          line-height: 85px
          float: right
          width: 50%
          text-align: right
          padding-right: 20px
          caret-color: #ff711c
          color: #333
        span:nth-child(1)
          float: left
          color: #666
        span:nth-child(2)
          float: right
          color: #333
        span.ucMoney
          color: #ff711c
        i 
          color: #666
          margin-left: 20px
      li:last-child
        border: none
    .rankingLayer
      padding: 20px 0
      p
        line-height: 80px
        padding: 0 30px
        font-size: 34px
        color: #333
      i
        font-size: 36px
        color: #666
        margin-right: 30px
      i.on
        color: #ff711c
</style>
