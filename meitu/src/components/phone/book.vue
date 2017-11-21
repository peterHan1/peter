<template lang="html">
  <div class="book-page">
    <mt-header title='我的预约'>
      <router-link to="/user" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="book-wrapper">
      <p v-show="!hasBook" class="desc">亲,您还没有任何的预约哦~</p>
      <div v-show="hasBook" class="book-list">
        <ul class="books">
          <li class="book" v-for="(book, index) in books">
            <div class="book-left">
              <img :src="book.imgSrc" alt="">
            </div>
            <div class="book-right">
              <h1 class="book-title">{{book.title}}</h1>
              <p class="statu">
                预约状态:
                <span class="tag">已预约</span>
              </p>
              <p class="book-ver">预约型号:
                <span class="text">
                  {{book.ver}}
                </span>
              </p>
              <p class="book-color">{{book.color}}</p>
              <p class="book-date">预约时间:
                <span class="text">{{book.date}}</span>
              </p>
              <p class="book-tel">预留手机:
                <span class="text">{{book.tel}}</span>
              </p>
              <p class="rush-time">抢购时间:06月23号12时</p>
              <button @click="cancelBook" :data-id="index" class="btn book">取消预约</button>
            </div>

          </li>

        </ul>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      books:[]
    }
  },
  mounted() {
    this.books = this.$store.state.cart.bookList
  },
  computed: {
    hasBook() {
      if(this.books.length > 0 ) {
        return true
      } else {
        return  false
      }
    }
  },
  methods: {
    cancelBook: function (e) {
      // console.log()
      let id = e.currentTarget.dataset.id
      this.$toast({
        message:'预约取消成功',
        position: 'top'
      })
      setTimeout( () => {
        this.$store.dispatch('cancel_book', id)
      }, 1000)

    }
  }
}
</script>

<style lang="css" scoped>
  .book-wrapper{
    width: 100%;
    background: #fff;
    margin-top: 1rem;
  }
  .book-wrapper .book-list .books .book{
    display: flex;
    background: #fff;
    border-bottom: 1px solid #ccc;
    padding-bottom: 2rem;
    box-sizing: border-box;
  }
  .desc {
    width: 100%;
    height: 10rem;
    text-align: center;
    line-height: 10rem;
    font-size: 1.4rem;
  }
  .books .book .book-left {
    width: 10rem;
    margin:auto 0;
  }
  .books .book .book-left img{
      width: 100%;
  }
 .books .book .book-right {
   flex:1;
   padding-left: 1rem;
   box-sizing: border-box;
 }
 .book-right .book-title {
   font-size: 1.8rem;
   font-weight: 400;
 }
 .book-right p {
   font-size: 1.4rem;
   margin-top: 1rem;
 }
 .book-right .text {
   margin-left: 1rem;
 }
 .book-right .tag {
   background-color: #5cbb32;
   color: #fff;
   line-height: 1.5;
   border-radius: 5px;
   padding: .4rem;
   box-sizing: border-box;
 }
 .rush-time {
   color: #f55669;
 }
 .btn.book {
   padding: .4rem;
   box-sizing: border-box;    
   height: 2rem;
   line-height: 2rem;
   border-radius: 5px;
   border: 1px solid #ccc;
   color: #666;
   margin-top: 2rem;
   outline: none;
 }
</style>
