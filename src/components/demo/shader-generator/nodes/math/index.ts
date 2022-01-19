import { Point } from "../types";
import { defineNode } from '../defineNode'
import Component from "./Math.vue";
import { markRaw } from "vue";

export const createMathNode = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    in: {},
    out: {}
  },

  name: 'math',
  title: 'Math',
  component: markRaw(Component),

  value: { fn: 'sin' },

  generate: ({ prev, node }) => {
    const prevNode = prev()

    if (!prevNode) { return {} }

    return {
      code: `${node.value.fn}(${prevNode.code})`,
      uniforms: prevNode.uniforms
    }
  }
})