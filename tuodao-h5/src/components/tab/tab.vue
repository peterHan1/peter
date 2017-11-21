<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/demo1">
      <span class="tab-link">平台信息</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/demo2">
      <span class="tab-link">组织架构</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/demo3">
      <span class="tab-link">人员信息
      </span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/demo4">
      <span class="tab-link">相关证件</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .tab
    display: flex
    height: 44px
    line-height: 44px
    font-size: $font-size-medium
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
        color: $color-font-main
      &.router-link-active
        .tab-link
          color: $color-font-orange
          border-bottom: 2px solid $color-font-orange
</style>