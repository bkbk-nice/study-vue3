<template>
    <el-container class="layout-container-demo" style="height: 100vh">
  
      <el-header class="fixed-element" >
        <div style="display: flex; ">
          <div style="font-size: 25px;flex:1; ">
            <img alt="logo" style="margin-top: 10px;margin-right: 10px;" src="/myweb.ico" width="35" height="35" />
            <span>中心库房</span>
          </div>
  
          <div>
        
      </div>
          <div style="text-align: right; margin-top: 10px; font-size: 20px" class="toolbar"  >
            <el-dropdown>
              <el-avatar
          src="https://s2.loli.net/2023/06/25/myGOcEXjvRp7hsI.png"
        />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="layout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>dev</span>
          </div>
        </div>
  
      </el-header>
  
  
  
      <el-container>
        <el-aside :width="asidewidth">
          <el-scrollbar>
            <!-- <el-menu :default-openeds="['1', '3']"> -->
              <el-button round   @click="openOrClose"   >折叠</el-button>
            <el-menu router :collapse="isCollapse" :collapse-transition="false">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <message />
                  </el-icon><span>货物调度单管理</span>
                </template>
                <el-menu-item-group>
                  <template #title><span>货物调度单</span></template>
                  <el-menu-item index="/center/allocationlist"><span>货物调度单</span></el-menu-item>
                  <!-- <el-menu-item index="1-2">商品2</el-menu-item> -->
                </el-menu-item-group>
              </el-sub-menu>
              <!--
              <el-sub-menu index="">
                <template #title>
                  <el-icon><icon-menu /></el-icon><span>客户管理</span>
                </template>
                <el-menu-item-group>
                  <template #title>Group 1</template>
                  <el-menu-item index="/store/customer"><span>客户</span></el-menu-item>
                </el-menu-item-group>
                 
              </el-sub-menu> -->
              <el-sub-menu index="3">
                <template #title>
                  <el-icon>
                    <setting />
                  </el-icon><span>设置</span>
                </template>
               
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
  
  
        <el-main class="main">
  
  
          <div>
            <RouterView></RouterView>
          </div>
  
          <el-footer class="footer">
            <div class="admin">
              <h4>admin:bkbknice@qq.com</h4>
            </div>
          </el-footer>
  
        </el-main> 
  
      </el-container>
  
  
    </el-container>
  </template>
  
  
  
  
  
  
  <script lang="ts" setup>
  
  import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
  import { RouterView } from 'vue-router'
  import { ElLoading } from 'element-plus'
  import { useRouter, useRoute } from 'vue-router'
  import { onMounted, ref } from 'vue'
  const router = useRouter()
  const route = useRoute()
   
  const asidewidth = ref('200px') 
  
  const isCollapse = ref(false)
   
  
  const openOrClose = () => {
    
    isCollapse.value=!isCollapse.value
    asidewidth.value = asidewidth.value=='200px'?'60px':'200px'
  } 
  
  
  const layout = () => {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
    localStorage.removeItem("center_token")
    setTimeout(() => {
      loading.close()
      router.push({
        name: 'about',
      })
    }, 2000)
  
  }
  
  
  
  </script>
  
  
  
  
  
  
  
  
  
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
  
  .main {
    background-color: rgb(106, 71, 71);
  
  }
  .el-main {
      background-color: #f5f7f9;
      height: calc(100vh - 4rem);
  }
  
  
  .footer {
    background-color: rgb(174, 172, 172);
    height: 100px;
    margin-top: 90vh;
  }
  
  .admin {
    padding-top: 20px;
    margin-left: 10%;
  }
  
   
  ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  
  /* 滚动槽 */
  ::-webkit-scrollbar-track {
    border-radius:10px;
  }
  
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(173, 23, 23, 0.4);
    height: 120px;
  }  
  
  
  </style>
  