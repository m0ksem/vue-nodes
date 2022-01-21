import { createRouter, createWebHistory } from 'vue-router'
import Calculator from './routes/Calculator.vue'
import Index from './routes/Index.vue'
import Shader from './routes/Shader.vue'


export const router = createRouter({
  history: createWebHistory('/vue-nodes'),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/shader-demo',
      name: 'ShaderDemo',
      component: Shader
    },
    {
      path: '/calculator',
      name: 'CalculatorDemo',
      component: Calculator
    },
  ]
})