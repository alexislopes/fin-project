<template>

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
    


<div v-show="false" v-for="recurso in store.recursos">
<h5 class="font-poppins font-medium text-xl text-left">{{recurso.nome}}</h5>
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
<Button v-show="false" @click="savePlanejamento" label="Salvar Planejamento" />
</template>

<script setup lang="ts">

import Button from "../components/Button.vue"

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

function currency(amount) {
  return `R$ ${amount}`
}

function percentage(value) {
  return `${value}%`
}

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

<style scoped>
.renda {
  background-color: rgb(74 222 128)
}
</style>