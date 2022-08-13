<template>
  <div>

    <MonthPicker @change="now = $event" :timestamp="now" />

    <p class="text-2xl font-medium">Recusos</p>
    <div v-if="!isDesiredMonth" class="bg-[#E0E0E0] p-3 w-fit text-xs rounded-md my-4">{{ `Mostrando dados do mes de
    ${capitalize(new Date(recursos[0] ? recursos[0].timestamp : 0).toLocaleString("pt-BR", { month: "long" }))}
    (retroativo)`}}</div>
    <div class="flex content-center gap-x-10">
      <Card class="min-w-[200px]" v-for="recurso in recursos" :key="now + recurso.name">
        <div class="flex content-center relative flex-col">

          <p class="text-center">{{ recurso.name }}</p>
          <a :href="`#/recursos/${recurso.name}`" class="absolute right-0 left-auto">
            <span class="hover:text-accent cursor-pointer material-icons text-medium text-[#4f4f4f] "> chevron_right
            </span>
          </a>
          <p class="text-xs text-center text-gray-300 font-poppins">{{ currency(recurso.value) }}</p>
          <span v-if="recurso.previous"
            :class="{ 'bg-positive': (recurso.value - recurso.previous.value) * 100 / recurso.value > 0, 'bg-negative': (recurso.value - recurso.previous.value) * 100 / recurso.value < 0 }"
            class=" text-white text-center w-fit mx-auto mt-2 py-1/2 px-2 rounded-full text-xs">
            {{ percentage(((recurso.value - recurso.previous.value) * 100 / recurso.value)) }}
            <span class="material-icons p-1/2" style="font-size: 0.8rem"> {{ (recurso.value - recurso.previous.value) *
                100 / recurso.value > 0 ? 'trending_up' : 'trending_down'
            }} </span>
          </span>

          <hr v-if="recurso.previous" class="hr3">

          <div v-if="recurso.previous">
            <span class="material-icons text-center w-full text-[#4f4f4f]"> undo </span>
            <p class="text-center">Em {{ capitalize(new Date(recurso.previous.timestamp).toLocaleString("pt-BR", {
                month:
                  "long"
              }))
            }}</p>
            <p class="text-xs text-center text-gray-300">{{ currency(recurso.previous.value) }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import MonthPicker from '../components/MonthPicker.vue'
import Card from '../components/Card.vue'
import { currency, percentage, capitalize } from "../utils/formatters"
import { ref, watch } from "vue"
import { getRecursosByMonth } from '../services'

const now = ref(new Date().getTime())
const isDesiredMonth = ref(false)
const recursos = ref([])


watch(now, async (v) => {
  const response = await getRecursosByMonth(v)
  isDesiredMonth.value = response.data.isDesired;
  recursos.value = response.data.recursos
}, { immediate: true });
</script>

   <style scoped>
   .hr3 {
     margin: 0.8rem 0;
     border: 0;
     height: 1px;
     background-image: linear-gradient(to right, transparent, #CCC, transparent);
   }
   </style>