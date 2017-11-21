<template lang="html">
  <div class="gotop-box">
    <i @click="gotop"class="icon topIcon"></i>
  </div>
</template>

<script>
export default {
  methods: {
    gotop: function () {
      console.log('aaa')
      $(window).scrollTop = 0
    }
  }
}
window.onscroll = function() {
	var scrollTop =  document.documentElement.scrollTop || document.body.scrollTop
  var  goTop= document.querySelector('.gotop-box')
	if (scrollTop >300) {
    goTop.style.display = 'block'
	} else {
    goTop.style.display = 'none'
	}
	}
</script>

<style lang="css">
.gotop {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  z-index: 11;
}
.gotop .topIcon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background:url(../../assets/images/gotop.png)center center no-repeat;
  background-size: cover;
  display: inline-block;

}
</style>
