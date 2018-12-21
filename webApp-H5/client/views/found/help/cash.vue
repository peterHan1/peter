<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">充值提现</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a href="javascript:;" @click="active1 = !active1">
            <span class="fl">1.如何充值？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>A、网页端：登录拓道金服官网，点击【我的账户】—【充值】，选择网银支付或者快捷支付，进行充值操作。</p>
            <p>B、手机端：登录拓道金服APP，点击【我的】—【充值】，完成操作。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active2 = !active2">
            <span class="fl">2.充值银行卡可以绑定多张吗？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>为了保障资金安全，只能绑定1张银行且作为提现卡，做到同卡进出。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active3 = !active3">
            <span class="fl">3.充值需要收取手续费吗？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>充值的费用由平台承担。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active4 = !active4">
            <span class="fl">4.充值何时到账？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>正常情况下，充值即时到账，若在5分钟内还未到账，请联系客服处理（400-85-666-85）</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active5 = !active5">
            <span class="fl">5.充值是否限额？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>A、支持银行有限额，限额随银行变动会进行调整，以银行限额为准；</p>
            <p>B、您银行卡开通额度。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active6 = !active6">
            <span class="fl">6.拓道金服与哪家第三方支付合作？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>拓道金服目前合作的第三方支付平台有“新网云支付”。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active7 = !active7">
            <span class="fl">7.可以用信用卡充值吗？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>拓道金服不支持信用卡充值。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active8 = !active8">
            <span class="fl">8.如何提现？</span>
            <i class="iconfont fr" :class="{deg: active8}">&#xe6a3;</i>
          </a>
          <div v-show="active8">
            <p>A、网页端：登入PC端账户后，点击右上角“我的账户”，转跳到“账户中心”页面，点击页面的“立即提现”按钮，跳转到提现页面完成提现操作。</p>
            <p> B、手机端：登入APP账户后，点击下方“我的”，转跳到“我的”页面，点击页面的“提现”按钮，跳转到提现页面完成提现操作。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active9 = !active9">
            <span class="fl">9.提现需要手续费吗？</span>
            <i class="iconfont fr" :class="{deg: active9}">&#xe6a3;</i>
          </a>
          <div v-show="active9">
            <p>成为拓道金服VIP后，可享受每月免费提现次数。（免费提现包含未出借金额）</p>
            <p>具体的免费提现次数，请参照会员体系。</p>
            <p>无免费提现次数：提现金额中含未出借可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取3元/笔的手续费。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active10 = !active10">
            <span class="fl">10.提现申请可以撤销吗？</span>
            <i class="iconfont fr" :class="{deg: active10}">&#xe6a3;</i>
          </a>
          <div v-show="active10">
            <p>提现申请不可以撤销。</p>
          </div>
          </li>
          <li>
          <a href="javascript:;" @click="active11 = !active11">
            <span class="fl">11.提现是什么时候到账？</span>
            <i class="iconfont fr" :class="{deg: active11}">&#xe6a3;</i>
          </a>
          <div v-show="active11">
            <p>提现分为：快速到账、普通到账两种。具体如下：</p>
            <p>快速到账：预计当日到账；</p>
            <p>普通到账：预计下一个工作日到账，遇双休和法定节假日顺延。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active12 = !active12">
            <span class="fl">12.提现有限额吗？</span>
            <i class="iconfont fr" :class="{deg: active12}">&#xe6a3;</i>
          </a>
          <div v-show="active12">
            <p>单次提现额度100元-1000万元。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active13 = !active13">
            <span class="fl">13.提现记录在哪里查看？</span>
            <i class="iconfont fr" :class="{deg: active13}">&#xe6a3;</i>
          </a>
          <div v-show="active13">
            <p>A、网页端：登入PC端账户后，点击右上角“我的账户”，转跳页面后，点击页面“提现”中“提现记录”。</p>
            <p>B、手机端：登入APP客户端，在下方点击“资产“显示菜单栏后，点击右上角“提现”跳转提现页面后，点击“提现记录”即可查看。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active14 = !active14">
            <span class="fl">14.为什么提现失败？</span>
            <i class="iconfont fr" :class="{deg: active14}">&#xe6a3;</i>
          </a>
          <div v-show="active14">
            <p>1. 账户余额不足；</p>
            <p>2.银行卡信息错误；</p>
            <p style="colo:red;">如果出现提现失败的情况，请联系在线客服处理，或者拨打客服电话400-85-666-85进行处理。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active15 = !active15">
            <span class="fl">15.VIP说明</span>
            <i class="iconfont fr" :class="{deg: active15}">&#xe6a3;</i>
          </a>
          <div v-show="active15">
            <table class="table1" style="font-size: 0.15rem;">
              <tbody>
                <tr>
                  <th>VIP等级</th>
                  <th>VIP条件</th>
                  <th>会员费</th>
                  <th>提现费</th>
                </tr>
                <tr>
                  <td>VIP1</td>
                  <td>待收金额1000元</td>
                  <td>免费</td>
                  <td>每月首提免费，其他3元一笔</td>
                </tr>
                <tr>
                  <td>VIP2</td>
                  <td>待收金额 10万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数2次</td>
                </tr>
                <tr>
                  <td>VIP3</td>
                  <td>待收金额 30万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数4次</td>
                </tr>
                <tr>
                  <td>VIP4</td>
                  <td>待收金额 50万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数6次</td>
                </tr>
                <tr>
                  <td>VIP5</td>
                  <td>待收金额 100万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数7次</td>
                </tr>
                <tr>
                  <td>VIP6</td>
                  <td>待收金额 500万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数7次</td>
                </tr>
                <tr>
                  <td>VIP7</td>
                  <td>待收金额 1000万元 </td>
                  <td>免费</td>
                  <td>每月免费提现次数8次</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '充值提现'
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
      active12: false,
      active13: false,
      active14: false,
      active15: false
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
      table
        width:100%
        background: white
        border-collapse:collapse
        tr
          line-height:0.5rem
          text-align: center
          th
            border:1px solid #d8d8d8
            padding:0 0.1rem
            background: #ffefde
            font-weight: normal
          td
            border:1px solid #d8d8d8
            padding:0 0.1rem
</style>