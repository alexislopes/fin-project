<template>
<div class="gap-2 flex flex-col">
    <p @click="$emit('close')" style="color: rgb(209 213 219)" class="text-end cursor-pointer" onmouseout="this.style.color = 'rgb(209 213 219)'" onmouseover="this.style.color = 'red'">x</p>
    <div class="rounded-md" style="background-color: rgb(209 213 219)">
      <!-- <h3>{{!!recurso.nome ? recurso.nome : ""}}</h3> -->
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="montante">
        Montante
        <input v-model="montante" class="outline-none text-base bg-transparent" type="number" id="montante">
      </label>
    </div>
      <Button @click="saveRecursoMes" class="text-xs w-full" label="Atualizar Recurso" />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "../store/main"
import {ref, computed, toRefs} from "vue"
import { v4 as uuidv4 } from 'uuid';
import Button from "../components/Button.vue"
const props = defineProps({
  recursoId: {
    type: String || undefined,
    required: true
  },
  montanteAtual: {
    type: Number,
  }
})

const { recursoId } = toRefs(props)


const recurso = computed(() => {
  return store.getRecursoById(recursoId.value)
})


const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}
    const montante = ref(0)
  const store = useStore();

  function saveRecursoMes() {
    console.log(recurso)
    store.saveRecursoMes({id: uuidv4(), recursoId: recursoId.value, montante: montante.value, date: new Date().getTime()})
    handleClose()
  }

</script>