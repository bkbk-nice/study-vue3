<template>
   
  <div >  

    <el-carousel height="500px"   :interval="4000" type="card"  >
        <el-carousel-item v-for="item in 4" :key="item">
          <img alt="logo"  :src="`/src/assets/img/${item}.webp`"  /> 
        </el-carousel-item>
  </el-carousel>


  </div>
</template>

<style   scoped>
 
</style>
