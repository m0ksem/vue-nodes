<script setup lang="ts">
import { ref, PropType } from 'vue'
import { useItemRefs } from '../hooks/useItemRefs'
import { useSyncProp } from '../hooks/useSyncProp'
import type { Node } from '../types/'

const emit = defineEmits(['update:nodes', 'update:hovered', 'update:selected', 'update:mouse'])

const props = defineProps({
  nodes: { type: Array as PropType<Node[]>, required: true }
})

const canvas = ref<HTMLElement>()
const [syncNodes] = useSyncProp(props, 'nodes', emit)
const { itemRefs, setItemRef } = useItemRefs<HTMLElement>()

const selectedItemIndex = ref(-1)
const hoveredItemIndex = ref(-1)

let timer = -1
const onNodeMouseEnter = (index: number) => {
  hoveredItemIndex.value = index
  clearTimeout(timer)
}

const onNodeMouseLeave = (index: number) => {
  hoveredItemIndex.value = -1
  timer = setTimeout(() => selectedItemIndex.value = -1, 2000)
}

const itemClickOffset = ref({ x: 0, y: 0 })

const onMouseDown = (e: MouseEvent) => {
  if (hoveredItemIndex.value === -1) { return }

  const { x, y } = itemRefs.value[hoveredItemIndex.value].getBoundingClientRect()
  
  itemClickOffset.value = { x: e.x - x, y: e.y - y }

  selectedItemIndex.value = hoveredItemIndex.value
}

const onMouseUp = () => { selectedItemIndex.value = -1 }

const onMouseMove = (e: MouseEvent) => {
  if (selectedItemIndex.value === -1) { return }

  const { 
    x: canvasX, y: canvasY, 
    width: canvasWidth, height: canvasHeight
  } = canvas.value!.getBoundingClientRect()

  const {
    width: itemWidth, height: itemHeight
  } = itemRefs.value[selectedItemIndex.value].getBoundingClientRect()

  const scale = {
    x: canvas.value!.offsetWidth / canvasWidth,
    y: canvas.value!.offsetHeight / canvasHeight
  }

  const itemCenterCoords = {
    x: (e.x - canvasX - canvasWidth / 2 + itemWidth / 2),
    y: (e.y - canvasY - canvasHeight / 2 + itemHeight / 2)
  }

  const position = {
    x: (itemCenterCoords.x - itemClickOffset.value.x) * scale.x,
    y: (itemCenterCoords.y - itemClickOffset.value.y) * scale.y
  }

  const selectedItem = syncNodes.value[selectedItemIndex.value]
  
  selectedItem.position = position
}

const generateNodeTransformStyle = (node: Node) => {
  const position = node.position || { x: 0, y: 0 }

  return {
    transform: `translateX(${position.x}px) translateY(${position.y}px) translateX(-50%) translateY(-50%)`
  }
}
</script>

<template>
  <div 
    class="nodes-canvas"
    ref="canvas"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <div
      v-for="(node, index) in syncNodes" :key="index"
      class="nodes-canvas__node"
      :ref="setItemRef"
      :style="generateNodeTransformStyle(node)"
    >
      <slot 
        v-bind="{ 
          node, index,
          listeners: { 
            mouseenter: () => onNodeMouseEnter(index), 
            mouseleave: () => onNodeMouseLeave(index)
          }
        }"
        name="node"
      >
        <div
          @mouseenter="onNodeMouseEnter(index)"
          @mouseleave="onNodeMouseLeave(index)"
        >
          <slot name="node-content" v-bind="{ node, index }">
            <div class="nodes-canvas__node-content">
              {{ node }}
            </div>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
  .nodes-canvas {
    width: 100%;
    height: 100%;

    &__node {
      position: absolute;
      left: 50%;
      top: 50%;
    }

    &__node-content {
      background: #eeeeee;
      padding: 8px;
      user-select: none;
      cursor: pointer;
    }
  }
</style>