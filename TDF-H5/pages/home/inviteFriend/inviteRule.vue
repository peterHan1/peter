<template>
  <div class="invite_rule">
    <td-header title="邀请规则"/>
    <div class="rules">
      <p>1、符合理财师标准的用户，根据其名下的邀请关系（含新邀请规则前已邀请的人），按照最新的邀请规则进行相应的返现奖励！ </p>
      <p>2.好友首投奖励：直接被邀请人首次散标出借成功（非债权转让标的）或者省心投加入成功，邀请人即可获得10元抵扣券（使用条件：起投1000元，1个月及以上，有效期为30天）和首次出借金额0.25%的返现奖励；（返现记录当天生成，返现奖励周一统一发放，抵用券首投成功就发放）</p>
      <p>3.好友第二次出借起，出借的是非债权转让标的，则邀请人即可根据目前的拓道客等级，享受返现奖励；</p>
      <p>拓道客等级及福利如图：</p>
      <table>
        <tr>
          <th
            rowspan="2"
            width="15%">邀请人<br>等级</th>
          <th
            colspan="2"
            width="30%">直接被邀请人</th>
          <th rowspan="2">邀请人享受福利</th>
          <th rowspan="2">返现<br>有效时间</th>
        </tr>
        <tr>
          <th>≥V1人数</th>
          <th>总待收</th>
        </tr>
        <tr>
          <td>初级<br>拓道客</td>
          <td width="15%">0-5人</td>
          <td width="15%">0-200万</td>
          <td>直接邀请人<br>每笔出借收益2%返现</td>
          <td>12个月</td>
        </tr>
        <tr>
          <td>中级<br>拓道客</td>
          <td>6-14人</td>
          <td>200-400万</td>
          <td>
            直接被邀请人<br>每笔出借收益3%返现<br>
            间接被邀请人<br>每笔出借收益1%返现
          </td>
          <td>一直有效</td>
        </tr>
        <tr>
          <td>王牌<br>拓道客</td>
          <td>15人及以上</td>
          <td>400万及以上</td>
          <td>
            直接被邀请人<br>每笔出借收益5%返现<br>
            间接被邀请人<br>每笔出借收益2%返现
          </td>
          <td>一直有效</td>
        </tr>
      </table>
      <p>拓道客返现奖励到账时间：被邀请人出借的散标或者省心投项目收益到账当天，返现记录即生成，返现奖励周一统一发放。抵用券直接发放。</p>
      <p>直接好友：用户A邀请了用户B，则B为A的直接好友；</p>
      <p>间接好友：用户A邀请了用户B，用户B邀请了用户C，则C为A的间接好友；</p>
      <div class="invite_txt">
        <p>举例说明：</p>
        <p>王牌拓道客A新规则上线之前邀请了一个用户B，用户B邀请了用户C；</p>
        <p>新规则上线后 ：B用户复投的标的（无论何时复投的非债权转让标）在8月5日有到期利息100元，则A用户可得B的奖励：100*5%=5元 ;</p>
        <p>C用户复投的标的（无论何时复投的非债权转让标）在8月5日有到期利息100.12元，则A用户可得C的奖励：100.12*2%=5.0024元 ,实际到账5.01元（采用进一位的算法，不足0.01元的奖励，均给0.01元）;</p>
        <p>则8月5日A用户一共可得奖励=B用户5元+C用户2.01元=7.01元;</p>
      </div>
      <p>4.被邀请人注册成功时<br>
        若邀请人为初级拓道客，被邀请人可获得1%的加息券（60天）<br>
        若邀请人为中级拓道客，被邀请人可获得2%的加息券（60天）<br>
        若邀请人为王牌拓道客，被邀请人可获得3%的加息券+300积分（60天）
      </p>
      <p class="title">特别说明：</p>
      <p>1、拓道客的收益返现按规则上线日开始计算，之前被邀请人出借的返现不补发。<br>当新规则上线前，用户已首投过，出借则直接算返现；<br>当新规则上线前，用户未首投过，则按照新规则首投+第二次出借均给与返现；</p>
      <p>2、符合拓道客标准的用户，根据其名下的邀请关系，按照最新的邀请规则进行返现奖励。</p>
      <p>3、返现的金额会处于“待发放”状态，在每周一进行结算后，会返回到可用余额的账户上。</p>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '邀请规则'
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
.invite_rule
  padding-top: 88px
  height:100%
  position:absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  .rules
    background: $color-white
    padding: 31px 27px 49px 27px
    p
      font-size: $fontsize-medium
      color:#666
      line-height:40px
      margin-bottom:16px
      text-align:justify
      &.title
        font-size: $fontsize-medium
        color:#333
        margin-top:30px
        margin-bottom:0
    table
      width:100%
      text-align: center
      border-collapse:collapse
      border-spacing:0
      border:1px solid $color-gray4
      margin-bottom:16px
      tr
        border:1px solid $color-gray4
        th
          font-size: $fontsize-small-ss
          color:$color-gray1
          background-color: $color-background
          height:52px
          font-weight: 100
          border-right:1px solid $color-gray4
          vertical-align: middle
        td
          font-size: $fontsize-small-sss
          color:$color-gray2
          border-right:1px solid $color-gray4
          height:89px
          padding: 0
          vertical-align: middle
  .invite_txt
    margin-bottom: 16px
    p
      font-size:$fontsize-small-ss
      margin:0
      color:$color-gray3
</style>
