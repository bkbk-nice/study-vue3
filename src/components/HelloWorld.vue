<script setup lang="ts">
defineProps<{
  msg: string
}>()
import { ref } from 'vue'
const show = ref(false)
import { onMounted } from 'vue'

onMounted(() => {
  show.value = !show.value
})

</script>

<template>
  <div class="greetings">



    <Transition name="bounce">
      <div v-if="show" >
      <h1 class="green">{{ msg }}</h1>
      <h2>
        物流配送综合信息管理系统
      </h2> 
    </div>
    </Transition>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h2 {
  text-align: center;
}

.green {
  text-decoration: none;
  color: rgb(8, 92, 64);
  transition: 0.4s;
}
.myh2{
  background: url(../assets/img/23.png) repeat-x;
  -webkit-background-clip: text;
  color: rgba(255, 255, 255, 0.1);
  text-align: center;
  /* animation: animate 24s linear infinite; */
  font-size: 30px;
}
@keyframes animate {
  0%{
    background-position: left 400px top 80px;
  }
  40%{
    background-position: left 800px top -50px;
  }
  80%{
    background-position: left 1800px top -50px;
  }
  100%{
    background-position: left 2400px top 80px;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}



.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
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


/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */</style>
