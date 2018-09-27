弹窗提示
import Layer from './../../components/layer/layer.js'

Layer.Open({
  title: '这是一个弹窗',标题
  closeX: true,是否显示X关闭
  content: '关注拓道金服服务号，您的贴身管家，账户状态实时跟进，重大活动及时知晓（<span style="color: #FF6600;">已自动复制微信号h1d888</span>)',
  cancelBtn: '取消', 取消按钮 空值一个按钮
  confirmBtn: '确定', 确定按钮
  confirmBtnFn: function () {
    console.log('点击了确定')
  }
})

