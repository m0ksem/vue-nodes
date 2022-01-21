<script lang="ts" setup>
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <div class="app-layout">
    <AppSidebar>
      <slot name="sidebar"/>
    </AppSidebar>

    <div class="app-page">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.app-layout {
  height: 100vh;
  width: 100vw;
  display: flex;
}

.app-page {
  flex: 1;
  width: 100%;
}
</style>