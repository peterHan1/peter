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
  }
}
</script>
<style lang="stylus" scoped>
  h3
    font-size: $fontsize-medium
    color:$color-gray1
    height:80px
    line-height:80px
    font-weight: normal
    border-bottom: 1px solid $color-gray5
  .great
    background-color: $color-white
    padding: 108px 30px 20px
    height: 100%
    position: absolute
    left: 0
    top: 0
    bottom: 0
    right: 0
    .position
      font-size: $fontsize-small-s
      color: $color-gray1
      margin-top: 20px
    p
      line-height: 42px
    table
      width: 100%
      font-size: $fontsize-small-ss
      color: $color-gray8
      border-collapse: collapse
      margin: 40px 0
      th
        text-align: left
        padding: 30px 20px
        border: 1px solid $color-gray5
        border-right: none
        font-weight: normal
      td
        padding-right: 20px
        text-align: right
        width: 68%
        border: 1px solid $color-gray5
</style>
