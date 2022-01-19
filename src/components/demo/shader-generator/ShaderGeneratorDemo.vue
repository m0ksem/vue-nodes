<script setup lang="ts">
import NodesCanvas from '../../Nodes.vue'
import DemoHeader from '../DemoHeader.vue';
import { ref } from 'vue'
import { useConnections } from '../../../hooks/useConnections';
import type { Connection, ShaderNode } from './nodes';
import { createSourceNode, createTimeNode, createFragmentShaderNode, createVec4Node, createOutputNode, createMathNode } from './nodes'

const items = ref<ShaderNode<any>[]>([
  createTimeNode({ x: -300, y: 0 }),
  (() => {
    const math = createMathNode({ x: 0, y: 0 })
    math.value.fn = 'sin'
    return math
  })(),
  (() => {
    const math = createMathNode({ x: 0, y: 100 })
    math.value.fn = 'cos'
    return math
  })(),
  (() => {
    const vec4 = createVec4Node({ x: 300, y: 0 })
    vec4.value.z = 1;
    vec4.value.w = 1;
    return vec4
  })(),
  createFragmentShaderNode({ x: -300, y: -200 }),
  createSourceNode({ x: 100, y: -300 }), 
  createOutputNode({ x: 500, y: 300 })
])

const connections = ref<Connection<ShaderNode>[]>([
  { start: { node: items.value[0], point: 'out' }, end: { node: items.value[1], point: 'in' }},
  { start: { node: items.value[0], point: 'out' }, end: { node: items.value[2], point: 'in' }},
  // Vec4
  { start: { node: items.value[1], point: 'out' }, end: { node: items.value[3], point: 'x' }},
  { start: { node: items.value[2], point: 'out' }, end: { node: items.value[3], point: 'y' }},

  { start: { node: items.value[3], point: 'out' }, end: { node: items.value[4], point: 'in' }},
  { start: { node: items.value[4], point: 'out' }, end: { node: items.value[5], point: 'in' }},

  { start: { node: items.value[5], point: 'out' }, end: { node: items.value[6], point: 'in' }},
])

const { connectFrom, connectTo, registerPoint } = useConnections(connections)
</script>

<template>
  <div class="demo">
    <DemoHeader>
      <h1>Vue nodes demo</h1>

      <p>This is a math example, where you can create math expressions.</p>

      <p>You have two "Number" inputs and can connect them trough math nodes.</p>
    </DemoHeader>

    <NodesCanvas v-model:nodes="items" v-model:connections="connections">
      <template #node-content="{ node }">
        <component
          :is="(node as ShaderNode).component"
          :connections="connections"
          :node="node"
          :register-point="registerPoint"
          @connect-from="connectFrom((node as ShaderNode) , $event)"
          @connect-to="connectTo((node as ShaderNode), $event)"
        />
      </template>
    </NodesCanvas>  
  </div>
</template>

<style lang="scss">
.demo {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-weight: bold;
  display: flex;
}

body { 
  margin: 0;
}

.nodes {
  flex: 1;
}
</style>
