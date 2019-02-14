<template>
  <div class="box">
    <header class="outHeader">
      <div @click="outAppraisal">
        <span class="iconfont">&#xe6fe;</span>
        <b>退出</b>
      </div>
      <span>风险测评</span>
    </header>
    <div 
      v-for="(item,index) in listTxt" 
      v-show="index==next" 
      :key="index" 
      class="subject">
      <div class="tlt">{{ item.quiz }}</div>
      <div class="select">
        <ul>
          <li 
            v-for="(lists,i) in item.list" 
            :key="i" 
            @click="selectList($event, index, i, lists.num)">
            {{ lists.txt }}
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
import { evaluationSave } from '~/api/user.js'
import { commenParams } from '~/api/config.js'

export default {
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
          quiz: '1.您的年龄是？',
          list: [
            {
              num: 30,
              txt: 'A、18~29岁'
            },
            {
              num: 70,
              txt: 'B、30~39岁'
            },
            {
              num: 90,
              txt: 'C、40~49岁'
            },
            {
              num: 50,
              txt: 'D、50~59岁'
            },
            {
              num: 10,
              txt: 'E、60岁以上'
            }
          ]
        },
        {
          quiz: '2.您的职业是？',
          list: [
            {
              num: 10,
              txt: 'A、无固定职业'
            },
            {
              num: 30,
              txt: 'B、自由职业者'
            },
            {
              num: 50,
              txt: 'C、离退休人员'
            },
            {
              num: 70,
              txt: 'D、一般企业员工'
            },
            {
              num: 90,
              txt: 'E、党政机关或事业单位员工'
            }
          ]
        },
        {
          quiz: '3.您的家庭年收入或个人年收入是？',
          list: [
            {
              num: 10,
              txt: 'A、10万元以下'
            },
            {
              num: 30,
              txt: 'B、10万元（含）以上，20万元以下'
            },
            {
              num: 50,
              txt: 'C、20万元（含）以上，30万元以下'
            },
            {
              num: 70,
              txt: 'D、30万元（含）以上，40万元以下'
            },
            {
              num: 90,
              txt: 'E、40万元（含）以上'
            }
          ]
        },
        {
          quiz: '4.您每年的收入可用作于金融投资（储蓄存款除外）的比例是？',
          list: [
            {
              num: 90,
              txt: 'A、小于8%'
            },
            {
              num: 70,
              txt: 'B、8%（含）以上，25%以下'
            },
            {
              num: 50,
              txt: 'C、25%（含）以上，50%以下'
            },
            {
              num: 30,
              txt: 'D、50%（含）以上，75%以下'
            },
            {
              num: 10,
              txt: 'E、75%（含）以上'
            }
          ]
        },
        {
          quiz: '5.您能接受的出借期限是？',
          list: [
            {
              num: 10,
              txt: 'A、1个月以内'
            },
            {
              num: 30,
              txt: 'B、1~3个月'
            },
            {
              num: 50,
              txt: 'C、3~6个月'
            },
            {
              num: 70,
              txt: 'D、6~12个月'
            },
            {
              num: 90,
              txt: 'E、12个月以上'
            }
          ]
        },
        {
          quiz: '6.您的投资经验是？',
          list: [
            {
              num: 10,
              txt: 'A、不具备投资经验或非常有限的投资经验'
            },
            {
              num: 30,
              txt: 'B、我有1~3年的投资经验，有一些理财意识'
            },
            {
              num: 70,
              txt: 'C、我有3~5年的投资经验，但希望能获得专业人士咨询'
            },
            {
              num: 90,
              txt: 'D、我有5年以上的投资经验，有自主理财能力'
            }
          ]
        },
        {
          quiz: '7.您的投资偏好是？',
          list: [
            {
              num: 10,
              txt: 'A、厌恶风险，不希望本金损失，希望获得稳定的回报'
            },
            {
              num: 30,
              txt: 'B、尽可能保证本金安全，不在乎收益率比较低'
            },
            {
              num: 70,
              txt: 'C、产生较多收益，可承担一定的投资风险'
            },
            {
              num: 90,
              txt: 'D、实现资产大幅增加，愿意承担很大的投资风险'
            }
          ]
        },
        {
          quiz: '8.您能承受的本金损失是？',
          list: [
            {
              num: 10,
              txt: 'A、5%以内'
            },
            {
              num: 30,
              txt: 'B、5%~20%'
            },
            {
              num: 70,
              txt: 'C、20%~50%'
            },
            {
              num: 90,
              txt: 'D、超过50%'
            }
          ]
        }
      ],
      arrNum: []
    }
  },
  mounted() {},
  methods: {
    subSelect() {
      if (this.iconShow && this.selectShow) {
        let score = this.sum(this.arrNum)
        commenParams.accessId = this.$store.state.accessId
        commenParams.accessKey = this.$store.state.accessKey
        evaluationSave(this.$axios, score, commenParams).then(res => {
          if (res) {
            this.$router.push({
              name: 'appraisal-result'
            })
          }
        })
      } else {
        this.$Msg('请完成选项', 2000)
      }
    },
    outAppraisal() {
      this.layerShow = true
    },
    codeClose() {
      this.$router.push({
        name: 'myCenter-set-ucSet'
      })
    },
    codeSub() {
      this.layerShow = false
    },
    selectList(event, index, i, num) {
      this.arrNum[index] = num
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
    },
    sum(arr) {
      var s = 0
      for (var i = arr.length - 1; i >= 0; i--) {
        s += arr[i]
      }
      return s
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
      div
        position: absolute
        left: 15px
        display: flex
        .iconfont
          font-size: $fontsize-large-xxxxxxxx
        b
          font-size: $fontsize-medium
          color: $color-gray2
          margin-left: -15px
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
