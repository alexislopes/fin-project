<template>
<div class="rounded-md" style="background-color: rgb(209 213 219)">
      <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="nome">
        {{label}}
        <input :value="modelValue" @input="updateValue" class="outline-none text-base bg-transparent" type="text" id="nome">
      </label>
    </div>
</template>

<script setup lang="ts">
defineProps({
  label: {type: String, required: false},
  modelValue: {type: String, required: false}
})

const emit = defineEmits(['update:modelValue', 'input'])
const updateValue = (event) => {
console.log("🚀 ~ file: Input.vue ~ line 18 ~ updateValue ~ event", event)
  emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}
</script>