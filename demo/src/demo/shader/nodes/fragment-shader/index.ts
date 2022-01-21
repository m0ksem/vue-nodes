import { Point } from "../types";
import { defineNode } from '../defineNode'
import FragmentShader from "./FragmentShader.vue";
import { markRaw } from "vue";
import { GenerateFnResultUniform } from "..";

const generateUniforms = (uniforms: GenerateFnResultUniform[]) => {
  const usedUniforms: GenerateFnResultUniform[] = []

  uniforms.forEach((uniform) => {
    if (usedUniforms.find((u) => u.name === uniform.name)) {
      return
    }

    usedUniforms.push(uniform)
  })
  
  return usedUniforms
    .map((uniform) => `uniform ${uniform.type} ${uniform.name};`)
    .join('\n')
}

export const createFragmentShaderNode = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    in: {},
    out: {}
  },

  name: 'fragment-shader',
  title: 'Fragment Shader',
  component: markRaw(FragmentShader),

  value: {},

  generate: ({ prev, node }) => {
    const prevNode = prev()

    if (!prevNode) { return {} }

    const { code, uniforms } = prevNode

    let result = 'precision highp float;'

    if (uniforms) {
      result += '\n'
      result += generateUniforms(uniforms)
    }

    result += `
void main() {
  gl_FragColor = ${code};
}   
`

    return {
      code: result,
      uniforms: uniforms
    }
  }
})