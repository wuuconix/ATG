import dagre from "dagre"
import { writeFile } from "fs/promises"
import attckGraph from "./data/attackGraph.json" assert { type: "json" }

function addLoc(nodes, links) {
  const g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => { return {} })
  for (let node of nodes) {
    g.setNode(node.name, { width: node.name.length * 8, height: 18 })
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
    for (let i = 0; i < link.points.length; i++) {
      const point = link.points[i]
      if (i == 0) {
        point.y += 15
      } else if (i == link.points.length - 1) {
        point.y += 8
      }
      if (i <= 1) {
        point.x += link.source.length * 4
      } else {
        point.x += link.target.length * 4
      }
      // point.x += link.source.length * 4 + 5
    }
  }
  console.log(nodes)
  console.log(links)
}

addLoc(attckGraph.nodes, attckGraph.edges)
await writeFile("./data/attackGraphWithLoc.json", JSON.stringify(attckGraph, null, "\t"))