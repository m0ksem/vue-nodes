<script setup lang="ts">
import { computed, PropType, toRef, watch } from 'vue';
import DemoNode from '../../DemoNode.vue'
import DemoButton from '../../DemoButton.vue';
import { ShaderGeneratorNode, Node, Connection } from '../types';
import { useConnections } from '../../../../hooks/useConnections';

const props = defineProps({
  node: { type: Object as PropType<ShaderGeneratorNode>, required: true },
  shader: { type: String, required: true },
  registerPoint: { type: Function as PropType<(node: Node<ShaderGeneratorNode>, point: string) => (el: any) => void>, required: true },
  connections: { type: Array as PropType<Connection<ShaderGeneratorNode>[]>, default: () => []}
})

defineEmits({
  'register-point': (pointName: string, el: HTMLElement) => true,
  'connect-to': (pointName: string) => true,
  'connect-from': (pointName: string) => true,
})

const { recursivePath, findConnection } = useConnections<ShaderGeneratorNode>(toRef(props, 'connections'))

const result = computed(() => {
  const variables: { type: string, value: string, name: string }[] = []
  const uniforms: { type: string, name: string }[] = []

  const generated = recursivePath(({ node, point }, next, first) => {
    if (first.node.type !== 'source') { return 'Await for connection' }

    if (node.type === 'source') {
      return '' + next()
    }

    if (node.type === 'color') {
      return `${next('r') || node.points.r.value}, ${node.points.g.value}, ${node.points.b.value}`
    }

    if (node.type === 'fragment') {
      return `gl_FragColor = ${next()}`
    }

    if (node.type === 'variable') {
      variables.push(node.variable)
      return `${next() || node.variable.name}`
    }

    if (node.type === 'vec4') {
      return `vec4(${next('x') || node.points.x.value}, ${next('y') || node.points.y.value}, ${next('z') || node.points.z.value}, ${next('w') || node.points.w.value})`
    }

    if (node.type === 'time') {
      if (!uniforms.find((u) => u.name === 'time')) {
        uniforms.push({ type: 'float', name: 'time' })
      }
  
      return 'time'
    }

    if (node.type === 'math') {
      return `${node.function}(${next()})`
    }

    return ''
  }, '', findConnection(({ end }) => end.node.type === 'source' ))

  if (!generated) {
    return ''
  }

  return `precision highp float;
${uniforms.map((uniform) => `uniform ${uniform.type} ${uniform.name};`).join('\n')}

void main() {
  ${variables.map((variable) => `${variable.type} ${variable.name} = ${variable.value};`).join('\n')}

  ${generated};
}
  `
})

watch(result, (shaderSource) => {
  props.node.value = shaderSource
})
</script>

<template>
  <DemoNode :title="node.title">
    <div class="demo-node-shader-source">
      {{ result }}
    </div>
    <template #inputs>
      <DemoButton color="red" @register-point="registerPoint(node, 'input')($event)" @circle-click="$emit('connect-to', 'input')"/>
    </template>
    <template #outputs>
      <DemoButton right color="blue" @register-point="registerPoint(node, 'out')($event)" @circle-click="$emit('connect-from', 'out')"/>
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
