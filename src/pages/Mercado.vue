<template>
  <h1 class="products">Mercado</h1>
  <div class="flex justify-evenly products">

    <div class="bg-[#eae6f7] rounded-md p-5 ">
      <h1 class="text-2xl py-2 font-medium">Produtos</h1>
      <div @drop="onDrop($event, false)" @dragenter.prevent @dragover.prevent
        class="max-h-[calc(100vh_-_300px)] min-w-[30vw] overflow-auto  flex flex-col gap-2 not-picked">
        <Card draggable="true" @dragstart="startDrag($event, item)" v-for="item in notPickedItems">
          <div class="flex justify-between">
            <p>{{ item.item }}</p>
            <p>{{ currency(item.media) }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-xs bg-[#cecece] rounded-full px-1 h-fit">{{ formatDate(item.lastBuy) }}</p>
            <p class="text-sm">{{ item.frequencia }}/{{ item.quantidade }}</p>
          </div>
        </Card>
      </div>
    </div>
    <div class="bg-[#eae6f7] rounded-md p-5">
      <div class="flex justify-between">
        <h1 class="text-2xl py-2 font-medium">Lista de Compras</h1>
        <p class="h-fit py-3">{{ currency(totalPicked) }}</p>
      </div>
      <div @drop="onDrop($event, true)" @dragenter.prevent @dragover.prevent
        class="max-h-[calc(100vh_-_300px)] min-h-[10%] 0 min-w-[30vw] overflow-auto flex flex-col gap-2 picked">
        <Card draggable="true" @dragstart="startDrag($event, item)" v-for="item in pickedItems">
          <div class="flex justify-between">
            <p>{{ item.item }}</p>
            <p>{{ currency(item.media) }}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-xs bg-[#cecece] rounded-full px-1 h-fit">{{ formatDate(item.lastBuy) }}</p>
            <p class="text-sm">{{ item.frequencia }}/{{ item.quantidade }}</p>
          </div>
        </Card>
      </div>
    </div>
  </div>
  <div class="to-print">
    <div>
      <div class="item p-1" v-for="item in pickedItems">
        <div class="flex gap-2 justify-between">
          <div class="flex gap-2">
            <input type="checkbox" name="" id="">
            <p class="item-description">{{ item.item }}</p>
            <p class="text-xs text-[#cecece] rounded-full p-1  h-fit">{{ currency(item.media) }}</p>
          </div>

          <input placeholder="preço" class="text-2xs border border-1 border-accent" type="text">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { getMercado } from "../services";
import Card from "../components/Card.vue";
import { currency, formatDate } from "../utils/formatters";

const mercado = ref([]);

onMounted(async () => {
  const res = await getMercado()
  mercado.value = res.data
})

const notPickedItems = computed(() => {
  return mercado.value.filter(item => !item.picked)
})

const pickedItems = computed(() => {
  return mercado.value.filter(item => item.picked)
})

const totalPicked = computed(() => {
  return pickedItems.value.map(item => item.media).reduce((a, b) => a + b, 0)
})

const startDrag = (event, item) => {
  console.log(item);
  event.dataTransfer.dropEffect = "move"
  event.dataTransfer.effectAllowed = "move"
  event.dataTransfer.setData("itemId", item.item)
}

const onDrop = (event, isPicked) => {
  const itemId = event.dataTransfer.getData("itemId")
  const item = mercado.value.find(item => item.item === itemId)
  item.picked = isPicked
}

</script>

<style scoped>
.to-print {
  display: none;
}

@media print {
  .item {
    page-break-before: auto;
    page-break-after: auto;
  }

  .item-description {
    @apply text-sm
  }

  .products,
  .nav {
    display: none;
  }

  .to-print {
    display: block;
  }
}
</style>