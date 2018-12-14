<template>
	<div>
    <div>测试上拉加载下拉刷新组件</div>
		<!-- <div style="height: 3rem;"> -->
      <load-more :load-top="loadTop" :load-bottom="loadBottom" :all-loaded="allLoaded">
        <ul style="background-color: #fff;">
          <li v-for="item in listdata" >{{item.name}}</li>
          <li v-for="(item,index) in downdata" >{{item.name}}</li>
        </ul>
      </load-more>
    <!-- </div> -->
	</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      counter: 1, // 默认已经显示出15条数据 count等于一是让从16条开始加载
      num: 15, // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      allLoaded: false, // 数据是否全部加载,通过接口计算该值
      downdata: [] // 上拉更多的数据存放数组
    }
  },
  mounted: function () {
    this.getList()
  },
  methods: {
    getList () {
      var vm = this
      setTimeout(() => {
        axios({
          method: 'get',
          url: 'https://api.github.com/repos/typecho-fans/plugins/contents/'
        }).then(res => {
          this.isRefreshed = true
          vm.listdata = res.data.slice(0, 45)
        })
      }, 500)
    },
    loadTop (done) {
      this.getList()
      done() // call done
    },
    loadBottom (done) {
      let vm = this
      axios({
        method: 'get',
        url: 'https://api.github.com/repos/typecho-fans/plugins/contents/'
      }).then(res => {
        vm.counter += 1
        vm.pageEnd = vm.num * vm.counter
        vm.pageStart = vm.pageEnd - vm.num
        let arr = res.data
        let ia = vm.pageStart
        let end = vm.pageEnd
        for (let i = ia; i < end; i++) {
          let obj = {}
          obj['name'] = arr[i].name
          vm.downdata.push(obj)
        }
        this.allLoaded = false
        done()
      })
    }
  }
}
</script>