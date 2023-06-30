<template>


  <div>
    <h1>商品界面</h1>
    <el-scrollbar>
          <el-table :data="tableData" class="table" border height="650" stripe>
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
            <el-table-column fixed="right" label="Operations" width="120">
              <template #default>
                <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
                <el-button link type="primary" size="small">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>

  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue'
const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))



const handleClick = () => {
  
  console.log("toch")
}

</script>


<style   scoped>
.table {
  width: 800px;
  margin-left: 100px;
  margin-top: 100px;
  margin-right: 100px;

}

 
 
</style>

 