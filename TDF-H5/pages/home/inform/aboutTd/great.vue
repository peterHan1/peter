<template>
  <div class="great">
    <td-header title="关于拓道"/>
    <h3>从业机构重大事项信息 </h3>
    <table
      cellspacing="0"
      cellpadding="0">
      <tr>
        <th width="70%">平台重大事项信息项</th>
        <td>平台存在情况</td>
      </tr>
      <tr>
        <th>合并、分立、解散或者申请破产</th>
        <td>无</td>
      </tr>
      <tr>
        <th>从业机构受到刑事处罚</th>
        <td>无</td>
      </tr>
      <tr>
        <th>从业机构受到重大行政处罚 </th>
        <td>无</td>
      </tr>
      <tr>
        <th>重大诉讼或者冲裁事项</th>
        <td>无</td>
      </tr>
      <tr>
        <th>实际控制人与股东、董事、监事、高级管理 人员的变更信息</th>
        <td>无</td>
      </tr>
      <tr>
        <th>实际控制人与股东、董事、监事、高级管理 人员涉及的重大诉讼或者仲裁事项或重大行 政处罚</th>
        <td>无</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '关于拓道'
  },
  data() {
    return {}
  },
  mounted() {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
  }
}
</script>
<style lang="stylus" scoped>
  h3
    font-size: $fontsize-medium
    color:$color-gray1
    height:0.8rem
    line-height:0.8rem
    font-weight: normal
    border-bottom: 1px solid $color-gray5
  .great
    background-color: $color-white
    padding: 1.08rem 0.3rem 0.2rem
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    .position
      font-size: $fontsize-small-s
      color: $color-gray1
      margin-top: 0.2rem
    p
      line-height: 0.42rem
    table
      width: 100%
      font-size: $fontsize-small-ss
      color: $color-gray8
      border-collapse: collapse
      margin: 0.4rem 0
      th
        text-align: left
        padding: 0.3rem 0.2rem
        border: 1px solid $color-gray5
        border-right: none
        font-weight: normal
      td
        padding-right: 0.2rem
        text-align: right
        width: 68%
        border: 1px solid $color-gray5
</style>
