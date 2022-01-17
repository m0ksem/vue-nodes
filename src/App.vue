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

    <p>This is a math example, where you can create math expressions.</p>

    <p>You have two "Number" inputs and can connect them trough math nodes.</p>

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
              color="linear-gradient(145deg, #ff4e50, #f9d423)"
              :title="point.title"
            >
              <div v-if="node.math === 'print'">{{ result }}</div>
            </DemoButton>     
          </template>
        </template>

        <template #outputs>
          <template v-for="(point, pointName) in node.points" :key="pointName">
            <DemoButton
              v-if="point.type === 'output'"
              @register-point="registerPoint(node, pointName)($event)"
              @circle-click="connectFrom(node, pointName)"
              color="linear-gradient(to right, #1d976c, #93f9b9)"
              :title="point.title"
              right
            >     
              <input v-if="node.value !== undefined" v-model="node.value" />
            </DemoButton>    
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
  background: linear-gradient(114deg, #a770ef, #cf8bf3, #fdb99b);
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
