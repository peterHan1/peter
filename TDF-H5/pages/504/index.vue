<template>
  <count-down :dateTimes="dateTimes"/>
</template>
<script>
import CountDown from '../../components/business/count-down/count-down'
export default {
  data() {
    return {
      dateTimes: '2018-02-15 19:00:00'
    }
  },
  components: {
    CountDown
  }
}
</script>
