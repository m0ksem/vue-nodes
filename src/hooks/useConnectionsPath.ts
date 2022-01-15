import { Ref } from "vue";
import { Connection, Node } from "../types";

export const useConnectionsPath = (connections: Ref<Connection[]>) => {
  const generatePath = () => {
    let currentNodeConnection: Connection | undefined = connections.value[0]
    const path: Node[] = []

    while (currentNodeConnection !== undefined) {
      if (path.includes(currentNodeConnection.start)) {
        throw new Error("Circular connections path")
      }
      path.push(currentNodeConnection.start)
      currentNodeConnection = connections.value.find((c) => c.start === currentNodeConnection?.end) 
    }

    return path
  }

  const generateCircularPath = () => {
    let currentNodeConnection: Connection | undefined = connections.value[0]
    const path: Node[] = []

    while (currentNodeConnection !== undefined) {
      if (path.includes(currentNodeConnection.start)) {
        return path
      }
      path.push(currentNodeConnection.start)
      currentNodeConnection = connections.value.find((c) => c.start === currentNodeConnection?.end) 
    }

    return path
  }

  return {
    generatePath, generateCircularPath
  }
}