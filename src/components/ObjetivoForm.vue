<template>
<div class="gap-2 flex flex-col">
    <p @click="$emit('close')" style="color: rgb(209 213 219)" class="text-end cursor-pointer" onmouseout="this.style.color = 'rgb(209 213 219)'" onmouseover="this.style.color = 'red'">x</p>
    <div class="rounded-md" style="background-color: rgb(209 213 219)">
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="nome">
        Nome
        <input v-model="objetivo.nome" class="outline-none text-base bg-transparent" type="text" id="nome">
      </label>
    </div>

    <div class="rounded-md" style="background-color: rgb(209 213 219)">
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="nome">
        Descricao
        <input v-model="objetivo.descricao" class="outline-none text-base bg-transparent" type="text" id="nome">
      </label>
    </div>


      <label for="fixa">
    <input id="fixa" type="checkbox" v-model="fixa">
  Objetivo com valor fixo?
</label>
 
      <Button @click="saveObjetivo" class="text-xs w-full" label="Criar Objetivo" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { useStore } from "../store/main"
import Button from "../components/Button.vue"

const emit = defineEmits(['close'])
const handleClose = () => {
  emit('close')
}

  const store = useStore();

  const fixa = ref(false);
const objetivo = reactive({
  descricao: "",
  nome: "",
})

function saveObjetivo() {
  store.$patch(state => {
    //@ts-ignore
    state.objetivos.push({descricao: objetivo.descricao,  nome: objetivo.nome, isFixa: fixa})
  });

  objetivo.nome = "";
  objetivo.descricao = "";
  handleClose()
}

</script>