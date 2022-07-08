<template>
<div class="gap-2 flex flex-col">
    <p @click="$emit('close')" style="color: rgb(209 213 219)" class="text-end cursor-pointer" onmouseout="this.style.color = 'rgb(209 213 219)'" onmouseover="this.style.color = 'red'">x</p>
    <div class="rounded-md" style="background-color: rgb(209 213 219)">

      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="recurso">
        Recurso
        <input v-model="recurso.nome" class="outline-none text-base bg-transparent" type="text" id="recurso">
      </label>
    </div>
      <Button @click="saveRecurso" class="text-xs w-full" label="Criar Recurso" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { reactive } from "vue"
import { useStore } from "../store/main"
import Button from "../components/Button.vue"

const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}

  const store = useStore();

  const recurso = reactive({nome: ""})

function saveRecurso() {
  // store.$patch(state => {
  //   //@ts-ignore
  //   state.recursos.push({nome: recurso.nome})
  // })

  store.saveRecurso({id: uuidv4(), nome: recurso.nome})

  recurso.nome = '';
  handleClose()
}

</script>