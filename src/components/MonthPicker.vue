<template>
<div class="flex gap-2 justify-center p-6">
  <p class="font-poppins cursor-pointer py-2 px-1" @click="$emit('change', timestamp-2629746000)">&lt</p>
  <p class="font-poppins border-solid border-x border-y h-fit border-black py-1 px-4 rounded-full">{{capitalize(new Date(timestamp).toLocaleString("pt-BR", { month: "long" }))}}</p>
  <p class="font-poppins cursor-pointer py-2 px-1" @click="$emit('change', timestamp+2629746000)">&gt</p>
</div>
</template>

<script setup lang="ts">
import {toRefs} from "vue";
import { capitalize } from "../utils/formatters";
const props = defineProps({
  timestamp: {
    type: Number,
    required: true,
    default: () => new Date().getTime()
  }
});

const { timestamp } = toRefs(props); 

</script>