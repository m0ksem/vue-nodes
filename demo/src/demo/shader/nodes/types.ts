import { Node } from 'vue-nodes'

export type GenerateFnResultUniform = { 
  type: string, 
  name: string, 
  value: () => any 
}

export type GenerateFnResult = {
  code?: string,
  uniforms?: GenerateFnResultUniform[]
}

export type ShaderNode<V = Record<string, any>> = Node & {
  name: string,
  title: string,
  component: any,

  generate: (o: {
    prev: (pointName?: string) => GenerateFnResult | undefined,
    node: ShaderNode<V>
  }) => GenerateFnResult

  value: V
}

export * from 'vue-nodes'