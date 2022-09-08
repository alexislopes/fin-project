<template>
  <div class="rounded-md" style="background-color: rgb(209 213 219)">
    <label class="font-poppins flex flex-col p-2 text-sm font-medium gap-2" for="nome">
      {{label}}
      <input :autocomplete="autocomplete ? 'on' : 'off'" :value="modelValue" @input="updateValue"
        class="outline-none text-base bg-transparent" :sstype="type" id="nome">
    </label>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: false },
  modelValue: { type: [String, Number], required: false },
  type: { type: String, default: 'text' },
  autocomplete: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'input'])
const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}
</script>