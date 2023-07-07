<template>


  <div>
    <h1>order界面</h1>
    <el-scrollbar >
      

      <el-dialog
    v-model="centerDialogVisible"
    title="选择分站"
    width="45%"
    align-center
  >
  <el-form
   ref="ruleFormRef"
    :model="allocationList" 
    label-width="120px" 
    status-icon
  >
    <el-form-item label="订单号" prop="orderId">
      <el-input v-model="allocationList.orderId" disabled/>
    </el-form-item>

    <el-form-item label="分站代码" prop="substationId">
      <el-input v-model="allocationList.substationId" disabled />
    </el-form-item>

    <!-- <el-form-item label="分站名" prop="substationName">
      <el-input v-model="allocationList.substationName" disabled />
    </el-form-item> -->
    

    <el-form-item label="选择分站"  >
      <el-select v-model="allocationList.substationId" filterable placeholder="Select">
      <el-option
        v-for="item in substaion"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    </el-form-item>


   
    
    <el-form-item>
      <el-button type="primary" @click="submitForm()">
        调度
      </el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
      <el-button type="danger" @click="centerDialogVisible = false">返回</el-button>
    </el-form-item>
  </el-form>
 
  </el-dialog>


      <el-table :data="orderData" class="table" border highlight-current-row    stripe>
        <el-table-column type="selection" width="55" />

        <el-table-column    label="图片"  width="55"> 
          <template #default="scope">
             <img :src="scope.row.mainImage"  style="height: 50px; width: 50px;"/>
          </template>
          </el-table-column>
        <el-table-column prop="id" label="订单号" width="80" />
        <el-table-column prop="clientId" label="客户编号" width="50" />
        <el-table-column prop="productId"   label="商品编号"   width="50" />
        <el-table-column prop="productName" label="商品名" width="100"   />
        <el-table-column prop="address" label="地址" width="160"   />
        <el-table-column prop="status" label="状态" width="50"   />
        <el-table-column prop="type" label="类型"  width="50"  />
        <el-table-column prop="substationId" label="分站编号"  width="50"  />
        <el-table-column prop="substationName" label="分站名"  width="80"  />
        <el-table-column prop="taskId" label="任务单号"  width="90"  />
      <!-- fixed="right" -->

        <el-table-column  label="操作" width="300">
          <template #default="scope">

            <el-popover placement="right" :width="1050" trigger="click">
              <template #reference>
                <el-button style="margin-right: 16px" @click="choseRow(scope.row.id)">详情</el-button>
              </template>
              <el-table :data="filter">
                <el-table-column prop="id" label="订单号" width="80" />
               <el-table-column width="60" property="num" label="数量" />
                <el-table-column width="60" property="price" label="单价" />
                <el-table-column width="60" property="clientName" label="客户名" />
                <el-table-column width="80" property="phone" label="手机号" />  
                <el-table-column width="200" property="remark" label="备注" />
                <el-table-column width="150" property="time" label="时间" />
                <el-table-column width="150" property="createTime" label="createTime" />
                <el-table-column width="150" property="updateTime" label="updateTime" />
                
              </el-table>
            </el-popover>

            <!-- <el-button link type="primary" size="small" >详情</el-button> -->
            <el-button type="primary" style="margin-right: 16px" @click="edit(scope.row)">调度</el-button>
 
          </template>
        </el-table-column> 
      </el-table> 

    <!-- </v-touch> -->
      <div class="demo-pagination-block"> 
      <el-input v-model="condition.keyword" placeholder="Type to search name" size="large" class="item1"> <template
          #append> <el-button :icon="Search" @click="Searchhandel" circle /> </template> </el-input> 
      <el-pagination class="item2" v-model:current-page="currentPage" v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 1]" :small="small" :disabled="disabled" :background="background"
        layout="total, sizes, prev, pager, next, jumper" v-model:total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" /> 
      </div> 

    </el-scrollbar> 

  </div>
</template>
<script lang="ts" setup>
 
import {   onMounted,computed } from 'vue'
import { ref, reactive } from 'vue' 
import { Search ,InfoFilled} from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus' 
import { getOrderPageByDynamics,getSubstation,createAllocationList} from "../../api/api";
  

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const centerDialogVisible = ref(false)
const nowchose = ref()

const item = {
  id: 0,
  clientId: 0,
  productId: 0,
  num: 0,
  productName: 'loading',
  price: 0,
  phone: 'loading',
  address: 'loading',
  remark:'',
  clientName:'', 
  time:'', 
  createTime:'',
  updateTime:'',  
  type:0,
  status:0,
  mainImage:'',
  substationId:0,
  substationName:'',
  taskId:0,
}
const orderData = ref(Array.from({ length: 1 }).fill(item))

const substaion= ref([{
  id:0,name:"a"
}])
const allocationList = reactive({
  orderId: 0,
  substationId: 0,
  substationName: "",
})
 
const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(5)

onMounted(() => { 
  loadpage();
  getSubstation().then((res: any) => { 
    console.log(res);
    substaion.value= res.data; 
  });  
})

const submitForm = () =>{
  if(allocationList.substationId==0){
    ElMessage.error("请输入完整")  
    return
  }
  createAllocationList(allocationList).then((res: any) => { 
      console.log(res);  
      if(res.status == 0) {
        ElMessage.success('调度成功')
        centerDialogVisible.value=!centerDialogVisible.value
        loadpage()
      }else{
        ElMessage.error(res.message)  
      } 
    });  
}


const condition = reactive({
  keyword: "",
  pageNumber: 1,
  pageSize: 5,
})


const loadpage = () => { 
  getOrderPageByDynamics(condition).then((res: any) => { 
    console.log(res);
    orderData.value = res.data.list;
    total.value = res.data.total
  });  
}  


const filter = computed(() =>
    orderData.value.filter(
      (data  ) =>
        !nowchose.value ||
        data.id == nowchose.value
    )
  ) 
  


  const edit = (x:object ) => {
    // ruleForm.id=JSON.parse(JSON.stringify(x)).id
    // ruleForm.name=JSON.parse(JSON.stringify(x)).name
    // ruleForm.address=JSON.parse(JSON.stringify(x)).address
    // ruleForm.email=JSON.parse(JSON.stringify(x)).email
    // ruleForm.identityNumber=JSON.parse(JSON.stringify(x)).identityNumber
    // ruleForm.phone=JSON.parse(JSON.stringify(x)).phone
    console.log(JSON.parse(JSON.stringify(x)).id )
    allocationList.orderId = JSON.parse(JSON.stringify(x)).id
    centerDialogVisible.value=!centerDialogVisible.value
  } 
 


  const choseRow = (index: number) => {
    nowchose.value=index 
  } 

  const handleSizeChange = (val: number) => {
    condition.pageSize = val
    loadpage();
  }
  const handleCurrentChange = (val: number) => {
    condition.pageNumber = val
    loadpage();
  }


  const Searchhandel = ( ) => { 
    loadpage();
  }

</script>


<style   scoped>
.table {
  box-shadow: 0px 0px 15px 5px #888888;
  width: 80%;
  margin-left: 100px; 
  border-radius: 20px; 
  margin-bottom: 20px; 
  margin-top: 20px;
}
 
.demo-pagination-block {
  border-radius: 20px; 
  margin-top: 10px;
  margin-left: 100px;
  width: 50%;
  display: grid;
  grid-gap: 10px 0px;

}


.item1 { 
  box-shadow: 0px 0px 15px 5px #888888; 
  grid-row: 1 / 1;
  width: 300px;   
  border-radius: 50px; 
}

.item2 {
  box-shadow: 0px 0px 15px 5px #888888;
  grid-row: 1 / 3;
  margin-bottom: 10px;
  margin-left: 40px;

}



@media (max-width:900px) {

  .table {
  
  width: 100%;
  margin-left: 10px;    
  margin-bottom: 20px; 
  margin-top: 20px;
}
 
 

.demo-pagination-block { 
  margin-top: 10px; 
  width: 50%;
  margin-left: 10px;
}
.item1 { 
  box-shadow: 0px 0px 15px 5px #888888;  
  width: 150px;  
  border-radius: 20px; 
  
}

.item2 {
  box-shadow: 0px 0px 15px 5px #888888; 
  margin-bottom: 10px;
  margin-left: 5px;
 
}


}



</style>
  
   

 