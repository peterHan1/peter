<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">积分</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.如何获取积分？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>1）首次充值成功；可获得30积分；</p>
            <p>2）首次成功出借；可获得40积分；</p>
            <p>3）首次升级VIP，可根据首次升级的VIP等级获得相应的积分。具体如下表：</p>
            <table class="table1" style="width:80%;">
              <tbody>
                <tr>
                  <th>VIP等级</th>
                  <th>获得积分</th>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>20</td>
                </tr>
                <tr>
                  <td>VIP2</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>VIP3</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td>VIP4</td>
                  <td>300</td>
                </tr>
                <tr>
                  <td>VIP5</td>
                  <td>400</td>
                </tr>
                <tr>
                  <td>VIP6</td>
                  <td>500</td>
                </tr>
                <tr>
                  <td>VIP7</td>
                  <td>1000</td>
                </tr>
              </tbody>
            </table>
            <p></p>
            <p>4）日常出借获取积分</p>
            <p style="margin-left: .4rem;">
            1、单个标的首次出借1000元以上的用户可获得双倍积分（1000元=1积分）<br />2、单个标的单次出借1000元以上且为最高的用户可获得双倍积分 (注：如有并列最高，则按出借时间顺序较早的用户获得)。<br />3、单个标的扫尾的用户可获得2个积分。<br />4、如单个标的首次出借与单次出借最高的为同一笔出借，则该笔出借获得三倍积分。<br />5、奖励积分均在该标复审时发放。
            </p>
          </div>
        </li>
        <li>
          <a @click="active2 = !active2">
            <span class="fl">2.怎么查询积分？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>登录拓道金服账号，PC端：点击【我的账户】—【积分与奖励】进行查看。</p>
            <p>APP端：点击【资产】—【我的积分】进行查看。</p>
          </div>
        </li>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">3.积分的用途有哪些？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>积分商城即将上线，尽请期待及待。</p>
          </div>
        </li>
        <!-- <li>
          <a @click="active4 = !active4">
            <span class="fl">4.什么是优惠券？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>优惠券是提供给拓道金服用户的优惠福利，目前优惠券分为抵用券和加息券，用户在投资时满足一定的投资条件即可使用抵用现金或加息。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">5.优惠券如何使用？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>1.用户在投标时，选择满足使用条件的优惠券即可直接抵用现金或加息。</p>
            <p>2.优惠券一次只能使用一次张。（抵用券和加息券不可同时使用） </p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">6.加息券如何获得？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>加息券获得主要有两种途径：</p>
            <p>A、在通过积分兑换。</p>
            <p>B、在平台活动获得。</p>
          </div>
        </li>
        <li>
          <a @click="active7 = !active7">
            <span class="fl">7.抵用券如何获得？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>可通过注册账号、邀请好友和活动来获得抵用券</p>
            <p>注册抵用券是新用户注册成功后，平台赠送的388抵用券。（自由转让中的债权转让标的除外）。</p>
            <p><img src="//www.51tuodao.com/static/wap/img/ticket_use.png"></p>
            <p>邀请好友可获得10元抵用券</p>
            <p>活动抵用券是在拓道不定期的活动中获得。</p>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '积分'
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
    .table1
      border-collapse: separate
      border-spacing: 1px
      background: #ccc
      width: 80%
      text-align: center
      color: #585858
      font-size: 0.24rem;
      th
        background: #ffefde
        height: 0.5rem
        line-height: 0.5rem
        font-weight: normal
        text-align: center
      td
        background: #fff
        height: 0.45rem
        line-height: 0.45rem
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
        img
          width: 100%
          vertical-align: middle
        p
          line-height:0.4rem
          text-align: justify
</style>