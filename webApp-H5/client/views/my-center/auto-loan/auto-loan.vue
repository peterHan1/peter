<template>
  <div class="ucAuto">
    <div v-if="couponshow">
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
          <li @click="clickFn('Ranking',rankingTxt)">
            <span>保留排名</span>
            <span>{{rankingTxt | rankingTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li>
            <span>每次投标金额(元)</span>
            <input type="number" value="0">
          </li>
          <li @click="clickFn('Money',moneyTxt)">
            <span>是否打散资金</span>
            <span>{{moneyTxt | moneyTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li @click="clickFn('Repay',repayTxt)">
            <span>还款方式</span>
            <span>{{repayTxt | repayTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li @click="clickFn('Time')">
            <span>借款期限</span>
            <span>{{time1}}个月--{{time2}}个月<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li @click="clickFn('Award',awardTxt)">
            <span>平台奖励</span>
            <span>{{awardTxt | awardTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li @click="couponShow()">
            <span>优惠券</span>
            <span>不使用<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li>
            <span>账户保留金额(元)</span>
            <input type="number" value="0">
          </li>
        </ul>
        <div class="sub_btn">
          <div class="td_btn" :class="comTxt.length == 11?'td_btnHig':'td_btnNo'" @click="subBth()">保存</div>
        </div>
      </div>
    </div>
    <div v-else>
      <Header :navLeftTxt="'&#xe687;'" @navLeftFn="navLeftFn()">优惠券</Header>
      <div class="select_list coupon" >
        <ul>
          <li @click="clickFn('Coupon',couponTxt)">
            <span>优惠券</span>
            <span>{{couponTxt | couponTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li v-show="couponTxt === 'B'">
            <span>使用加息券最低出借金额(元)</span>
            <input type="number" value="0">
          </li>
          <li v-show="couponTxt === 'B'" @click="clickFn('Interest',interestTxt)">
            <span>加息券使用顺序</span>
            <span>{{interestTxt | interestTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
          <li v-show="couponTxt === 'C'" @click="clickFn('Voucher',voucherTxt)">
            <span>抵用券使用顺序</span>
            <span>{{voucherTxt | voucherTxtFn}}<i class="iconfont">&#xe83d;</i></span>
          </li>
        </ul>
        <div v-show="interestTxt === 'C'" class="interest">
          <div v-for="item in interestList" :key="item.value" @click="selectList($event)">
            <p>{{item.val}}</p>
            <p>有效期至</p>
            <p>{{item.data}}</p>
          </div>
        </div>
      </div>
      <div class="sub_btn">
        <div class="td_btn td_btnHig">确定</div>
      </div>
    </div>
    <div :is="comTxt" :typeTxt="typeStatus" @autoTypeFn="selectFn" @closeTime="closeTimeFn" @selectTime="selectTimeFn" :startTime="time1<=0 ? time1 : time1-1" :endTime="time2<=0 ? time2 : time2-1"></div>
  </div>
</template>

<script>
import Award from './award/award.vue'
import Money from './money/money.vue'
import Ranking from './ranking/ranking.vue'
import Repay from './repay/repay.vue'
import Time from './time/time.vue'
import Coupon from './coupon/coupon.vue'
import Interest from './coupon/Interest.vue'
import Voucher from './coupon/voucher.vue'
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data () {
    return {
      couponshow: true,
      values: '',
      switchBlooe: true,
      comTxt: '',
      pickerValue: '',
      time1: 0,
      time2: 0,
      rankingTxt: 'A',
      awardTxt: 'A',
      moneyTxt: 'A',
      repayTxt: 'A',
      couponTxt: 'A',
      interestTxt: 'A',
      voucherTxt: 'A',
      typeStatus: '',
      interestList: [
        {'val': '1%', 'time': '2018-12-12'}, {'val': '2%', 'time': '2018-12-12'}, {'val': '3%', 'time': '2018-12-12'}, {'val': '1%', 'time': '2018-12-12'}, {'val': '2%', 'time': '2018-12-12'}
      ],
      touchNum: 0
    }
  },
  mounted () {
  },
  methods: {
    closeTimeFn () {
      this.comTxt = ''
    },
    selectTimeFn (data) {
      this.comTxt = ''
      this.time1 = data[0]
      this.time2 = data[1]
    },
    navLeftFn () {
      this.$router.push({path: '/myCenter'})
    },
    openPicker () {
      this.$refs.picker.open()
    },
    selectFn (data) {
      let vm = this
      vm.typeTxt(data.name, data.val)
      setTimeout(() => {
        vm.comTxt = ''
      }, 200)
    },
    typeTxt (txt, val) {
      let vm = this
      switch (txt) {
        case 'ranking':
          vm.rankingTxt = val
          break
        case 'award':
          vm.awardTxt = val
          break
        case 'money':
          vm.moneyTxt = val
          break
        case 'repay':
          vm.repayTxt = val
          break
        case 'coupon':
          vm.couponTxt = val
          break
        case 'interest':
          vm.interestTxt = val
          break
        case 'voucher':
          vm.voucherTxt = val
          break
      }
    },
    openAuto () {
      this.switchBlooe = !this.switchBlooe
    },
    clickFn (txt, val) {
      this.comTxt = txt
      this.typeStatus = val
    },
    couponShow () {
      this.couponshow = false
    },
    selectList (e) {
      let vm = this
      let num = document.createElement('span')
      if (e.currentTarget.className === 'on') {
        let s = e.currentTarget.querySelectorAll('span')[0]
        e.currentTarget.classList.remove('on')
        e.currentTarget.removeChild(s)
      } else {
        vm.touchNum++
        num.innerText = vm.touchNum
        e.currentTarget.classList.add('on')
        e.currentTarget.appendChild(num)
      }
    }
  },
  filters: {
    rankingTxtFn (val) {
      switch (val) {
        case 'A':
          return '不保留'
        case 'B':
          return '保留'
        default: return ''
      }
    },
    moneyTxtFn (val) {
      switch (val) {
        case 'A':
          return '打散'
        case 'B':
          return '不打散'
        default: return ''
      }
    },
    awardTxtFn (val) {
      switch (val) {
        case 'A':
          return '全部'
        case 'B':
          return '奖励'
        case 'C':
          return '不奖励'
        default: return ''
      }
    },
    repayTxtFn (val) {
      switch (val) {
        case 'A':
          return '全部'
        case 'B':
          return '先息后本'
        case 'C':
          return '等额本息'
        default: return ''
      }
    },
    couponTxtFn (val) {
      switch (val) {
        case 'A':
          return '不使用'
        case 'B':
          return '加息券'
        case 'C':
          return '抵用券'
        default: return ''
      }
    },
    interestTxtFn (val) {
      switch (val) {
        case 'A':
          return '优先使用即将过去的加息券'
        case 'B':
          return '优先使用年化大的加息券'
        case 'C':
          return '手动选择加息券'
        default: return ''
      }
    },
    voucherTxtFn (val) {
      switch (val) {
        case 'A':
          return '优先使用即将过去的抵用券'
        case 'B':
          return '优先使用金额较大的抵用券'
        default: return ''
      }
    }
  },
  components: {
    Award,
    Money,
    Ranking,
    Repay,
    Time,
    Coupon,
    Interest,
    Voucher
  }
}
</script>

<style lang="stylus" scoped>
  .ucAuto
    padding-top: 88px
    box-sizing: border-box
    padding-bottom: 50px
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
      .ranking
        text-align: center
        border-bottom: 1px solid #e8e8e8
        padding: 30px 0
        background-color: #fff
        p:nth-child(1)
          font-size: 36px
          color: #ff711c
        p:nth-child(2)
          font-size: 26px
          color: #666
      ul
        background-color: #fff
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
          width: 30%
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
    .sub_btn
      padding: 30px 30px 0    
    .coupon
      margin: 20px 0
    .interest
      div
        margin-top: 20px
        margin-left: 2%
        display: inline-block
        width: 30%
        height: 140px
        background: url(../../../assets/images/my-center/Voucher.png) no-repeat
        background-size: 100% 100%
        padding: 20px 0
        position: relative
        span
          display: none
      p
        padding: 0 20px
        font-size: 16px
        color: #333
        text-align: right
      p:nth-child(1)
        text-align: left
        font-size: 40px
        color: #fff
      /deep/ .on
        span
          display: block
          width: 80px
          height: 80px
          line-height: 80px
          color: #ff711c
          font-size: 50px
          text-align: center
          background-color: #fff
          border-radius: 100%
          position: absolute
          top: 50%
          left: 50%
          transform: translate(-50%, -50%)
</style>
