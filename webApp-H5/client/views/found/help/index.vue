<template>
  <div class="help">
    <Header navLeftTxt="icon" @navRightFn="navRightFn()" navRightTxt="意见反馈">帮助与反馈</Header>
    <div class="help_top">
      <div class="flex">
        <router-link to="/found/help/login" class="flex-1">
          <i class="iconfont">&#xe6aa;</i>
          <p>注册登录</p>
        </router-link>
        <router-link to="/found/help/bank" class="flex-1">
          <i class="iconfont">&#xe6ac;</i>
          <p>银行资金存管</p>
        </router-link>
        <router-link to="/found/help/rates" class="flex-1">
          <i class="iconfont">&#xe6ab;</i>
          <p>收费标准</p>
        </router-link>
      </div>
      <div class="flex">
        <router-link to="/found/help/cash" class="flex-1">
          <i class="iconfont">&#xe6ad;</i>
          <p>充值提现</p>
        </router-link>
        <router-link to="/found/help/payment" class="flex-1">
          <i class="iconfont">&#xe6ae;</i>
          <p>出借回款</p>
        </router-link>
        <router-link to="/found/help/free" class="flex-1">
          <i class="iconfont">&#xe6bc;</i>
          <p>省心投</p>
        </router-link>
      </div>
      <div class="flex">
        <router-link to="/found/help/creditor" class="flex-1">
          <i class="iconfont">&#xe6a4;</i>
          <p>债权转让</p>
        </router-link>
        <router-link to="/found/help/auto" class="flex-1">
          <i class="iconfont">&#xe6a5;</i>
          <p>自动投标</p>
        </router-link>
        <router-link to="/found/help/point" class="flex-1">
          <i class="iconfont">&#xe6a7;</i>
          <p>积分</p>
        </router-link>
      </div>
    </div>
    <div class="help_bot" style="margin-bottom:0.2rem;">
      <h3>业务授权</h3>
      <ul>
        <li>
          <a href="javascript:" @click="actives = !actives">
            <span class="fl">1.业务授权是什么？</span>
            <i class="iconfont fr" :class="{deg: actives}">&#xe6a3;</i>
          </a>
          <div v-show="actives">
            <p>属于银行存管升级后，存管系统的一个功能，针对出借人在平台进行出借过程中，若出借人需要使用自动投标的功能，则必须进行授权。</p>
          </div>
        </li>
        <li>
          <a href="javascript:" @click="active0 = !active0">
            <span class="fl">2.业务授权的的金额是什么？</span>
            <i class="iconfont fr" :class="{deg: active0}">&#xe6a3;</i>
          </a>
          <div v-show="active0">
            <p>出借人授权后单笔可出借的最大金额</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="help_bot" style="margin-bottom:0.2rem;">
      <h3>推荐方式</h3>
      <ul>
        <li>
          <a @click="active1 = !active1">
            <span class="fl">1.推荐方式有哪些？</span>
            <i class="iconfont fr" :class="{deg: active1}">&#xe6a3;</i>
          </a>
          <div v-show="active1">
            <p>A、网页端：登录拓道金服平台，点击【我的账户】—【邀请好友】，通过推荐码、QQ好友、微信、微博等方式分享给好友。</p>
            <p>B、手机端：登录拓道金服APP，点击点击【发现】—【邀请好友】，复制推荐码或分享推荐链接到第三方社交平台。</p>
          </div>
        </li>
        <!-- <li>
          <a @click="active2 = !active2">
            <span class="fl">2.邀请规则和奖励？</span>
            <i class="iconfont fr" :class="{deg: active2}">&#xe6a3;</i>
          </a>
          <div v-show="active2">
            <p>1.好友首投奖励：直接被邀请人首次散标出借成功（非债权转让标的）或者省心投加入成功，邀请人即可获得10元抵扣券（使用条件：起投1000元，1个月及以上，有效期为30天）和首次出借金额0.25%的返现奖励；（返现记录当天生成，返现奖励周一统一发放，抵用券首投成功就发放）;</p>
            <p>2.好友第二次出借起，出借的是非债权转让标的，则邀请人即可根据目前的拓道客等级，享受返现奖励；</p>
            <p>拓道客等级及福利如图：</p>
            <table id="tables">
              <tr>
                  <th width="15%" rowspan="2">邀请人<br />等级</th>
                  <th width="32%" colspan="2" style="height: 0.52rem;">直接被邀请人</th>
                  <th rowspan="2">邀请人享受福利</th>
                  <th rowspan="2">返现<br />有效时间</th>
              </tr>
              <tr>
                  <th style="height: 0.52rem;">≥V1人数</th>
                  <th style="height: 0.52rem;">总待收</th>
              </tr>
              <tr>
                <td>初级<br />拓道客</td>
                <td width="16%">0-5人</td>
                <td width="16%">0-200万</td>
                <td>直接邀请人<br />每笔出借收益2%返现</td>
                <td>12个月</td>
              </tr>
              <tr>
                <td>中级<br />拓道客</td>
                <td>6-14人</td>
                <td>200-400 万</td>
                <td>
                  <p>直接被邀请人<br />每笔出借收益3%返现</p>
                  <p>间接被邀请人<br />每笔出借收益1%返现</p>
                </td>
                <td>一直有效</td>
              </tr>
              <tr>
                <td>王牌<br />拓道客</td>
                <td>15人及<br />以上</td>
                <td>≥400万</td>
                <td>
                  <p>直接被邀请人<br />每笔出借收益5%返现 </p>
                  <p>间接被邀请人<br />每笔出借收益2%返现</p>
                </td>
                <td>一直有效</td>
              </tr>
            </table>
            <p>拓道客返现奖励到账时间：被邀请人出借的散标或者省心投项目收益到账当天，返现记录即生成，返现奖励周一统一发放。抵用券直接发放。</p>
            <p>直接好友：用户A邀请了用户B，则B为A的直接好友；</p>
            <p>间接好友：用户A邀请了用户B，用户B邀请了用户C，则C为A的间接好友；</p>
            <div class="invest_txt">
              <p>举例说明：</p>
              <p>王牌拓道客A新规则上线之前邀请了一个用户B，用户B邀请了用户C；</p>
              <p>新规则上线后 ：B用户复投的标的（无论何时复投的非债权转让标）在8月5日有到期利息100元，则A用户可得B的奖励：100*5%=5元 ;</p>
              <p>C用户复投的标的（无论何时复投的非债权转让标）在8月5日有到期利息100.12元，则A用户可得C的奖励：100.12*2%=5.0024元 ,实际到账5.01元（采用进一位的算法，不足0.01元的奖励，均给0.01元）;</p>
              <p>则8月5日A用户一共可得奖励=B用户5元+C用户2.01元=7.01元;</p>
            </div>
            <p>3.被邀请人注册成功时<br />
              若邀请人为初级拓道客，被邀请人可获得1%的加息券（60天）<br />
              若邀请人为中级拓道客，被邀请人可获得2%的加息券（60天）<br />
              若邀请人为王牌拓道客，被邀请人可获得3%的加息券+300积分（60天）
            </p>
            <p>4.拓道客等级升降级：</p>
            <p>若拓道客满足升级条件时，则可以当天直接升级为更高级拓道客；同时每个月月初0点，系统会重新计算每个拓道客的等级，若有未满足条件的拓道客，则会进行降级。</p>
          </div>
        </li> -->
      </ul>
    </div>
    <div class="help_bot">
      <h3>常见问题</h3>
      <ul>
        <li>
          <a @click="active3 = !active3">
            <span class="fl">1.关于拓道金服</span>
            <i class="iconfont fr" :class="{deg: active3}">&#xe6a3;</i>
          </a>
          <div v-show="active3">
            <p>杭州拓道互联网金融服务有限公司是一家专注于汽车抵押贷款这一细分市场的P2P互联网金融公司。拓道金服以银行的高标准，互联网的高效率，发展普惠金融，市场定位于小微出借群体和借贷群体，为民间投融资双方搭建一个安全、便捷、稳健的信息服务平台，将原先的信用借贷，转型于动产抵押借贷，做市场细分化，做专做强做稳，让小额借贷不再难。拓道金服着力解决民间投融资的信息不对称、征信不健全等问题，促进民间投融资便利化、民间借贷阳光化，力争成为国家倡导的多层次投融资体系中领先的专业汽车抵押贷款服务平台，开启金融定制时代。</p>
          </div>
        </li>
        <li>
          <a @click="active4 = !active4">
            <span class="fl">2.什么是互联网金融？</span>
            <i class="iconfont fr" :class="{deg: active4}">&#xe6a3;</i>
          </a>
          <div v-show="active4">
            <p>互联网金融是传统金融行业与互联网精神相结合的新兴领域。互联网金融与传统金融的区别不仅仅在于金融业务所采用的媒介不同，更重要的在于金融参与者深谙互联网开放、平等、协作、分享的精髓。通过互联网、移动互联网等工具，使得传统金融业务具备透明度更强、参与度更高、协作性更好、中间成本更低、操作上更便捷等一系列特征。</p>
          </div>
        </li>
        <li>
          <a @click="active5 = !active5">
            <span class="fl">3.什么是先息后本？</span>
            <i class="iconfont fr" :class="{deg: active5}">&#xe6a3;</i>
          </a>
          <div v-show="active5">
            <p>先息后本的本义是：先还利息再还本金。</p>
          </div>
        </li>
        <li>
          <a @click="active6 = !active6">
            <span class="fl">4.什么是等额本息？</span>
            <i class="iconfont fr" :class="{deg: active6}">&#xe6a3;</i>
          </a>
          <div v-show="active6">
            <p>等额本息还款是指借入者每月按相等的金额偿还贷款本息，其中每月贷款利息按月初剩余贷款本金计算并逐月结清。</p>
            <p>贷款初期和后期所还本金不同是由于每月的还款额相等，因此在贷款初期每月的还款中，剔除按月结清的利息后，所还的贷款本金就较少；而在贷款后期因贷款本金不断减少、每月的还款额中贷款利息也不断减少，每月所还的贷款本金就较多。即借款人每月还款额中的本金比重逐月递增、利息比重逐月递减。</p>
          </div>
        </li>
        <li>
          <a @click="active7 = !active7">
            <span class="fl">5.为什么自动投标排名会退后？</span>
            <i class="iconfont fr" :class="{deg: active7}">&#xe6a3;</i>
          </a>
          <div v-show="active7">
            <p>自动投标排名出现后退可能有以下4种情况：</p>
            <p>1.标的已经投出；</p>
            <p>2.触碰自动投标开关；</p>
            <p>3.账户资金不足100元或设置每次出借金额不足100元（算作无效排名）；</p>
            <p>4.自动投标的标的设置不正确。</p>
          </div>
        </li>
        <li>
          <a @click="active8 = !active8">
            <span class="fl">6.自动投标一直投不出去？</span>
            <i class="iconfont fr" :class="{deg: active8}">&#xe6a3;</i>
          </a>
          <div v-show="active8">
            <p>长期投不出去，建议您查看是否勾选了保留排名，或者账户可用余额小于100元，属于无效排名。</p>
          </div>
        </li>
        <li>
          <a @click="active9 = !active9">
            <span class="fl">7.什么是安存？</span>
            <i class="iconfont fr" :class="{deg: active9}">&#xe6a3;</i>
          </a>
          <div v-show="active9">
            <p>第三方数据存管机构，保全用户信息安全。</p>
          </div>
        </li>
        <li>
          <a @click="active10 = !active10">
            <span class="fl">8.如何查看电子合同？</span>
            <i class="iconfont fr" :class="{deg: active10}">&#xe6a3;</i>
          </a>
          <div v-show="active10">
            <p>PC端：点击右上角【我的账户】，左边栏【我的出借】选一个项目查看详情【查看借款协议】。</p>
            <p>APP端：点击【资产】—【我的出借】，选一个项目，点击页面下方的【借款协议】即可查看。</p>
          </div>
        </li>
        <li>
          <a @click="active11 = !active11">
            <span class="fl">9.为什么充值时提示 交易拒绝(RM10029)？</span>
            <i class="iconfont fr" :class="{deg: active11}">&#xe6a3;</i>
          </a>
          <div v-show="active11">
            <p>您的充值环境出现异常，建议您使用本人设备或更换安全环境下充值。</p>
          </div>
        </li>
        <li>
          <a @click="active12 = !active12">
            <span class="fl">10.如何更换绑定手机号码？</span>
            <i class="iconfont fr" :class="{deg: active12}">&#xe6a3;</i>
          </a>
          <div v-show="active12">
            <p>将修改原因及需求、用户名、旧手机号、新手机号、姓名、身份证号，本人手持身份证近照，及身份证正反面照片，发送到tuodaojinfu@51tuodao.com邮箱，我们的工作人员会在3个工作日内进行审核更改。</p>
          </div>
        </li>
        <li>
          <a @click="active13 = !active13">
            <span class="fl">11.设置自动投标后是否能投手动标？</span>
            <i class="iconfont fr" :class="{deg: active13}">&#xe6a3;</i>
          </a>
          <div v-show="active13">
            <p>自动投标设置后，您还是可以去投手动标。</p>
          </div>
        </li>
        <li>
          <a @click="active14 = !active14">
            <span class="fl">12.借款协议是否可以下载？</span>
            <i class="iconfont fr" :class="{deg: active14}">&#xe6a3;</i>
          </a>
          <div v-show="active14">
            <p>PC端：点击右上角【我的账户】，左边栏【我的出借】选择一个项目查看详情【查看安存保全】，在页面的最下方点击下载。</p>
            <p>APP端：点击【资产】—【我的出借】，选一个项目，点击页面下方的【安存保全】进行下载。</p>
          </div>
        </li>
        <li>
          <a @click="active15 = !active15">
            <span class="fl">13.无法接收到验证码？</span>
            <i class="iconfont fr" :class="{deg: active15}">&#xe6a3;</i>
          </a>
          <div v-show="active15">
            <p>1.请确认手机是否安装短信拦截或过滤软件；</p>
            <p>2.可以通过接收语音验证码来输入验证码；</p>
            <p>3.如是充值时的验证码没有接收到，请咨询银行；</p>
            <p>4.如有特殊情况，请通过关注“拓道金服”微信(QQ)公众号联系在线客服，服务热线：4008566685。</p>
          </div>
        </li>
        <li>
          <a @click="active16 = !active16">
            <span class="fl">14.新手标最大金额可以投多少，可以投几次？</span>
            <i class="iconfont fr" :class="{deg: active16}">&#xe6a3;</i>
          </a>
          <div v-show="active16">
            <p>当前新人标的额度最大值，新人标用户只能投一次且只有首投可用。</p>
          </div>
        </li>
        <li>
          <a @click="active17 = !active17">
            <span class="fl">15.你们有发标预告吗？</span>
            <i class="iconfont fr" :class="{deg: active17}">&#xe6a3;</i>
          </a>
          <div v-show="active17">
            <p>拓道金服没有发标预告。</p>
          </div>
        </li>
        <li>
          <a @click="active18 = !active18">
            <span class="fl">16.出借人风险承受能力测评的目的和规则是什么？</span>
            <i class="iconfont fr" :class="{deg: active18}">&#xe6a3;</i>
          </a>
          <div v-show="active18">
            <p>1、根据《网络借贷信息中介机构业务活动管理暂行办法》第二十六条，为保障出借人出借合适的产品，拓道金服根据出借人风险承受能力评估结果，将出借人风险承受能力由低到高分为谨慎型、稳健型、平衡型、积极型、激进型五种类型；</p>
            <p>2、出借人风险承受能力评估结果有效期为一年，如果一年内没有进行过风险承受能力评估，在下次出借时需要重新进行评估；</p>
          </div>
        </li>
        <li>
          <a @click="active19 = !active19">
            <span class="fl">17.拓道金服对项目的风险评估结果是如何分类的？</span>
            <i class="iconfont fr" :class="{deg: active19}">&#xe6a3;</i>
          </a>
          <div v-show="active19">
            <p>原则上，拓道金服将项目风险评估由高到低分为A、B、C、D四种结果类型，具体含义请见下表：</p>
            <table>
              <tr>
                <th>项目风险评估结果</th>
                <th>含义</th>
              </tr>
              <tr>
                <td>A</td>
                <td>本金、收益稳定</td>
              </tr>
              <tr>
                <td>B</td>
                <td>本金相对稳定，收益可能有轻微波动</td>
              </tr>
              <tr>
                <td>C</td>
                <td>本金、收益可能有一定幅度的波动</td>
              </tr>
              <tr>
                <td>D</td>
                <td>本金、收益可能有大幅度波动</td>
              </tr>
            </table>
          </div>
        </li>
        <li>
          <a @click="active20 = !active20">
            <span class="fl">18. 不同风险承受能力测评结果会有什么限制条件？</span>
            <i class="iconfont fr" :class="{deg: active20}">&#xe6a3;</i>
          </a>
          <div v-show="active20">
            <p>谨慎型出借人，可以出借风险评估结果为A的产品，可投总金额不超过40万元；</p>
            <p>稳健型出借人，可以出借风险评估结果为A和B的产品，可投总金额不超过60万元；</p>
            <p>平衡型出借人，可以出借风险评估结果为A和B的产品，可投总金额不超过80万元；</p>
            <p>积极型出借人，可以出借风险评估结果为A、B和C的产品，可投总金额不超过100万元；</p>
            <p>激进型出借人，可以出借所有的产品，可投总金额不超过9999万元。</p>
          </div>
        </li>
        <li>
          <a @click="active21 = !active21">
            <span class="fl">19. 如何提升测评分值？</span>
            <i class="iconfont fr" :class="{deg: active21}">&#xe6a3;</i>
          </a>
          <div v-show="active21">
            <p>您可以查看“风险测评题目分值模拟表”了解风险测评的规则，测评分值总和越高代表您的风险承受能力越高。在您进行风险测评时请根据自身的实际情况选择答案，以便更清晰的了解自身风险承受能力。</p>
            <p class="p_table">风险测评题目分值模拟表</p>
            <table class="numTable">
              <tr>
                <th class="bias">
                  <i class="bias_r">序号</i>
                  <span class="bias_rotate"></span>
                  <i class="bias_l">选项</i>
                </th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
              </tr>
              <tr>
                <td>A</td>
                <td>30</td>
                <td>10</td>
                <td>10</td>
                <td>90</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
              </tr>
              <tr>
                <td>B</td>
                <td>70</td>
                <td>30</td>
                <td>30</td>
                <td>70</td>
                <td>30</td>
                <td>30</td>
                <td>30</td>
                <td>30</td>
              </tr>
              <tr>
                <td>C</td>
                <td>90</td>
                <td>50</td>
                <td>50</td>
                <td>50</td>
                <td>50</td>
                <td>70</td>
                <td>70</td>
                <td>70</td>
              </tr>
              <tr>
                <td>D</td>
                <td>50</td>
                <td>70</td>
                <td>70</td>
                <td>30</td>
                <td>70</td>
                <td>90</td>
                <td>90</td>
                <td>90</td>
              </tr>
              <tr>
                <td>E</td>
                <td>10</td>
                <td>90</td>
                <td>90</td>
                <td>10</td>
                <td>90</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </li>
      </ul>
    </div>
    <div class="contact" id="contact">
      <p>联系客服</p>
      <p>服务时间：9：00-18：00</p>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '帮助与反馈'
  },
  data () {
    return {
      actives: false,
      active0: false,
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
      active15: false,
      active16: false,
      active17: false,
      active18: false,
      active19: false,
      active20: false,
      active21: false
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
    padding: 0.88rem 0 1.23rem
    .fr
      float: right
    a p
      color: #212a36
    .help_top
      background-color:white
      padding:0.4rem 0
      div.flex
        display: flex
      div:nth-child(2)
        margin-top:0.62rem
      div:nth-child(3)
        margin-top:0.62rem
      a
        text-align:center
        font-size: 0
        &.flex-1
          flex: 1
      .iconfont
        color:#FF7400
        font-size:0.5rem
      p
        font-size:0.24rem
        margin-top:0.15rem
    .help_bot
      table
        width:100%
        border-collapse:collapse
        tr
          line-height:0.5rem
        th
          border:1px solid #d8d8d8
          padding:0 0.1rem
        td
          border:1px solid #d8d8d8
          padding:0 0.1rem
      margin-top:0.2rem
      h3
        font-size: 0.28rem
        color: #212a36
        height: 0.8rem
        line-height: 0.8rem
        border-bottom: 1px solid #e4e4e4
        padding:0 0.3rem
        font-weight: normal
        background-color:white
      li a
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
      li
        div
          font-size:0.24rem
          color:#626262
          padding:0.22rem 0.3rem
          p
            line-height:0.4rem
            text-align: justify
          #tables
            text-align: center
            margin: 0.15rem 0
            tr
              line-height: 0.4rem
              th
                color: #333
            th,td
              padding: 0rem
              overflow: hidden
              height: 1.04rem
              vertical-align: middle
            tr p
              text-align: center
        .invest_txt
          font-size:0.2rem
          padding:0
          color:#999
          margin: 0.16rem 0
      .bias
        width: 1rem
        position: relative
        padding: 0!important
        overflow: hidden
        font-size: 0.16rem
        i
          position:absolute
        .bias_l
          left:2px
          top:5px
        .bias_r
          right:2px
          top:-5px
        .bias_rotate
          position:absolute
          left:-1px
          top:50%
          display:inline-block
          width:1.1rem
          height:1px
          background-color:#d8d8d8
          transform:rotate(25deg)
          -ms-transform:rotate(25deg)
          -moz-transform:rotate(25deg)
          -webkit-transform:rotate(25deg)
          -o-transform:rotate(25deg)
        .numTable
          border-spacing: 0
          th,td
            text-align: center
    .contact
      text-align: center
      height: 1.23rem
      background: #fff
      position: fixed
      bottom: 0
      width: 100%
      p:first-child
        color:#FF7400
        margin-top:0.25rem
        margin-bottom: .1rem
      p:last-child
        color:#626262
        font-size:0.24rem
</style>