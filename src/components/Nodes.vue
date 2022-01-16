<script setup lang="ts">
import ScrollWrapper from './ScrollWrapper.vue'
import DraggableNodes from './DraggableNodes.vue';
import ConnectionsCanvas from './ConnectionsCanvas.vue';
import { PropType, ref, toRef, unref } from 'vue'
import { useSyncProp } from '../hooks/useSyncProp';
import { useConnectionRender } from '../hooks/useConnections';
import type { Connection, Node } from '../types/'

const emit = defineEmits(['update:nodes', 'update:connections', 'update:mouse'])

const props = defineProps({
  nodes: { type: Array as PropType<Node[]>, required: true },
  connections: { type: Array as PropType<Connection[]>, required: true },
  // Preferences
  moveButton: { type: String as PropType<'right' | 'left' | 'middle'>, default: 'right' },
})

const [syncNodes] = useSyncProp(props, 'nodes', emit)
const [syncConnections] = useSyncProp(props, 'connections', emit)

const connectionsRef = ref<HTMLElement>()
const { connectionPoints } = useConnectionRender(syncConnections, connectionsRef.value!)
</script>

<template>
  <ScrollWrapper :moveButton="moveButton" class="nodes">
    <DraggableNodes v-model:nodes="syncNodes">
      <template #node="{ node, index, listeners }">
        <slot name="node" v-bind="{ node, index, dragListeners: listeners }"/>
      </template>
      <template #node-content="{ node, index }">
        <slot name="node-content" v-bind="{ node, index }"/>
      </template>
    </DraggableNodes>
    <ConnectionsCanvas :connections="connectionPoints" ref="connectionsRef" class="nodes__connections-canvas"/>
  </ScrollWrapper>
</template>

<style lang="scss">
  .nodes {
    position: relative;

    &__connections-canvas {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translateY(-50%) translateX(-50%);
      z-index: -1;
    }
  }
</style>