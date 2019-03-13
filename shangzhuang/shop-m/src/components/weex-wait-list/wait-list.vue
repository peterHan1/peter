<template>
  <div style="align-items: center;">
    <image v-if="visibility" style="width: 750px; height: 750px;" src="//cdn1.showjoy.com/images/46/465ff4a3a0ca4a1eb0797177f463e0fb.png"></image>
  </div>
</template>



<script>
module.exports = {
  data: function () {
    return {
      
    }
  },
  props: {
    visibility: {
      default: false
    }
  },
  methods: {}
};</script>