<template>
  <button class="p-2 rounded-lg h-fit font-poppins bg-slate-200 shadow-md font-medium">
    {{label}}
  </button>
</template>

<script setup lang="ts">

defineProps({
  label: { type: String }
});



</script>

<style>
button:disabled {
  @apply opacity-50 cursor-not-allowed
}
</style>