<script setup lang="ts">
import { getDetail ,inventory,addProductNum} from '../../api/api'

import { onMounted, ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()


const props = defineProps(["id"])

const form = reactive({
    id: '',
    num: 0,
})

let subimages = reactive(
    [{
        src: ''
    }]
)
let data = ref({})

const inventorynum = ref(0)


onMounted(() => {


    form.id = props.id

    getDetail(props).then((res: any) => {
        console.log(res)
        data.value = res.data
        subimages = res.data.subImages.split(',')
    })
    let  send = {
        productId:props.id
    }
    inventory(send).then((res: any) => {
        console.log(res)
        inventorynum.value = res.data.quantity
    }) 

})

const addproductnum = () => {
    // console.log(form.id, form.num) 
    ElMessageBox.confirm(
    '确认补货吗',
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {  
        let  send = {
            productId:props.id,
            num:form.num
        }
        addProductNum(send).then((res: any) => {
            console.log(res)
            if(res.status == 0) {
            ElMessage.success('补货完成') 
            }else{
            ElMessage.error(res.message)  
            }  
            let  send = {
            productId:props.id
            }
            inventory(send).then((res: any) => {
                console.log(res)
                inventorynum.value = res.data.quantity
            }) 
        })  
    })
    
}





</script>


 
<template>
    <el-breadcrumb class="mynav" separator="/">
        <el-breadcrumb-item :to="{ path: '/center/CenterShop' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>商品</el-breadcrumb-item>
    </el-breadcrumb>


    <div class="one">
        <div class="two">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-weight:bold ;font-size: 30px;">{{ data.name }}</span>
                    </div>
                </template>
                <img :src="data.mainImage" style="width: 400px;height: 300px;" class="image" />

                <div class="info">
                    <div class="subtitle">{{ data.subTitle }}</div>
                    <div class="price">￥{{ data.price }}</div>
                </div>
                
                <h1>库存:{{ inventorynum }}</h1>

                <div class="info">
                    <el-input-number v-model="form.num" :min="1" />
                    <el-button type="warning" @click="addproductnum">补货</el-button>
                </div>


                <el-divider />

                <div>
                    详细描述:
                    <div>
                        {{ data.detail }}
                    </div>
                </div>

                <el-divider />

                <div>
                    详情图:
                    <div v-for="(a) in subimages" :key="a">
                        <img :src="a" />

                    </div>
                </div>

            </el-card>
        </div>





    </div>
</template>




<style scoped>
.one {
    display: flex;
    margin-bottom: 300px;
}

.two {
    margin: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    margin-top: 100px;
    width: 680px;

}

.price {
    color: orangered;
}

.info {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 200px; */
}

.mynav {
    margin-top: 50px;
    margin-left: 150px;
    font-size: 20px;
}
</style>
