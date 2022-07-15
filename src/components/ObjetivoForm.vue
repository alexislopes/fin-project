<template>
<div class="gap-2 flex flex-col">
    <p @click="$emit('close')" style="color: rgb(209 213 219)" class="text-end cursor-pointer" onmouseout="this.style.color = 'rgb(209 213 219)'" onmouseover="this.style.color = 'red'">x</p>

    <div class="rounded-md" style="background-color: rgb(209 213 219)">
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="nome">
        Descricao
        <input v-model="objetivo.descricao" class="outline-none text-base bg-transparent" type="text" id="nome">
      </label>
    </div>
 
      <Button @click="saveObjetivo" class="text-xs w-full" label="Criar Objetivo" />
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { reactive, ref } from "vue"
import { useStore } from "../store/main"
import Button from "../components/Button.vue"
import { setObjetivo } from '../firebase';

const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}

  const store = useStore();


const objetivo = reactive({
  descricao: "",
})

function saveObjetivo() {
  // store.$patch(state => {
  //   //@ts-ignore
  //   state.objetivos.push({descricao: objetivo.descricao,  nome: objetivo.nome, isFixa: fixa})
  // });

  // store.saveObjetivo({descricao: objetivo.descricao,  id: uuidv4()})
  setObjetivo({ descricao: objetivo.descricao })

  objetivo.descricao = "";
  handleClose()
}

</script>