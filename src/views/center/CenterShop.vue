<script setup lang="ts">

import { onMounted, ref, reactive } from 'vue'
import { getshophomeforcenter, getshopcategory } from '../../api/api'
import { Search } from '@element-plus/icons-vue'
import router from '@/router';

interface product {
  id: number,
  name: string,
  mainImage: string,
  subTitle: string,
  price: number,
}
const product1 = ref<product>({
  id: 1,
  name: "",
  mainImage: "",
  subTitle: "",
  price: 0.0,
})
let productlist = reactive([
  {
    id: 1,
    name: "",
    mainImage: "",
    subTitle: "",
    price: 0.0,
  },
]);
let ob1 = ref(productlist)


const itemnum = ref(0)

const getInfo = reactive({
  keyword: '',
  categoryId: 0,
})
let category = ref({})


const load = () => {

  getshophomeforcenter(getInfo).then((res: any) => {

    productlist = res.data

    ob1.value = productlist
    itemnum.value = productlist.length
    ob1.value.push(productlist[0])
    ob1.value.push(productlist[0])
    ob1.value.push(productlist[0])

  })
}
onMounted(() => {
  load()
  getshopcategory().then((res: any) => {
    category.value = res.data
  })
})

const home = () => {
  getInfo.keyword = ''
  getInfo.categoryId = 0
  load()
}


const enter = () => {
  load()
}

const choose = (id: number) => {
  getInfo.keyword = ''
  getInfo.categoryId = id
  load()
}


const todetail = (row: number, col: number) => {
  console.log(ob1.value[row * 4 + col].id)
  router.push({
    name: 'CenterProduct',
    params: {
      id: ob1.value[row * 4 + col].id
    }
  })
}


</script>

<template>
  <div class="sub-header">
    <img alt="logo" @click="home" style="margin-left: 100px;margin-top:50px;" src="/myweb.ico" width="105" height="105" />

    <div class="category">
      <div class="maincategory" v-for="(item) in category " :key="item">
        {{ item.name }}
        <el-link @click="choose(subitem.id)" class="subcategory" v-for="(subitem, index) in item.children" :key="index">
          {{ subitem.name }}
        </el-link>
      </div>
    </div>

    <div class="search">
      <el-input v-model="getInfo.keyword" placeholder="搜索" class="input-with-select" @change="enter" size="large">
        <template #append>
          <el-button @click="enter">搜索</el-button>
        </template>
      </el-input>
    </div>
  </div>


  <div v-if="itemnum > 0">


    <el-row v-for="(o, row) in  Math.ceil(itemnum / 4)" :key="o" :gutter=0>
      <el-col v-for="(d, col) in 4" :key="d" :span="4" :offset="col > 0 ? 1 : 3">
        <el-card class="card" @click="todetail(row, col)" v-show="row * 4 + col <= itemnum - 1"
          :body-style="{ padding: '0px' }">
          <img :src="ob1[row * 4 + col].mainImage" class="image" />
          <div style="padding: 20px">
            <span>(id:{{ ob1[row * 4 + col].id }})</span>

            <span>{{ ob1[row * 4 + col].name }}</span>
            <div class="bottom">
              <div class="subtitle">{{ ob1[row * 4 + col].subTitle }}</div>
              <div class="price">￥{{ ob1[row * 4 + col].price }}</div>
              <el-button type="warning" :icon="Search" circle></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

  <div v-else>
    <el-empty description="没有找到此商品" />
  </div>
</template>

<style scoped>
.subtitle {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 200px; */
}

/* .bottom{
  border: 1px solid red;
  width: 60px;
} */


.el-row {
  margin-bottom: 40px;
}

.el-row:last-child {
  margin-bottom: 100px;
}

.el-col {
  border-radius: 4px;
}

.price {
  color: orangered;
}

.sub-header {
  display: flex;

  margin-bottom: 50px;
  margin-left: 0, auto;

  border: 1px solid var(--el-border-color);
  border-radius: 20px;
  background-image: linear-gradient(to right, rgb(65, 56, 56), rgb(99, 95, 95), rgb(47, 51, 54));

}

.search {
  margin: auto;
  width: 20%;
  /*  */
}

.card {
  height: 350px;
}

.image {
  /* position:absolute; 
  top:0; 
  bottom:0; 
  left:0; 
  right:0;  */
  width: 100%;
  height: 250px;
}

.category {
  margin: auto;
  width: 20%;
  margin-top: 20px;
  margin-bottom: 20px;
  /* margin-bottom: 100px; */
  background-color: #f2e2e0;

}

.maincategory {
  display: inline-flexbox;
  font-size: 18px;
  height: 30px;
}

.subcategory {

  font-size: 15px;
  margin-top: 3px;
  margin-left: 20px;
}
</style>