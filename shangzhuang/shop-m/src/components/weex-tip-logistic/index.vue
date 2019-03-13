<template>
  <div style="align-items: center;">
    <div v-if="visibility" style="width: 750px; padding-left: 30px; padding-right: 30px;padding-top: 12px;padding-bottom: 12px;background-color: #e91a49;flex-direction: row; justify-content: center; align-items: center;" @click="closeLogistics">
      <div style="flex: 1">
        <image style="width: 32px; height: 32px;" src="http://cdn1.showjoy.com/images/19/19af4782855e48ec8c94e4dcfa5277d5.png"></image>
      </div>
      <text style="flex: 8;font-size: 24px;color: #fff; line-height: 28px">{{info}}</text>
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
    },
    info: {
      default: 'this is test word'
    }
  },
  methods: {
    closeLogistics: function () {
      var self = this;

      self.$emit('cancel');
    }
  }
};</script>