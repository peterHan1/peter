<template>
  <div class="box">
    <header class="outHeader">
      <span class="iconfont">&#xe6fe;</span>
      <b>退出</b>
      <span>风险测评</span>
    </header>
    <div 
      v-for="(item,index) in listTxt" 
      v-show="index==next" 
      :key="item.value" 
      class="subject">
      <div class="tlt">{{ item.quiz }}</div>
      <div class="select">
        <ul>
          <li 
            v-for="(lists,i) in item.list" 
            :key="lists.value" 
            @click="selectList($event, index, i)">
            {{ lists }}
          </li>
        </ul>
      </div>
    </div>
    <div class="bars">
      <div class="bar"><p 
        :style="{ width:(100/7*num)+'%' }" 
        class="plan"/></div>
      <p 
        v-show="num!=0" 
        class="getBack" 
        @click="last()">上一题</p>
      <p class="barTxt">{{ num+1 }}/8</p>
    </div>
    <div 
      v-show="next==7" 
      class="subBtn">
      <div 
        class="checkTxt" 
        @click="haveRead()">
        <i 
          v-if="iconShow" 
          class="iconfont on">&#xe6f8;</i>
        <i 
          v-else 
          class="iconfont">&#xe6f9;</i>
        <span>我已明确投资风险并愿意接受风险带来的损失</span>
      </div>
      <div 
        :class="iconShow && selectShow?'submitBtn':''" 
        class="btn" 
        @click="subSelect()">
        <p>提交</p>
      </div>
    </div>
    <Layer 
      v-show="layerShow" 
      close="确定" 
      submit="继续评测" 
      @on-close="codeClose()" 
      @on-sub="codeSub()" >
      <span class="quitHint">本次风险测评还未完成，退出后将不保存当前进度，确定退出吗？</span>
    </Layer>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {
      num: 0,
      next: 0,
      iconShow: false,
      selectShow: false,
      isClick: true,
      layerShow: false,
      listTxt: [
        {
          quiz: '1.您的年龄在以下哪个范围内？',
          list: [
            'A、18~29岁',
            'B、30~39岁',
            'C、40~49岁',
            'D、50~59岁',
            'E、60岁以上'
          ]
        },
        {
          quiz: '2.您的职业是？',
          list: [
            'A、无固定职业',
            'B、自由职业者',
            'C、离退休人员',
            'D、一般企业员工',
            'E、党政机关或事业单位员工'
          ]
        },
        {
          quiz: '3.您的家庭年收入或个人年收入是？',
          list: [
            'A、10万元以下',
            'B、10万元（含）以上，20万元以下',
            'C、20万元（含）以上，30万元以下',
            'D、30万元（含）以上，40万元以下',
            'E、40万元（含）以上'
          ]
        },
        {
          quiz: '4.您每年的收入可用作于金融投资（储蓄存款除外）的比例是？',
          list: [
            'A、小于8%',
            'B、8%（含）以上，25%以下',
            'C、25%（含）以上，50%以下',
            'D、50%（含）以上，75%以下',
            'E、75%（含）以上'
          ]
        },
        {
          quiz: '5.您能接受的投资期限是？',
          list: [
            'A、1个月以内',
            'B、1~3个月',
            'C、3~6个月',
            'D、6~12个月',
            'E、12个月以上'
          ]
        },
        {
          quiz: '6.您的投资经验是？',
          list: [
            'A、不具备投资经验或非常有限的投资经验',
            'B、我有1~3年的投资经验，有一些理财意识',
            'C、我有3~5年的投资经验，但希望能获得专业人士咨询',
            'D、我有5年以上的投资经验，有自主理财能力'
          ]
        },
        {
          quiz: '7.您的投资偏好是？',
          list: [
            'A、厌恶风险，不希望本金损失，希望获得稳定的回报',
            'B、尽可能保证本金安全，不在乎收益率比较低',
            'C、产生较多收益，可承担一定的投资风险',
            'D、实现资产大幅增加，愿意承担很大的投资风险'
          ]
        },
        {
          quiz: '8.您能承受的本金损失是？',
          list: ['A、5%以内', 'B、5%~20%', 'C、20%~50%', 'D、超过50%']
        }
      ]
    }
  },
  mounted() {},
  methods: {
    subSelect() {
      if (this.iconShow && this.selectShow) {
        this.$router.push({ path: '/appraisal/result' })
      } else {
        this.$Msg('请完成选项', 2000)
      }
    },
    navLeftFn() {
      this.layerShow = true
    },
    codeClose() {
      this.$router.push({ path: '/ucSet' })
    },
    codeSub() {
      this.layerShow = false
    },
    selectList(event, index, i) {
      let lis = document
        .getElementsByClassName('select')
        [index].getElementsByTagName('li')
      for (var x = 0; x < lis.length; x++) {
        lis[x].classList.remove('on')
      }
      event.target.classList.add('on')
      if (this.isClick) {
        this.isClick = false
        setTimeout(() => {
          if (this.num < 7) {
            this.num = index + 1
            this.next++
          } else {
            this.selectShow = true
          }
          this.isClick = true
        }, 600)
      }
    },
    last() {
      this.num--
      this.next--
    },
    haveRead() {
      this.iconShow = !this.iconShow
    }
  },
  components: {}
}
</script>

<style lang="stylus" scoped>
  .box
    padding-top: 88px
    box-sizing: border-box
    position: fixed
    top: 0
    right: 0
    bottom: 0
    left: 0
    background-color: $color-white
    .outHeader
      height: 0.88rem
      line-height: 0.88rem
      width: 100%
      background: $color-white
      position: fixed
      left: 0
      top: 0
      right: 0
      text-align: center
      font-size: $fontsize-large-xxx
      color: $color-gray1
      border-bottom: 0.01rem solid $color-gray5
      .iconfont
        font-size: $fontsize-large-xxxxxxxx
        position: absolute
        left: 15px
      b
        font-size: $fontsize-large-x 
        color: $color-gray2
        position: absolute
        left: 65px
    .dis_no
      display: none
    .tlt
      font-size: $fontsize-large-xx
      color: $color-gray1
      line-height: 60px
      border-bottom: 1px solid #d8d8d8
      padding: 27px 40px
    .select
      li
        font-size: $fontsize-medium
        padding: 30px 50px 30px 40px
        border-bottom: 1px solid #d8d8d8
        color: $color-gray2
      li.on
        color: $color-primary 
        background: url(../../assets/images/my-center/onBg.png) no-repeat
        background-size: 5%
        background-position: 97% 50%
    .bars
      padding: 0 40px
      text-align: center
      position: relative
      margin-top: 160px
      .bar
        width: 100%
        height: 16px
        border-radius: 20px
        background-color: $color-gray11
      .plan
        width: 0
        height: 100%
        border-radius: 20px
        background-color: $color-primary
      .barTxt
        font-size: $fontsize-small-s
        color: $color-gray1
        margin-top: 28px
      .getBack
        color: $color-primary
        font-size: $fontsize-medium
        position: absolute
        left: 40px
        bottom: 0
    .subBtn
      font-size: $fontsize-small-ss
      text-align: center
      margin-top: 80px
      .checkTxt
        color: #a3a3a3
        font-size: $fontsize-small-ss
        overflow: hidden
        height: 86px
        display: flex
        justify-content: center
        align-items: center
        i
          font-size: $fontsize-large-x
          color: $color-assisted
          display: inline-block
          line-height: 40px
          margin-right: 10px
        span
          display: inline-block
          line-height: 40px  
      .checkTxt.on
        i
          color: $color-primary 
      .btn
        display: inline-block
        width: 58%
        font-size: $fontsize-large-xx 
        text-align: center
        color: $color-primary
        border: 2px solid $color-primary
        border-radius: 35px
        line-height: 74px
      .submitBtn
        background-color: $color-primary
        color: $color-white
    .quitHint
      display: block
      font-size: $fontsize-small-s
      color: $color-gray2 
      padding: 30px 30px 10px
      line-height: 40px    
</style>
