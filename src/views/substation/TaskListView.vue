<template>
  <div>
    <h1>task界面</h1>
    <el-scrollbar>


      <el-dialog v-model="centerDialogVisible" title="选择配送员" width="45%" align-center>
        <el-form ref="ruleFormRef" :model="taskList" label-width="120px" status-icon>
          <el-form-item label="任务单号" prop="id">
            <el-input v-model="taskList.id" disabled />
          </el-form-item>

          <el-form-item label="配送员编号" prop="deliverymanId">
            <el-input v-model="taskList.deliverymanId" disabled />
          </el-form-item>


          <el-form-item label="选择配送员">
            <el-select v-model="taskList.deliverymanId" filterable placeholder="Select">
              <el-option v-for="item in deliverymans" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>




          <el-form-item>
            <el-button type="primary" @click="submitForm()">
              确认
            </el-button>
            <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
            <el-button type="danger" @click="centerDialogVisible = false">返回</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>


      <el-table :data="taskData" class="table" border :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="55" />


        <el-table-column prop="id" label="任务单号" width="80" />

        <el-table-column prop="substationId" label="分站编号" width="50" />
        <el-table-column prop="substationName" label="分站名" width="80" />

        <el-table-column prop="orderId" label="订单号" width="90" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <span v-if="scope.row.status == 0">未到货</span>
            <span v-if="scope.row.status == 1">已到货</span>
            <span v-if="scope.row.status == 2">配送中</span>
            <span v-if="scope.row.status == 3">已送达</span>
            <span v-if="scope.row.status == 4">已收款</span>
          </template>
        </el-table-column>
        <el-table-column prop="allocationId" label="调度单号" width="90" />
        <el-table-column prop="deliverymanName" label="配送员" width="90" />


        <el-table-column prop="clientPhone" label="客户手机号" width="90" />
        <el-table-column prop="address" label="地址" width="90" />

        <el-table-column prop="money" label="收款" width="90" />

        <el-table-column label="操作" width="300">
          <template #default="scope">

            <el-popover placement="right" :width="1050" trigger="click">
              <template #reference>
                <el-button style="margin-right: 16px" @click="choseRow(scope.row.id)">详情</el-button>
              </template>
              <el-table :data="filter">
                <el-table-column prop="price" label="总价" width="90" />
                <el-table-column prop="clientName" label="客户名" width="90" />
                <el-table-column prop="deliverymanName" label="配送员" width="90" />
                <el-table-column prop="deliverymanId" label="配送员id" width="90" />
                <el-table-column prop="deliverymanPhone" label="配送员手机号" width="90" />
                <el-table-column width="150" property="createTime" label="createTime" />
                <el-table-column width="150" property="updateTime" label="updateTime" />

              </el-table>
            </el-popover>


            <el-button v-if="scope.row.status == 0" type="success" style="margin-right: 16px"
              @click="get(scope.row)">收货</el-button>
            <el-button v-if="scope.row.status == 1" type="primary" style="margin-right: 16px"
              @click="edit(scope.row)">调度</el-button>

          </template>
        </el-table-column>
      </el-table>


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

import { onMounted, computed } from 'vue'
import { ref, reactive } from 'vue'
import { Search, InfoFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { substationTaskList, choosedeliveryman, getdeliveryman, getproduct } from "../../api/api";


const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const centerDialogVisible = ref(false)
const nowchose = ref()

interface it {
  status: number
}

const item = {
  id: 0,
  orderId: 0,
  substationId: 0,
  substationName: 'loading',
  deliverymanId: 0,
  deliverymanName: 'loading',
  deliverymanPhone: 'loading',
  allocationId: 0,
  status: 0,
  createTime: '',
  updateTime: '',
  clientName: '',
  clientPhone: '',
  address: '',
  price: 0,
  money: 0,
}
const taskData = ref(Array.from({ length: 1 }).fill(item))

const deliverymans = ref([{
  id: 0, name: "a"
}])
const taskList = reactive({
  id: 0,
  deliverymanId: 0,
})

const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(5)

onMounted(() => {
  loadpage();
  getdeliveryman().then((res: any) => {
    console.log(res);
    deliverymans.value = res.data;
  });
})


const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: it
  rowIndex: number
}) => {

  if (row.status == 0 || row.status == 1) {
    return 'warning-row'
  } else if (row.status == 2 || row.status == 3 || row.status == 4) {
    return 'success-row'
  }
  return ''
}

const submitForm = () => {
  if (taskList.deliverymanId == 0) {
    ElMessage.error("请输入完整")
    return
  }
  choosedeliveryman(taskList).then((res: any) => {
    console.log(res);
    if (res.status == 0) {
      ElMessage.success('选择成功')
      centerDialogVisible.value = !centerDialogVisible.value
      loadpage()
    } else {
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
  substationTaskList(condition).then((res: any) => {
    console.log(res);
    taskData.value = res.data.list;
    total.value = res.data.total
  });
}


const filter = computed(() =>
  taskData.value.filter(
    (data) =>
      !nowchose.value ||
      data.id == nowchose.value
  )
)



const edit = (x: object) => {
 
  console.log(JSON.parse(JSON.stringify(x)).id)
  taskList.id = JSON.parse(JSON.stringify(x)).id
  centerDialogVisible.value = !centerDialogVisible.value
}

const get = (x: object) => {

  console.log(JSON.parse(JSON.stringify(x)).id)
  taskList.id = JSON.parse(JSON.stringify(x)).id
  getproduct(taskList).then((res: any) => {
    console.log(res);
    if (res.status == 0) {
      ElMessage.success('收货成功')

      loadpage()
    } else {
      ElMessage.error(res.message)
    }
  });
}



const choseRow = (index: number) => {
  nowchose.value = index
}

const handleSizeChange = (val: number) => {
  condition.pageSize = val
  loadpage();
}
const handleCurrentChange = (val: number) => {
  condition.pageNumber = val
  loadpage();
}


const Searchhandel = () => {
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

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>

     
  
   