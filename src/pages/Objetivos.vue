<template>
<Button @click="showModal = true" class="text-medium" label="+ Criar Objetivo" />
<div class="flex gap-x-2">
  <div class="max-w-sm shadow-md p-4 rounded-lg" v-for="objetivo in store.objetivos">
    <p>{{objetivo.descricao}}</p>
  </div>
</div>


  <Modal v-show="showModal">
    <ObjetivoForm @close="showModal = false" />
  </Modal>
</template>

<script setup lang="ts">

import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'
import ObjetivoForm from '../components/ObjetivoForm.vue'

import { ref} from "vue"

import { useStore } from "../store/main"

  const store = useStore();
  const showModal = ref(false)







</script> 