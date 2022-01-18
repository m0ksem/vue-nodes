<script setup lang="ts">
import { computed, PropType, toRef } from 'vue';
import DemoNode from '../../DemoNode.vue'
import DemoButton from '../../DemoButton.vue';
import { ShaderGeneratorNode, Node, Connection } from '../types';
import { Shader2D, VueGLSLReadyEvent } from '@m0ksem/vue-glsl'
import { useConnections } from '../../../../hooks/useConnections';

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

const { searchConnection, isNodeConnection, findConnection } = useConnections(toRef(props, 'connections'))

const isTimeUniformUsed = computed(() => findConnection((con) => con.start.node.type === 'time'))
let time = 0;

const onCanvasReady = ({ draw, getUniform, gl }: VueGLSLReadyEvent) => {
    let lastFrame = Date.now();
    let thisFrame: number;

    // Will be executed each frame
    draw(() => {
      if (isTimeUniformUsed.value) {
        thisFrame = Date.now();
        time += (thisFrame - lastFrame) / (100 * 60);	
        lastFrame = thisFrame;

        gl.uniform1f(getUniform('time'), time)
      }
  
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    })
}

const shaderSource = computed(() => {
  const connection = searchConnection(undefined, undefined, props.node, undefined)

  if (connection && isNodeConnection(connection)) {
    if (connection.start.node.type === 'source') {
      return connection.start.node.value
    }
  }

  return ''
})
</script>

<template>
  <DemoNode :title="node.title">
    <Shader2D v-if="shaderSource" :fragment="shaderSource" @ready="onCanvasReady"/>
    <template #inputs>
      <DemoButton color="red" @register-point="registerPoint(node, 'input')($event)" @circle-click="$emit('connect-to', 'input')"/>
    </template>
  </DemoNode>
</template>