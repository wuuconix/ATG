import dagre from "dagre"
import { writeFile } from "fs/promises"
import topology from "../data/originalTopology.json" assert { type: "json" }

function addLoc() {
  const g = new dagre.graphlib.Graph()
  g.setGraph({ rankdir: "LR" })
  g.setDefaultEdgeLabel(() => { return {} })
  for (let host of topology.hosts) {                                                  // add host node
		if (host.host_name == "attacker") {
			g.setNode(host.host_name, { width: 200, height: 180 })
		} else {
			g.setNode(host.host_name, { width: 130, height: 180 })
		}
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
await writeFile("../data/originalTopologyWithLoc.json", JSON.stringify(topology, null, "\t"))
console.log("gen originalTopologyWithLoc.json successful")