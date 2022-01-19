<script setup lang="ts">
import { computed, PropType, toRef } from 'vue';
import DemoNode from "../../../DemoNode.vue";
import DemoButton from "../../../DemoButton.vue";
import DemoInput from "../../../DemoInput.vue";
import { ShaderGeneratorNode, Node, Connection, GenerateFnResult } from '../types';
import { Shader2D, VueGLSLReadyEvent } from '@m0ksem/vue-glsl'
import { useConnections } from '../../../../../hooks/useConnections';

const props = defineProps({
  node: { type: Object as PropType<ShaderGeneratorNode>, required: true },
  registerPoint: { type: Function as PropType<(node: ShaderGeneratorNode, point: string) => (el: any) => void>, required: true },
  connections: { type: Array as PropType<Connection<ShaderGeneratorNode>[]>, required: true }
})

defineEmits({
  'register-point': (pointName: string, el: HTMLElement) => true,
  'connect-to': (pointName: string) => true,
  'connect-from': (pointName: string) => true,
})

const { recursivePath, findConnection } = useConnections(toRef(props, 'connections'))

const isTimeUniformUsed = computed(() => path.value.uniforms?.find((u) => u.name === 'u_time'))

const onCanvasReady = ({ draw, getUniform, gl }: VueGLSLReadyEvent) => {
    draw(() => {
      path.value.uniforms?.forEach((u) => {
      if (u.type === 'float') {
        gl.uniform1f(getUniform(u.name), u.value())
      }
    })
  
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    })
}

const path = computed(() => {
  const result = recursivePath((o) => {
    return props.node.generate(o)
  }, {} as GenerateFnResult, props.node)

  return result
})

const shaderSource = computed(() => path.value.code)
</script>

<template>
  <DemoNode class="demo-out-node" :title="node.title">
    <Shader2D v-if="shaderSource" :fragment="shaderSource" @ready="onCanvasReady"/>
    <template #inputs>
      <DemoButton color="linear-gradient(145deg, #ff4e50, #f9d423)" @register-point="registerPoint(node, 'in')($event)" @circle-click="$emit('connect-to', 'in')"/>
    </template>
  </DemoNode>
</template>

<style lang="scss">
.demo-out-node {
  canvas { 
    border-radius: 5px;
  }
}
</style>