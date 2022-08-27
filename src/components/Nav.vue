<template>
  <aside
    class="nav min-h-screen flex rounded-md text-slate-500 shadow-lg w-[calc(6rem_-_32px)]] overflow-hidden transition duration-200 ease-out  p-4 flex-col gap-2">



    <a href="#/dashboard"> <span :class="{ active: currentPath === '#/dashboard' }" class="material-icons p-2"
        style="font-size: 1.5rem"> space_dashboard </span> </a>
    <a href="#/objetivos"> <span :class="{ active: currentPath === '#/objetivos' }" class="material-icons p-2"
        style="font-size: 1.5rem"> mode_standby </span> </a>
    <a href="#/recursos"> <span :class="{ active: currentPath === '#/recursos' }" class="material-icons p-2"
        style="font-size: 1.5rem"> wallet </span> </a>
    <a href="#/mercado"> <span :class="{ active: currentPath === '#/mercado' }" class="material-icons p-2"
        style="font-size: 1.5rem"> storefront </span> </a>

  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value
}
const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

</script> 

<style scoped>
.active {
  @apply text-accent
}

aside.is-expanded {
  width: 300px;
}

aside.is-expanded.menu-toggle-wrap {
  top: -3rem;
}

@media print {
  aside {
    display: none;
  }
}
</style>