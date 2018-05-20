<template>
 <div class="helpBox">
    <div class="helpTit">常见问题：</div>
    <ul>
      <li :class="showClass">
        <p class="liTit" @click="detailShow($event)">
          <span>1、扫码后无法取出mifi</span>
          <span><i class="iconfont">&#xe67b;</i></span>
        </p>
        <div>（1）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
        <div>（2）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
      </li>
      <li :class="showClass">
        <p class="liTit" @click="detailShow($event)">
          <span>2、扫码后无法取出mifi</span>
          <span><i class="iconfont">&#xe67b;</i></span>
        </p>
        <div>（1）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
        <div>（2）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
      </li>
      <li :class="showClass">
        <p class="liTit" @click="detailShow($event)">
          <span>3、扫码后无法取出mifi</span>
          <span><i class="iconfont">&#xe67b;</i></span>
        </p>
        <div>（1）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
        <div>（2）如果扫码后无法取出mifi的话，那该怎么办呢，这个时候请您不要着急，慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢慢的在来一次。</div>
      </li>
    </ul>
    <div class="service">
      <div class="serviceBth">联系客服</div>
    </div>
 </div>
</template>

<script>
  export default {
    data () {
      return {
        showClass: 'listShow'
      }
    },
    methods: {
      detailShow (obj) {
        let clas = obj.currentTarget.parentNode.className
        if (clas === 'listShow') {
          obj.currentTarget.parentNode.className = 'listShows'
        } else {
          obj.currentTarget.parentNode.className = 'listShow'
        }
      }
    }
  }
</script>

<style scoped lang="less">
 .helpBox{
  height: 100%;
  background-color: #f9f9f9;
  padding-top:0.38rem;
  box-sizing: border-box;
  .helpTit{
    line-height: 0.88rem;
    font-size: 0.3rem;
    color: #000;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    padding-left: 0.68rem;
  }
  ul{
    padding-left: 0.32rem;
    background-color: #fff;
    li{
      .liTit{
        height: 0.85rem;
        line-height: 0.85rem;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        padding: 0 0.8rem 0 0.15rem;
        margin-bottom: 0.2rem;
        box-sizing: border-box;
        span{
          font-size: 0.28rem;
          color: #000;
        }
        span:nth-child(1){
          float: left;
        }
        span:nth-child(2){
          float: right;
          color: #989898;
          i{
            display: inline-block;
            transition: transform 0.2s ease-in;
          }
        }
      }
      div{
        padding: 0 0.8rem 0 0.15rem;
        font-size: 0.28rem;
        color: #999;
        line-height: 0.44rem;
      }
      div:last-child{
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 0.2rem;
      }
    }
    .listShow{
      height: 0.85rem;
      overflow: hidden;
    }
    .listShows{
      .liTit{
        span{
          i{
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .service{
    width: 100%;
    .serviceBth{
      width: 80%;
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.34rem;
      color: #323232;
      background-color: #ffc600;
      border-radius: 5px;
      margin: 0 auto;
      margin-top: 1.77rem;
    }
  }
 }
</style>

