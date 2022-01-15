<script setup lang="ts">
import NodesCanvas from './components/Nodes.vue'
import DemoHeader from './components/demo/DemoHeader.vue';
import { ref } from 'vue'

const items = ref([
  {
    name: 'Item 1',
    position: { x: 0, y: 0 }
  },
  {
    name: 'Item 2',
    position: { x: -105, y: 100 }
  },
])
</script>

<template>
  <DemoHeader />
  <NodesCanvas v-model:nodes="items">
    <template #node-content="{ 
        node, disconnectListener, connectFromListeners, 
        connectTargetListeners, setConnectFromRef, setConnectToRef, 
      }">
      <div class="nodes-demo-item">
        {{ node.name }}

        <button v-bind="connectFromListeners" :ref="setConnectFromRef(node)">connect from</button>
        <button v-bind="connectTargetListeners" :ref="setConnectToRef(node)">connect to</button>
        <button v-bind="disconnectListener">disconnect</button>
      </div>
    </template>
  </NodesCanvas>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(153deg, #d1e2ff 0%, #e0bafa 50%, #9e81ce 100%);
  font-weight: bold;
  display: flex;
}

body { 
  margin: 0;
}

.nodes {
  flex: 1;
}

.nodes-demo-item {
  cursor: pointer;
  background-image: linear-gradient(
        40deg,
        #00fffc 0%,
        #fc00ff 45%,
        #fffc00 100%
      );
  padding: 16px;
  border-radius: 24px;
  color: white;

  button {
    padding: 8px 12px;

    &:first-child {
      margin-left: 0;
    }

    margin-left: 4px;
    background: black;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
  }
}
</style>
