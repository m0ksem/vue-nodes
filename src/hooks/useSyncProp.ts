import { computed } from 'vue'

export const useSyncProp = <T extends Record<string, any>, N extends string, K extends `update:${N}` | string>(props: T, propName: N, emit: (event: K, ...args: string[]) => any) => {
  return [
    computed<T[N]>({
      get() { return props[propName] },
      set(val) { emit(`update:${propName}` as K, val) }
    })
  ]
}