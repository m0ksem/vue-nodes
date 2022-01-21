<script setup lang="ts">
// @ts-ignore
import { Nodes, useConnections } from '../../../../src'
import { ref } from 'vue'
import type { Connection, ShaderNode } from '../../demo/shader/nodes';
import { itemsPreset, connectionsPreset } from '../../demo/shader/preset'
import AppLayout from '../../components/AppLayout.vue'

const items = ref<ShaderNode<any>[]>(itemsPreset)

const connections = ref<Connection<ShaderNode>[]>(connectionsPreset)

const { connectFrom, connectTo, registerPoint } = useConnections(connections)
</script>

<template>
  <AppLayout>
    <template #sidebar>
      <p>This is a shader generator example, where you can create GLSL shader and preview it.</p>
    </template>

    <Nodes v-model:nodes="items" v-model:connections="connections">
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
    </Nodes>  
  </AppLayout>
</template>
