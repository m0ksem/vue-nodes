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
    background: linear-gradient(116deg, #232526, #414345);
    color: #ffffff;
    display: flex;
    border-radius: 5px;
    min-width: 150px;
    flex-direction: column;

    &__header {
      background: linear-gradient(35deg, #2193b0, #6dd5ed);
      color: white;
      padding: 8px;
      cursor: pointer;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    &__main {
      display: flex;
      justify-content: space-between;
      padding: 12px 8px;
      font-size: 14px;
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

    input {
      padding: 4px 8px;
      background: linear-gradient(243deg, #8e2de2, #4a00e0);
      border: none;
      color: white;
      border-radius: 4px;
    }
  }
</style>