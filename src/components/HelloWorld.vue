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
      <h3>
        物流配送综合信息管理系统
      </h3> 
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
.greetings h3 {
  text-align: center;
}

.green {
  text-decoration: none;
  color: rgb(8, 92, 64);
  transition: 0.4s;
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
