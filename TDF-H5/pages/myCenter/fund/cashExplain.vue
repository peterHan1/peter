<template>
  <div class="cashBox">
    <td-header title="提现说明"/>
    <div class="member">
      <p>1、达到相应会员等级，每月享有免费提现次数（含未出借过可提金额）；</p>
      <table>
        <tbody><tr>
          <th>会员等级</th>
          <th>免费次数</th>
          <th>会员等级</th>
          <th>免费次数</th>
        </tr>
          <tr>
            <td>v1</td>
            <td>1</td>
            <td>v2</td>
            <td>2</td>
          </tr>
          <tr>
            <td>v3</td>
            <td>4</td>
            <td>v4</td>
            <td>6</td>
          </tr>
          <tr>
            <td>v5</td>
            <td>7</td>
            <td>v6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>v7</td>
            <td>8</td>
            <td/>
            <td/>
          </tr>
      </tbody></table>
      <p>无免费提现次数：提现金额中含未出借可提金额则收取0.5%的手续费（不满3元，按最低3元收取），不含则收取3元/笔手续费；</p>
      <p>2.提现额度和到账时间： </p>
      <p style="margin-top:0;">快速到账：提现额度以提现页面显示额度为准；到账时间预计当日到账；</p>
      <p style="margin-top:0;">普通到账：提现额度为单笔限额100万，单日无限额；到账时间预计下一个工作日到账，遇双休和法定节假日顺延； </p>
      <p/>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '拓道金服'
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus" scoped>
.cashBox
  width: 100%
  min-height: 100%
  padding-top: 88px
  position: absolute
  background-color: $color-white
  .member
    padding:0 30px
    p
      font-size: $fontsize-medium
      color: $color-gray1
      margin-top: 30px
      text-align: justify
      line-height: 40px
    table
      text-align: center
      border-collapse: collapse
      border: 1px solid $color-gray2
      font-size: $fontsize-medium
      color: $color-gray1
      height: 340px
      width: 600px
      margin: 20px auto
      tr
        th
          border: 1px solid $color-gray2
          background: $color-gray6
        td
          border: 1px solid $color-gray2
</style>
