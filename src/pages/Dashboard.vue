<template>
  <Suspense>
    <template #default>

      <div class="flex gap-7">
        <Card class="min-w-[300px]">
          <div class="flex justify-between relative">
            <p>Custo Médio Mensal</p>
            <span
              class="material-icons bg-negative p-2 rounded-full text-negative bg-opacity-25 rotate-180 absolute right-0">
              call_received
            </span>
          </div>
          <p class="card__amount">{{ currency(dashboard ? dashboard.despesas : 0) }}</p>
          <!-- <p class="text-negative font-medium">{{ percentage(recursoAvancado.variacaoDespesas) }}</p> -->
        </Card>
        <Card class="card">
          <div class="flex justify-between relative">
            <p>Receita Média Mensal</p>
            <span class="material-icons bg-positive p-2 rounded-full text-positive bg-opacity-25 absolute right-0">
              call_received
            </span>
          </div>
          <p class="card__amount">{{ currency(dashboard ? dashboard.receitas : 0) }}</p>
          <!-- <p class="text-positive font-medium">{{ percentage(recursoAvancado.variacao) }}</p> -->
        </Card>
        <Card class="card">
          <div class="flex justify-between relative">
            <p>Reserva Ideal</p>
            <span class="material-icons bg-cyan-500 p-2 rounded-full text-cyan-500 bg-opacity-25 absolute right-0">
              savings
            </span>
          </div>
          <p class="card__amount">{{ currency(dashboard ? dashboard.despesas * mesesReserva : 0) }}</p>
          <p class="text-cyan-500 font-sm opacity-50">{{ currency(dashboard ? dashboard.reserva - dashboard.despesas *
              mesesReserva
              : 0)
          }}
            da sua reserva
            atual</p>
        </Card>

        <Card class="card">
          <div class="flex justify-between relative">
            <p>Reserva Atual</p>
            <span class="material-icons bg-accent p-2 rounded-full text-accent bg-opacity-25 absolute right-0">
              savings
            </span>
          </div>
          <p class="card__amount">{{ currency(dashboard ? dashboard.reserva : 0) }}</p>
          <!-- <p class="text-cyan-500 font-sm opacity-50">{{ currency(dashboard ? dashboard.reserva - dashboard.despesas *
              mesesReserva
              : 0)
          }}
            da sua reserva
            atual</p> -->
        </Card>
      </div>
    </template>

    <template #fallback>
      carregando...
    </template>
  </Suspense>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getDashboard } from '../services';
import { currency } from '../utils/formatters';

import Card from "../components/Card.vue"

const dashboard = ref();
const mesesReserva = ref(6)

onMounted(async () => {
  const d = await getDashboard()
  console.log("🚀 ~ file: Dashboard.vue ~ line 13 ~ onMounted ~ d", d)
  dashboard.value = d.data
})


</script>

<style>
.card {
  @apply min-w-[300px]
}

.card__amount {
  @apply text-2xl font-medium
}
</style>