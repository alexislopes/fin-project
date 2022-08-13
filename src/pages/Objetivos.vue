<template>
  <div>

    <MonthPicker @change="now = $event" :timestamp="now" />
    <div class="flex ">

      <div class="w-full content-center">
        <div class="flex gap-x-2">
          <Card v-for="objetivo in objetivos">

            <div>
              <p class="font-poppins">{{ objetivo.descricao }}</p>
              <div class="flex flex-col min-w-[8rem] gap-2" v-for="recurso in objetivo.recursos">
                <div class="flex flex-row justify-between">
                  <p class="font-poppins text-xs">{{ recurso.Recurso }}</p>
                  <p class="font-poppins text-xs">{{ getValor({
                      nome: recurso.Recurso, fixa: recurso.Fixa, valor:
                        recurso.Valor
                    })
                  }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>

import Card from '../components/Card.vue'
import MonthPicker from '../components/MonthPicker.vue'

import _ from "lodash"

import { currency, percentage, capitalize } from "../utils/formatters"

import { ref, computed, watch } from "vue"
import { getObjetivos, getRecursosByMonth } from '../services'


const now = ref(new Date().getTime())
const objetivos = ref([])
const recursos = ref({ recursos: [] })

const getValor = ({ nome, fixa, valor }) => {
  let f = fixas(nome);
  let renda = recursos.value.recursos.find(r => r.name === nome).value
  let montante = fixa ? valor : ((renda * 0.2) - f) * (valor / 100)
  return currency(montante)
}

const fixas = (nome) => {
  let recursoAlocado = [];
  objetivos.value.forEach(o => {
    o.recursos.forEach(r => {
      if (r.Recurso === nome) {
        recursoAlocado.push(r)
      }
    })
  })

  return recursoAlocado.filter(recurso => recurso.Fixa).reduce((a, b) => a.Valor + b.Valor)
}

const distribuicao = computed(() => {

  let recursoAlocado = [];
  objetivos.value.forEach(o => {
    o.recursos.forEach(r => {
      recursoAlocado.push(r)
    })
  })


  return recursos.value.recursos.map(recurso => {
    return {
      recurso: recurso.name,
      variavel: recurso.value * 0.2 - recursoAlocado.filter(r => r.Recurso === recurso.name).filter(f => f.Fixa).map(m => m.Valor).reduce((a, b) => a + b),
      fixo: recursoAlocado.filter(r => r.Recurso === recurso.name).filter(f => f.Fixa).map(m => m.Valor).reduce((a, b) => a + b),
      distribuido: recursoAlocado.filter(r => r.Recurso === recurso.name).filter(f => !f.Fixa).map(m => m.Valor).reduce((a, b) => a + b)
    }
  })
})


// getRecursos().then(rec => console.log(rec))


watch(now, async (v) => {
  const { data } = await getObjetivos()
  const res = await getRecursosByMonth(v)
  objetivos.value = data
  recursos.value = res.data
}, { immediate: true })




const showModal = ref(false)
const objetivoId = ref("undefined")






</script> 