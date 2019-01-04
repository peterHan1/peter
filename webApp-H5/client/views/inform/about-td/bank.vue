<template>
  <div class="bank">
    <Header navLeftTxt="icon">关于拓道</Header>
    <h3>资金存管 </h3>
      <div>
        <h4>一、资金存管依据：</h4>
        <p>
            《网络借贷信息中介机构业务活动管理暂行办法》第二十八条规定：网络借贷信息中介机构应当实行自身资金与出借人和借款人资金的隔离管理，并选择符合条件的银行业金融机构作为出借人与借款人的资金存管机构
        </p>
      </div>
      <div>
        <h4>二、资金存管情况：</h4>
        <p>
            依据此项规定的要求，拓道金服于2017年4月接入存管系统，目前使用新网银行的存管系统。
        </p>
      </div>
      <div>
        <h4>三、资金存管的方式：</h4>
        <p>
            新网银行借助资金存管系统对出借人、借款人从事网络借贷活动所形成的专项借贷资金及相关资金开立专用账户并进行存管，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算等职责，用户充值、投资、还款、提现、缴费等环节涉及的资金均通过存管系统专用账户流动，平台仅根据用户授权或要求向存管银行发布业务指令，不触碰用户资金，实现了用户资金与平台自身资金的隔离和分账管理。
        </p>
      </div>
      <div>
        <h4>四、资金存管指引：</h4>
        <p>
            《网络借贷资金存管业务指引》第二条： 本指引所称网络借贷资金存管业务，是指商业银行作为存管人接受委托人的委托，按照法律法规规定和合同约定，履行网络借贷资金存管专用账户的开立与销户、资金保管、资金清算、账务核对、提供信息报告等职责的业务。存管人开展网络借贷资金存管业务，不对网络借贷交易行为提供保证或担保，不承担借贷违约责任。</p>
      </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '关于拓道'
  },
  data () {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  h3
    font-size:0.28rem
    color:#212a36
    height:0.8rem
    line-height:0.8rem
    font-weight: normal
    border-bottom: 1px solid #e4e4e4
  .bank
    padding: 1.08rem 0.3rem 0.2rem
    background-color: white
    h4
      font-size: 0.24rem
      color: #212a36
      line-height: 1rem

    p
      font-size: 0.24rem
      color: #626262
      line-height: 0.42rem
</style>