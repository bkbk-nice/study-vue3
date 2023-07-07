<script setup lang="ts">
import { ref,onMounted,reactive } from 'vue'
import {searchOrder} from '../../api/api'


const count = ref(0)
const total = ref(0)


let templist = reactive([
  {
    id:0,
    clientName: "",
    num:0,
    productName:"",
    price:0.0, 
    phone:"",
    address:"",
    remark:"",
    time:"",
    createTime:"",
    type:0,
    mainImage:''
  },
]);  
let orderlist = ref(templist)


const load = () => {
  console.log("load")
   if(count.value>=total.value&&count.value>0) return  

  count.value += 2 
  condition.pageNum = count.value/2
  orderlist.value.push(templist[0])
  orderlist.value.push(templist[0])
 
  loadpage()
} 

 

const condition = reactive({
  keyword: "",
  pageNum: 1,
  pageSize: 2,
})

  const loadpage = () => { 
    
    searchOrder(condition ).then((res: any) => { 
      console.log(res);
      templist = res.data.list
      let pageNum = res.data.pageNum
      let pageSize = res.data.pageSize
      orderlist.value[pageNum*pageSize-1]=(templist[0])
      if(templist[1]==null){
        orderlist.value[pageNum*pageSize]=(templist[0])
      }else{
        orderlist.value[pageNum*pageSize]=(templist[1])
      }
    
    
     // console.log( orderlist.value);
      total.value = res.data.total
    });  
  } 

onMounted(() => { 
 // loadpage() 
 
})
// const enter = () =>{ 
//  // console.log(getInfo.keyword)  
  
// }

const getdetail = (i:number) =>{
  console.log(orderlist.value[i].id)
}


</script>

<template>
    
 
    <el-breadcrumb  class="mynav" separator="/">
      <el-breadcrumb-item :to="{ path: '/client/shop' }">商城</el-breadcrumb-item> 
      <el-breadcrumb-item>我的订单</el-breadcrumb-item> 
    </el-breadcrumb>


    <ul   v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-show="i<=total || total ==0 " v-for="i in count" :key="i"     class="infinite-list-item">
          <div v-if="total==0" >
            <el-empty description="没有订单" style="margin-top: -30px;" />
          </div>
         
          <div v-else >
           
            <img    :src="orderlist[i].mainImage"  style="width: 200px;height: 200px;"  class="image" />

            <!-- <div  >
              {{ i }}
            </div> -->

            <div class="info" >
              <div class="info-item">
                下单时间：{{ orderlist[i].createTime }}
              </div>

              <div class="info-item">
                商品名：{{ orderlist[i].productName }}
              </div>

              <div class="info-item">
                数量：{{ orderlist[i].num }}
              </div>

              <div class="info-item">
                单价:{{ orderlist[i].price }}
              </div>

              <div class="info-item">
                联系电话: {{ orderlist[i].phone }}
              </div>

              <div class="info-item">
                地址:{{ orderlist[i].address }}  
              </div>
               
            </div>

            <el-button class="detailbtn" tpye="info" @click="getdetail(i)">
                详情
            </el-button>
          </div>
         
       
        </li>
    </ul> 
</template>

<style scoped>
.infinite-list {
  width: 70%;
  height: 80%;
  padding: 0;
  margin:0 auto;
  list-style: none;
}
.infinite-list-item {

  border: 1px solid var(--el-border-color); 
  border-radius: 20px; 
  background-image: linear-gradient(to right,rgb(65, 56, 56),rgb(99, 95, 95),rgb(47, 51, 54));
 
  /* display: flex; */
  align-items: center;
  justify-content: center;
  height: 230px;
  background: #4c3e3e;
   margin: 10px;
  color: var(--el-color-primary);
}
.image{
  display: inline-flex;
  /* float: left; */
  margin-left:10px;
  margin-top: 10px;
  border-radius: 20px;
}
.info{
  
  margin-left:300px;
  margin-top: -200px; 
}
.info-item{
  margin-top: 10px;
}
.detailbtn{
  float: right;
  margin-right: 30px;
  margin-top: -100px;
}
.mynav{
  margin-top: 50px;
  margin-left: 150px;
  font-size: 20px;
}
</style>