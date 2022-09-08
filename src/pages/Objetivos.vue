<template>
  <div>

    <MonthPicker @change="now = $event" :timestamp="now" />
    <Button @click="createObjetivo = true" label="+" />
    <Button @click="editing = true" label="e" />
    <div class="flex ">
      <div class="w-full content-center">
        <div class="flex gap-x-2">
          <Card v-for="objetivo in Object.keys(groupByObjetivo)">
            <div>
              <p class="font-poppins">{{ objetivo }}</p>
              <div class="flex flex-col min-w-[8rem] gap-2" v-for="recurso in groupByObjetivo[objetivo]">
                <div class="flex flex-row justify-between">
                  <p class="font-poppins text-xs">{{ recurso.nome }}</p>
                  <p class="font-poppins text-xs">{{ getValor({
                  nome: recurso.nome, fixa: recurso.fixa, valor:
                  recurso.value
                  })
                  }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <Modal v-if="editing">
      <span @click="editing = false">x</span>
      <div>
        <div class="recursos">
          <div class="flex gap-1 p-1 ">

            <span @click="editing = nome" v-for="(nome) in Object.keys(groupByRecurso)"
              :class="{active: nome === editing}" class="cursor-pointer">{{nome}}</span>
          </div>
          <div>
            <div v-for='objetivo in groupByRecurso[editing]'>

              <Input :label="objetivo.descricao" type="number" v-model.number.lazy="objetivo.value" />
              <input type="checkbox" v-model="objetivo.fixa" />

              <!-- <input type="text" :value="groupByRecurso[objetivo.nome].value"> -->
            </div>
          </div>
        </div>
      </div>
    </Modal>
    <Modal v-if="createObjetivo">
      <div class="flex flex-col">
        <Input label="Descriçao" type="text" v-model="newObjetivo.descricao" />
        <Button @click="planningTime = true; createObjetivo = false" :label="`Planejar`" />
      </div>
    </Modal>
    <Modal v-if="planningTime">
      <div class="flex flex-col">

        <h1>{{newObjetivo.descricao}}</h1>
        <p>Planeje a quantia que cada recurso vai direcionar para este objetivo!</p>
        <div class="flex gap-1 py-1">

          <span @click="planning = recurso.id" v-for="(recurso) in newObjetivo.recursos"
            :class="{active: recurso.id === planning}" class="cursor-pointer">{{recurso.nome}}</span>
        </div>

        <div class="flex flex-col" :key="planning">
          <p>Ainda restam {{percentage(100 - variaveis(fillingRecurso.nome))}}</p> para direcionar
          <div class="flex ">
            <Input label="Valor" v-model='fillingRecurso.value' />
            <input type="checkbox" v-model="fillingRecurso.fixa" />
          </div>
        </div>
        <Button @click="createNewObjetivo" label="Criar" />


      </div>
    </Modal>
  </div>
</template>

<script setup>

import Card from '../components/Card.vue'
import MonthPicker from '../components/MonthPicker.vue'
import Modal from '../components/Modal.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'

import { v4 as uuidv4 } from 'uuid';

import _ from "lodash"

import { currency, percentage, capitalize } from "../utils/formatters"

import { ref, computed, watch } from "vue"
import { getRecursoObjetivos, getRecursosByMonth, updateRecursosObjetivos, insertObjetivo, insertRecursosObjetivos } from '../services'


const now = ref(new Date().getTime())
const objetivos = ref([])
const recursos = ref({ recursos: [] })

const createObjetivo = ref(false)
const newObjetivo = computed(() => {
  return {
    id: '',
    descricao: '',
    recursos: recursos.value.recursos.map(m => {
      return {
        nome: m.name,
        id: m.id,
        value: 0,
        fixa: false
      }
    })
  }
})

const createNewObjetivo = async () => {
  const objetivoId = uuidv4();

  await insertObjetivo({ id: objetivoId, descricao: newObjetivo.value.descricao }).then((response) => {
    if (response.status === 200) {
      insertRecursosObjetivos(newObjetivo.value.recursos.map(m => {
        return {
          id: uuidv4(),
          id_recurso: m.id,
          id_objetivo: objetivoId,
          fixa: m.fixa,
          value: Number(m.value)
        }
      })).then((response) => {
        if (response.status === 200) {
          planningTime.value = false
        }
      })
    }
  })

}

const recursoId = ref('')
const planningTime = ref(false)
const planning = computed({
  get() {
    return recursoId.value || recursos.value.recursos.map(m => m.id)[0]
  },
  set(v) {
    recursoId.value = v
  }
})

const groupByObjetivo = computed(() => {
  return _.groupBy(objetivos.value, 'descricao')
})
const groupByRecurso = computed(() => {
  return _.groupBy(objetivos.value, 'nome')
})

const editing = ref(Object.keys(groupByRecurso.value)[0])

const fillingRecurso = computed(() => {
  return newObjetivo.value.recursos.find(f => f.id === planning.value)
})

const getValor = ({ nome, fixa, valor }) => {
  let f = fixas(nome);
  let renda = recursos.value.recursos.find(r => r.name === nome).value
  let montante = fixa ? valor : ((renda * 0.2) - f) * (valor / 100)
  console.log(fixa)
  return currency(montante)
}

const fixas = (nome) => {
  console.log(nome)
  let recursoAlocado = [];
  objetivos.value.concat(newObjetivo.value.recursos).forEach(o => {
    if (o.nome === nome) {
      recursoAlocado.push(o)
    }
  })
  console.log(recursoAlocado)
  return recursoAlocado.filter(f => f.fixa).map(m => m.value).reduce((a, b) => Number(a) + Number(b), 0)
}

const variaveis = (nome) => {
  console.log(nome)
  let recursoAlocado = [];
  objetivos.value.concat(newObjetivo.value.recursos).forEach(o => {
    if (o.nome === nome) {
      recursoAlocado.push(o)
    }
  })
  console.log(recursoAlocado)
  return recursoAlocado.filter(f => !f.fixa).map(m => m.value).reduce((a, b) => Number(a) + Number(b), 0)
}


watch(now, async (v) => {
  const { data } = await getRecursoObjetivos()
  data.forEach(f => f.fixa = f.fixa === 1)
  const res = await getRecursosByMonth(v)
  objetivos.value = data
  recursos.value = res.data
}, { immediate: true })

watch(objetivos, async () => {
  const res = await updateRecursosObjetivos(objetivos.value);
  console.log(res)
}, { deep: true })

</script> 

<style scoped>
.active {
  @apply bg-accent px-2 rounded-full text-white
}
</style>