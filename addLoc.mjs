import dagre from "dagre"
import { writeFile } from "fs/promises"
import attckGraph from "./data/attackGraph.json" assert { type: "json" }

function addLoc(nodes, links) {
  const g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => { return {} })
  for (let node of nodes) {
    g.setNode(node.name, { width: node.name.length * 6 + 10, height: 25 })
  }
  for (let link of links) {
    g.setEdge(link.source, link.target)
  }
  dagre.layout(g)   // automatic layout
  for (let node of nodes) {
    node.loc = `${g.node(node.name).x} ${g.node(node.name).y}`
  }
  const dagreEdges = g.edges()
  for (let i = 0; i < links.length; i++) {
    const link = links[i]
    link.points = g.edge(dagreEdges[i]).points
  }
  console.log(nodes)
  console.log(links)
}

addLoc(attckGraph.nodes, attckGraph.edges)
await writeFile("./data/attackGraphWithLoc.json", JSON.stringify(attckGraph, null, "\t"))