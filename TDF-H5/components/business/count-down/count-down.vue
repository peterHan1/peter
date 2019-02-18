<template>
  <div>{{ str }}</div>
</template>

<script>
export default {
  name: 'td-countDown',
  props: {
    dateTimes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      str: ''
    }
  },
  mounted() {
    this.countdown()
    // this._interval = setInterval(() => {
    //   this.countdown()
    // }, 1000)
  },
  // destroyed() {
  //   clearInterval(this._interval)
  // },
  methods: {
    linkFn() {
      this.$emit('link')
    },
    countdown() {
      const end = Date.parse(new Date(this.dateTimes))
      const now = Date.parse(new Date())
      const msec = end - now
      if (msec <= 0) {
        this.str = 0
      } else {
        let day = parseInt(msec / 1000 / 60 / 60 / 24)
        let hr = parseInt((msec / 1000 / 60 / 60) % 24)
        let min = parseInt((msec / 1000 / 60) % 60)
        let sec = parseInt((msec / 1000) % 60)
        // day = day
        hr = hr > 9 ? hr : '0' + hr
        min = min > 9 ? min : '0' + min
        sec = sec > 9 ? sec : '0' + sec
        this.str = `${hr}:${min}:${sec}开抢`
      }
      const that = this
      let tim = setInterval(function() {
        that.countdown()
      }, 1000)
      if (msec <= 0) {
        clearInterval(tim)
      }
      // console.log(msec)
    }
  }
}
</script>
