<template>
  <div class="free">
    <div class="top_nav">
      <ul>
        <li 
          :class="{on: active[0]}" 
          i="0" 
          @click="tabs(0)">项目介绍</li>
        <li 
          :class="{on: active[1]}" 
          i="1" 
          @click="tabs(1)">透明合规</li>
        <li 
          :class="{on: active[2]}" 
          i="2" 
          @click="tabs(2)">出借记录</li>
      </ul>
    </div>
    <drop-move :load-top="loadTop">
      <div class="content">
        <div 
          v-if="active[0]" 
          class="free_intro">
          <div class="free_list summary">
            <div class="deatils_title"><span/>项目概述</div>
            <div class="summary_list">
              <div>
                <p><span/>省心投介绍：</p>
                <p>省心投是本平台推出的自动投标工具。经由出借人授权，通过系统为出借人实现自动投标以提高出借效率</p>
              </div>
              <div>
                <p><span/>使用规则：</p>
                <p>加入省心投产品，即享有自动投标的权益。实际标的匹配成功，即行使借款人的出借权益</p>
              </div>
            </div>
          </div>
          <div class="free_list carDeta">
            <div class="deatils_title"><span/>车辆信息</div>
            <div class="carDeta_money">
              <div>
                <p>预计项目总额</p>
                <p>2,000,000.00元</p>
              </div>
              <div>
                <p>起投金额</p>
                <p>100.00元</p>
              </div>
              <div>
                <p>单笔限额</p>
                <p>2,000,000.00元</p>
              </div>
            </div>
          </div>
          <div class="free_list issue">
            <div class="deatils_title"><span/>常见问题</div>
            <ul>
              <li>
                <p>1. 省心投是怎么计息的？</p>
                <p>省心投是自动投标工具，只加入省心投未匹配到底层标的资 金不计息；加入省心投匹配底层标的资金，当匹配的底层满 标复审则开始计息。</p>
              </li>
              <li>
                <p>2. 省心投匹配规则？</p>
                <p>系统会根据出借时间、资金性质（是否为已清算资金）和标 量进行先后匹配，处于冻结中未匹配的资金不计息。 备注说明：若周五充值加入省心投，因为该充值资金属于未 清算资金，需等到下一个工作日（周一/法定节假日除外） 清算完毕后，系统才会开始匹配。</p>
              </li>
              <li>
                <p>3. 是否可以及时查看使用省心投出借的标的？</p>
                <p>加入省心投的资金所匹配的每个标的，都可以在相应的出借 详情页查看其具体金额、起止时间以及相关协议。</p>
              </li>
              <li>
                <p>4. 省心投是否可以使用优惠券？</p>
                <p>加息券和抵用券均可以使用。 举例：500000金额加入3个月期限的省心投(3月标年化利率 9%)，若使用3%加息券，则预计所得到期收益=500000* （9%+3%）/12*3=15000元</p>
              </li>
              <li>
                <p>5. 省心投的收益来源是什么？</p>
                <p>省心投仅是自动投标工具，本身并不产生收益，实际收益以 及权益以最终所匹配到的标的为准。</p>
              </li>
              <li>
                <p>6. 通过省心投出借的标的是否可以转让？</p>
                <p>通过省心投所匹配的每一个标的，均可以按照本平台债权转 让规则进行转让。</p>
              </li>
              <li>
                <p>7. 省心投未匹配成功的资金有收益吗？</p>
                <p>未匹配成功的资金不产生收益。</p>
              </li>
            </ul>
          </div>
        </div>
        <div 
          v-else-if="active[1]" 
          class="free_comp">
          <div class="deatils_title"><span/>保障措施</div>
          <div class="summary_list">
            <div>
              <p><span/>业务保障：</p>
              <p>汽车抵押借贷具有实物抵押保障、借款金额少、周期短等 显著优势。 </p>
            </div>
            <div>
              <p><span/>风控保障：</p>
              <p>通过详尽的贷前审查、谨慎的贷中排查、完善的贷后跟踪， 进行严格的风险控制，把风险控制渗入每一个环节中。坚 持追求所有标的真实、有效，可追溯、可审查。 </p>
            </div>
            <div>
              <p><span/>平台保障：</p>
              <p>卓越的系统架构：使用稳定高效的阿里云服务器，采用双 服务器运行，每15分钟自动备份保存平台数据； <br >管理标准：人员、制度、系统、运营均具备完善的管理标 准体系。 </p>
            </div>
          </div>
        </div>
        <div 
          v-else 
          class="free_record">
          <ul class="borrow_record">
            <li 
              v-for="(item,index) in items" 
              :key="index">
              <div>{{ item.phone }}</div>
              <div>
                <p>{{ item.money }}</p>
                <p>{{ item.time }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </drop-move>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '项目详情'
  },
  data() {
    return {
      active: [true, false, false],
      items: [
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' },
        { phone: '188*****3626', money: '12340.00', time: '2018-06-12 09:32' }
      ]
    }
  },
  methods: {
    loadTop() {
      window.history.go(-1)
    },
    tabs(index) {
      switch (index) {
        case 0:
          this.active = [true, false, false]
          break
        case 1:
          this.active = [false, true, false]
          break
        case 2:
          this.active = [false, false, true]
          break
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .free
    padding-top: 1.78rem
    height: 100%
    .top_nav
      width:100%
      height:.9rem
      position: fixed
      background-color: #fff
      z-index: 999
      top:0.88rem
      left:0
      ul
        width:100%
        height:100%
        overflow: hidden
        li
          float: left
          width:33%
          height:.9rem
          font-size: .28rem
          color:#999999
          text-align: center
          line-height: .9rem
          position: relative
          -webkit-tap-highlight-color: transparent
          &.on:after
            content: " "
            width:0.68rem
            height:.06rem
            background-color: #FF7102
            position: absolute
            left: 36%
            bottom: 0
            border-radius:3px
            z-index: 5
          &.on
            color:#FF7B00
    .content
      .free_list
        background-color: #fff
      .deatils_title
        font-size: 0.28rem
        color: #333
        height: 0.7rem
        line-height: 0.7rem
        border-bottom: 1px solid #E0E0E0
        padding-left: 0.3rem
        -webkit-box-sizing: border-box
        -moz-box-sizing: border-box
        box-sizing: border-box
        span
          display: inline-block
          width: 0.06rem
          height: 0.24rem
          background-color: #FF7102
          border-radius: 20px
          margin-right: 0.14rem
      .summary_list div
        padding: 0 0.3rem
        p span
          display: inline-block
          width: 0.08rem
          height: 0.08rem
          background-color: #FF7B00
          border-radius: 0.08rem
          margin-right: 0.15rem
          position: absolute
          left: 0
          top: 45%
        &:nth-child(1)
          padding-top: 0.07rem
        &:nth-child(2)
          padding-bottom: 0.25rem
        p:nth-child(1)
          font-size: 0.26rem
          color: #999
          margin-top: 0.17rem
          line-height: 0.37rem
          padding-left: 0.23rem
          position: relative
        p:nth-child(2)
          font-size: 0.26rem
          color: #333
          line-height: 0.37rem
          margin-top: 0.07rem
          padding-left: 0.23rem
      .carDeta
        margin-top: 0.2rem
        .carDeta_money
          padding: 0.07rem 0 0.26rem
          div
            overflow: hidden
            padding: 0 0.3rem
            line-height: 0.37rem
            margin-top: 0.17rem
            p
              font-size: 0.26rem
              &:nth-child(1)
                color: #999
                float: left
              &:nth-child(2)
                color: #333
                float: right
      .issue
        margin-top: 0.2rem
        ul
          margin-bottom: 1rem
          li
            padding: 0 0.3rem
            overflow: hidden
            &:last-child
              padding-bottom: 0.35rem
              border-bottom: 0.2rem solid #F2F3F7
          p
            font-size: 0.26rem
            line-height: 0.4rem
            &:nth-child(1)
              color: #333
              margin-top: 0.27rem
            &:nth-child(2)
              color: #999
              margin-top: 0.16rem
      .free_comp
        background-color: #fff
        padding-bottom: 0.35rem
        .summary_list div:nth-child(2)
          padding-bottom: 0
      .free_record
        background-color: #fff
        .borrow_record
          margin-bottom: 1rem
          li
            overflow: hidden
            margin: 0 .3rem
            border-bottom: 1px solid #E0E0E0
            font-size: 0.28rem
            &:last-child
              border-bottom: none
            div:nth-child(1)
              float: left
              height: 1.37rem
              line-height: 1.37rem
            div:nth-child(2)
              float: right
            div p:nth-child(1)
              font-size: 0.28rem
              color: #333
              margin-top: 0.3rem
              line-height: 0.4rem
              text-align: right
            div p:nth-child(2)
              font-size: 0.22rem
              color: #999
              line-height: 0.3rem
              margin-top: 0.08rem
</style>
