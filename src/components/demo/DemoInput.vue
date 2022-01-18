<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({ modelValue: { type: [String, Number], required: true } })

const emit = defineEmits(['update:modelValue'])

const modelValueSync = computed({
  get() { return props.modelValue },
  set(value) { emit('update:modelValue', value) }
})
</script>

<template>
  <input v-model="modelValueSync" />
</template>

<style>
input {
  padding: 4px 8px;
  background: linear-gradient(243deg, #8e2de2, #4a00e0);
  border: none;
  color: white;
  border-radius: 4px;
}
</style>