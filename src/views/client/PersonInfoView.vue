<script setup lang="ts">

import { editClient, updatePassword, getClient } from "../../api/api"
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, onMounted, ref, handleError } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'

import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'  
import type { UploadFile } from 'element-plus'

 

const router = useRouter()
 
const upload = ref<UploadInstance>()

const handlerror = ()=>{
  ElMessageBox.alert("上传失败", '提示', { confirmButtonText: 'OK', }) 
  loading.value=false
}
const handleSuccess = ()=>{
  ElMessageBox.alert("上传成功", '提示', { confirmButtonText: 'OK', }) 
  loading.value=false
}
const loading= ref(false)
const handleprogress = ()=>{
   loading.value=true
} 

//超过一个图片时清除
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const delupload = (file: UploadFile) => {
  upload.value!.clearFiles()
} 
const uploadbtn = () => {
  upload.value!.submit()
}


interface clientformRule {

  name: string
  identityNumber: string
  phone: string
  address: string
  email: string
  createTime: string
}
interface passwordformRule {
  password: string
  newPassword: string
}


const headerObj ={
  Authorization: localStorage.getItem("client_token")
}

const avatatUrl = ref('')
const activeName = ref('first')

const ruleFormRef = ref<FormInstance>()

const passwordFormRef = ref<FormInstance>()
const clientform = reactive<clientformRule>({
  name: '',
  identityNumber: '',
  phone: '',
  address: '',
  email: '',
  createTime: ''
})
const clientPassword = reactive<passwordformRule>({
  password: '',
  newPassword: '',
})
const rules = reactive<FormRules<clientformRule>>({
  name: [
    { required: true, message: 'Please input   name', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 5 to 100', trigger: 'blur' },
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

const passwordrule = reactive<FormRules<passwordformRule>>({
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: 'Please input   new password', trigger: 'blur' },
    { min: 1, max: 100, message: 'Length should be 1 to 100', trigger: 'blur' },
    // { type: 'number', message: 'identityNumber must be a number' },
  ],

})

const load = () => {
  getClient().then((res: any) => {
    console.log(res);
    clientform.name = res.data.name
    clientform.address = res.data.address
    clientform.email = res.data.email
    clientform.identityNumber = res.data.identityNumber
    clientform.createTime = res.data.createTime
    clientform.phone = res.data.phone
    avatatUrl.value = res.data.imageUrl 
  })
}
onMounted(() => {
  load()
})



const editclientform = (formEl: FormInstance | undefined) => {


  ElMessageBox.confirm(
    '确认修改个人信息？',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {

      if (!formEl) return
      formEl.validate((valid, fields) => {
        if (valid) {
          editClient(clientform).then((res: any) => {
            console.log(res);
            if (res.status == 0) {
              ElMessageBox.alert(res.message, '提示', {
                confirmButtonText: 'OK',
              })
              load()
            } else {
              ElMessageBox.alert(res.message, '提示', {
                confirmButtonText: 'OK',
              })
            }
          }).catch(() => {
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
          });
        } else {
          ElMessageBox.alert("格式错误", '提示', {
            confirmButtonText: 'OK',
          })
        }
      })


    })
    .catch(() => {

    })


}


const passwordclientform = (formEl: FormInstance | undefined) => {


  ElMessageBox.confirm(
    '确认修改密码?',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {  
      if (clientPassword.password.length != 0 && clientPassword.password == clientPassword.newPassword) {
        ElMessageBox.alert("密码不能与旧密码相同", '提示', { confirmButtonText: 'OK', })
        return
      }
      if (!formEl) return
      formEl.validate((valid, fields) => {
        if (valid) {
          updatePassword(clientPassword).then((res: any) => {
            console.log(res);
            if (res.status == 0) {
              ElMessageBox.alert(res.message, '提示', { confirmButtonText: 'OK', })
              localStorage.clear()
              router.push({
                name: 'login',
              });
            } else {
              ElMessageBox.alert(res.message, '提示', { confirmButtonText: 'OK', })
            }
          }).catch(() => {
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
          });
        } else {
          ElMessageBox.alert("格式错误", '提示', { confirmButtonText: 'OK', })
        }
      })


    })
    .catch(() => {
      ElMessageBox.alert("系统错误", '提示', { confirmButtonText: 'OK', })
    })



}




</script>

<template>
  <div class="parent">

    <el-breadcrumb  class="mynav" separator="/">
      <el-breadcrumb-item :to="{ path: '/client/shop' }">商城</el-breadcrumb-item> 
      <el-breadcrumb-item>个人信息</el-breadcrumb-item> 
    </el-breadcrumb>


    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="个人信息" name="first">个人信息
        <el-form ref="ruleFormRef" :model="clientform" :rules="rules" label-width="120px" status-icon>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="clientform.name" />
          </el-form-item>

          <el-form-item label="身份证" prop="identityNumber">
            <el-input v-model="clientform.identityNumber" />
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input v-model="clientform.phone" />
          </el-form-item>

          <el-form-item label="住址" prop="address">
            <el-input v-model="clientform.address" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="clientform.email" />
          </el-form-item>
          <el-form-item label="创建时间" prop="createTime">
            <el-input disabled readonly v-model="clientform.createTime" />
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="editclientform(ruleFormRef)">
              修改
            </el-button>
            <!-- <el-button @click="resetForm(ruleFormRef)">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="密码" name="second">
        <el-form ref="passwordFormRef" :model="clientPassword" :rules="passwordrule" label-width="120px" status-icon>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="clientPassword.password" />
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="clientPassword.newPassword" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="passwordclientform(passwordFormRef)">
              修改
            </el-button>
          
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane class="avatar" label="头像" name="third">
        <el-avatar :size="150" :src="avatatUrl" />
        
        <el-upload   
        v-loading.lock="loading"
         ref="upload" action="http://localhost:9000/client-service/client/uploadAvatar" 
         :headers="headerObj"
         :on-success="handleSuccess"
         :on-progress="handleprogress"
         :on-error="handlerror"
         class="upload" 
        :on-exceed="handleExceed" list-type="picture" limit="1" :auto-upload="false">
          <el-icon>
            <Plus />
          </el-icon>

          <template   #file="{ file }">
            <div>
              <img  :src="file.url" alt="" />
              <el-button type="danger" @click="delupload">删除</el-button>
              <el-button type="success" @click="uploadbtn">上传</el-button>
            </div>
          </template>

        </el-upload>
       

      </el-tab-pane>

    </el-tabs>

  </div>
</template>

<style scoped>
.parent {
  display: flex;
}

.demo-tabs {
  width: 50%;
  margin-top:100px;

}

.avatar {

  margin-left: 20%;
}
 
.mynav{
  margin-top: 50px;
  margin-left: 150px;
  font-size: 20px;
}
</style>