<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getshopcategory,newProduct } from '../../api/api'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router';

import { Plus } from '@element-plus/icons-vue'
const form = ref({
    name: '',
    categoryId: 0,
    subTitle: '',
    detail: '',
    price: 0.0,
})
let category = ref({})
const fileList = ref<UploadUserFile[]>([
]) 
const loading = ref(false)
onMounted(() => {
    getshopcategory().then((res: any) => {
        category.value = res.data
        console.log(category.value)
    })
})
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const newproduct = () => {
 
    let send = form.value;
    console.log( JSON.stringify(send))

    let formData = new FormData();
    fileList.value.forEach(file => {
        formData.append("img", file.raw);  
    }); 
    formData.append("postInfo", new Blob([JSON.stringify(send)], {type: "application/json"}));
    
    loading.value=true
    newProduct(formData).then((res: any) => {
       console.log(res.data)
       if(res.status==0){ 
        loading.value=false
        ElMessageBox.alert(res.message, '提示', {
                    confirmButtonText: 'OK',
                        
        }).then(()=>{
            router.push({
                name: 'CenterShop',  
            })
        })
        }
    }) 

}
</script>

<template>
    <div>

        <el-card class="my-card" v-loading="loading">
            <template #header>
                <div class="card-header">
                    <span>添加商品</span>
                    <el-button type="primary" @click="newproduct">提交</el-button>
                </div>
            </template>

            <div>

                <el-input class="item" v-model="form.name" placeholder="Please input">
                    <template #prepend>商品名</template>
                </el-input>

                <el-select class="item" v-model="form.categoryId" placeholder="Select">

                    <el-option-group v-for="group in category" :key="group.id" :label="group.name">
                        <el-option v-for="item in group.children" :key="item.id" :label="item.name" :value="item.id" />
                    </el-option-group>
                </el-select>

                <el-input class="item" v-model="form.price" placeholder="Please input">
                    <template #prepend>价格</template>
                </el-input>

                <el-input class="item" v-model="form.subTitle" placeholder="Please input">
                    <template #prepend>副标题</template>
                </el-input>


                <div class="item">
                    <el-input v-model="form.detail" :rows="2" type="textarea" placeholder="Please input" />
                </div>

            </div>

            
            <div class="item">
                详情图(限制5张):
                <el-upload v-model:file-list="fileList" action="#" list-type="picture-card" :auto-upload="false" :limit="5"
                    :on-remove="handleRemove"> 
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
.my-card {
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item {
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>