<template lang="html">
  <div class="address-page">
    <mt-header title="新建收货地址">
      <router-link to="/checkorder" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to='/' slot="right">
        <span class="gohome"></span>
      </router-link>
    </mt-header>
    <div class="input-wrapper">
      <div class="input-box">
        <input type="text" class="name" v-model="name" placeholder="收货人姓名">
      </div>
      <div class="input-box">
        <input type="telephone" class="telephone" v-model="telephone" placeholder="电话号码">
      </div>
      <div class="input-box">
        <input type="text" class="preAdd"  disabled= "true" placeholder="请选择省/市/县">
        <i @click="selectArea" class="icon dropdown"></i>
        <div v-show="show" class="select-box">
          <region-picker
            :placeholder="{province: '选择省份', city: '选择市', district: '选择地区'}"
            :province.sync="region.province"
            :city.sync="region.city"
            :district.sync="region.district"
            @onchange="change">
          </region-picker>
        </div>
      </div>
      <div class="input-box">
        <input type="text" class="address" v-model="address" placeholder="填写详细地址">
      </div>
      <div class="input-box">
        <input type="text" class="postalcode" v-model="postalcode" placeholder="邮政编码">
      </div>
      <div class="setting-box">
        <i @click="setDefault"class="icon default"></i>
        <span class="text">设为默认地址</span>
      </div>
    </div>
    <div class="basebar">
      <div class="btn-box">
        <span @click="saveAddress" class="saveBtn">保存</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      name:'',
      telephone:'',
      preAdd:'',
      address:'',
      postalcode:'',
      region: {},

    }
  },
  methods: {
    setDefault: function (e) {
      if(e.target.classList.contains('setted')){
        e.target.classList.remove('setted')
      } else {
        e.target.classList.add('setted')
      }
    },
    saveAddress : function (){
      if(this.name === '') {
        this.$toast({
          message:'请填写收货人',
          position:'top',
          duration: 1000
        })
        return
      }
      if(this.telephone === '') {
        this.$toast({
          message:'请填写电话号码',
          position:'top',
          duration: 1000
        })
        return
      }
      let pca = document.querySelector('.preAdd').value
      if(pca === '') {
        this.$toast({
          message:'请选择省市区',
          position:'top',
          duration: 1000
        })
        return
      }
      if(this.address === '') {
        this.$toast({
          message:'请填写详细地址',
          position:'top',
          duration: 1000
        })
        return
      }
      if(this.postalcode === '') {
        this.$toast({
          message:'请填写邮政编码',
          position:'top',
          duration: 1000
        })
        return
      }
      localStorage.setItem('username',this.name)
      localStorage.setItem('tel',this.telephone)
      localStorage.setItem('pca',pca)
      localStorage.setItem('address',this.address)
      localStorage.setItem('postalcode',this.postalcode);
      this.$router.push({path: '/checkorder'})
    },
    selectArea: function (){
      this.show = !this.show
      document.querySelector('.preAdd').value =this.region.province +this.region.city + this.region.district
    },
    change: function (e) {
      this.region.province = e.province
      this.region.city = e.city
      this.region.district = e.district
      console.log(this.region)
    }
  }
}
</script>

<style lang="css"  scoped>
.input-wrapper {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
}
.input-box {
  width: 100%;
  height: 5rem;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}
.input-box:after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #eee;
}
.input-box input {
  width: 100%;
  height: 3rem;
  margin: auto 0;
}
input[disabled] {
  background-color: #fff;
}
.setting-box {
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
}
.setting-box .default{
  width: 1.6rem;
  height: 1.6rem;
  display: inline-block;
  border: 1px solid #ccc;
}
.setting-box .text {
  color: #333;
  font-size: 1.6rem;
  margin-left: 1rem;
}
.basebar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 4rem;
  background-color: #fff;
}
.basebar  .saveBtn {
  width: 10rem;
  height: 3.6rem;
  display: block;
  background-color: #f55669;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 400;
  border-radius: 5px;
  line-height: 3.6rem;
  text-align: center;
  margin: 0.2rem auto;
}
.setted {
  background:#f55669 url(../../assets/images/selected.png) no-repeat;
  background-size: cover;
}
.dropdown {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  right: 0;
  top: 2rem;
  display: block;
  background: url(../../assets/images/dropdown.png) no-repeat;
  background-size: cover;
}
.select-box{
  position: absolute;
  width: 100%;
  height: 5rem;
  background-color: #fff;
  z-index: 999999;
  left: 0rem;
  top: 5rem;
}

</style>
