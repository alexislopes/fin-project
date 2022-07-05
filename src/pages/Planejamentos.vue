<template>
<Button @click="showModal = true" class="text-medium" label="+ Criar Planejamento" />
  
  
  <div class="max-w-sm shadow-md p-4 rounded-lg"  v-for="planejamento in store.planejamentos">


    <p class="font-medium text-xl font-poppins">{{new Date(planejamento.data).toLocaleDateString('default',{month: "long"})}}, {{new Date(planejamento.data).getFullYear()}}</p>
    <p class="font-sm text-sm font-poppins">Realizado dia {{`${new Date(planejamento.data).getDate()}/${new Date(planejamento.data).getMonth() + 1}`}}</p>
    <div v-for="p in planejamento.planejamento">
      <div class="flex my-2 justify-between">
        
        <p class="font-medium text-lg font-poppins">{{p.recurso}}</p>
      <p class="font-poppins h-fit align-center renda px-3 py-1/2 rounded-full">{{currency(Intl.NumberFormat('pt-BR').format(p.renda))}}</p>
      </div>
      <div class="flex justify-between" v-for="objetivo in p.objetivos">

        <p class="font-poppins">{{objetivo.objetivo}}</p>
        <p class="font-poppins"> {{objetivo.valor ? currency(Intl.NumberFormat('pt-BR').format(objetivo.valor)) : percentage(objetivo.porcentagem)}} </p>
      </div>
    </div>
    

  </div>

<Modal v-show="showModal">
    <PlanejamentoForm @close="showModal = false" />
  </Modal>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import Button from "../components/Button.vue"
import Modal from '../components/Modal.vue'
import PlanejamentoForm from '../components/PlanejamentoForm.vue'


import { useStore } from "../store/main"

import {currency, percentage } from "../utils/formatters"

const store = useStore();

const showModal = ref(false);

</script>

<style scoped>
.renda {
  background-color: rgb(74 222 128)
}
</style>