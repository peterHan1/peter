<template>
  <div class="board">
    <td-header title="关于拓道"/>
    <h3>董事、监事、高级管理人员 </h3>
    <div class="zlj">
      <dl>
        <dt/>
        <dd>
          <p class="position">执行董事</p>
          <p class="name">张罗军</p>
        </dd>
      </dl>
    </div>
    <div class="flex board_div">
      <div class="fxy flex-1">
        <dl>
          <dt/>
          <dd>
            <p class="position">监事</p>
            <p class="name">范曦云</p>
          </dd>
        </dl>
      </div>
      <div class="ll flex-1">
        <dl>
          <dt/>
          <dd>
            <p class="position">高级管理人员</p>
            <p class="name">刘磊</p>
          </dd>
        </dl>
      </div>
    </div>
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
    font-size:$fontsize-medium
    color:$color-gray1
    height:80px
    line-height:80px
    border-bottom: 1px solid $color-gray5
    font-weight: normal
  .board>div
    margin-top: 60px
  .board
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
    dt
      width: 260px
      height: 260px
      margin: 0 auto
    .zlj dt
      background: url(../../../../../assets/images/inform/zlj.png) no-repeat
      background-size: 100% 100%
    dl
      text-align: center
    .fxy dt
      background: url(../../../../../assets/images/inform/fxy.png) no-repeat
      background-size: 100% 100%
    .ll dt
      background: url(../../../../../assets/images/inform/ll.png) no-repeat
      background-size: 100% 100%
    .flex
      display: flex
      overflow: hidden
      .flex-1
        flex: 1
</style>
