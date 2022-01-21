import { Point } from "../types";
import { defineNode } from '../defineNode'
import Component from "./Source.vue";
import { markRaw } from "vue";

export const createSourceNode = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    in: {},
    out: {}
  },

  name: 'source',
  title: 'Source',
  component: markRaw(Component),

  value: {},

  generate: ({ prev, node }) => {
    const prevNode = prev()

    if (node.name === 'source') { return prevNode || {} }

    return node.generate({ prev, node })
  }
})