<template >
  <div class="flex gap-y-10 flex-col">

    <div class="flex gap-3">
      <a class="mx-0 my-auto cursor-pointer" :href="'#/recursos'">
        <span class="material-icons h-fit ">
          arrow_back
        </span>
      </a>
      <div class="flex flex-col relative">
        <div @click="isOpened = true"
          class="cursor-pointer flex text-xl font-medium bg-[#d9d9d9] min-w-fit gap-2 rounded-full px-3 py-2 justify-between">
          <p>{{ recurso }}</p>
          <span class="material-icons mx-0 my-auto ">
            expand_more
          </span>
        </div>
        <div v-show="isOpened" class="absolute w-full rounded-lg p-2 z-10 shadow-lg top-12 bg-white">
          <p class="text-xl font-medium py-1 cursor-pointer hover:text-[#989898]"
            v-for="recurso in ['Alexis', 'Silvana']" @click="change(recurso)">{{ recurso
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex gap-7">

      <Card class="card">
        <div class="flex justify-between relative">
          <p>Total Receitas</p>
          <span class="material-icons bg-positive p-2 rounded-full text-positive bg-opacity-25 absolute right-0">
            call_received
          </span>
        </div>
        <p class="card__amount">{{ currency(recursoAvancado.totalReceitas) }}</p>
        <p class="text-positive font-medium">{{ percentage(recursoAvancado.variacao) }}</p>
      </Card>
      <Card class="min-w-[300px]">
        <div class="flex justify-between relative">
          <p>Total Despesas</p>
          <span
            class="material-icons bg-negative p-2 rounded-full text-negative bg-opacity-25 rotate-180 absolute right-0">
            call_received
          </span>
        </div>
        <p class="card__amount">{{ currency(recursoAvancado.totalDespesas) }}</p>
        <p class="text-negative font-medium">{{ percentage(recursoAvancado.variacaoDespesas) }}</p>
      </Card>
      <Card class="min-w-[300px]">
        <div class="flex justify-between relative">
          <p>Total Passivo</p>
          <span class="material-icons bg-accent p-2 rounded-full text-accent bg-opacity-25 rotate-90 absolute right-0">
            straight
          </span>
        </div>
        <p class="card__amount">{{ currency(recursoAvancado.passivoAcumulado) }}</p>
        <p class="text-accent font-medium">Média de {{ currency(recursoAvancado.passivoAcumulado /
            recursoAvancado.mesesReferencia)
        }} por mês</p>

      </Card>
      <Card class="min-w-[300px]">
        <div class="flex justify-between relative">
          <p>Maior Receita</p>
          <span class="material-icons bg-positive p-2 rounded-full text-positive bg-opacity-25 absolute right-0">
            straight
          </span>
        </div>
        <p class="card__amount">{{ currency(recursoAvancado.maiorRenda) }}</p>
        <p class="bg-[#d9d9d9] text-xs w-fit py-1 px-3 rounded-full font-medium text-[#828282]">{{ formatedDate }}</p>
      </Card>
    </div>
  </div>
</template>

<script setup>

import Card from '../components/Card.vue'
import { currency, percentage, capitalize } from "../utils/formatters"
import { ref, watch, computed } from "vue"
import { getRecursoAvancado } from '../services'

const isOpened = ref(false)

const change = (r) => {
  recurso.value = r
  isOpened.value = !isOpened.value
}

const recursoAvancado = ref({})
const recurso = ref(window.location.hash.split("/").pop())

watch(recurso, () => {

  getRecursoAvancado(recurso.value).then(response => {
    recursoAvancado.value = response.data
    console.log(response)
  })
}, { immediate: true })


const formatedDate = computed(() => {
  const date = new Date(recursoAvancado.value.timestampMaior)
  return `${date.toLocaleString('default', { month: 'short' }).toUpperCase()} ${date.getFullYear()}`;
})


</script>

<style scoped>
.card {
  @apply min-w-[300px]
}

.card__amount {
  @apply text-2xl font-medium
}
</style>