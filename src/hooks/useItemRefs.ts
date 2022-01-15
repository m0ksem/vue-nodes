import { ref, onBeforeUpdate, onUpdated, UnwrapRef } from "vue"

export const useItemRefs = <T>() => {
  let itemRefs = ref<T[]>([])
  const setItemRef = (el: any) => {
    if (el) {
      itemRefs.value.push(el)
    }
  }
  onBeforeUpdate(() => {
    itemRefs.value = []
  })

  return {
    itemRefs,
    setItemRef
  }
}