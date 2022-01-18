<script setup lang="ts">
import NodesCanvas from '../../Nodes.vue'
import DemoHeader from '../DemoHeader.vue';
import { computed, ref } from 'vue'
import { useConnections } from '../../../hooks/useConnections';
import type { ShaderGeneratorNode, Connection, Node } from './types';
import OutNode from './nodes/Out.vue'
import SourceNode from './nodes/Source.vue'
import ColorNode from './nodes/Color.vue'
import Fragment from './nodes/Fragment.vue';
import Vec4 from './nodes/Vec4.vue'
import Variable from './nodes/Variable.vue'
import Time from './nodes/Time.vue'

const items = ref<ShaderGeneratorNode[]>([
  {
    position: { x: 0, y: 0 },
    type: 'out',
    title: 'Out',
    points: {
      input: {}
    }
  },
  {
    position: { x: 0, y: 0 },
    type: 'source',
    title: 'Source',
    points: {
      input: {},
      out: {}
    }
  },
  {
    position: { x: -100, y: 0 },
    type: 'color',
    title: 'Color',
    points: {
      r: { default: 0, value: 0 },
      g: { default: 0, value: 0 },
      b: { default: 0, value: 0 },
      out: {}
    }
  },
  {
    position: { x: 0, y: 200 },
    type: 'fragment',
    title: 'Fragment Shader',
    points: {
      input: {},
      out: {}
    }
  },
  {
    position: { x: -350, y: 0 },
    type: 'vec4',
    title: 'Vec4',
    points: {
      x: { default: 0, value: 0 },
      y: { default: 0, value: 0 },
      z: { default: 0, value: 0 },
      w: { default: 0, value: 0 },
      out: {}
    }
  },
  {
    position: { x: 0, y: 500 },
    type: 'variable',
    title: 'Var',
    variable: {
      value: 0,
      type: 'float'
    },
    points: {
      in: {},
      out: {}
    }
  },
  {
    position: { x: 0, y: -300 },
    type: 'time',
    title: 'Time',
    variable: {
      value: 0,
    },
    points: {
      in: {},
      out: {}
    }
  },
])

const connections = ref<Connection<ShaderGeneratorNode>[]>([])

const { registerPoint, connectFrom, connectTo, searchConnection, disconnectEnd } = useConnections<ShaderGeneratorNode>(connections)

const shader = computed(() => `precision highp float;
void main() {
  gl_FragColor = vec4(sin(time), cos(time), sin(time), 1.0);
}
`)
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
        <OutNode 
          v-if="node.type === 'out'" 
          :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          :connections="connections"
          @circle-click="connectFrom((node as ShaderGeneratorNode) , $event[0])"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
        />
        <SourceNode 
          v-if="node.type === 'source'" 
          :shader="shader" 
          :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          :connections="connections"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
          />
        <ColorNode
          v-if="node.type === 'color'" :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
        />
        <Fragment
          v-if="node.type === 'fragment'" :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
        />
        <Vec4
          v-if="node.type === 'vec4'" :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
        />
        <Variable 
          v-if="node.type === 'variable'" :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
        />
        <Time 
          v-if="node.type === 'time'" :node="(node as ShaderGeneratorNode)"
          :register-point="registerPoint"
          @connect-to="connectTo((node as ShaderGeneratorNode), $event)"
          @connect-from="connectFrom((node as ShaderGeneratorNode), $event)"
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
