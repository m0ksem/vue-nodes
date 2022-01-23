<script setup lang="ts">
// @ts-ignore
import { Nodes, useConnections, Node } from "vue-nodes";
import { computed, ref } from "vue";
import type { Connection, ShaderNode } from "../../demo/shader/nodes";
import AppLayout from "../../components/AppLayout.vue";

const items = ref<Node[]>([
  {
    position: { x: -300, y: -100 },
    math: "input",
    title: "Number",
    points: {
      output: { type: "output" },
    },
    value: 0,
  },
  {
    position: { x: -300, y: 100 },
    math: "input",
    title: "Number",
    points: {
      output: { type: "output" },
    },
    value: 0,
  },
  {
    position: { x: 0, y: 100 },
    math: "+",
    title: "Sum",
    points: {
      input1: { type: "input", title: "Number" },
      input2: { type: "input", title: "Number" },
      output: { type: "output" },
    },
  },
  {
    position: { x: 0, y: -100 },
    math: "*",
    title: "Mul",
    points: {
      input1: { type: "input", title: "Number" },
      input2: { type: "input", title: "Number" },
      output: { type: "output" },
    },
  },
  {
    position: { x: 150, y: 0 },
    math: "print",
    title: "Output",
    points: {
      input: { type: "input" },
    },
  },
]);

const connections = ref<Connection[]>([]);

const {
  registerPoint,
  connectFrom,
  connectTo,
  searchConnection,
  disconnectEnd,
} = useConnections(connections);

const calculate = () => {
  const start = connections.value.find(
    (c) => typeof c.end !== "string" && c.end.node.math === "print"
  );

  const getRecursiveResult = (connection: Connection | undefined): undefined | number => {
    if (connection === undefined) {
      return 0;
    }

    if (typeof connection.end === "string" || typeof connection.start === "string") {
      return 0;
    }

    const start = connection.start.node;

    if (start.math === "+") {
      const input1 = getRecursiveResult(
        searchConnection(undefined, "output", start, "input1")
      );
      const input2 = getRecursiveResult(
        searchConnection(undefined, "output", start, "input2")
      );

      if (input1 === undefined || input2 === undefined) {
        return 0;
      }

      return Number(input1) + Number(input2);
    }

    if (start.math === "*") {
      const input1 = getRecursiveResult(
        searchConnection(undefined, "output", start, "input1")
      );
      const input2 = getRecursiveResult(
        searchConnection(undefined, "output", start, "input2")
      );

      if (input1 === undefined || input2 === undefined) {
        return 0;
      }

      return Number(input1) * Number(input2);
    }

    if (start.math === "input") {
      return start.value;
    }
  };

  return getRecursiveResult(start);
};

const result = computed(() => calculate());
</script>

<template>
  <AppLayout>
    <template #sidebar>
      <p>This is a math example, where you can create math expressions.</p>

      <p>You have two "Number" inputs and can connect them trough math nodes.</p>
    </template>

    <Nodes v-model:nodes="items" v-model:connections="connections">
      <template #node-content="{ node }">
        <DemoNode :title="node.title">
          <template #inputs>
            <template v-for="(point, pointName) in node.points" :key="pointName">
              <DemoButton
                v-if="point.type === 'input'"
                @register-point="registerPoint(node, pointName)($event)"
                @circle-click="
                  disconnectEnd(node, pointName);
                  connectTo(node, pointName);
                "
                color="linear-gradient(145deg, #ff4e50, #f9d423)"
                :title="point.title"
              >
                <div v-if="node.math === 'print'">{{ result }}</div>
              </DemoButton>
            </template>
          </template>

          <template #outputs>
            <template v-for="(point, pointName) in node.points" :key="pointName">
              <DemoButton
                v-if="point.type === 'output'"
                @register-point="registerPoint(node, pointName)($event)"
                @circle-click="connectFrom(node, pointName)"
                color="linear-gradient(to right, #1d976c, #93f9b9)"
                :title="point.title"
                right
              >
                <input v-if="node.value !== undefined" v-model="node.value" />
              </DemoButton>
            </template>
          </template>
        </DemoNode>
      </template>
    </Nodes>
  </AppLayout>
</template>
