<template>
<aside :class="{'is-expanded' : isExpanded }" class="min-h-screen flex rounded-md text-slate-500 shadow-lg w-[calc(2rem_-_32px)]] overflow-hidden transition duration-200 ease-out  p-4 flex-col gap-2">
  
  <div class="logo mr-0 mb-4">
    
    <img class="w-12" src="../assets/logo.png" alt="Logo">
  </div>

<a href="#/objetivos">
  <span class="material-icons p-3" style="font-size: 2rem"> mode_standby </span>
</a>
  <a href="#/recursos">
    <span class="material-icons p-3" style="font-size: 2rem"> savings </span>
  </a>


    <span class="material-icons p-3" style="font-size: 2rem"> notifications </span>

</aside>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const isExpanded = ref(false);

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value 
}
 const currentPath = ref(window.location.hash)

//  window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })
</script> 

<style scoped>

aside.is-expanded {
  width: 300px;
}

aside.is-expanded.menu-toggle-wrap {
  top: -3rem;
}

</style>