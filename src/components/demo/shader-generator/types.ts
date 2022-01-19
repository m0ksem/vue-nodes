import { DefineComponent } from 'vue'
import { Node } from '../../../types'

export * from '../../../types'

export type ShaderGeneratorNode = Node & {
  type: 'source' | 'color' | 'fragment' | 'vec4' | 'out' | 'variable' | 'time' | 'math',
  title: string,
}

type GenerateFnResult = {
  code?: string
}

export type ShaderNode<V = unknown> = Node & {
  name: string,
  title: string,
  component: any,

  generate: (o: {
    next: (pointName: string) => GenerateFnResult | undefined,
    node: ShaderNode<V>
  }) => GenerateFnResult

  value: V
}