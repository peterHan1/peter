<template>
	<div class="entrust">
		<div>
			<h1>“精选计划”理财项目</h1>
			<h1>投资人授权委托书</h1>
		</div>
		<div>
			<p>协议编号：<span class="num">{{proList.protocalCode}}</span></p>
		</div>
		<div>
			<p>委托人：{{proList.userName}}</p>
			<p>身份证号：{{proList.idNum}}</p>
			<p>联系方式：{{proList.mobile}}</p>
		</div>
		<div class="td_stamp">
			<b class="stamp"></b>
			<p>受托人：杭州拓道互联网金融服务有限公司（简称“拓道金服”）</p>
			<p>地址：杭州市西湖区西溪路550号西溪新座7幢B座11楼</p>
		</div>
		<div>
			<h3>鉴于：</h3>
			<p>1.投资人系杭州拓道互联网金融服务有限公司（以下简称“拓道金服”）旗下经营管理的“拓道金服”网络借贷平台（网址：www.51tuodao.com）的实名注册用户，居住在中华人民共和国境内、符合中华人民共和国法律规定的完全民事行为能力人。</p>
			<p>2.投资人自愿参与“拓道金服”网络借贷平台上发布的 <span class="pro"> {{proList.productName}} </span> 理财项目（以下简称“精选计划”）。</p>
		</div>
		<div>
			<p>为实现匹配投资人的需求，投资人在此确认并授权“拓道金服”全权代理其行使下列事项：</p>
		</div>
		<div>
			<h3>一、投资精选计划</h3>
			<p>1.投资人不可撤销地委托并授权“拓道金服”依其专业技术和判断，将投资人的全部或部分投资本金投向“拓道金服”网络借贷平台上发布的“精选计划”理财项目。在“精选计划”项下的全部或部分借款项目的债权到期或转让后，“拓道金服”有权继续使用投资所得的部分或全部资金继续投资“精选计划”项下的其他借款项目，直至投资人精选计划投资期限届满。</p>
			<p>2.投资人自愿选择加入“精选计划”，并不可撤销地委托并授权“拓道金服”平台依其专业技术和判断自动投标，加入金额为人民币 <span class="money">{{proList.joinMoney}}</span> 元（大写：<span class="moneys">{{proList.joinMoneyBig}}</span>）。</p>
			<p>3.期限日：自“精选计划”满标复审之日起至“精选计划”到期后债权成功转出之日止。</p>
			<p>4.预期回报：预期回报为年化利率 <span class="pre">{{proList.apr}}</span> %。</p>
		</div>
		<div>
			<h3>二、签署相关协议</h3>
			<p>1.投资人不可撤销地委托并授权“拓道金服”为实现“精选计划”理财项目而代为（包括但不限于以调取、使用投资人的数字证书、电子签名等形式）线上签署任何相关协议（包括但不限于《借款协议》、《担保协议》、《债权转让及受让协议》以及其他任何“拓道金服”认为其需要签署的协议）。</p>
			<p>2.投资人进一步确认，对“拓道金服”根据“精选计划”理财项目代投资人投资的每一笔借款项目详情（包括但不限于具体的项目名称、投资金额及还款方式等）均予以接受并认可。</p>
			<p>3.投资人对此等自动投资借款项目和授权拓道金服签署相关协议的安排已充分知悉、理解，并确认拓道金服代表其签署的法律文件即代表其真实的意思表示，投资人对该等法律文件之效力均予以认可且无任何异议，并无条件接受该等协议的约束。</p>
			<p>4.该签署行为视为投资人的操作，因此产生的一切法律后果由投资人自行承担。</p>
		</div>
		<div>
			<h3>三、收付、划扣相关款项</h3>
			<p>投资人不可撤销地委托并授权“拓道金服”为实现“精选计划”理财项目项下的每一笔借款项目，有权向“拓道金服”合作的支付机构或存管银行发送指令以实现对相关款项进行划扣、支付、冻结或行使任何其他权利，投资人对此均予以接受和认可。</p>
		</div>
		<div>
			<h4>本授权委托书经投资人自行通过网络在“拓道金服”网络借贷平台上在线点击相关确认键后生效。</h4>
		</div>
		<div>
			<p>委托人：{{proList.userName}}</p>
			<p>受托人：杭州拓道互联网金融服务有限公司</p>
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
				proUrl: 'api/router/joinPlanController/getPlanProtocol'
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
	.entrust
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
			line-height:0.65rem
		h3
			font-size:0.3rem
			font-weight: bold
			margin-bottom:0.2rem
		h4
			font-size:0.3rem
			line-height:0.48rem
			font-weight: bold
		p
			font-size:0.28rem
			line-height:0.48rem
			span
				display:inline-block
				text-align:center
				border-bottom:1px solid #333
			.num
				min-width:3.5rem
			.pro
				min-width:1.3rem
			.money
				min-width:1.24rem
			.moneys
				min-width:2.26rem
			.pre
				min-width:0.64rem
		div
			margin-bottom:0.5rem
		.td_stamp
			position: relative
			.stamp
				position:absolute
				right:0
				top:-1.6rem
				width:2.3rem
				height:2.3rem
				background:url(../../../image/invest/stamp.png) no-repeat
				background-size:100% 100%
</style>