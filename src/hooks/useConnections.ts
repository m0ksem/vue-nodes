import { ComponentPublicInstance, computed, Ref, ref, UnwrapRef } from 'vue'
import type { Node, Point, RawConnection, ConnectionPoint, Connection } from '../types/'
import { useMap } from './useMap'
import { useMouse } from './useMouse'

const safeHTMLElement = (el: Element | ComponentPublicInstance | null) => {
  if (!el) { return undefined }

  if ('$el' in el) return el.$el as HTMLElement
  return el as HTMLElement
}

export const useConnections = (
  el: HTMLElement, 
  connections: Ref<Connection[]>
) => {
  const newConnection = ref<Node | null>(null)
  const { mouse } = useMouse(el)

  const nodesMap = useMap<Node, {
    connectFrom?: HTMLElement
    connectTo?: HTMLElement,
    disconnect?: HTMLElement
  }>()

  const computedConnections = computed<RawConnection[]>(() => {
    const activeConnections = connections.value.map((con) => {
      const startNodes = nodesMap.get(con.start)
      const endNodes = nodesMap.get(con.end)
  
      return {
        start: startNodes!.connectFrom!,
        end: endNodes!.connectTo!
      }
    })

    if (newConnection.value) {
      const newConnectionEl = nodesMap.get(newConnection.value)

      return [
        ...activeConnections,
        { start: newConnectionEl?.connectFrom!, end: mouse.value }
      ]
    }

    return activeConnections
  })

  const connectFrom = (node: Node) => {
    newConnection.value = node
  }

  const connectTo = (node: Node) => {
    if (!newConnection.value) { return }

    connections.value.push({
      start: newConnection.value,
      end: node
    })

    newConnection.value = null
  }

  const undoNewConnection = () => {
    newConnection.value = null
  }

  const disconnect = (node: Node) => {
    connections.value = connections.value.filter((con) => con.end !== node)
  }

  const setConnectFromRef = (node: Node) => {
    return (el: Element | ComponentPublicInstance | null) => { nodesMap.get(node, {}).connectFrom = safeHTMLElement(el) }
  }

  const setConnectToRef = (node: Node) => {
    return (el: Element | ComponentPublicInstance | null) => { nodesMap.get(node, {}).connectTo = safeHTMLElement(el) }
  }

  return {
    connections: computedConnections,
    connectFrom,
    connectTo,
    undoNewConnection,
    disconnect,
    setConnectFromRef,
    setConnectToRef
  }
}