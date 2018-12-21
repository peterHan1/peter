<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">收费标准</Header>
    <div class="help_bot">
      <ul>
        <li>
          <a href="javascript:;" @click="active1 = !active1">
            <span class="fl">1.有利息管理费吗？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p> 暂无。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active2 = !active2">
            <span class="fl">2.有VIP年费吗？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>暂无。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active3 = !active3">
            <span class="fl">3.VIP服务内容收费标准？</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>Vip服务内容：</p>
            <p>V1&nbsp;&nbsp;&nbsp;&nbsp;待收金额1000元&nbsp;&nbsp;&nbsp;&nbsp;每月首提免费，其他3元一笔</p>
            <p>V2&nbsp;&nbsp;&nbsp;&nbsp;待收金额 10万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数2次，其他3元一笔</p>
            <p>V3&nbsp;&nbsp;&nbsp;&nbsp;待收金额 30万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数4次，其他3元一笔</p>
            <p>V4&nbsp;&nbsp;&nbsp;&nbsp;待收金额 50万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数6次，其他3元一笔</p>
            <p>V5&nbsp;&nbsp;&nbsp;&nbsp;待收金额 100万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数7次，其他3元一笔</p>
            <p>V6&nbsp;&nbsp;&nbsp;&nbsp;待收金额 500万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数7次，其他3元一笔</p>
            <p>V7&nbsp;&nbsp;&nbsp;&nbsp;待收金额 1000万元 &nbsp;&nbsp;&nbsp;&nbsp;每月免费提现次数8次，其他3元一笔</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active4 = !active4">
            <span class="fl">4.充值费用？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>在线充值不收取任何手续费。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active5 = !active5">
            <span class="fl">5.提现费用规则？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>1.达到相应会员等级，每月享有免费提现次数（含未出借过可提金额）;</p>
            <p>
              <table>
                <tr>
                  <th>会员等级</th>
                  <th>&nbsp;V1</th>
                  <th>&nbsp;V2</th>
                  <th>&nbsp;V3</th>
                  <th>&nbsp;V4</th>
                  <th>&nbsp;V5</th>
                  <th>&nbsp;V6</th>
                  <th>&nbsp;V7</th>
                </tr>
                <tr>
                  <td>免费次数</td>
                  <td>&nbsp;&nbsp;1</td>
                  <td>&nbsp;&nbsp;2</td>
                  <td>&nbsp;&nbsp;4</td>
                  <td>&nbsp;&nbsp;6</td>
                  <td>&nbsp;&nbsp;7</td>
                  <td>&nbsp;&nbsp;7</td>
                  <td>&nbsp;&nbsp;8</td>
                </tr>
              </table>
            </p>
            <p>无免费提现次数：提现金额中含未出借可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取 3元/笔手续费;</p>
            <p>2.单笔提现范围：100元~1000万元;</p>
            <p>3. 现分为：快速到账、普通到账两种。具体如下：<br>快速到账：预计当日到账;<br>普通到账：预计下一个工作日到账，遇双休和法定节假日顺延。</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" @click="active6 = !active6">
            <span class="fl">6.债权转让手续费规则？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>转让手续费：</p>
            <p>持有＜90天，收取0.5%转让金额手续费；</p>
            <p>持有≥90天，收取0.2%转让金额手续费；</p>
            <p>（最低为1元）</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '收费标准'
  },
  data () {
    return {
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false
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
    table
      width:100%
      border-collapse:collapse
      tr
        line-height:0.5rem
      th
        border:1px solid #d8d8d8
        padding:0 0.1rem
        font-weight: normal
      td
        border:1px solid #d8d8d8
        padding:0 0.1rem
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
        padding:0.22rem 0.25rem
        p
          line-height:0.4rem
          text-align: justify
</style>