<template>

  <Button @click="showModal = true" class="text-medium" label="+ Criar Recurso" />

<div class="flex gap-x-2">
  <div class="max-w-sm shadow-md p-4 rounded-lg" v-for="recurso in store.recursos">
    <p>{{recurso.nome}}</p>
  </div>
</div>


  <Modal v-show="showModal">
    <RecursoForm @close="showModal = false" />
  </Modal>
</template>

<script setup lang="ts">
import RecursoForm from "../components/RecursoForm.vue"
import Button from "../components/Button.vue"
import Modal from "../components/Modal.vue"
import {ref} from "vue"
import { useStore } from "../store/main"

  const store = useStore();


  const showModal = ref(false)





</script>