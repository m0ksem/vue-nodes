import { Point } from "../types";
import { defineNode } from '../defineNode'
import Component from "./Out.vue";
import { markRaw } from "vue";

export const createOutputNode = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    in: {},
    out: {}
  },

  name: 'out',
  title: 'Out',
  component: markRaw(Component),

  value: {},

  generate: ({ prev, node }) => {
    const prevNode = prev()

    if (node.name === 'out') { return prevNode || {} }

    return node.generate({ prev, node })
  }
})