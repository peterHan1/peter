<template>
  <div class="list">
    <ul>
      <li v-for="(item,index) in interestArr" :key="index" @click="selectFn(index)">
        <div>
          <p><b>{{item.value}}%</b></p>
          <p>有效期：{{item.time}}</p>
        </div>
        <span class="iconfont on" v-if="intereIndex == index">&#xe6c4;</span>
        <span class="iconfont" v-else>&#xe6c3;</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['disId', 'disType'],
  data () {
    return {
      intereIndex: null,
      interestArr: [
        {
          'value': '1',
          'txt': '1%加息券',
          'time': '2016.6.6-2016.6.12',
          'id': '1'
        },
        {
          'value': '2',
          'txt': '2%加息券',
          'time': '2016.6.6-2016.6.12',
          'id': '2'
        },
        {
          'value': '3',
          'txt': '3%加息券',
          'time': '2016.6.6-2016.6.12',
          'id': '3'
        },
        {
          'value': '1',
          'txt': '1%加息券',
          'time': '2016.6.6-2016.6.12',
          'id': '4'
        },
        {
          'value': '2',
          'txt': '2%加息券',
          'time': '2016.6.6-2016.6.12',
          'id': '5'
        }
      ],
      intereTxt: null,
      intereId: null
    }
  },
  mounted () {
    let vm = this
    if (vm.disType === 'Interest') {
      const index = vm.interestArr.findIndex(interes => interes.id === vm.disId)
      vm.intereIndex = index
      vm.intereTxt = vm.interestArr[index].txt
      vm.intereId = vm.interestArr[index].id
    }
  },
  methods: {
    selectFn (i) {
      let vm = this
      vm.intereTxt = vm.interestArr[i].txt
      vm.intereId = vm.interestArr[i].id
      vm.intereIndex = i
      vm.$emit('listFn', vm.intereTxt, vm.intereId, 'Interest')
    }
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.list
  position: absolute
  top: 166px
  left: 0
  right: 0
  bottom: 0
  overflow: auto
  ul
    padding: 10px 30px 30px
    li
      border-bottom: 1px solid #e8e8e8
      padding: 28px 0
      display: flex
      align-items: center
      div
        display: inline-block
        font-size: 24px
        color: #999
        flex: 1
        text-align: left
        p:nth-child(1)
          color: #333
          padding-bottom: 5px
          b
            font-size: 48px
      span
        display: inline-block
        color: #999
        flex: 1
        text-align: right
      .on
        color: #F97C3C
    li:last-child
      border: none
</style>
