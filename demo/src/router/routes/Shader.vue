<script setup lang="ts">
import { Nodes, useConnections } from '../../../../src'
import { ref } from 'vue'
import type { Connection, ShaderNode } from '../../demo/shader/nodes';
import { itemsPreset, connectionsPreset } from '../../demo/shader/preset'
import AppLayout from '../../components/AppLayout.vue'
import AppButton from '../../components/AppButton.vue'
import AppSelect from '../../components/AppSelect.vue'

const items = ref<ShaderNode<any>[]>(itemsPreset)

const connections = ref<Connection<ShaderNode>[]>(connectionsPreset)

const { connectFrom, connectTo, registerPoint } = useConnections(connections)
</script>

<template>
  <AppLayout>
    <template #sidebar>
      <p>This is a shader generator example, where you can create GLSL shader and preview it.</p>
      
      <AppSelect />
      <AppButton class="add-node-btn">
        Add node
      </AppButton>
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

<style lang="scss">
.add-node-btn {
  margin-top: 15px;
}
</style>