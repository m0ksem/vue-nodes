import { Node } from '../types'

export type GenerateFnResultUniform = { 
  type: string, 
  name: string, 
  value: () => any 
}

export type GenerateFnResult = {
  code?: string,
  uniforms?: GenerateFnResultUniform[]
}

export type ShaderNode<V = {}> = Node & {
  name: string,
  title: string,
  component: any,

  generate: (o: {
    prev: (pointName?: string) => GenerateFnResult | undefined,
    node: ShaderNode<V>
  }) => GenerateFnResult

  value: V
}

export * from '../types'