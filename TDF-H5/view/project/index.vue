<template>
  <div>
    <!-- <free-list/> -->
    <div class="nav"><span @click="back">back</span>首页</div>
    <ul>
      <li
        v-for="(item, index) in data"
        :key="index">
        <router-link to="/project/details">list{{ item }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import freeList from './free/list'
// import scatterList from './scatter/list'
// import transferList from './transfer/transfer'
export default {
  data() {
    return {
      data: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    }
  },
  // created() {
  //   console.log(document.body.scrollTop)
  //   console.log()
  // },document.documentElement.scrollTop
  activated() {
    console.log(`${document.documentElement.scrollTop}act`)
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  components: {
    freeList
  }
}
</script>
<style lang="stylus" scoped>
.nav
  background #ffffff
  height: 80px
  position: fixed
  width: 100%
ul
  li
    height: 80px
    line-height: 80px
    margin-bottom: 20px
    background: #ccc
</style>
