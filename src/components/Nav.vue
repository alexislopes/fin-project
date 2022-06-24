<template>
<div class="flex gap-2 place-content-center">

  <a :class="`${currentPath === '#/home' ? 'underline underline-offset-8' : ''}`" href="#/home">Home</a>
  <a :class="`${currentPath === '#/recursos' ? 'underline underline-offset-8' : ''}`" href="#/recursos">Recursos</a>
  <a :class="`${currentPath === '#/objetivos' ? 'underline underline-offset-8' : ''}`" href="#/objetivos">Objetivos</a>
  <a :class="`${currentPath === '#/planejamentos' ? 'underline underline-offset-8' : ''}`" href="#/planejamentos">Planejamentos</a>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

 const currentPath = ref(window.location.hash)
</script> 