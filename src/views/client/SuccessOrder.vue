<script setup lang="ts">

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const props = defineProps(["id"])

const back = () =>{
  //  console.log(props.id)
    router.push({
        name: 'product', 
      params:{
         id:props.id
      } 
    })
}

</script>

<template>
<div>
    <el-result
        icon="success"
        title="订购成功"
        sub-title="请在‘我的订单’中查看详情"
      >
        <template #extra>
          <el-button @click="back" type="primary">返回</el-button>
        </template>
      </el-result>
</div>
</template>

<style scoped>

</style>