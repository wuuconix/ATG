import dagre from "dagre"
import { writeFile } from "fs/promises"
import topology from "../data/topology3.json" assert { type: "json" }

function addLoc() {
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: "LR" })
  g.setDefaultEdgeLabel(() => { return {} })
  for (let host of topology.hosts) {                                                  // add host node
    g.setNode(host.host_name, { width: 100, height: 120 })
  }
  for (let edge of topology.edges) {                                                  // add link (host -> host)
    g.setEdge(edge.source, edge.target)
  }
  dagre.layout(g)
  for (let host of topology.hosts) {
    host.loc = `${g.node(host.host_name).x} ${g.node(host.host_name).y}`
  }
	for (let i = 0; i < topology.edges.length; i++) {
		const edge = topology.edges[i]
		edge.points = g.edge(g.edges()[i]).points
	}
}

addLoc()
await writeFile("../data/topology3WithLoc.json", JSON.stringify(topology, null, "\t"))
console.log("gen topology3WithLoc.json successful")