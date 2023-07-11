<script setup lang="ts">
import { getDetail, preCreateOrder, createOrder } from '../../api/api'

import { onMounted, ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ElLoading } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
let data = ref({})

const props = defineProps(["id"])

const orderForm = ref({

  productId: 0,
  // name:'',
  phone: '',
  address: '',
  num: 0,
  // price:0,
  remark: '',
  time: '',
  type: 0,

})

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  clientName: '',
  num: 0,
  phone: '',
  price: 0,
  productName: '',
  type: 0,
  remark: '',
  address: '',
})

let subimages = reactive(
  [{
    src: ''
  }]
)


const types = [
  {
    value: 0,
    label: '普通订单',
  },
  {
    value: 1,
    label: '其他',
  }, 
]



onMounted(() => {

  
  window.scrollTo(0, 0);

  getDetail(props).then((res: any) => {
    console.log(res)
    data.value = res.data
    subimages = res.data.subImages.split(',')
  })

})



const makeorder = () => {

  orderForm.value.productId = props.id
  // order.value.name = data.value.name


  if (orderForm.value.phone.length == 0) {
    ElMessageBox.alert("请输入手机号", '提示', {
      confirmButtonText: 'OK',
    })
    return
  }
  if (orderForm.value.address.length == 0) {
    ElMessageBox.alert("请输入地址", '提示', {
      confirmButtonText: 'OK',
    })
    return
  }


  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  preCreateOrder(orderForm.value).then((res: any) => {
    //    console.log(res)    
    form.address = res.data.address
    form.clientName = res.data.clientName
    form.productName = res.data.productName
    form.price = res.data.price
    form.num = res.data.num
    form.phone = res.data.phone
    form.type = res.data.type
    form.remark = res.data.remark
    dialogFormVisible.value = true
  })
  loading.close()




}


const sureOrder = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  createOrder(orderForm.value).then((res: any) => {
    //console.log(res) 
    loading.close()
    dialogFormVisible.value = false

    if (res.status == 0) {
      router.push({
        name: 'successOrder',
        params: {
          id: orderForm.value.productId,
        }

      })
    } else {
      ElMessageBox.alert("创建订单失败", '提示', {
        confirmButtonText: 'OK',
      })
    }
  }).catch(() => {
    ElMessageBox.alert("服务器异常", '提示', { confirmButtonText: 'OK', })
  });
}


</script>


 
<template>
  <el-breadcrumb class="mynav" separator="/">
    <el-breadcrumb-item :to="{ path: '/client/shop' }">商城</el-breadcrumb-item>
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

        <div class="info">
          <div>
            <el-input v-model="orderForm.phone" placeholder="手机号">
              <template #prepend>手机</template>
            </el-input>
          </div>
          
        </div>

        <div class="info">
          <div>
            <el-input autosize v-model="orderForm.address" placeholder="地址">
              <template #prepend>地址</template>
            </el-input>
          </div>
          
        </div>

        <div class="info">
          <el-input autosize v-model="orderForm.remark" placeholder="备注">
            <template #prepend>备注</template>
          </el-input>
        </div>
    
    <el-select class="info"  v-model="orderForm.type"  placeholder="选择类型"  >
      <div>
        <el-option v-for="item in types"  :key="item.value" :label="item.label" :value="item.value" /> 
      </div>
    </el-select>


    <div class="info">
      <el-date-picker
        v-model="orderForm.time"
        type="date"
        placeholder="Pick a day" 
      />
      <div class="price">￥{{ data.price * orderForm.num }}</div>
    </div>
   

    <div class="info">
      <el-input-number v-model="orderForm.num" :min="1" :max="10" />
      <el-button type="warning" @click="makeorder">订购</el-button>
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



  <el-dialog v-model="dialogFormVisible" title="订单信息">
    <el-form :model="form">
      <el-form-item label="客户名" :label-width="formLabelWidth">
        <el-input v-model="form.clientName" disabled />
      </el-form-item>

      <el-form-item label="商品名" :label-width="formLabelWidth">
        <el-input v-model="form.productName" disabled />
      </el-form-item>

      <el-form-item label="单价" :label-width="formLabelWidth">
        <el-input v-model="form.price" disabled />
      </el-form-item>

      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input v-model="form.num" disabled />
      </el-form-item>

      <el-form-item label="手机号" :label-width="formLabelWidth">
        <el-input v-model="form.phone" disabled />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" disabled />
      </el-form-item>
      <el-form-item label="订单类型" :label-width="formLabelWidth">
        <el-input v-model="form.type" disabled />
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" disabled />
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消订单</el-button>
        <el-button type="primary" @click="sureOrder">
          确认订单
        </el-button>
      </span>
    </template>
  </el-dialog>



</div></template>




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
