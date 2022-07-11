<template>
<div>

  <MonthPicker @change="now = $event" :timestamp="now" />
  <Button @click="showModal = true" class="text-medium" label="+ Criar Recurso" />

<div class="flex gap-x-2">
  <div class="max-w-sm shadow-md p-4 rounded-lg gap-2" v-for="recurso in store.getAllRecursoWithMontanteByMonth(now)" :key="now+recurso.id">
    <div>
      
      <p>{{recurso.nome}}</p>
    <p class="text-xs text-gray-300 font-poppins">{{currency(recurso.montante)}}</p>
    </div>
    <p @click="recursoId = recurso.id" class="text-medium text-center text-black cursor-pointer">+</p>
  </div>
</div>


  <Modal v-show="showModal">
    <RecursoForm @close="showModal = false" />
  </Modal>

  <Modal v-show="recursoId != 'undefined'">
    <RecursoMesForm @close="recursoId = 'undefined'" :recursoId="recursoId" />
  </Modal>
      </div>
</template>

<script setup lang="ts">
import RecursoForm from "../components/RecursoForm.vue"
import RecursoMesForm from "../components/RecursoMesForm.vue"
import Button from "../components/Button.vue"
import Modal from "../components/Modal.vue"
import MonthPicker from '../components/MonthPicker.vue'
import { currency } from "../utils/formatters"
import {ref, watch } from "vue"
import { useStore } from "../store/main"

  const store = useStore();

  const recursoId = ref("undefined")
  const showModal = ref(false)

   const now = ref(new Date().getTime())
   
   console.log(store.recursos)
</script>