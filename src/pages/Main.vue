<template>
<div class="flex">
    <Nav />
  <div class="p-16 w-full">
    <component :is="currentView" />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from "./Home.vue"
import Recursos from "./Recursos.vue"
import Objetivos from "./Objetivos.vue"
import Planejamentos from "./Planejamentos.vue"
import NotFound from "./NotFound.vue"
import Nav from "../components/Nav.vue"

const routes = {
  "": Home,
  "/home": Home,
  "/recursos": Recursos,
  "/objetivos": Objetivos,
  "/planejamentos": Planejamentos}
 

 const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  // @ts-ignore
  return routes[currentPath.value.slice(1) || '/'] || Objetivos
})

</script>