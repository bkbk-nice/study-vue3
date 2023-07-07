<script setup lang="ts">
import { RouterLink,RouterView } from 'vue-router'
import HelloWorld from '../.././components/HelloWorld.vue'
 
import { ref } from 'vue'
const show = ref(false)
import { onMounted } from 'vue'

onMounted(() => {
  show.value = !show.value 
})
</script>

<template   > 
  
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

 
    <el-tooltip
         
        effect="dark"
        content="寄了喵"
        placement="right-start"
      >
      <img alt="jilimiao logo" class="logo" src="@/assets/img/23.png" width="75" height="55" />
   
      </el-tooltip>  

     
    <div class="wrapper">
      <HelloWorld msg="Welcome!" />
      <Transition name="bounce">
      <div v-if="show" >
        <nav >
        <RouterLink to="/common/welcome"  >Home</RouterLink>
        <RouterLink to="/common/about"  >About</RouterLink>
        <RouterLink to="/common/login"  >Login</RouterLink>
        <RouterLink to="/common/signup"  >Sign up</RouterLink>
       </nav> 
     </div> 
    </Transition>
      
    </div> 
    
  </header>

    <div class="x"  >
      
      <RouterView />
    </div> 

</template>


<style scoped> 
 
.x{
  
  margin-left: 15rem;
  margin-right: 15rem;

  font-size: 20px;
  /* text-align: center; */
  margin-top: 2rem; 
}

@media (max-width:900px) {
  .x{ 
    margin-left: 1rem;
    margin-right:1rem;

    font-size: 20px;
    /* text-align: center; */
    margin-top: 2rem; 
  }
}



a,
.green {
  text-decoration: none;
  color: rgb(10, 49, 36);
  transition: 0.4s;
  background-color: hsla(303, 62%, 43%, 0.2);
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 58%, 36%, 0.2);
  }
} 
   
header {
  line-height: 1.5;
  max-height: 100vh;
  margin-bottom: 5rem;
}

.logo {
 
  display: block;
  margin:0 auto 2rem;
  padding-top: 50px;
  
}

nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: red;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid black;
} 
nav a:first-of-type {
  border: 0;
}
 
  

.bounce-enter-active {
  animation: bounce-in 0.75s;
}

 .bounce-leave-active {
  animation: bounce-in 0.75s  reverse ;
}  

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.25);
  }

  100% {
    transform: scale(1);
  }
}


 
   

  





</style> 



/* body {
  min-height: 100vh;
  color: rgba(235, 235, 235, 0.64);
  background: #181818;
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}     */



/* header {
  display: flex;
  place-items: center;
  padding-right: 80px;
}

.logo {
  margin: 0 2rem 0 0;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

nav {
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;

  padding: 1rem 0;
  margin-top: 1rem;
}   
*/