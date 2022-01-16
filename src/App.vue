<script setup lang="ts">
import NodesCanvas from './components/Nodes.vue'
import DemoHeader from './components/demo/DemoHeader.vue';
import DemoNode from './components/demo/DemoNode.vue'
import DemoButton from './components/demo/DemoButton.vue'
import { computed, ref } from 'vue'
import { useConnections } from './hooks/useConnections'
import { Connection, Node } from './types';

const items = ref<Node[]>([
  {
    position: { x: -300, y: -100 }, 
    math: 'input',
    title: 'Number',
    points: {
      'output': { type: 'output' },
    },
    value: 0,
  },
    {
    position: { x: -300, y: 100 }, 
    math: 'input',
    title: 'Number',
    points: {
      'output': { type: 'output' },
    },
    value: 0,
  },
  {
    position: { x: 0, y: 100 }, 
    math: '+',
    title: 'Sum',
    points: {
      'input1': { type: 'input', title: 'Number' },
      'input2': { type: 'input', title: 'Number' },
      'output': { type: 'output' },
    }
  },
  {
    position: { x: 0, y: -100 }, 
    math: '*',
    title: 'Mul',
    points: {
      'input1': { type: 'input', title: 'Number' },
      'input2': { type: 'input', title: 'Number' },
      'output': { type: 'output' },
    }
  },
  {
    position: { x: 150, y: 0 }, 
    math: 'print',
    title: 'Output',
    points: {
      'input': { type: 'input' },
    }
  },
])

const connections = ref<Connection[]>([])

const { registerPoint, connectFrom, connectTo, searchConnection, disconnectEnd } = useConnections(connections)

const calculate = () => {
  const start = connections.value.find((c) => typeof c.end !== 'string' && c.end.node.math === 'print')

  const getRecursiveResult = (connection: Connection | undefined): undefined | number => {
    if (connection === undefined) { return 0 }

    if (typeof connection.end === 'string' || typeof connection.start === 'string') { return 0 }

    const start = connection.start.node

    if (start.math === '+') {
      const input1 = getRecursiveResult(searchConnection(undefined, 'output', start, 'input1'))
      const input2 = getRecursiveResult(searchConnection(undefined, 'output', start, 'input2'))

      if (input1 === undefined || input2 === undefined) { return 0 }

      return Number(input1) + Number(input2)
    }

    if (start.math === '*') {
      const input1 = getRecursiveResult(searchConnection(undefined, 'output', start, 'input1'))
      const input2 = getRecursiveResult(searchConnection(undefined, 'output', start, 'input2'))

      if (input1 === undefined || input2 === undefined) { return 0 }

      return Number(input1) * Number(input2)
    }

    if (start.math === 'input') {
      return start.value
    }
  }

  return getRecursiveResult(start)
}

const result = computed(() => calculate())
</script>

<template>
  <DemoHeader>
    <h1>Vue nodes demo</h1>
  </DemoHeader>
  <NodesCanvas v-model:nodes="items" v-model:connections="connections">
    <template #node-content="{ node }">
      <DemoNode :title="node.title">
        <template #inputs>
          <template v-for="(point, pointName) in node.points" :key="pointName">
            <DemoButton
              v-if="point.type === 'input'"
              @register-point="registerPoint(node, pointName)($event)"
              @circle-click="disconnectEnd(node, pointName); connectTo(node, pointName)"
              color="#ffbb55"
              :title="point.title"
            />        
          </template>
        </template>

        <input v-if="node.value !== undefined" v-model="node.value" />
        <div v-if="node.math === 'print'">{{ result }}</div>

        <template #outputs>
          <template v-for="(point, pointName) in node.points" :key="pointName">
            <DemoButton
              v-if="point.type === 'output'"
              @register-point="registerPoint(node, pointName)($event)"
              @circle-click="connectFrom(node, pointName)"
              color="#137261"
              :title="point.title"
              right
            />         
          </template>
        </template>
      </DemoNode>
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

// .nodes-demo-item {
//   cursor: pointer;
//   background-image: linear-gradient(
//         40deg,
//         #00fffc 0%,
//         #fc00ff 45%,
//         #fffc00 100%
//       );
//   padding: 16px;
//   border-radius: 24px;
//   color: white;
//   display: flex;
//   flex-direction: column;

//   button {
//     padding: 8px 12px;

//     &:first-child {
//       margin-top: 0;
//     }

//     margin-top: 4px;
//     background: black;
//     color: white;
//     font-weight: bold;
//     border: none;
//     border-radius: 4px;
//   }
// }
</style>
