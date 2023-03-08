import dagre from "dagre"
import { writeFile } from "fs/promises"
import attckGraph from "./data/attackGraph.json" assert { type: "json" }

function addLoc(nodes, links) {
  const g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => { return {} })
  for (let node of nodes) {
    g.setNode(node.name, { width: node.name.length * 8, height: 24 })
  }
  for (let link of links) {
    g.setEdge(link.source, link.target)
  }
  dagre.layout(g)   // automatic layout
  for (let node of nodes) {
    node.loc = `${g.node(node.name).x} ${g.node(node.name).y}`
  }
  console.log(nodes)
  return nodes
}

addLoc(attckGraph.nodes, attckGraph.edges)
await writeFile("./data/attackGraphWithLoc.json", JSON.stringify(attckGraph, null, "\t"))