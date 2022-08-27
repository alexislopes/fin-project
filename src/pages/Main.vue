<template>
  <div class="flex">
    <Nav />
    <div class="main p-16 bg-main w-full">
      <component :is="currentView" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Home from "./Home.vue"
import Recursos from "./Recursos.vue"
import Dashboard from "./Dashboard.vue"
import RecursoAvancado from "./RecursoAvancado.vue"
import Objetivos from "./Objetivos.vue"
import Planejamentos from "./Planejamentos.vue"
import NotFound from "./NotFound.vue"
import Mercado from "./Mercado.vue"
import Nav from "../components/Nav.vue"

const routes = {
  "": Home,
  "/home": Home,
  "/recursos": Recursos,
  "/dashboard": Dashboard,
  "/objetivos": Objetivos,
  "/planejamentos": Planejamentos,
  "/recursos/Alexis": RecursoAvancado,
  "/recursos/Silvana": RecursoAvancado,
  "/mercado": Mercado
}


const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  console.log(window.location.hash.slice(1))
  currentPath.value = window.location.hash
});

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || Dashboard
});

</script>

<style>
@media print {
  .main {
    padding: 0;
  }
}
</style>