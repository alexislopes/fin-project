<template>
<h1>home</h1>
<label for="receita-silvana">
  Receitas Silvana
  <input id="recita-silvana" v-model="receitaSilvana" type="number">
  fixas: {{fixasSilvana}}
  ditribuir: {{totalDistribuirSilvana.toFixed(2)}}

</label>

<label for="receita-alexis">
  Receitas Alexis
  <input id="recita-alexis" v-model="receitaAlexis" type="number">
  fixas: {{fixasAlexis}}
  ditribuir: {{totalDistribuirAlexis.toFixed(2)}}
</label>

<div class="flex justify-around mt-2" >
<div>

  silvana
<div v-for="escopo in escoposSilvana" :key="escopo.nome">
<p>{{escopo.nome}}</p>
<p v-if="escopo.porcentagem"> {{((escopo.porcentagem / 100) * totalDistribuirSilvana).toFixed(2)}}</p>
<p v-else>{{escopo.valor}}</p>

</div>
 </div>
 <div>

  Alexis
<div v-for="escopo in escoposAlexis" :key="escopo.nome">
<p>{{escopo.nome}}</p>
<p v-if="escopo.porcentagem"> {{((escopo.porcentagem / 100) * totalDistribuirAlexis).toFixed(2)}}</p>
<p v-else>{{escopo.valor}}</p>

</div>
</div>
</div>


</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Escopo {
  nome?: string
  porcentagem?: number
  descricao?: string
  valor?:number
}


const receitaAlexis = ref(0)
const receitaSilvana = ref(0)

const fixasAlexis = computed(() => escoposAlexis.filter(a => !!!a.porcentagem).map<number>(m => m.valor || 0).reduce((a, b) : number => {return a + b }, 0 ));
const fixasSilvana = computed(() => escoposSilvana.filter(a => !!!a.porcentagem).map<number>(m => m.valor || 0).reduce((a, b) : number => {return a + b }, 0 ));
const totalDistribuirAlexis = computed(() => ((receitaAlexis.value * 20) / 100) - fixasAlexis.value)
const totalDistribuirSilvana = computed(() => ((receitaSilvana.value * 20) / 100) - fixasSilvana.value)


  

const escoposSilvana: Escopo[] = [
   { nome: "Variavel",  valor: 100 },
  { nome: "Curto Prazo", descricao: "Sofá", valor: 90},
  { nome: "Oportunidade", valor: 0, porcentagem: 30},
  {nome: "Longo Prazo",valor: 0, porcentagem: 40, descricao: "casa"},
  {nome: "Carro", valor: 0, porcentagem: 30},
  {nome: "Reserva de Emergencia"}
]

const escoposAlexis: Escopo[] = [
   { nome: "Variavel", valor: 300 },
  { nome: "Curto Prazo", descricao: "Sofá", valor: 90},
  { nome: "Oportunidade", porcentagem: 30},
  {nome: "Longo Prazo",porcentagem: 40, descricao: "casa"},
  {nome: "Carro", porcentagem: 30},
  {nome: "Reserva de Emergencia"}
]


</script>