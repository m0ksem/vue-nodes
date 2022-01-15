export type Point = { x: number, y: number }

export type Node = { position: Point, [key: string]: any }

export type ConnectionPoint = HTMLElement | Point

export type RawConnection = { start: ConnectionPoint, end: ConnectionPoint }

export type DrawConnectionFn = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => void

export type Connection = { start: Node, end: Node }