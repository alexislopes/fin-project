<template>
<div class="gap-2 flex flex-col">
    <p @click="$emit('close')" style="color: rgb(209 213 219)" class="text-end cursor-pointer" onmouseout="this.style.color = 'rgb(209 213 219)'" onmouseover="this.style.color = 'red'">x</p>
    
    <label for="recurso">
      Recurso
      <select class="w-full" @change="recursoId = $event.target.value" :value="recursoId" name="recurso" id="recurso">
        <option v-for="recurso in store.recursos" :value="recurso.id">{{recurso.nome}}</option>
      </select>
    </label>
    
    <div class="rounded-md" style="background-color: rgb(209 213 219)">
      <!-- <h3>{{!!recurso.nome ? recurso.nome : ""}}</h3> -->
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="valor">
        Valor
        <input v-model="valor" class="outline-none text-base bg-transparent" type="number" id="valor">
      </label>

      
    </div>
    <label for="fixa">
        <input type="checkbox" v-model="isFixa">
        Fixa?
      </label>
      <Button @click="saveObjetivoMes" class="text-xs w-full" label="Atualizar Objetivo" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/main"
import {ref, computed, toRefs} from "vue"
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button.vue"
const props = defineProps({
  objetivoId: {
    type: String || undefined,
    required: true
  },
  montanteAtual: {
    type: Number,
  }
})

const { objetivoId } = toRefs(props)


const objetivo = computed(() => {
  return store.getObjetivoById(objetivoId.value)
})


const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
    const valor = ref(0)
    const recursoId = ref("")
    const isFixa = ref(false)
  const store = useStore();

  function saveObjetivoMes() {
    store.saveObjetivoMes({id: uuidv4(), objetivoId: objetivoId.value, recursoId: recursoId.value, valor: valor.value, date: new Date().getTime(), isFixa: isFixa.value})
    handleClose()
  }

</script>