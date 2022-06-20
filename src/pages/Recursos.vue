<template>
<div v-for="recurso in store.recursos">
  <p>{{recurso}}</p>
</div>

<label for="nome">
  Nome
  <input type="text" id="descricao" v-model="recurso.nome">
</label>

<button :disabled="recurso.nome == '' " @click="saveRecurso">salvar recurso</button>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue"
import { useStore } from "../store/main"

  const store = useStore();



const recurso = reactive({nome: ""})

function saveRecurso() {
  store.$patch(state => {
    //@ts-ignore
    state.recursos.push({nome: recurso.nome})
  })

  recurso.nome = '';
}


</script>