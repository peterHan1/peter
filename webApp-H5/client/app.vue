<template>
  <div class="app">
    <!-- <div>{{fullName}} {{counter}}</div> -->
    <router-view />
  </div>
</template>
<script>
import {
  mapState,
  mapGetters
} from 'vuex'
export default {
  mounted () {
    console.log(this.$store)
  },
  computed: {
    ...mapState({
      counter: 'count'
    }),
    ...mapGetters(['fullName'])
    // count () {
    //   return this.$store.state.count
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  }
}
</script>
<style lang="stylus" scoped>
.app
  width: 100%
  height: 100%
</style>

