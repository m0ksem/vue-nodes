<script setup lang="ts">
import { onMounted, ref, PropType, onBeforeUnmount } from 'vue'
import type { Point, DrawConnectionFn, ConnectionPoint } from '../types'

const props = defineProps({
  connections: { type: Array as PropType<{ start: ConnectionPoint, end: ConnectionPoint }[]>, required: true },
  drawFn: { type: Function as PropType<DrawConnectionFn>, default: (ctx: CanvasRenderingContext2D, start: Point, end: Point) => {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
  }}
})

const canvas = ref<HTMLCanvasElement>()
const context = ref<CanvasRenderingContext2D>()

const getVueElement = (comp: any): HTMLElement => {
  if ('$el' in comp) return comp.$el
  return comp
}

const safePoint = (point: Point | HTMLElement) => {
  if (!point) return { x: 0, y: 0 }

  if ('x' in point && 'y' in point) {
    return point
  }

  const el = getVueElement(point)

  const { x, y, width, height } = el.getBoundingClientRect()

  return {
    x: (x + width / 2),
    y: (y + height / 2)
  }
}

const transformPoint = (point: Point, translate: Point, scale: Point) => {
  return {
    x: (point.x - translate.x) * scale.x,
    y: (point.y - translate.y) * scale.y
  }
}

const draw = () => {
  if (!canvas.value) { return }

  const ctx = context.value as CanvasRenderingContext2D
  const w = canvas.value?.width || 0
  const h = canvas.value?.height || 0
  ctx.lineWidth = 12;
  ctx.strokeStyle = 'gray'
  ctx.clearRect(0, 0, w, h)

  const { x: canvasX, y: canvasY, width: canvasWidth, height: canvasHeight } = canvas.value.getBoundingClientRect()
  const canvasOffset = {
    x: canvasX,
    y: canvasY,
  }

  const canvasScale = {
    x: canvas.value!.offsetWidth / canvasWidth,
    y: canvas.value!.offsetHeight / canvasHeight
  }

  props.connections.forEach((connection) => {
    const start = safePoint(connection.start)
    const end = safePoint(connection.end)

    props.drawFn(ctx, transformPoint(start, canvasOffset, canvasScale), transformPoint(end, canvasOffset, canvasScale))
  })
}

const render = () => {
  requestAnimationFrame(() => {
    draw()
    render()
  })    
}

const updateCanvasHeight = () => {
  if (!canvas.value) { return }

  const { width, height } = canvas.value.getBoundingClientRect()

  canvas.value.height = height
  canvas.value.width = width
}

let observer: ResizeObserver 

onMounted(() => {
  if (!canvas.value) { return }

  updateCanvasHeight()

  context.value = canvas.value.getContext('2d') as CanvasRenderingContext2D

  render()

  observer = new ResizeObserver(updateCanvasHeight)
  observer.observe(canvas.value)
})

onBeforeUnmount(() => {
  observer.disconnect()
})
</script>

<template>
  <canvas ref="canvas" />
</template>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
}
</style>