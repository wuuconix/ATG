import attackGraph from "../data/attackGraphWithLoc.json" assert { type: "json" }
import newAttackGraph from "../data/newAttackGraph.json" assert { type: "json" }
import { writeFile} from "fs/promises"

function addDotted() {
  const nodes = newAttackGraph.nodes.map(node => node.name)
  const dottedNodes = []  // record all dotted node name
  for (const node of attackGraph.nodes) {
    if (!nodes.includes(node.name)) {
      node.dotted = 1     // node not in the newAttackGraph, need to be dotted
      dottedNodes.push(node.name)
    }
  }
  console.log("dotted Nodes:")
  console.log(dottedNodes)
  for (const edge of attackGraph.edges) {
    if (dottedNodes.includes(edge.source) || dottedNodes.includes(edge.target)) {
      edge.dotted = 1     // if link's source or target is a dotted node, the link should also be dotted
    }
  }
}

addDotted()
await writeFile("../data/newAttackGraphWithLocAndDotted.json", JSON.stringify(attackGraph, null, "\t"))
console.log("gen newAttackGraphWithLocAndDotted.json successful")
