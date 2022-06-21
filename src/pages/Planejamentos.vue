<template>
<h1>planejamentos</h1>
<div v-for="planejamento in store.planejamentos">
  <p>{{planejamento}}</p>
</div>

<div v-for="recurso in store.recursos">
{{recurso.nome}}
  <label :for="recurso.nome">
Renda
    <input @input="setRenda($event)" :id="recurso.nome" type="number">
  </label>
<div v-for="objetivo in store.objetivos">
  
  <h1>{{objetivo.nome}}</h1>

  
  <label v-if="objetivo.isFixa > 0" :for="`${recurso.nome}+${objetivo.nome}`">
Valor
    <input @input="setValorObjetivo($event)" :id="`${recurso.nome}+${objetivo.nome}`" type="number">
  </label>
  <label v-else :for="`${recurso.nome}+${objetivo.nome}`">
Porcentagem
    <input @input="setPorcentagemObjetivo($event)" :id="`${recurso.nome}+${objetivo.nome}`" type="number">
  </label>


</div>
</div>
<button @click="savePlanejamento">salvar planejamento</button>
</template>

<script setup lang="ts">

import { useStore } from "../store/main"

const store = useStore();

const planejamento = store.recursos.map(recurso => {
  return {
    //@ts-ignore
    recurso: recurso.nome,
    renda: 0,
    objetivos: store.objetivos.map(objetivo => {
      //@ts-ignore
      return { objetivo: objetivo.nome, porcentagem: 0, valor: 0}
    })
  }
})

function setRenda(v) {
  const recurso = v.target.id;
  const renda = v.target.value;

  planejamento.forEach(planejamento => {
    if(planejamento.recurso === recurso) {
      planejamento.renda = renda;
    }
  })
}

function setValorObjetivo(v: Event) {

  const recurso = v.target.id.split("+")[0]

  const obj = v.target.id.split("+")[1]

  
  planejamento.forEach(planejamento => {
    if (planejamento.recurso === recurso){
      planejamento.objetivos.forEach(objetivo => {
        if(objetivo.objetivo === obj) {
          objetivo.valor = Number(v.target.value)
        }
      })

    }
  })
}

function setPorcentagemObjetivo(v: Event) {

  const recurso = v.target.id.split("+")[0]

  const obj = v.target.id.split("+")[1]

  
  planejamento.forEach(planejamento => {
    if (planejamento.recurso === recurso){
      planejamento.objetivos.forEach(objetivo => {
        if(objetivo.objetivo === obj) {
          objetivo.porcentagem = Number(v.target.value)
        }
      })

    }
  })
}

function savePlanejamento() {
  store.$patch(state => {
    //@ts-ignore
    state.planejamentos.push({data: new Date().getTime(), planejamento })
  });

  // objetivo.nome = "";
  // objetivo.descricao = "";
}

</script>