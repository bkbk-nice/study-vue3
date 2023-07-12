<template>
  <el-card class="card">


    <el-form :model="form" class="form">

      <el-form-item>
        <el-input v-model="form.name" size="large" class="f-item" placeholder="Please input username"><template
            #prepend>账号</template></el-input>
      </el-form-item>


      <el-form-item>
        <el-input v-model="form.password" size="large" type="password" class="f-item" placeholder="Please input password"
          show-password><template #prepend>密码</template></el-input>
      </el-form-item>




      <el-form-item>
        <el-button class="f-item" size="large" type="danger" @click="openFullScreen">注册</el-button>

      </el-form-item>

    </el-form>

  </el-card>
</template>
  
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'


const router = useRouter()


const form = reactive({
  name: '',
  password: '',
})

import { h, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { signup_client } from "../../api/api"
import { ElMessage } from 'element-plus'

const openFullScreen = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  signup_client(form).then((res: any) => {
    console.log(res);
    loading.close();
    if (res.status == 0) {

      router.push({
        name: 'login',
      })
      ElMessage.success("注册成功")
    } else {
      ElMessage.success("注册失败")
    }

  });

} 
</script>


<style scoped>
.card {
  margin-left: 30%;
  margin-right: 30%;
}

.form {
  height: 10rem;
}

.f-item {
  width: 100%;
}

.card-header {
  background-color: rgb(141, 222, 106);
}

@media (max-width:900px) {
  .card {
    margin-left: 1rem;
    margin-right: 1rem;
  }
}
</style>
  