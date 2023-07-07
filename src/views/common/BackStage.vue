<script setup lang="ts">

import { reactive } from 'vue'
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'
import { substationLogin,centerLogin } from "../../api/api"
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
        value: 'deliveryman',
        label: '配送员',
    },
    {
        value: 'substation',
        label: '分站',
    },
    {
        value: 'center',
        label: '中心库房',
    },
]



const openFullScreen = () => {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    if (loginselectvalue.value == "substation") {
        substationLogin(form).then((res: any) => {
            console.log(res);
            loading.close();
            if (res.status == 0) {
                localStorage.setItem("substation_token", res.data.token)
                router.push({
                    name: 'substation',
                })
                ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                })
            } else {
                ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                })
            }
        }).catch(() => {
            loading.close();
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
        });
    } else if (loginselectvalue.value == "center") {
        centerLogin(form).then((res: any) => {
            console.log(res);
            loading.close();
            if (res.status == 0) {
                localStorage.setItem("center_token", res.data.token)
                router.push({
                    name: 'center',
                })
                ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                })
            } else {
                ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                })
            }
        }).catch(() => {
            loading.close();
            ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
        });
    } 


 


}

</script>

<template>
    <el-card class="card">
        <template #header>
      <div>
        <span>后台系统登录</span>
      </div>
    </template>
        <el-form :model="form" class="form">

            <el-form-item>
                <el-input v-model="form.name" size="large" class="f-item" placeholder="Please input username"><template
                        #prepend>账号</template></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="form.password" size="large" type="password" class="f-item"
                    placeholder="Please input password" show-password><template #prepend>密码</template></el-input>
            </el-form-item>


            <el-select v-model="loginselectvalue" class="f-item-select" placeholder="选择登录身份" size="large">
                <el-option v-for="item in loginselect" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

            <el-form-item>
                <el-button class="f-item-btn" size="large" type="primary" @click="openFullScreen">登录</el-button>
                <!-- <el-button>Cancel</el-button> -->
            </el-form-item>

        </el-form>

    </el-card>
</template>


<style scoped>
.card {
    margin-left: 30%;
    margin-right: 30%;

}

.form {
    height: 13rem;
}

.f-item {
    /* margin-left: 5%;
  margin-right: 5%; */
    /* margin-top: 10px; */
    width: 100%;
}

.f-item-btn {
    /* margin-left: 5%;
  margin-right: 5%; */
    /* margin-top: 10px; */
    margin-top: 10px;
    width: 100%;
}

.f-item-select {
    /* margin-left: 5%;
  margin-right: 5%; */
    /* margin-top: 10px; */
    /* margin-left: 30%; */
    width: 100%;
}

.card-header {
    background-color: bisque;
}

@media (max-width:900px) {
    .card {
        margin-left: 1rem;
        margin-right: 1rem;
    }
}
</style>
  