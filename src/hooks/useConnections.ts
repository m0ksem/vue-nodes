import { computed, ref, UnwrapRef } from 'vue'
import type { Node, Point, Connection, ConnectionPoint } from '../types/'
import { useMouse } from './useMouse'



export const useConnections = <D extends UnwrapRef<T>, T = any>(el: HTMLElement) => {
  const connections = ref<(Connection<T> & { data: T })[]>([])
  const newConnection = ref<Omit<Connection<T>, 'end'> | null>(null)
  const { mouse } = useMouse(el)

  const computedConnections = computed(() => {
    const activeConnections = connections.value.map((con) => ({
      start: con.start || 0,
      end: con.end || 0
    }))

    if (newConnection.value) {
      return [
        ...activeConnections,
        { start: newConnection.value.start, end: mouse.value }
      ]
    }

    return activeConnections
  })

  const connectFrom = (el: HTMLElement, data: D) => {
    newConnection.value = { start: el }
  }

  const connectTo = (el: HTMLElement, data: D) => {
    if (!newConnection.value) { return }

    connections.value.push({
      start: newConnection.value.start,
      end: el,
      data,
    })

    newConnection.value = null
  }

  const undoNewConnection = () => {
    newConnection.value = null
  }

  const disconnect = (data: D) => {
    connections.value = connections.value.filter((con) => con.data !== data)
  }

  return {
    connections: computedConnections,
    connectFrom,
    connectTo,
    undoNewConnection,
    disconnect
  }
}