import dagre from "dagre"
import { writeFile } from "fs/promises"
import attackPath from "../data/attackPath2.json" assert { type: "json" }

function addLoc() {
  const g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => { return {} })
  for (let i = 0; i < attackPath.nodes.length; i++) {
    const node = attackPath.nodes[i]
    g.setNode(node, { width: (node.length + String(i).length + 2) * 6 + 10, height: 25 })
  }
  for (let edge of attackPath.edges) {
    g.setEdge(edge.source, edge.target)
  }
  dagre.layout(g)   // automatic layout
	attackPath.locs = []
  for (let node of attackPath.nodes) {
		attackPath.locs.push(`${g.node(node).x} ${g.node(node).y}`)
  }
  const dagreEdges = g.edges()
  for (let i = 0; i < attackPath.edges.length; i++) {
    const edge = attackPath.edges[i]
    edge.points = g.edge(dagreEdges[i]).points
  }
}

addLoc()
await writeFile("../data/attackPath2WithLoc.json", JSON.stringify(attackPath, null, "\t"))
console.log("gen attackPathWithLoc.json successful")