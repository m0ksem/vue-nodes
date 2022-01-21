import { createSourceNode, createTimeNode, createFragmentShaderNode, createVec4Node, createOutputNode, createMathNode } from './nodes'
import type { ShaderNode } from './nodes'
import type { Connection } from 'vue-nodes'

export const itemsPreset: ShaderNode[] = [
  createTimeNode({ x: -300, y: 0 }),
  (() => {
    const math = createMathNode({ x: 0, y: 0 })
    math.fn = 'sin'
    return math
  })(),
  (() => {
    const math = createMathNode({ x: 0, y: 100 })
    math.fn = 'cos'
    return math
  })(),
  (() => {
    const vec4 = createVec4Node({ x: 300, y: 0 })
    vec4.z = 1;
    vec4.w = 1;
    return vec4
  })(),
  createFragmentShaderNode({ x: -300, y: -200 }),
  createSourceNode({ x: 100, y: -300 }), 
  createOutputNode({ x: 500, y: 300 })
]

export const connectionsPreset: Connection<ShaderNode>[] = [
  { start: { node: itemsPreset[0], point: 'out' }, end: { node: itemsPreset[1], point: 'in' }},
  { start: { node: itemsPreset[0], point: 'out' }, end: { node: itemsPreset[2], point: 'in' }},
  // Vec4
  { start: { node: itemsPreset[1], point: 'out' }, end: { node: itemsPreset[3], point: 'x' }},
  { start: { node: itemsPreset[2], point: 'out' }, end: { node: itemsPreset[3], point: 'y' }},

  { start: { node: itemsPreset[3], point: 'out' }, end: { node: itemsPreset[4], point: 'in' }},
  { start: { node: itemsPreset[4], point: 'out' }, end: { node: itemsPreset[5], point: 'in' }},

  { start: { node: itemsPreset[5], point: 'out' }, end: { node: itemsPreset[6], point: 'in' }},
]