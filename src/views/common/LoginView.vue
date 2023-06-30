<template> 
  <el-card class="card"> 

    <el-form :model="form" class="form">

      <el-form-item  >
        <el-input v-model="form.name"
        size="large"
        class="f-item"
            placeholder="Please input username"
            ><template #prepend>账号</template></el-input>
      </el-form-item>  

      <el-form-item >
        <el-input
         v-model="form.password"
         size="large"
         type="password"
         class="f-item"
         placeholder="Please input password"
         show-password
        ><template #prepend>密码</template></el-input>
      </el-form-item> 

     
      <el-select v-model="loginselectvalue" class="f-item-select" 
     
      placeholder="选择登录身份" size="large">
    <el-option
      v-for="item in loginselect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>

      <el-form-item>
        <el-button   class="f-item-btn"    size="large"  
        type="primary"
          @click="openFullScreen"
        >登录</el-button>
        <!-- <el-button>Cancel</el-button> -->
      </el-form-item>

    </el-form>

    </el-card>

</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
import { useRouter  } from 'vue-router'
import { login_cs} from "../../api/api"
import {login_client} from "../../api/api"
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import { formToJSON } from 'axios';
 


import { ref } from 'vue'


const loginselectvalue = ref('')

const router = useRouter()
   

const form = reactive({
    name: '',
    password: '',
})


const loginselect = [
  {
    value: 'client',
    label: '客户',
  },
  {
    value: 'cs',
    label: '客服',
  }, 
]

 

const openFullScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  if(loginselectvalue.value=="cs"){
    login_cs(form).then((res: any) => { 
      console.log(res); 
      loading.close();
      if(res.status==0){
          localStorage.setItem("token",res.data.token)
          router.push({
             name: 'store', 
         })
         ElMessageBox.alert(res.message, '提示', { 
          confirmButtonText: 'OK', 
        })
      }else{
        ElMessageBox.alert(res.message, '提示', { 
          confirmButtonText: 'OK', 
        })
      } 
    }).catch(() => {
      loading.close();
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
          });  
  }else if(loginselectvalue.value=='client'){
    login_client(form).then((res: any) => { 
      console.log(res); 
      loading.close();
      if(res.status==0){
          localStorage.setItem("token",res.data.token)
          router.push({
             path:"/client/shop"
         })
         ElMessageBox.alert(res.message, '提示', { 
          confirmButtonText: 'OK', 
        })
      }else{
        ElMessageBox.alert(res.message, '提示', { 
          confirmButtonText: 'OK', 
        })
      }     
    }).catch(() => {
      loading.close();
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
          });  
  }
  

  // setTimeout(() => {
  //   loading.close()
  //   router.push({
  //   name: 'store', 
  // })
  // }, 2000)


 
} 
</script>


<style scoped>

.card{ 
  margin-left: 30%;
  margin-right: 30%;
   
}
.form{ 
   height: 13rem;
}
.f-item{
  /* margin-left: 5%;
  margin-right: 5%; */
  /* margin-top: 10px; */
  width: 100%;
}
.f-item-btn{
  /* margin-left: 5%;
  margin-right: 5%; */
  /* margin-top: 10px; */
  margin-top: 10px;
  width: 100%;
}
.f-item-select{
  /* margin-left: 5%;
  margin-right: 5%; */
  /* margin-top: 10px; */
  /* margin-left: 30%; */
  width: 100%;
}
.card-header{
  background-color: bisque;
}

@media (max-width:900px) {
  .card{ 
  margin-left: 1rem;
  margin-right: 1rem;
}
}

   
</style>
  