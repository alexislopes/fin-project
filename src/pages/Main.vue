<template>
<div class="flex gap-2 place-content-center">

  <a href="#/home">home</a>
  <a href="#/recursos">recursos</a>
  <a href="#/objetivos">objetivos</a>
</div>


<component :is="currentView" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from "./Home.vue"
import Recursos from "./Recursos.vue"
import Objetivos from "./Objetivos.vue"
import NotFound from "./NotFound.vue"

const routes = {
  "": Home,
  "/home": Home,
  "/recursos": Recursos,
  "/objetivos": Objetivos}
 

 const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  // @ts-ignore
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

</script>