<template>
  <div>
    <h1>客户界面</h1>
    
    <el-dialog
    v-model="addcenterDialogVisible"
    title="新增用户"
    width="45%"
    align-center
  >
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="身份证" prop="identityNumber">
      <el-input v-model="ruleForm.identityNumber" />
    </el-form-item>

    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>

    <el-form-item label="住址" prop="address">
      <el-input v-model="ruleForm.address" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>

    
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        新增
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      <el-button type="danger" @click="addcenterDialogVisible = false">返回</el-button>
    </el-form-item>
  </el-form>


    <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="addcenterDialogVisible = false">返回</el-button>
        <el-button type="primary" @click="addcenterDialogVisible = false">
          新增
        </el-button>
      </span>
    </template> -->
  </el-dialog>


  <el-dialog
    v-model="editcenterDialogVisible"
    title="修改用户信息"
    width="45%"
    align-center
  >
  <el-form
   ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="昵称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>

    <el-form-item label="身份证" prop="identityNumber">
      <el-input v-model="ruleForm.identityNumber" />
    </el-form-item>

    <el-form-item label="手机号" prop="phone">
      <el-input v-model="ruleForm.phone" />
    </el-form-item>

    <el-form-item label="住址" prop="address">
      <el-input v-model="ruleForm.address" />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" />
    </el-form-item>

    
    <el-form-item>
      <el-button type="primary" @click="submiteditForm(ruleFormRef)">
        提交
      </el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
      <el-button type="danger" @click="editcenterDialogVisible = false">返回</el-button>
    </el-form-item>
  </el-form>
 
  </el-dialog>


    <el-button type="primary" class="add" @click="addbtn">新增</el-button>
    <el-scrollbar >
     <!-- <v-touch> -->
        <el-table :data="tableData" class="table" border highlight-current-row    stripe>
        <el-table-column type="selection" width="55" />

        <el-table-column    label="avatar"  width="55">

          <template #default="scope">
             <el-avatar :src="scope.row.imageUrl"  />
          </template>
          <!-- <el-avatar #default="scope">
             :src="scope.row.imageUrl" width="100" height="50"/>
          </el-avatar> -->
         
          </el-table-column>
        <el-table-column prop="id" label="id" width="80" />
        <el-table-column prop="name" label="name" width="160" />
        <el-table-column prop="identityNumber"  width="160"  label="identityNumber" />
        <el-table-column prop="phone" label="phone" width="160"   />
        <el-table-column prop="address" label="address" width="160"   />
        <el-table-column prop="email" label="eamil"  width="160"  />
         
        <!-- fixed="right" -->
        <el-table-column  label="Operations" width="300">
          <template #default="scope">

            <el-popover placement="right" :width="800" trigger="click">
              <template #reference>
                <el-button style="margin-right: 16px" @click="choseRow(scope.row.id)">详情</el-button>
              </template>
              <el-table :data="filter">
                <el-table-column prop="name" label="name" width="80" />
                <el-table-column width="350" property="createTime" label="createTime" />
                <el-table-column width="300" property="updateTime" label="updateTime" />
                
              </el-table>
            </el-popover>

            <!-- <el-button link type="primary" size="small" >详情</el-button> -->
            <el-button type="info" style="margin-right: 16px" @click="edit(scope.row)">编辑</el-button>



            <el-popconfirm
                confirm-button-text="Yes"
                cancel-button-text="No"
                :icon="InfoFilled"
                icon-color="#626AEF"
                title="Are you sure to delete this?"
                @confirm =del(scope.row.id)
                
              >
                <template #reference>
                  <el-button  type="danger" style="margin-right: 16px">删除</el-button>
                </template>
              </el-popconfirm>
            

          
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

<!-- <el-input  class="item1" v-model="condition.keyword"  size="large" placeholder="Type to search name"  />
<el-button :icon="Search" @click="Searchhandel" circle /> -->

</div>




    </el-scrollbar> 

  </div>
</template>
  
<script  lang="ts"  setup>
import { computed, onMounted } from 'vue'
import { ref, reactive } from 'vue'
import { getCsclientlistPageByDynamics } from "../../api/api";
import { Search ,InfoFilled} from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus' 
import { postCsclientaddClient } from "../../api/api";
import { postCsclienteditClient } from "../../api/api";
import { postCsclientdelClient } from "../../api/api";
import {VueTouch} from "vue-touch";

interface RuleForm {
  id:number
  name: string
  identityNumber: string
  phone:string
  address:string
  email:string

}

const nowchose = ref()
const addcenterDialogVisible = ref(false)
const editcenterDialogVisible = ref(false)
const item = {
  id: 1,
  name: "loading",
  identityNumber: "loading",
  phone: 'loading',
  address: 'loading',
  email: 'loading',
  createTime: 'loading',
  updateTime: 'loading',
  imageUrl:'',
}
const tableData = ref(Array.from({ length: 1 }).fill(item))

const currentPage = ref(1)
const pageSize = ref(5)
const total = ref(5)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)


const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  id:0,
  name: '', 
  identityNumber:'',
  phone:'',
  address:'',
  email: '',
})

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: 'Please input   name', trigger: 'blur' },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
  ], 
  identityNumber: [
    { required: true, message: 'Please input   identityNumber', trigger: 'blur' },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
    // { type: 'number', message: 'identityNumber must be a number' },
  ], 
  address: [
    { required: true, message: 'Please input   address', trigger: 'blur' },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
  ], 
  email: [
    { required: true, message: 'Please input   email', trigger: 'blur' },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
  ], 
  phone: [
    { required: true, message: 'Please input   phone', trigger: 'blur' },
    { min: 5, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
   
  ], 
})




const addbtn = () => {
   addcenterDialogVisible.value=!addcenterDialogVisible.value
   ruleForm.id=0
    ruleForm.name=''
    ruleForm.address=''
    ruleForm.email=''
    ruleForm.identityNumber=''
    ruleForm.phone=''
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) { 
      postCsclientaddClient(ruleForm).then((res: any) => { 
      console.log(res);
     

      if(res.status == 0) {
        ElMessage.success('新增成功')
        addcenterDialogVisible.value=!addcenterDialogVisible.value
        loadpage()
      }else{
        ElMessage.error(res.message)  
      }
    
    
    }); 
    
    } else {
      ElMessage.error('格式有误')  
    }
  })
}

const submiteditForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) { 
      postCsclienteditClient(ruleForm).then((res: any) => { 
      console.log(res);  
      if(res.status == 0) {
        ElMessage.success('修改成功')
        editcenterDialogVisible.value=!editcenterDialogVisible.value
        loadpage()
      }else{
        ElMessage.error(res.message)  
      } 
    });  
    } else {
      ElMessage.error('格式有误')  
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

 

const condition = reactive({
  keyword: "",
  pageNumber: 1,
  pageSize: 5,
})


const loadpage = () => { 
  getCsclientlistPageByDynamics(condition).then((res: any) => { 
    console.log(res);
    tableData.value = res.data.list;
    total.value = res.data.total
  });  
}  
onMounted(() => { 
  loadpage();
})

   
  


  const edit = (x:object ) => {
    ruleForm.id=JSON.parse(JSON.stringify(x)).id
    ruleForm.name=JSON.parse(JSON.stringify(x)).name
    ruleForm.address=JSON.parse(JSON.stringify(x)).address
    ruleForm.email=JSON.parse(JSON.stringify(x)).email
    ruleForm.identityNumber=JSON.parse(JSON.stringify(x)).identityNumber
    ruleForm.phone=JSON.parse(JSON.stringify(x)).phone
    console.log(JSON.parse(JSON.stringify(x)) )
    editcenterDialogVisible.value=true


  } 

  const del = (index: number) => {
    console.log(index)
    postCsclientdelClient({id:index}).then((res: any) => { 
      console.log(res);  
      if(res.status == 0) {
        ElMessage.success('删除成功') 
        loadpage()
      }else{
        ElMessage.error(res.message)  
      } 
    }); 
  } 


  const choseRow = (index: number) => {
    nowchose.value=index 
  } 
  const filter = computed(() =>
    tableData.value.filter(
      (data  ) =>
        !nowchose.value ||
        data.id == nowchose.value
    )
  ) 

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
.add{
  margin-top: 50px;
   width: 100px;
   margin-left:100px;
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
.add{
  margin-top: 50px;
   width: 100px;
   margin-left:10px;
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
  
   