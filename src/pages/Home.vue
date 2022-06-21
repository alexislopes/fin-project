<template>


<div v-for="objd in distribuicaoObjetivos">
{{objd.objetivo}}
<div v-for="dist in objd.distribuicao" >
  {{dist.recurso}} {{dist.montante.toFixed(2)}}
</div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';

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