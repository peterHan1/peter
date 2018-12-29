<template>
  <div class="protocalBox">
    <Protocol></Protocol>
    <div class="entrust">
        <div>
            <h1>“省心投”自动投标工具出借人</h1>
            <h1>授权委托书</h1>
        </div>
        <div>
            <p>省心投编号：<span class="num"></span></p>
        </div>
        <div>
            <p>委托人：</p>
            <p>身份证号：</p>
            <p>联系方式：</p>
        </div>
        <div class="td_stamp">
            <b class="stamp"></b>
            <p>受托人：杭州拓道互联网金融服务有限公司（简称“拓道金服”）</p>
            <p>联系地址：杭州市西湖区中节能西溪首座B2裙楼</p>
        </div>
        <div>
            <h3>鉴于：</h3>
            <p>1.出借人系杭州拓道互联网金融服务有限公司（以下简称“拓道金服”）旗下经营管理的“拓道金服”网络借贷平台（网址：www.51tuodao.com）的实名注册用户，居住在中华人民共和国境内、符合中华人民共和国法律规定的完全民事行为能力人。</p>
            <p>2.出借人自愿使用“拓道金服”网络借贷平台上发布的 <span class="pro">“省心投”</span> 自动投标工具（以下简称“省心投”）。</p>
            <p>为实现匹配出借人的需求，出借人在此确认并授权“拓道金服”全权代理其行使下列事项：</p>
        </div>
        <div>
            <h3>一、出借省心投</h3>
            <p>1.出借人自愿加入“省心投”，并不可撤销地委托及授权“拓道金服”依其专业技术和判断，将其加入“省心投”部分的资金在匹配标的成功后自动投向“拓道金服”网络借贷平台上的标的。</p>
            <p>2.加入及授权出借金额：共计人民币<span class="money"></span>元 &nbsp;（大写:<span class="moneys"></span>）。</p>
            <p>3.本人知晓并确认通过该工具预计匹配到的标的期限为 <span class="pre" id="fb_period"></span>月，同类型项目历史参考约定利率为<span class="pre" id="fb_apr"></span>%，出借标的类型为抵押或质押标（以最终匹配到的标的为准）。</p>
            <p>4.省心投的募集期限是1-15个工作日，逾期未匹配成功的，本计划自动终止。</p>
        </div>
        <div>
            <h3>二、签署相关协议</h3>
            <p>1.出借人同意并不可撤销地委托并授权“拓道金服”在匹配标的成功后，代为（包括但不限于以调取、使用出借人的数字证书、电子签名等形式）线上签署任何相关协议（包括但不限于《借款协议》、《担保协议》、《债权转让及受让协议》以及其他任何“拓道金服”认为其需要签署的协议）。</p>
            <p>2.出借人进一步确认，对“拓道金服”根据“省心投”代出借人出借的每一笔借款项目详情（包括但不限于具体的项目名称、出借金额及还款方式等）均予以接受并认可。</p>
            <p>3.出借人对此等自动出借借款项目和授权拓道金服签署相关协议的安排已充分知悉、理解，并确认“拓道金服”代表其签署的法律文件即代表其真实的意思表示，出借人对该等法律文件之效力均予以认可且无任何异议，并无条件接受该等协议的约束。</p>
            <p>4.该签署行为视为出借人的操作，因此产生的一切法律后果由出借人自行承担。</p>
        </div>
        <div>
            <h3>三、收付、划扣相关款项</h3>
            <p>出借人不可撤销地委托并授权“拓道金服”为实现“省心投”下的每一笔借款项目，有权向“拓道金服”合作的支付机构或存管银行发送指令以实现对相关款项进行划扣、支付或行使任何其他权利，出借人对此均予以接受和认可。</p>
        </div>
        <div>
            <h4>本授权委托书经出借人自行通过网络在“拓道金服”网络借贷平台上在线点击相关确认键后生效。</h4>
        </div>
        <div>
            <p>委托人：</p>
            <p>受托人：杭州拓道互联网金融服务有限公司</p>
        </div>
    </div>
  </div> 
</template>
<script>
import Protocol from './protocol.vue'
export default {
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
    Protocol
  }
}
</script>
<style lang="stylus" scoped>
.protocalBox
  background-color: #fff
  .entrust
    padding: 30px 30px 20px
    color: #333
    h1
      font-size: 30px
      font-weight: bold
      text-align: center
      line-height: 65px
    h3
      font-size: 30px
      font-weight: bold
      margin-bottom: 20px
    h4
      font-size: 30px
      line-height: 48px
      font-weight: bold
    p
      font-size: 24px
      line-height: 48px
      text-align: justify
      .num
        min-width: 350px
      .pro
        min-width: 130px
      .money
        min-width: 124px
      .moneys
        min-width: 180px
      .pre
        min-width: 40px
      span
        display: inline-block
        text-align: center
        border-bottom: 2px solid #333
    div
      margin-bottom: 46px
    .td_stamp
      position: relative
      .stamp
        position: absolute
        right: 0
        top: -160px
        width: 230px
        height: 230px
        background: url(../../../assets/images/invest-list/gsgz.png) no-repeat
        background-size: 100% 100%
</style>

