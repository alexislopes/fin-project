<template>
<div>

  <MonthPicker @change="now = $event" :timestamp="now" />
<Button @click="showModal = true" class="text-medium" label="+ Criar Objetivo" />
<div class="flex gap-x-2">
  <div class="max-w-sm shadow-md p-4 flex flex-col gap-2 rounded-lg" v-for="objetivo in store.objetivos">
    <div>
      <p class="font-poppins">{{objetivo.descricao}}</p>
      <div class="flex flex-col gap-2" v-for="objetivoMes in store.getThisMonthObjetivoMes().filter(f => f.objetivoId === objetivo.id)">
        <div class="flex justify-between lg:flex-row sm:flex-col gap-5">
          <p class="font-poppins">{{objetivoMes.recurso.nome}}</p>
          <p class="font-poppins  text-xs">{{currency((objetivoMes.recursoMes.montante * 0.2).toFixed(2))}}</p>
        </div>
        <p v-if="objetivoMes.isFixa" class="font-poppins">{{currency(objetivoMes.valor)}}</p>
        <p v-else class="font-poppins">{{currency(((objetivoMes.recursoMes.montante * 0.2 - store.getThisMonthObjetivoMes().filter(f => f.isFixa && f.recursoId === objetivoMes.recursoId).map(m => m.valor).reduce((a, b) => a + b, 0)) * (objetivoMes.valor / 100)).toFixed(2))}}</p>
      </div>
      <p class="text-xs text-gray-300 font-poppins">{{currency(0)}}</p>
    </div>
    <p @click="objetivoId = objetivo.id" class="text-medium text-center text-black cursor-pointer">+</p>
  </div>
</div>


  <Modal v-show="showModal">
    <ObjetivoForm @close="showModal = false" />
  </Modal>

  <Modal v-show="objetivoId != 'undefined'">
    <ObjetivoMesForm @close="objetivoId = 'undefined'" :objetivoId="objetivoId" />
  </Modal>
          </div>
</template>

<script setup lang="ts">

import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'
import ObjetivoForm from '../components/ObjetivoForm.vue'
import ObjetivoMesForm from '../components/ObjetivoMesForm.vue'
import MonthPicker from '../components/MonthPicker.vue'

import _ from "lodash"

import { currency, capitalize } from "../utils/formatters"

import { ref} from "vue"

import { useStore } from "../store/main"

  const store = useStore();
  console.log(_.groupBy(store.getThisMonthObjetivoMes(), "objetivoId"))
  
  const showModal = ref(false)
  const objetivoId = ref("undefined")
  const now = ref(new Date().getTime())






</script> 