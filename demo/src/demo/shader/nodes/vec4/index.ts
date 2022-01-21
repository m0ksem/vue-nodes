import { GenerateFnResultUniform, Point, ShaderNode } from "../types";
import { defineNode } from '../defineNode'
import Vec4 from "./Vec4.vue";
import { markRaw } from "vue";

const numberInteger = (s: string) => s.split('.').filter((n) => n !== '').length === 1

const isStringNumber = (s: string) => s.match(/^-?\d+$/) || s.match(/^\d+\.\d+$/)

const floatNumber = (s: string | number) => {
  if (s === undefined || s === '') { return undefined }

  if (!isStringNumber(String(s))) { return s }

  return numberInteger(String(s)) ? `${s}.0` : s
} 

export const createVec4Node = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    x: { default: 0, value: 0 },
    y: { default: 0, value: 0 },
    z: { default: 0, value: 0 },
    w: { default: 0, value: 0 },
    out: {}
  },

  name: 'vec4',
  title: 'Vector 4',
  component: markRaw(Vec4),

  value: { x: 0, y: 0, z: 0, w: 0 },

  generate: ({ prev, node }) => {
    const nexts = [
      prev('x'), prev('y'), prev('z'), prev('w') 
    ]

    const codes = nexts.map((n) => n?.code)

    const values = [
      floatNumber(codes[0] || node.value.x),
      floatNumber(codes[1] || node.value.y),
      floatNumber(codes[2] || node.value.z),
      floatNumber(codes[3] || node.value.w),
    ].filter((u) => typeof u !== 'undefined')

    const uniforms = nexts
      .map((n) => n?.uniforms)
      .flat()
      .filter((u): u is GenerateFnResultUniform => typeof u !== 'undefined')

    return {
      code: `vec${values.length}(${values.join(', ')})`,
      uniforms
    }
  }
})