<template>
  <div>
    <tabs :value="tabValue" @change="handleChangeTab">
      <tab label="平台信息" index="1">
        <span>基本信息</span>
      </tab>
      <tab label="组织架构" index="2">
        <div>组织架构</div>
      </tab>
      <tab label="人员信息" index="3">
        <span>人员信息</span>
      </tab>
      <tab label="相关证件" index="4">
        <span>相关证件</span>
      </tab>
      <tab label="法人签章" index="5">
        <span>法人签章</span>
      </tab>
    </tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabValue: '1'
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.tabValue = '2'
    // }, 1000)
  },
  methods: {
    handleChangeTab (value) {
      this.tabValue = value
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>


