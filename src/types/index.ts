import { ComponentPublicInstance, Ref } from "vue"

export type Point = { x: number, y: number }

export type ConnectionPoint = HTMLElement | Point

export type RawConnection = { start: ConnectionPoint, end: ConnectionPoint }

export type DrawConnectionFn = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => void

export type VueRef = Element | ComponentPublicInstance | null | any

export type Node = {
  [key: string]: any,
  position: Point,
  points: Record<NodePointName, {
    [key: string]: any,
    el?: HTMLElement,
  }>
}

export enum NodePoint {
  Mouse = 'node-point:mouse'
}

export type NodePointName = string

export type ConnectionPointSource = { node: Node, point: NodePointName } | NodePoint

export type Connection = {
  start: ConnectionPointSource,
  end: ConnectionPointSource
}