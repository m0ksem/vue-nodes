import { Node } from '../../../types'

export * from '../../../types'

export type ShaderGeneratorNode = Node & {
  type: 'source' | 'color' | 'fragment' | 'vec4' | 'out' | 'variable' | 'time' | 'math',
  title: string,
}