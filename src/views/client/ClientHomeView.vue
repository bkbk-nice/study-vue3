<script setup lang="ts">

import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
import { ElLoading } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {client_getAvator} from "../../api/api"
const router = useRouter()
 

const avatorsrc = ref('')  
const clientName = ref('')

 

onMounted(() => { 
     
    client_getAvator().then((res: any) => { 
      console.log(res); 
      if(res=="认证错误"){
        ElMessageBox.alert(res , '提示', { 
          confirmButtonText: 'OK', 
        })
        router.push({
          name: 'login',
        })
      }
      avatorsrc.value=res.data.avatatUrl
      clientName.value=res.data.name
     })
})


const jumpto_order = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  
  setTimeout(() => {
    loading.close()
    router.push({
      name: 'order',
    })
  }, 500) 
}

const jumpto_personInfo = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
 
  setTimeout(() => {
    loading.close()
    router.push({
      name: 'client_person',
    })
  }, 500) 
}


const jumpto_shop = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  }) 
  setTimeout(() => {
    loading.close()
    router.push({
      path:"/client/shop"
    })
  }, 100) 
}
const layout = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  localStorage.clear()
  setTimeout(() => {
    loading.close()
    router.push({
      name: 'about',
    })
  }, 500)

}


 


</script>

<template>


<el-container class="layout-container-demo" style="height: 100vh">
    <el-header class="fixed-element" >
      <div style="display: flex; ">
        <div style="font-size: 25px;flex:1; ">
          <img alt="logo" @click="jumpto_shop" style="margin-top: 10px;margin-right: 10px;" src="/myweb.ico" width="35" height="35" />
          <span>商城 </span>
        </div>

        <div>
      
     </div>
        <div style="text-align: right; margin-top: 10px; font-size: 20px" class="toolbar"  >
          <el-dropdown>
            <el-avatar
        :src="avatorsrc"
      />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="jumpto_order">我的订单</el-dropdown-item>
                <el-dropdown-item @click="jumpto_personInfo">个人信息</el-dropdown-item>
                <el-dropdown-item @click="layout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span  v-text="clientName"></span>
        </div>
      </div>

    </el-header>

    <!-- :key="$route.fullPath" -->
    <el-main>
        <RouterView > 
        </RouterView> 
    </el-main>
   


</el-container>

</template>

<style scoped>

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}


.fixed-element {
  position: fixed;
  top: 0px;
  right: 0px;
  border-bottom:2px solid rgb(24, 23, 23); 
}


</style>