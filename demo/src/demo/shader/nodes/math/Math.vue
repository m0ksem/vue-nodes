<script setup lang="ts">
import { PropType, toRef } from "vue";
import { Connection, ShaderNode, useConnections } from "../types";

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

const { searchConnection } = useConnections(toRef(props, 'connections'))

const isConnected = (pointName: string) => !searchConnection(undefined, undefined, props.node, pointName)
</script>

<template>
  <DemoNode :title="node.title">
    <template #inputs>
      <DemoInput style="margin-left: 8px;" v-model="node.value.fn" />
      <DemoButton
        v-for="pointName in ['in']"
        :key="pointName"
        color="linear-gradient(145deg, #ff4e50, #f9d423)"
        @register-point="registerPoint(node, pointName)($event)"
        @circle-click="$emit('connect-to', pointName)"
      >
        <DemoInput v-if="isConnected(pointName)" v-model="node.value.in" />
      </DemoButton>
    </template>

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
