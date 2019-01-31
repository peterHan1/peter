<template>
  <div>
    <router-link to="/project">111</router-link>
    <div @click="back">back</div>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>
