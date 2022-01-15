<script setup lang="ts">
import ScrollWrapper from './ScrollWrapper.vue'
import DraggableNodes from './DraggableNodes.vue';
import ConnectionsCanvas from './ConnectionsCanvas.vue';
import { PropType, ref, toRef, unref } from 'vue'
import { useSyncProp } from '../hooks/useSyncProp';
import { useConnections } from '../hooks/useConnections';
import type { Connection, Node } from '../types/'

const emit = defineEmits(['update:nodes', 'update:hovered', 'update:selected', 'update:mouse'])

const props = defineProps({
  nodes: { type: Array as PropType<Node[]>, required: true },
  connections: { type: Array as PropType<Connection[]>, required: true },
  // Preferences
  moveButton: { type: String as PropType<'right' | 'left' | 'middle'>, default: 'right' },
})

const connectionsProp = toRef(props, 'connections')

const [syncNodes] = useSyncProp(props, 'nodes', emit)
const [syncConnections] = useSyncProp(props, 'connections', emit)

const connectionsRef = ref<HTMLElement>()
const { connectFrom, connectTo, disconnect, connections, setConnectFromRef, setConnectToRef } = useConnections(connectionsRef.value!, syncConnections)
</script>

<template>
  <ScrollWrapper :moveButton="moveButton" class="nodes">
    <DraggableNodes v-model:nodes="syncNodes">
      <template #node="{ node, index, listeners }">
        <slot name="node" v-bind="{
          node, index, 
          setConnectFromRef,
          setConnectToRef,
          dragListeners: listeners,
          connectFromListeners: {
            onclick: (e: MouseEvent) => connectFrom(node)
          },
          connectTargetListeners: {
            onclick: (e: MouseEvent) => connectTo(node)
          }
        }"/>
      </template>
      <template #node-content="{ node, index }">
        <slot name="node-content" v-bind="{
          node, index,
          setConnectFromRef,
          setConnectToRef,
          connectFromListeners: {
            onclick: (e: MouseEvent) => connectFrom(node)
          },
          connectTargetListeners: {
            onclick: (e: MouseEvent) => connectTo(node)
          },
          disconnectListener: {
            onclick: () => disconnect(node)
          }
        }"/>
      </template>
    </DraggableNodes>
    <ConnectionsCanvas :connections="connections" ref="connectionsRef" class="nodes__connections-canvas"/>
  </ScrollWrapper>
</template>

<style lang="scss">
  .nodes {
    position: relative;

    &__connections-canvas {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
</style>