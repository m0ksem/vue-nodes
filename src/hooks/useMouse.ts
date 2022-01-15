import { ref, Ref, onMounted, onBeforeUnmount, unref } from 'vue'

const useHook = () => { 
  const handler = { cb: undefined as any }

  const create = (cb: (...args: any[]) => any) => {
    handler.cb = cb
  }

  const call = (...args: any[]) => {
    if (handler.cb) { handler.cb(...args) }
  }

  return { create, call }
}

export const useMouse = (target?: HTMLElement | Ref<HTMLElement>) => {
  const mouse = ref({ x: 0, y: 0 })
  const mousemove = ref({ x: 0, y: 0 })
  const buttons = ref({ left: false, middle: false, right: false })

  const safeTarget = (unref(target) || window) as HTMLElement

  const mouseDownHandler = (e: MouseEvent) => {
    if (e.button === 1) { buttons.value.left = true; }
    if (e.button === 4) { buttons.value.middle = true; }
    if (e.button === 2) { buttons.value.right = true; }
  }

  const mouseUpHandler = (e: MouseEvent) => {
    if (e.button === 1) { buttons.value.left = false; }
    if (e.button === 4) { buttons.value.middle = false; }
    if (e.button === 2) { buttons.value.right = false; }
  }

  const moveHandler = (e: MouseEvent) => {
    mouse.value = { x: e.x, y: e.y }
    mousemove.value = { x: e.movementX, y: e.movementY }
  }

  onMounted(() => {
    safeTarget.addEventListener('mousedown', mouseDownHandler)
    safeTarget.addEventListener('mouseup', mouseUpHandler)
    safeTarget.addEventListener('mousemove', moveHandler)
  })

  const getTargetSizes = () => {
    if (!safeTarget.getBoundingClientRect) {
      return { width: window.innerWidth, height: window.innerHeight }
    }

    return safeTarget.getBoundingClientRect()
  }

  const normalize = () => {
    if (!safeTarget) { return { x: 0, y: 0 } }

    const { width, height } = getTargetSizes()

    return {
      x: mouse.value.x - (width / 2),
      y: mouse.value.y - (height / 2)
    }
  }


  onBeforeUnmount(() => {
    safeTarget.removeEventListener('mousedown', mouseDownHandler)
    safeTarget.removeEventListener('mouseup', mouseUpHandler)
    safeTarget.removeEventListener('mousemove', moveHandler)
  })

  safeTarget.oncontextmenu = (e: MouseEvent) => e.preventDefault()

  return {
    mouse,
    mousemove,
    buttons,
    normalize,
  }
}