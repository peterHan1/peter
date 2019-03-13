<template>
  <div style="align-items: center;">
    <div v-if="visibility" style="height: 100px;width: 750px;background-color: #c00; justify-content: center; align-items: center;">
      <div style="flex-direction: row">
        <div style="justify-content: center; align-items: center; border-radius: 30px; width: 30px; height: 30px;background-color: #fff;">
          <text style="font-size: 24px; color: #c00">!</text>
        </div>
        <text style="color: #fff; font-size: 24px;">温馨提醒</text>
      </div>
      <text style="color: #fff; font-size: 24px; margin-top: 10px;">亲，未支付订单将在60分钟之后关闭哦，请尽快完成支付！</text>
    </div>
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