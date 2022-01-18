<script setup lang="ts">import { ref, watch } from 'vue';

const props = defineProps({
  color: { type: String, required: false, default: undefined },
  title: { type: String, required: false, default: ""},
  right: { type: Boolean, required: false, default: false }
})

const emit = defineEmits(['circle-click', 'register-point'])

const circleRef = ref()

watch(circleRef, (newVal) => {
  if (newVal) {
    emit('register-point', newVal)
  }
})

</script>

<template>
  <div class="demo-button" :class="{ 'demo-button--right': right }">
    <template v-if="right">
      <slot>{{ title }}</slot>
    </template>
    <div class="demo-button__circle" @click="$emit('circle-click')" :style="{ background: color, cursor: !!color ? 'pointer' : 'default' }" ref="circleRef" />
    <template v-if="!right">
      <slot>{{ title }}</slot>
    </template>
  </div>
</template>

<style lang="scss">
.demo-button {
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 0;
  }

  &__circle {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 50%;
    margin-left: -16px;
  }

  &--right {
    .demo-button {
      &__circle {
        margin-right: -16px;
        margin-left: 8px;
      }
    }
  }
}
</style>