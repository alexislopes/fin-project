<template>

<div class="max-w-sm">
  <div class="flex justify-between">
    <p class="font-poppins">Renda</p>
    <p class="font-poppins">{{currency(store.rendaTotal)}}</p>
  </div>
  <div class="flex justify-between" v-for="planejamento in store.lastPlanejameto.planejamento">
    <p class="font-poppins">{{planejamento.recurso}}</p>

<div>

  <p class="font-poppins">{{currency(planejamento.renda)}}</p>
    <p class="font-poppins text-xs text-end">{{percentage((planejamento.renda / store.rendaTotal ) * 100)}}</p>
</div>
  </div>
</div>

<!-- <div v-for="objd in distribuicaoObjetivos">
{{objd.objetivo}}
<div v-for="dist in objd.distribuicao" >
  {{dist.recurso}} {{dist.montante.toFixed(2)}}
</div>
</div> -->
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import {currency, percentage } from "../utils/formatters"

import { useStore } from "../store/main"

const store = useStore();

const distribuicaoObjetivos = computed(() => {
 return  store.objetivos.map(objetivo => {
    return {
      objetivo: objetivo.nome,
      distribuicao: store.lastPlanejameto.planejamento.map(m => {

        const poupar = ((Number(m.renda) * 20) / 100) - m.objetivos.map(m => m.valor).reduce((a, b) => a + b);
   
        
        return {
          recurso: m.recurso,
          montante: objetivo.isFixa ? m.objetivos.find(obj => obj.objetivo === objetivo.nome).valor : (m.objetivos.find(obj => obj.objetivo === objetivo.nome).porcentagem * poupar) / 100
        }

      })
    }
  })
})

</script>