import { Point } from "../types";
import { defineNode } from '../defineNode'
import Component from "./Time.vue";
import { markRaw } from "vue";

let time = 0;

export const createTimeNode = (position: Point = { x: 0, y: 0 }) => defineNode({
  position,
  points: {
    out: {},
    speed: {}
  },

  name: 'u_time',
  title: 'Time',
  component: markRaw(Component),

  value: {
    speed: 1
  },

  generate: ({ node }) => {
    let lastFrame = Date.now();
    let thisFrame: number;

    return {
      code: `u_time`,
      uniforms: [{ 
        type: 'float', name: 'u_time',
        value: () => {
          thisFrame = Date.now();
          time += (thisFrame - lastFrame) / (100 * 60) * node.value.speed;	
          lastFrame = thisFrame;

          return time
        }
      }]
    }
  }
})