<script setup lang="ts">
import { computed, PropType, toRef } from "vue";
import { Connection, ShaderGeneratorNode } from "../types";
import { GenerateFnResult, ShaderNode } from "../types";
import { useConnections } from '../../../../../../src';

const props = defineProps({
  node: { type: Object as PropType<ShaderNode>, required: true },
  registerPoint: {
    type: Function as PropType<
      (node: ShaderNode, point: string) => (el: any) => void
    >,
    required: true,
  },
  connections: { type: Array as PropType<Connection<ShaderNode>[]>, required: true }
});

defineEmits({
  "register-point": (pointName: string, el: HTMLElement) => true,
  "connect-to": (pointName: string) => true,
  "connect-from": (pointName: string) => true,
});

const { recursivePath } = useConnections<ShaderNode>(toRef(props, 'connections'))

const source = computed(() => {
  const result = recursivePath((o) => {
    return props.node.generate(o)
  }, {} as GenerateFnResult, props.node)

  return result?.code
})
</script>

<template>
  <DemoNode :title="node.title">
    <template #inputs>
      <DemoButton
        v-for="pointName in ['in']"
        :key="pointName"
        color="linear-gradient(145deg, #ff4e50, #f9d423)"
        @register-point="registerPoint(node, pointName)($event)"
        @circle-click="$emit('connect-to', pointName)"
      >
      </DemoButton>
    </template>

    <div v-if="source" class="demo-node-shader-source">
       {{ source }}
    </div>
    <div v-else>
       Connect some node
    </div>

 
    <template #outputs>
      <DemoButton
        v-for="pointName in ['out']"
        :key="pointName"
        color="linear-gradient(to right, #1d976c, #93f9b9)"
        right
        @register-point="registerPoint(node, pointName)($event)"
        @circle-click="$emit('connect-from', pointName)"
      />
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
