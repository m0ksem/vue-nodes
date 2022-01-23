import { ComponentPublicInstance, Ref } from "vue"

export type Point = { x: number, y: number }

export type ConnectionPoint = HTMLElement | Point

export type RawConnection = { start: ConnectionPoint, end: ConnectionPoint }

export type DrawConnectionFn = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => void

export type VueRef = Element | ComponentPublicInstance | null | any

export type Node<T = {}> = {
  [key: string]: any,
  position: Point,
  points: Record<NodePointName, {
    [key: string]: any,
    el?: HTMLElement,
  }>
} & T

export enum NodePoint {
  Mouse = 'node-point:mouse'
}

export type NodePointName = string

export type NodeAndPoint<NodeSubType = {}> = { node: Node<NodeSubType>, point: NodePointName }

export type ConnectionPointSource<NodeSubType = {}> = NodeAndPoint<NodeSubType> | NodePoint

export type Connection<NodeSubType = {}> = {
  start: ConnectionPointSource<NodeSubType>,
  end: ConnectionPointSource<NodeSubType>
}

export type ConnectionWithoutPreset<NodeSubType = {}> = {
  start: NodeAndPoint<NodeSubType>,
  end: NodeAndPoint<NodeSubType>
}