<script setup lang="ts">
import { ref,onMounted,reactive } from 'vue'
import {searchOrder,getOrderDetail,makesureget} from '../../api/api'
import { ElButton, ElDrawer } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const count = ref(0)
const total = ref(0)

const visible = ref(false)

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
    mainImage:'',
    status:0,
  },
]);  
let orderlist = ref(templist)


const choseitem = reactive(
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
    mainImage:'',
    status:0,
  },
); 

let detail = reactive(
  {
    substationId:'',
    substationName:'',
    status:0,
    deliverymanId:'',
    deliverymanName:'',
    deliverymanPhone:'',
    remark:'',
    time:'',
  }
)

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
    total.value = res.data.total
  });  
} 

onMounted(() => {  
})
 

const getdetail = (i:number) =>{
  visible.value = true
  choseitem.id = orderlist.value[i].id
  choseitem.status= orderlist.value[i].status
 
  detail.remark =  orderlist.value[i].remark
  detail.time =  orderlist.value[i].time
  // console.log(orderlist.value[i].id)
  let send = {
    id:  choseitem.id
  }
  //获取任务单信息
  if(choseitem.status==2||choseitem.status==3){
    
    getOrderDetail(send) .then((res: any) => { 
      console.log(res);
      detail.deliverymanId = res.data.deliverymanId
      detail.deliverymanName = res.data.deliverymanName
      detail.deliverymanPhone = res.data.deliverymanPhone
      detail.substationId = res.data.substationId
      detail.substationName =  res.data.substationName
      detail.status=res.data.status
      console.log('status:'+ detail.status)
  });  
  }
}


const sureGet = () =>{ 
  let send = {
    id:  choseitem.id
  }
  makesureget(send) .then((res: any) => { 
      console.log(res);
      if(res.status==0){
        visible.value=!visible.value
        
        ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                    
      }).then(()=>{
        location.reload()
      })
      }
      
  });  
  
}

</script>

<template>
    
 
    <el-breadcrumb  class="mynav" separator="/">
      <el-breadcrumb-item :to="{ path: '/client/shop' }">商城</el-breadcrumb-item> 
      <el-breadcrumb-item>我的订单</el-breadcrumb-item> 
    </el-breadcrumb>


    <ul   v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li v-show="i<=total || total ==0 " v-for="i in count" :key="i"  @click="getdetail(i)"   class="infinite-list-item">
          <div v-if="total==0" >
            <el-empty description="没有订单" style="margin-top: -30px;" />
          </div> 
          <div v-else > 
            <img    :src="orderlist[i].mainImage"  style="width: 200px;height: 200px;"  class="image" /> 
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
                总价:{{ orderlist[i].price*orderlist[i].num  }}
                 
              </div> 

             
              
               

              <div class="info-item">
                联系电话: {{ orderlist[i].phone }}
              </div> 
              <div class="info-item">
                地址:{{ orderlist[i].address }}  
              </div> 
             
            </div> 
           

              <div class="result">
                  <div v-if="orderlist[i].status==3">
                  <el-result     icon="success"   title="已完成" > </el-result>
                </div>
                <div v-else-if="orderlist[i].status==0">
                  <el-result     icon="info"   title="等待发货" > </el-result>
                </div>
                <div v-else-if="orderlist[i].status==1">
                  <el-result     icon="warning"   title="缺货" > </el-result>
                </div>
                <div v-else-if="orderlist[i].status==2">
                  <el-result    icon="info"   title="配送中" > </el-result>
                </div>
            </div>
           
           

          </div> 
        </li>
    </ul> 

    <el-drawer v-model="visible" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">订单详情</h4>
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>关闭</el-button>
        </template>
        <div class="info-item"  > 备注:{{detail.remark }}    </div> 
        <div class="info-item"  > 要求送达时间:{{detail.time }}    </div> 
        <div class="info-item">
          <div v-if="choseitem.status==0">
            <span>等待发货</span>
        </div>
        <div v-else-if="choseitem.status==1">
            <span>缺货中</span>
        </div>
        <div v-else-if="choseitem.status==2">
            <span>配送中</span>
        </div>
        <div v-else-if="choseitem.status==3">
            <span>已完成</span>
        </div>
        </div>

        <div v-if="choseitem.status==2||choseitem.status==3">
          <div v-if="detail.status>=2">
            <div class="info-item"  > 分站:{{detail.substationName }}    </div> 
          </div>
          <div v-else-if="detail.status==0">
            <div class="info-item"  > 即将调拨至分站:{{detail.substationName }}    </div> 
          </div>
          <div v-else-if="detail.status==1">
            <div class="info-item"  > 货物到达分站:{{detail.substationName }}    </div> 
          </div>
         
          
          <div v-if="detail.status>=2">
            <div class="info-item" > 配送员编号:{{detail.deliverymanId }}    </div> 
            <div   class="info-item"> 配送员:{{detail.deliverymanName }}    </div> 
            <div   class="info-item"> 配送员手机号:{{detail.deliverymanPhone }}    </div> 
          </div>

          <div v-if="detail.status==3">
            <el-button type="danger" class="info-item" @click="sureGet"> 确认收货   </el-button>
          </div>

        </div>
       
   </el-drawer>

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
  background-image: linear-gradient(to right,rgb(134, 120, 120),rgb(168, 159, 159),rgb(159, 164, 168));
 
  /* display: flex; */
  align-items: center;
  justify-content: center;
  height: 230px;
  
  margin: 10px;
  color: rgb(50, 42, 42) ;  
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
.result{
  margin-top:-200px;
  margin-left:600px; 
  color:#37B328;
}
</style>