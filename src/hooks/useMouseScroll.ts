import { onMounted, Ref, ref, unref } from "vue"

type Options = {
  max?: number,
  min?: number,
  speed?: number
}

const defaultOptions = {
  max: 10,
  min: -10,
  speed: 0.1
}

export const useMouseScroll = (target?: HTMLElement | Ref<HTMLElement>, options?: Options) => {
  const scroll = ref(0)
  const safeTarget = (unref(target) || window) as HTMLElement
  const { max, min, speed} = { ...defaultOptions, ...options }

  const wheelHandler = (e: WheelEvent) => {
    const direction = e.deltaY / Math.abs(e.deltaY)
    const newVal = scroll.value + speed * direction

    if (newVal > max || newVal < min) { return }
    scroll.value = newVal
  }

  onMounted(() => {
    safeTarget.addEventListener('wheel', wheelHandler);
  })

  return {
    scroll
  }
}