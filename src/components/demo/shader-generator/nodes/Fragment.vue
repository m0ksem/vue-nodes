<script setup lang="ts">
import { PropType } from 'vue';
import DemoNode from '../../DemoNode.vue'
import DemoButton from '../../DemoButton.vue';
import DemoInput from '../../DemoInput.vue'
import { ShaderGeneratorNode, Node } from '../types';

const props = defineProps({
  node: { type: Object as PropType<ShaderGeneratorNode>, required: true },
  registerPoint: { type: Function as PropType<(node: ShaderGeneratorNode, point: string) => (el: any) => void>, required: true }
})

defineEmits({
  'register-point': (pointName: string, el: HTMLElement) => true,
  'connect-to': (pointName: string) => true,
  'connect-from': (pointName: string) => true,
})
</script>

<template>
  <DemoNode :title="node.title">
    <template #inputs>
      <DemoButton color="red" @register-point="registerPoint(node, 'input')($event)" @circle-click="$emit('connect-to', 'input')" />
    </template>

    <template #outputs>
      <DemoButton color="blue" right @register-point="registerPoint(node, 'out')($event)" @circle-click="$emit('connect-from', 'out')"/>
    </template>
  </DemoNode>
</template>

<style lang="scss">
.demo-node-shader-source {
  background: #444;
  padding: 8px;
  white-space: pre;
}
</style>
