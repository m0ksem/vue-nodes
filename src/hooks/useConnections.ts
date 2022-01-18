import { ComponentPublicInstance, computed, Ref, ref, UnwrapRef, watch } from 'vue'
import { Connection, Point, VueRef, Node,  RawConnection, NodePointName, NodePoint, ConnectionPointSource, NodeAndPoint, ConnectionWithoutPreset } from '../types/'
import { useMouse } from './useMouse'

const safeHTMLElement = (el: Element | ComponentPublicInstance | null) => {
  if (!el) { return undefined }

  if ('$el' in el) return el.$el as HTMLElement
  return el as HTMLElement
}

export const useConnectionRender = (connections: Ref<Connection[]>, el: HTMLElement | Ref<HTMLElement> | Window = window) => {
  const { mouse } = useMouse(el)

  const getNodePoint = (node: Node, pointName: string): HTMLElement | Point | null => {
    const point = node.points[pointName]

    if (!point) { throw new Error(`Point ${pointName} not found in ${node}`) }

    if (!point.el) { return null }

    return point.el
  }

  const transformConnection = (point: ConnectionPointSource) => {
    if (point === NodePoint.Mouse) {
      return mouse.value
    }      

    return getNodePoint(point.node, point.point)
  }

  const generatePoints = (connections: Connection[]): RawConnection[] => {
    return connections.map(({ start, end }) => ({
      start: transformConnection(start) || { x: 0, y: 0},
      end: transformConnection(end) || { x: 0, y: 0 }
    }))
  }

  const connectionPoints = computed(() => generatePoints(connections.value))

  return {
    connectionPoints
  }
}

export const useConnections = <NodeSubType = {}>(connections: Ref<Connection<NodeSubType>[]>) => {
  const registerPoint = (node: Node<NodeSubType>, point: NodePointName) => (el: VueRef) => {
    node.points[point].el = safeHTMLElement(el)
  }

  const compareConnection = (connection: ConnectionPointSource, node: Node<NodeSubType>, point?: NodePointName) => {
    if (typeof connection === 'string') { return false }

    if (!point) { return connection.node === node }
    
    return connection.node === node && connection.point === point
  }

  const getConnectionStart = (node: Node<NodeSubType>, point?: NodePointName) => connections.value
    .find(({ start }) => compareConnection(start, node, point))

  const getConnectionEnd = (node: Node<NodeSubType>, point?: NodePointName) =>  connections.value
    .find(({ start }) => compareConnection(start, node, point))

  const getConnection = (node: Node<NodeSubType>, point?: NodePointName) =>
    getConnectionStart(node, point) || getConnectionEnd(node, point)

  const searchConnection = (startNode?: Node<NodeSubType>, startPoint?: NodePointName, endNode?: Node<NodeSubType>, endPoint?: NodePointName) => {
    return connections.value
      .find(({ start, end }) => typeof start !== 'string' && typeof end !== 'string' &&
        (!startNode || startNode === start.node) &&
        (!startPoint || startPoint === start.point) &&
        (!endNode || endNode === end.node) &&
        (!endPoint || endPoint === end.point)
      )
  }

  const findConnection = (cb: (con: ConnectionWithoutPreset<NodeSubType>) => boolean) => 
    connections.value.find((con) => typeof con.end !== 'string' && typeof con.start !== 'string' && cb(con as ConnectionWithoutPreset<NodeSubType>))

  const newConnection = ref<Connection<NodeSubType>>()

  const undoConnectFrom = () => {
    connections.value = connections.value.filter((c) => c !== newConnection.value)
    newConnection.value = undefined
  }

  const connectFrom = (node: Node<NodeSubType>, point: NodePointName) => {
    if (newConnection.value) {
      undoConnectFrom()
    }

    newConnection.value = {
      start: { node, point },
      end: NodePoint.Mouse
    }

    connections.value.push(newConnection.value)
  }

  const connectTo = (node: Node<NodeSubType>, point: NodePointName) => {
    disconnectEnd(node, point)
    if (!newConnection.value) { return }
    newConnection.value.end = { node, point }
    newConnection.value = undefined
  }

  const disconnect = (node1: Node<NodeSubType>, point1: NodePointName, node2: Node<NodeSubType>, point2: NodePointName) => {
    connections.value = connections.value.filter(({ start, end }) => 
      !(compareConnection(start, node1, point1) && compareConnection(end, node2, point2))
    )
  }

  const disconnectSymmetric = (node1: Node<NodeSubType>, point1: NodePointName, node2: Node<NodeSubType>, point2: NodePointName) => {
    connections.value = connections.value.filter(({ start, end }) => 
      !(compareConnection(start, node1, point1) && compareConnection(end, node2, point2)) &&
      !(compareConnection(start, node2, point2) && compareConnection(end, node1, point1))
    )
  }

  const disconnectStart = (node: Node<NodeSubType>, point: NodePointName,) => {
    connections.value = connections.value.filter(({ start }) => !(compareConnection(start, node, point)))
  }

  const disconnectEnd = (node: Node<NodeSubType>, point: NodePointName,) => {
    connections.value = connections.value.filter(({ end }) => !(compareConnection(end, node, point)))
  }

  const recursivePath = <T>(
    searchFn: (current: NodeAndPoint<NodeSubType>, next: (pointName?: string) => undefined | T, first: NodeAndPoint<NodeSubType>) => T | undefined, 
    notFoundValue: T, 
    start?: Connection<NodeSubType>
  ) => {
    start = start || connections.value.concat().reverse().find((c) => typeof c.end !== 'string')

    if (!start) { return notFoundValue }

    const getRecursiveResult = (connection: Connection<NodeSubType> | undefined): undefined | T => {
      if (connection === undefined) { return notFoundValue }
      
      if (typeof connection.end === 'string' || typeof connection.start === 'string') { return notFoundValue }

      const s = connection.start as NodeAndPoint<NodeSubType>
 
      const next = (pointName?: string) => getRecursiveResult(searchConnection(undefined, undefined, s.node, pointName))
    
      return searchFn(s, next, start!.end as NodeAndPoint<NodeSubType>)
    }
  
    return getRecursiveResult(start)
  }

  const isNodeConnection = (connection: Connection<NodeSubType>): connection is ConnectionWithoutPreset<NodeSubType> => {
    return typeof connection.end !== 'string' && typeof connection.start !== 'string'
  }

  return {
    registerPoint,
    getConnection,
    getConnectionStart,
    getConnectionEnd,
    connectFrom,
    connectTo,
    disconnect,
    disconnectSymmetric,
    disconnectStart,
    disconnectEnd,
    searchConnection,
    findConnection,
    recursivePath,
    isNodeConnection
  }
}
