<template>
	<div class="protocol">
		<div>
			<h1>债权转让协议</h1>
		</div>
		<div>
			<p>合同签订地：杭州市西湖区</p>
		</div>
		<div>
			<p>甲方（债权转让人）：{{proList.assignorName}}</p>
			<p>在拓道金服平台用户名为：{{proList.assignorNickName}}</p>
			<p>身份证号/营业执照号：{{proList.assignorIdCard}}</p>
		</div>
		<div class="td_stamp">
			<p>乙方（债权受让人）：{{proList.assigneeName}}</p>
			<p>在拓道金服平台用户名为：{{proList.assigneeNickName}}</p>
			<p>身份证号：{{proList.assigneeIdCard}}</p>
			<b class="stamp"></b>
		</div>
		<div>
			<p>丙方（居间人）：杭州拓道互联网金融服务有限公司</p>
			<p>地址：杭州市西湖区西溪路550号西溪新座7幢B座11楼</p>
		</div>
		<div>
			<h3>鉴于：</h3>
			<p>1.甲方系根据中华人民共和国法律成立并存续的企业或符合中华人民共和国法律规定的完全民事行为能力法人企业。</p>
			<p>2.乙方系符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，能独立行使和承担协议项下权利义务的自然人。乙方为丙方旗下的“拓道金服”网络借贷信息中介机构（网址为“www.51tuodao.com”，以下简称“拓道金服”或“平台”）的注册会员。</p>
			<p>3.现甲方根据丙方运营管理的“拓道金服”网络借贷信息中介机构的相关规定及有关法律法规的规定，在“拓道金服”平台上转让上述债权。</p>
			<p>协议各方在此申明，对本协议的所有条款都进行了充分的理解，协议各方对本协议下的全部条款均无异议，就甲方通过由丙方运营管理的“拓道金服”平台向乙方转让债权，并由丙方提供债权转让咨询服务等相关事宜，根据《中华人民共和国合同法》、《网络借贷信息中介机构业务活动管理暂行办法》及相关法律法规规定，各方遵循平等、自愿的原则，达成本协议。协议内容如下：</p>
		</div>
		<div>
			<h3>一、债权转让标的</h3>
			<p>甲方与债务人于 签订了《借款协议》。合同约定，债务 人向甲方借款人民币 <span>{{proList.account}}</span> 元，借款期限自<span>{{proList.beginDate}}</span>至<span>{{proList.endDate}}</span>，借款利率<span>{{proList.apr}}</span>/年。</p>
		</div>
		<div>
			<h3>二、债权转让</h3>
			<p>甲方同意根据“拓道金服”平台的相关债权转让规则及本合同约定的条件将其与债务人签订的标的合同项下的合同债权（包括但不限于与上述债权相对应的本金、利息、违约金等合同权利）全部在“拓道金服”平台上进行转让。其中，甲方将上述债权的全部或者一部分转让给乙方，乙方同意受让该债权（以下称标的债权）。</p>
		</div>
		<div>
			<h3>三、债权转让金额</h3>
			<p>1.甲方同意将标的合同项下债权按 1:1 的价格转让给乙方。</p>
			<p>2.乙方认购债权金额为人民币元。</p>
		</div>
		<div>
			<h3>四、债权到期日</h3>
			<p>本合同转让的债权到期日为《借款协议》约定的借款到期日。</p>
		</div>
		<div>
			<h3>五、转让招标时间</h3>
			<p>甲方于“拓道金服”的债权转让专区上成功发布债权转让信息，如甲方于发布信息2天内未能转让其全部债权的，视为该笔债权转让失败，甲方应当返还乙方及其他投资人的投标资金；如甲方于发布信息2天内转让其全部债权的，则该债权满标之后，债权的持有人即发生了变更。</p>
		</div>
		<div>
			<h3>六、债权转让的费用支付</h3>
			<p>1.乙方按照“拓道金服”的相关规则，在“拓道金服”债权转让专区购买正在转让的债权，通过对拟购买标的债权填写购买金额并点击“立即认购”按钮确认订立本合同后，本合同即成立并立即生效。</p>
			<p>2.同时，乙方对标的债权转让需求点击“立即认购”按钮，即不可撤销地授权“拓道金服”委托其合作的第三方支付机构或监管银行等，从以“拓道金服”名义开立的资金监管账户中的乙方名下的“拓道金服”平台账户中，将相应的金额转至甲方名下的“拓道金服”平台账户中。</p>
			<p>3.转让债权时平台收取的服务费为债权转让总额的0.5%（最低1元），将在转让成功后直接从甲方名下的“拓道金服”平台账户中扣除相应的转让服务费。</p>
			<p>4.为提高债权转让成功率，甲方有权在进行债权转让时增加奖励。如甲方转让时设置了转让奖励，将在转让成功后直接从甲方名下的“拓道金服”平台账户中扣除相应的转让奖励金额，并返回至乙方名下的“拓道金服”平台账户内</p>
			<p>5.甲方成功完成债权转让后，乙方即成为该债权持有人，享有该对债权的合同权利。</p>
		</div>
		<div>
			<h3>七、债权瑕疵担保</h3>
			<p>甲方保证每一笔债权均符合以下全部条件：</p>
			<p>1.标的合同真实、合法且有效，没有禁止或限制该合同项下的债权转让，基础合同中不存在任何不利于乙方行使债权项下权利的条款</p>
			<p>2.甲方已履行标的合同项下付款义务和其他已到期的义务；</p>
		</div>
		<div>
			<h3>八、债权转让通知</h3>
			<p>本合同签署后，由甲方负责通知原债务人债权转让事宜。</p>
		</div>
		<div>
			<h3>九、债务逾期</h3>
			<p>债权到期后，如债务人逾期还款的。乙方有权授权丙方向债务人进行债务催收服务，丙方向债务人催收所获款项扣除丙方催收费用及平台管理费用后，根据乙方所持债权份额按比例分配给乙方。具体的收取标准以“拓道金服”平台实际公布的收费标准为准。</p>
		</div>
		<div>
			<h3>十、甲方的权利和义务</h3>
			<p>1.甲方承诺向丙方提供的信息及时、合法、真实、有效，不得提供虚假信息或隐瞒重要事实，所借资金用途符合本合同约定。</p>
			<p>2.甲方同意，丙方有权使用其自行收集或甲方提供的甲方资料和信息用于互联网上项目展示信息披露，并向有关的合作机构提供必要的资料等。</p>
			<p>3.甲方应按规定向丙方支付信息服务费。</p>
		</div>
		<div>
			<h3>十一、乙方的权利和义务</h3>
			<p>1.乙方有权依照本协议约定获得债权受让收益。 2.乙方承诺向丙方提供的信息及时、合法、真实、有效， 用于受让债权的资金来源合法</p>
			<p>2.乙方承诺向丙方提供的信息及时、合法、真实、有效，用于受让债权的资金来源合法且符合丙方的要求。</p>
			<p>3.乙方同意以点击确认的方式签订本协议，并不以此为由拒绝履行本协议项下的义务，即便在签订时本协议并没有甲方及其他相关信息，乙方不得否认本协议项下债权债务关系或以任何方式撤回、撤销本协议。</p>
			<p>4.乙方同意并授权丙方根据本协议约定进行与甲方直接的债权转让款的发放以及债权收益的收回。</p>
			<p>5.乙方同意当甲方债权转让在募集期内未能满标而最终导致流标的或债权标的期限届满后，相应的应付借款本金、利息收益等全部资金将偿还至乙方在丙方系统的账户。</p>
			<p>6.乙方享有其所出借款项所带来的利息收益，并应自行申报与缴纳由租金收益所得带来的全部税费。</p>
		</div>
		<div>
			<h3>十二、丙方的权利和义务</h3>
			<p>1.丙方负责“拓道金服”平台的运行和维护，为甲、乙双方提供本协议约定的各项服务。</p>
			<p>2.甲、乙、丙三方一致同意，乙方授权丙方在有必要时，丙方有权代乙方对债务人进行关于本协议项下债务的违约提醒及催收工作，包括但不限于：电话通知、上门催收提醒、发律师函、对甲方提起诉讼等。乙方在此确认委托丙方为其进行以上工作、并授权丙方可以将此工作委托给本协议外的其他方进行。</p>
			<p>3.乙方在此委托并不可撤销地授权丙方作为乙方代表，行使乙方在本协议项下所有的权利义务。委托范围包括但不限于：代为收取标的债权项下的全部款项；将乙方的债权转让款委托丙方通过第三方支付机构划转至甲方银行收款账户或甲方指定银行收款账户；代为签收相关文件等；受托人丙方享有转委托权。</p>
			<p>4.丙方接受甲、乙双方的委托行为所产生的法律后果由相应委托方承担。如因甲方或乙方或其他方（包括但不限于技术问题）造成的延误或错误，丙方不承担任何责任。甲方或乙方在银行账户操作过程中采取的行为所产生的法律效果和法律责任归属于甲方、乙方，丙方不承担任何责任。</p>
			<p>5.丙方应对甲方和乙方的信息及本协议内容保密；如任何一方违约，或因相关权力部门要求（包括但不限于法院、仲裁机构、金融监管机构等），丙方有权披露。</p>
		</div>
		<div>
			<h3>十三、通知</h3>
			<p>本协议各方之间的书面通知或文件往来可以采用以下任何一种方式送达：</p>
			<p>1.短信方式送达，以短信消息至相对方信息接收终端时视为送达；</p>
			<p>2.丙方平台电子信息通知方式送达的，包括但不限于：平台系统通知、公告等，以电子信息至相对方信息接收终端时视为送达；</p>
			<p>3.邮件送达方式，发送人以协议载明邮箱发出邮件即视为送达。</p>
		</div>
		<div>
			<h3>十四、其他</h3>
			<p>1.本协议经甲方申请债权转让，并经乙方自行通过网络在“拓道金服”平台上在线点击相关确认键认可对应线上电子协议后生效。协议保存在丙方为此设立的专用服务器上备查，各方均认可该形式的协议效力。甲方、乙方应当妥善保管其在丙方所留注册信息、密码，若因非丙方原因导致上述信息泄露而造成甲方、乙方损失，则由甲方、乙方自行承担相应责任。</p>
			<p>2.甲方知晓本次债权转让的受让人均为“拓道金服”平台注册用户，且由多个债权受让人的资金组成本次债权转让款，甲方与每个债权受让人之间的债权转让均是相互独立的，一旦债务人逾期未支付应付款项的，乙方有权单独向债务人追索或者提起诉讼，丙方亦可单独向债务追索或者提起诉讼。</p>
			<p>3.本合同的订立、有效性。解释、签署以及与本合同有关的一切争议的解决均受中华人民共和国法律的管辖，并据其进行解释；</p>
			<p>4.如果协议各方在本合同履行过程中发生任何争议，应友好协商解决；如协商不成，任一方均有权向合同签订地的人民法院提起诉讼。</p>
			<p>5.本合同中所使用的定义，除非另有规定，否则应适用“拓道金服”平台释义规则，“拓道金服”平台对本文定义享有最终解释权。</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		data () {
			return {
				proList: [],
				accessId: '',
				accessKey: '',
				proUrl: 'api/router/creditAssignment/protocol'
			}
		},
		mounted() {
			this.geturl()
		},
		methods: {
			geturl() {
				var vm = this
				let tenderId = vm.$route.query.tenderId
				if (tenderId === undefined || tenderId === '') {
				} else {
					vm.getProtocol(tenderId)
				}
			},
			getProtocol(id) {
				let vm = this
				if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					vm.setupWebViewJavascriptBridge(function (bridge) {
						bridge.callHandler('h5ToNative_GetUserInfo', {}, function (response) {
							vm.accessId = response.accessId
							vm.accessKey = response.accessKey
							vm.$http({url: vm.proUrl, method: 'post', headers: {accessId: vm.accessId, accessKey: vm.accessKey}, params: {'tenderId': id}})
								.then((response) => {
									vm.proList = response.body.content
								})
						})
					})
				} else if (/(Android)/i.test(navigator.userAgent)) {
					setTimeout(() => {
						window.TDBridge.h5ToNative_GetUserInfo(function(data) {
							data = JSON.parse(data)
							vm.accessId = data.accessId
							vm.accessKey = data.accesskey
							vm.$http({url: vm.proUrl, method: 'post', headers: {accessId: vm.accessId, accessKey: vm.accessKey}, params: {'tenderId': id}})
								.then((response) => {
									vm.proList = response.body.content
								})
						})
					}, 500)
				}
			},
			setupWebViewJavascriptBridge(callback) {
				if (window.WebViewJavascriptBridge) {
					return callback(window.WebViewJavascriptBridge)
				}
				if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback)
				}
				window.WVJBCallbacks = [callback]
				let WVJBIframe = document.createElement('iframe')
				WVJBIframe.style.display = 'none'
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
				document.documentElement.appendChild(WVJBIframe)
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.protocol
		background-color:$color-background-f
		padding:0.3rem
		max-width:414px
		margin:0 auto
		color:$color-font-risk
		font-family: 'PingFang-SC-Medium'
		h1
			font-size:0.46rem
			font-weight: bold
			text-align:center
			padding-bottom:0.2rem
		h3
			font-size:0.3rem
			font-weight: bold
			margin-bottom:0.2rem
		p
			font-size:0.28rem
			line-height:0.48rem
			word-wrap:break-word
			word-break:break-all
			span
				text-decoration:underline
		div
			margin-bottom:0.5rem
		.td_stamp
			position: relative
			.stamp
				position:absolute
				right:0
				top:-0.2rem
				width:2.3rem
				height:2.3rem
				background:url(../../../image/invest/stamp.png) no-repeat
				background-size:100% 100%
</style>