export type Point = { x: number, y: number }

export type Node = { position: Point, [key: string]: any }

export type ConnectionPoint = HTMLElement | Point

export type Connection = { start: ConnectionPoint, end: ConnectionPoint }

export type DrawConnectionFn = (ctx: CanvasRenderingContext2D, start: Point, end: Point) => void