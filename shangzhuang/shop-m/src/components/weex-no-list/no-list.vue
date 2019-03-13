<template>
  <div style="align-items: center;">
      <image v-if="visibility" style="width: 114px; height: 114px; margin-top: 200px;" src="data:image/png;base64,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"></image>
      <text v-if="visibility" style="font-size: 28; color: #9e9e9e; margin-top: 30;">{{desc}}</text>
    </div>
</template>



<script>
module.exports = {
  data: function () {
    return {
      
    }
  },
  props: {
    desc: {
      default: ''
    },
    visibility: {
      default: true
    }
  },
  methods: {}
};</script>