<template>
  <div class="box">
    <Header :navLeftTxt="'&#xe687; <b>退出</b>'" @navLeftFn="navLeftFn()">风险测评</Header>
    <div class="subject" v-for="(item,index) in listTxt" v-show="index==next" :key="item.value">
      <div class="tlt">{{item.quiz}}</div>
      <div class="select">
        <ul>
          <li v-for="(lists,i) in item.list" @click="selectList($event, index, i)" :key="lists.value">
            {{lists}}
          </li>
        </ul>
      </div>
    </div>
    <div class="bars">
      <div class="bar"><p class="plan" :style="{ width:(100/7*num)+'%' }"></p></div>
      <p class="getBack" v-show="num!=0" @click="last()">上一题</p>
      <p class="barTxt">{{num+1}}/8</p>
    </div>
    <div class="subBtn" v-show="next==7">
      <div class="checkTxt" @click="haveRead()">
        <i class="iconfont on" v-if="iconShow">&#xe6c4;</i>
        <i class="iconfont" v-else>&#xe6c3;</i>
        <span>我已明确投资风险并愿意接受风险带来的损失</span>
      </div>
      <div class="btn" :class="iconShow && selectShow?'submitBtn':''" @click="subSelect()">
        <p>提交</p>
      </div>
    </div>
    <Layer v-show="layerShow" @on-close="codeClose()" @on-sub="codeSub()" close="确定" submit="继续评测" >
      <span class="quitHint">本次风险测评还未完成，退出后将不保存当前进度，确定退出吗？</span>
    </Layer>
  </div>
</template>

<script>
  export default {
    metaInfo: {
      title: '拓道金服'
    },
    data () {
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
            list: ['A、18~29岁', 'B、30~39岁', 'C、40~49岁', 'D、50~59岁', 'E、60岁以上']
          },
          {
            quiz: '2.您的职业是？',
            list: ['A、无固定职业', 'B、自由职业者', 'C、离退休人员', 'D、一般企业员工', 'E、党政机关或事业单位员工']
          },
          {
            quiz: '3.您的家庭年收入或个人年收入是？',
            list: ['A、10万元以下', 'B、10万元（含）以上，20万元以下', 'C、20万元（含）以上，30万元以下', 'D、30万元（含）以上，40万元以下', 'E、40万元（含）以上']
          },
          {
            quiz: '4.您每年的收入可用作于金融投资（储蓄存款除外）的比例是？',
            list: ['A、小于8%', 'B、8%（含）以上，25%以下', 'C、25%（含）以上，50%以下', 'D、50%（含）以上，75%以下', 'E、75%（含）以上']
          },
          {
            quiz: '5.您能接受的投资期限是？',
            list: ['A、1个月以内', 'B、1~3个月', 'C、3~6个月', 'D、6~12个月', 'E、12个月以上']
          },
          {
            quiz: '6.您的投资经验是？',
            list: ['A、不具备投资经验或非常有限的投资经验', 'B、我有1~3年的投资经验，有一些理财意识', 'C、我有3~5年的投资经验，但希望能获得专业人士咨询', 'D、我有5年以上的投资经验，有自主理财能力']
          },
          {
            quiz: '7.您的投资偏好是？',
            list: ['A、厌恶风险，不希望本金损失，希望获得稳定的回报', 'B、尽可能保证本金安全，不在乎收益率比较低', 'C、产生较多收益，可承担一定的投资风险', 'D、实现资产大幅增加，愿意承担很大的投资风险']
          },
          {
            quiz: '8.您能承受的本金损失是？',
            list: ['A、5%以内', 'B、5%~20%', 'C、20%~50%', 'D、超过50%']
          }
        ]
      }
    },
    mounted () {
    },
    methods: {
      subSelect () {
        if (this.iconShow && this.selectShow) {
          this.$router.push({path: '/appraisal/result'})
        } else {
          this.$Msg('请完成选项', 2000)
        }
      },
      navLeftFn () {
        this.layerShow = true
      },
      codeClose () {
        this.$router.push({path: '/ucSet'})
      },
      codeSub () {
        this.layerShow = false
      },
      selectList (event, index, i) {
        let lis = document.getElementsByClassName('select')[index].getElementsByTagName('li')
        for (var x = 0; x < lis.length; x++) {
          lis[x].classList.remove('on')
        }
        event.target.classList.add('on')
        if (this.isClick) {
          this.isClick = false
          setTimeout(() => {
            if (this.num < 7) {
              this.num = (index + 1)
              this.next++
            } else {
              this.selectShow = true
            }
            this.isClick = true
          }, 600)
        }
      },
      last () {
        this.num--
        this.next--
      },
      haveRead () {
        this.iconShow = !this.iconShow
      }
    },
    components: {
    }
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
    background-color: #fff
    .dis_no
      display: none
    .tlt
      font-size: 34px
      color: #333
      line-height: 60px
      border-bottom: 1px solid #d8d8d8
      padding: 27px 40px
    .select
      li
        font-size: 28px
        padding: 30px 50px 30px 40px
        border-bottom: 1px solid #d8d8d8
        color: #666
      li.on
        color: #FF7102
        background: url(../../../assets/images/my-center/onBg.png) no-repeat
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
        background-color: #ddd
      .plan
        width: 0
        height: 100%
        border-radius: 20px
        background-color: #ff7400
      .barTxt
        font-size: 26px
        color: #333
        margin-top: 28px
      .getBack
        color: #ff711c
        font-size: 28px
        position: absolute
        left: 40px
        bottom: 0
    .subBtn
      font-size: 24px
      text-align: center
      margin-top: 80px
      .checkTxt
        color: #a3a3a3
        font-size: 24px
        overflow: hidden
        height: 86px
        display: flex
        justify-content: center
        align-items: center
        i
          font-size: 30px
          color: #5887FF
          display: inline-block
          line-height: 40px
          margin-right: 10px
        span
          display: inline-block
          line-height: 40px  
      .checkTxt.on
        i
          color: #ff711c
      .btn
        display: inline-block
        width: 58%
        font-size: 32px
        text-align: center
        color: #ff711c
        border: 2px solid #ff711c
        border-radius: 35px
        line-height: 74px
      .submitBtn
        background-color: #ff711c
        color: #fff
    .quitHint
      display: block
      font-size: 26px
      color: #666
      padding: 30px 30px 10px
      line-height: 40px    
</style>
