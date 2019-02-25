<template>
  <div class="record_box">
    <td-header title="备案信息"/>
    <ul>
      <li>
        <span>地方金融监管部门的备案登记信息</span>
        <p>备案中</p>
      </li>
      <li>
        <span>备案登记时间</span>
        <p>备案中</p>
      </li>
      <li>
        <span>备案登记编号</span>
        <p>备案中</p>
      </li>
      <li>
        <span>增值电信业务经营许可证编号</span>
        <p>浙B2-20160394</p>
      </li>
      <li>
        <span>ICP备案证号</span>
        <p>浙ICP备13034095号</p>
      </li>
      <li>
        <span>资金存管银行</span>
        <p>四川新网银行股份有限公司</p>
      </li>
      <li>
        <span>存管签约时间</span>
        <p>2016年7月</p>
      </li>
      <li>
        <span>存管（全量业务）上线时间</span>
        <p>2017年4月</p>
      </li>
      <li>
        <span>切换新网银行存管时间</span>
        <p>2018年11月</p>
      </li>
      <li>
        <span>网站备案图标及编号</span>
        <p>
          <img src="../../../../../assets/images/inform/police.png">浙公网安备33010602002107号
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '备案信息'
  },
  data() {
    return {}
  }
}
</script>
<style lang="stylus" scoped>
  .record_box
    background-color: $color-white
    padding: 108px 30px 20px
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    li
      overflow: hidden
      font-size: $fontsize-small-ss
      background-color: $color-white
      line-height:80px
      border-bottom:1px solid $color-gray5
      padding:0 30px
      span
        float:left
        color:#626262
      p
        float:right
        color:#212a36
        img
          width:32px
          height:36px
          margin-right:10px
          vertical-align: middle
</style>
