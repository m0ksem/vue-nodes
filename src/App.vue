<script setup lang="ts">
import NodesCanvas from './components/Nodes.vue'
import { ref } from 'vue'

const items = ref([
  {
    name: 'Hello!',
    position: { x: 0, y: 0 }
  },
    {
    name: 'Hello!',
    position: { x: 100, y: 100 }
  },
])
</script>

<template>
  <NodesCanvas v-model:nodes="items">
    <template #node-content="{ node, disconnectListener, connectFromListeners, connectTargetListeners }">
      {{ node.name }}

      <button v-bind="connectFromListeners">connect from</button>
      <button v-bind="connectTargetListeners">connect to</button>
      <button v-bind="disconnectListener">disconnect</button>
    </template>
  </NodesCanvas>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}

body { 
  margin: 0;
}
</style>
