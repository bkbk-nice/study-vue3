<script setup lang="ts">

import { onMounted, ref ,reactive,toRaw, onBeforeMount, toRefs} from 'vue'
import {  computed } from 'vue'
import {getshophome,getshopcategory} from '../../api/api' 

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

 interface product{
    id:number,
    name: string,
    mainImage:string,
    subTitle:string,
    price:number,
}
const   product1 = ref<product> ({
    id:1,
    name: "",
    mainImage:"",
    subTitle:"",
    price:0.0, 
}) 
 let productlist = reactive([
  {
    id:1,
    name: "",
    mainImage:"",
    subTitle:"",
    price:0.0, 
  },
  
]);  
let ob1 = ref(productlist)
// const category = reactive([{
//   id:0,
//   name:'',
//   children:[
//     {
//       id:1,name:''
//     }
//   ]
// }])

const itemnum =   ref(0)

const getInfo = reactive({
  keyword:'',
  categoryId:0,
})
let category = ref({})  
 const load= () => {

  
  console.log(getInfo);  
  getshophome(getInfo).then((res: any) => { 
          console.log(res);  
        //  console.log(productlist)
        productlist =  res.data
        console.log(productlist);  
        //JSON.parse( JSON.stringify(res.data))
        //console.log(productlist.value[0].name) 
        ob1.value = productlist  
        itemnum.value=productlist.length
        ob1.value .push(productlist[0])
        ob1.value .push(productlist[0])
        ob1.value .push(productlist[0])  
        console.log(ob1.value)
      })

 }
onMounted(() => { 
     
      load()
      getshopcategory().then((res: any) => { 
       // console.log(res) 
       
        category.value = res.data
         // console.log(category)
        // console.log(category[0].id)
        // console.log(category[0].children[1].name)
      })
 })
 
 

const enter = () =>{ 
  console.log(getInfo.keyword)  
  load()
}

const choose = (id:number ) =>{ 
  console.log( id) 
  getInfo.keyword = ''
  getInfo.categoryId=id
  load()
}


const todetail = (row:number,col:number) =>{ 
  console.log(ob1.value [row*4+col].id) 
}


</script>

<template>
    <div class="sub-header">
      <div class="category">
        
        <div class="maincategory" v-for="(item) in category " :key="item">
            {{ item.name}} 
            <el-link  @click="choose(subitem.id)" class="subcategory" v-for="(subitem,index) in item.children" :key="index">
                {{ subitem.name }}
            </el-link> 
        </div>
      </div>
        

        <div  class="search">
          <el-input
            v-model="getInfo.keyword"
            placeholder="搜索"
            class="input-with-select"
            @change="enter"
            size="large"
          >
            <template #append>
              <el-button  @click="enter"   >搜索</el-button>
            </template> 
          </el-input>
         </div>
    </div>

    <el-row 
         v-for="(o, row) in  Math.ceil(itemnum/4)"
        :key="o"   
        :gutter=0
     > 
        <el-col
        v-for="(d, col) in 4"
        :key="d"
        :span="4"
        :offset="col > 0 ? 1 : 3"
        > 
        <el-card   @click="todetail(  row,col )"  v-show="row*4+col<=itemnum-1"    :body-style="{ padding: '0px' }">  
          <img    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"  class="image" />
                <div style="padding: 20px"> 
                      <span >{{  ob1[row*4+col].name }}</span> 
                      <div class="bottom"> 
                          <div class="subtitle" >{{  ob1 [row*4+col].subTitle }}</div> 
                          <div class="price" >￥{{  ob1 [row*4+col].price }}</div> 
                          <el-button type="warning" :icon="Search"    circle ></el-button>
                     </div>
                </div> 
            </el-card> 
        </el-col>
  </el-row>

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
.price{
  color: orangered;
}
.sub-header{
  display: flex;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 10%;
  margin-right: 20%;
}
.search{
  margin: auto;
  width: 20%;
  /*  */
}

.category{
  margin: auto;
  width: 20%;
  /* margin-bottom: 100px; */
  background-color: #f2e2e0;
 
}

.maincategory{
  display: inline-flexbox;
  font-size: 18px;
  height: 30px;
}
.subcategory{ 
  
  font-size: 15px;
  margin-top: 3px;
  margin-left: 20px;
}
</style>