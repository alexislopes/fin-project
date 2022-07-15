<template>
<div>

  <MonthPicker @change="now = $event" :timestamp="now" />
  <div class="flex ">

  <div class="w-full content-center">

 
<Button @click="showModal = true" class="text-medium" label="+ Criar Objetivo" />
<div class="flex gap-x-2">
  <div class="shadow-md p-4 flex flex-col gap-2 rounded-lg" v-for="objetivo in objetivosDistribuidos">
     <div>
      <p class="font-poppins">{{objetivo.descricao}}</p>
    <div class="flex flex-col min-w-[8rem] gap-2" v-for="recurso in objetivo.recursos">
        <div class="flex flex-row justify-between">
          <p class="font-poppins text-xs">{{recurso.nome}}</p>
          <p class="font-poppins text-xs">{{currency((recurso.valor).toFixed(2))}}</p>
        </div>
      </div>
      <p class="text-xs float-right text-gray-300 font-poppins">{{currency(objetivo.soma.toFixed(2))}}</p>
    </div> 
    <p @click="objetivoId = objetivo.id" class="text-medium text-center text-black cursor-pointer">+</p>
  </div>
</div>
 </div>
<div class="max-w-fit p-4">
  <div class="font-poppins shadow-md w-max p-4 flex flex-col gap-2 rounded-lg">
    <p>
      Total Poupado
    </p>
    <div class="flex gap-4">
      <p>{{currency(totalPoupado.total)}}</p> 
      <p class="text-gray-400">{{percentage(totalPoupado.porcentagem)}}</p> 
    </div>
  </div>
</div>
</div>


  <Modal v-show="showModal">
    <ObjetivoForm @close="showModal = false" />
  </Modal>

  <Modal v-show="objetivoId != 'undefined'">
    <ObjetivoMesForm @close="objetivoId = 'undefined'" :objetivoId="objetivoId" />
  </Modal>
          </div>
</template>

<script setup lang="ts">

import Modal from '../components/Modal.vue'
import Button from '../components/Button.vue'
import ObjetivoForm from '../components/ObjetivoForm.vue'
import ObjetivoMesForm from '../components/ObjetivoMesForm.vue'
import MonthPicker from '../components/MonthPicker.vue'
import { collection, onSnapshot } from "@firebase/firestore"
import { db, getObjetivoMesByMes } from "../firebase"

import _ from "lodash"

import { currency, percentage, capitalize } from "../utils/formatters"

import { ref, computed, watch} from "vue"

import { useStore } from "../store/main"
import { isSameMonth } from '../utils/comparators'

    const now = ref(new Date().getTime())
  const objetivos = ref([]) 
  const objetivoMes = ref([])
  const recursoMes = ref([])

  const recursos = ref([])
  // getRecursos().then(rec => console.log(rec))

  onSnapshot(collection(db, "recursoMes"), (snapshot) => {
    recursoMes.value = [];
    snapshot.forEach(doc => {
      if(isSameMonth(now.value, doc.data().timestamp)){
        recursoMes.value.push(doc.data())
      }
    })
  })

  onSnapshot(collection(db, "recursos"), (snapshot) => {
    recursos.value = [];
    snapshot.forEach(doc => recursos.value.push(doc.data()))
  })
  // getObjetivos().then(data => objetivos.value = data);
  onSnapshot(collection(db, "objetivos"), (snapshot) => {
    objetivos.value = [];
    snapshot.forEach(doc => objetivos.value.push(doc.data()))
  })

   onSnapshot(collection(db, "objetivoMes"), (snapshot) => {
    objetivoMes.value = [];
    snapshot.forEach(doc => {
      if(isSameMonth(now.value, doc.data().timestamp)){
        objetivoMes.value.push(doc.data())
      }
    })
  })

  

  const objetivosDistribuidos = computed(  () => { 
    return  objetivos.value.map(   objetivo => {

      let objetivoDoMes =   objetivoMes.value.filter(rm => rm.objetivoId === objetivo.id, {soma: 0});
      
      
        const recursosss = objetivoDoMes.map(om => {
          const { recursoId, isFixa, valor } = om;
          let {nome} =  recursos.value.find(recurso => recurso.id === recursoId);
          let totalFixos = objetivoMes.value.length === 1 ? objetivoMes.value[0].valor : objetivoMes.value.filter(om => om.isFixa).filter(om => om.recursoId === recursoId).reduce((a, b) => a.valor + b.valor);
          let {montante} =  recursoMes.value.find(rm => rm.recursoId === recursoId);

          return  {
            nome, 
            valor: isFixa ? valor : (valor / 100) * (montante * 0.2 - totalFixos)
            }
        })
      
      return {
          ...objetivo, 
          soma: recursosss.length === 1 ? recursosss[0].valor : !recursosss.length ? 0 : recursosss.reduce((a, b) => a.valor + b.valor),
          recursos: recursosss
      }
        
    })
  });

  const totalRecursos = computed(() => {
    let soma = 0;
    recursoMes.value.forEach(recursoM => { soma+=recursoM.montante })
    return soma;
  }) 

  const totalPoupado = computed( () => {
    let soma = 0
    objetivosDistribuidos.value.forEach(v => {
      soma+=v.soma
      
    })
    console.log(totalRecursos)
    return {total: soma.toFixed(2), porcentagem: (100 * soma) / totalRecursos.value.toFixed(2)}
  })

  watch(now, async (v) => {
    objetivoMes.value =  await getObjetivoMesByMes(v)
  })

  
  const showModal = ref(false)
  const objetivoId = ref("undefined")






</script> 