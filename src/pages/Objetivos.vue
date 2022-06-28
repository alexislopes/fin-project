<template>

<div class="flex gap-x-2">
  <div class="max-w-sm shadow-md p-4 rounded-lg" v-for="objetivo in store.objetivos">
    <p>{{objetivo.nome}}</p>
  </div>
</div>

<div v-show="false">

  
  <label for="fixa">
    <input id="fixa" type="checkbox" v-model="fixa">
  Objetivo com valor fixo?
</label>

<label for="descricao">
  Descricao
  <input type="text" id="descricao" v-model="objetivo.descricao">
</label>

<label for="nome">
  Nome
  <input type="text" id="nome" v-model="objetivo.nome">
</label>

<button :disabled="objetivo.nome == '' || objetivo.descricao == ''" @click="saveObjetivo">salvar objetivo</button>

  </div>
</template>

<script setup lang="ts">

import {reactive, ref} from "vue"

import { useStore } from "../store/main"

  const store = useStore();



const fixa = ref(false);

 

const objetivo = reactive({
  descricao: "",
  nome: "",
})

function saveObjetivo() {
  store.$patch(state => {
    //@ts-ignore
    state.objetivos.push({descricao: objetivo.descricao,  nome: objetivo.nome, isFixa: fixa})
  });

  objetivo.nome = "";
  objetivo.descricao = "";
}

</script> 