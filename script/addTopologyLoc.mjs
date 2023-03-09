import dagre from "dagre"
import { writeFile } from "fs/promises"
import topology from "../data/originalTopology.json" assert { type: "json" }

function addLoc() {
  const g = new dagre.graphlib.Graph()
  g.setGraph({})
  g.setDefaultEdgeLabel(() => { return {} })

  for (let vul of topology.vulnerabilities) {                                         // vul node
    g.setNode(vul.vul_name, { width: vul.vul_name.length * 6 + 10, height: 25 })
  }
  for (let host of topology.hosts) {                                                  // host node
    g.setNode(host.host_name, { width: host.host_name.length * 6 + 10, height: 25 })
    const vuls = host.vuls
    for (let vul of vuls) {
      g.setEdge(vul, host.host_name)                                                  // vul -> host link
    }
  }
  for (let edge of topology.edges) {                                                  // host -> host link
    g.setEdge(edge.source, edge.target)
  }
  dagre.layout(g)

  for (let vul of topology.vulnerabilities) {
    vul.loc = `${g.node(vul.vul_name).x} ${g.node(vul.vul_name).y}`
  }
  for (let host of topology.hosts) {
    host.loc = `${g.node(host.host_name).x} ${g.node(host.host_name).y}`
  }
  const edges = g.edges().map(edgeName => g.edge(edgeName))
  let index = 0
  for (let host of topology.hosts) {
    const points = []                 // array of points
    for (let i = 0; i < host.vuls.length; i++) {
      points.push(edges[index++].points)
    }
    host.points = points
  }
  for (let edge of topology.edges) {
    edge.points = edges[index++].points
  }
}

addLoc()
await writeFile("../data/originalTopologyWithLoc.json", JSON.stringify(topology, null, "\t"))
console.log("gen originalTopologyWithLoc.json successful")