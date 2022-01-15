<script setup lang="ts">
import NodesCanvas from './components/Nodes.vue'
import DemoHeader from './components/demo/DemoHeader.vue';
import { computed, ref } from 'vue'
import { useConnectionsPath } from './hooks/useConnectionsPath'

const items = ref([
  { position: { x: 0, y: 0 }, color: '#00fffc' },
  { position: { x: -200, y: 100 }, color: '#fc00ff', },
  { position: { x: 105, y: 200 }, color: '#fffc00' },
  { position: { x: 205, y: -200 }, color: '#6AB547' },
  { position: { x: 305, y: 0 }, color: '#63326E' },
])

const connections = ref([
  {
    start: items.value[0],
    end: items.value[1]
  }
])

const { generateCircularPath } = useConnectionsPath(connections)

const path = computed(() => generateCircularPath())

const gradientStyle = computed(() => {
  if (path.value.length === 1) { return `linear-gradient(40deg, #fff 0%, #fff 100%)`}

  const colors = path.value
    .map((cur, index) => `${cur.color} ${index * (100 / (path.value.length - 1))}%`).join(', ')

  return `linear-gradient(40deg, ${colors})`
}

)
</script>

<template>
  <DemoHeader>
    <h1 :style="{ backgroundImage: gradientStyle }">Vue nodes demo</h1>
  </DemoHeader>
  <NodesCanvas v-model:nodes="items" v-model:connections="connections">
    <template #node-content="{ 
        node, disconnectListener, connectFromListeners, 
        connectTargetListeners, setConnectFromRef, setConnectToRef, 
      }">
      <div class="nodes-demo-item" :style="{ background: node.color }">
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
  display: flex;
  flex-direction: column;

  button {
    padding: 8px 12px;

    &:first-child {
      margin-top: 0;
    }

    margin-top: 4px;
    background: black;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 4px;
  }
}
</style>
