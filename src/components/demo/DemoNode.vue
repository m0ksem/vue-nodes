<script lang="ts" setup>
const props = defineProps({
  title: { type: String, required: false, default: ""},
})
</script>

<template>
  <div class="demo-node">
    <div class="demo-node__header" v-if="title">
      {{ title }}
    </div>

    <div class="demo-node__main">
      <div class="demo-node__inputs">
        <slot name="inputs" />
      </div>
      <div class="demo-node__content">
        <slot />
      </div>

      <div class="demo-node__outputs">
        <slot name="outputs" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .demo-node {
    background: #141818;
    color: #ffffff;
    display: flex;
    border-radius: 5px;
    min-width: 150px;
    flex-direction: column;

    &__header {
      background: #30373e;
      color: white;
      padding: 8px;
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &__main {
      display: flex;
      justify-content: space-between;
      padding: 8px;
    }

    &__inputs, &__outputs {
      display: flex;
      flex-direction: column;
    }

    &__inputs {
      padding-right: 4px;
    }

    &__outputs {
      padding-left: 4px;
    }

    &__content {
      width: 100%;
      text-align: left;
    }
  }
</style>