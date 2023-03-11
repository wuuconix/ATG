import renderAttackGraph from "./graph/attackGraph.mjs"
import renderTopology from "./graph/topology.mjs"
import attackGraph from "./data/attackGraphWithLoc.json" assert { type: "json" }
import newAttackGraph from "./data/newAttackGraphWithLocAndDotted.json" assert { type: "json" }

const select = document.querySelector("#menu > fieldset > select")
renderAttackGraph(attackGraph)

function genNewDiv(id) {
  const div = document.createElement("div")
  div.id = id
  document.body.append(div)
}

select.addEventListener("change", (e) => {
  if (e.target.value == "attackGraph") {
    document.querySelector("#topology")?.remove()
    document.querySelector("#newAttackGraph")?.remove()
    genNewDiv("attackGraph")
    renderAttackGraph(attackGraph)
  } else if (e.target.value == "topology") {
    document.querySelector("#attackGraph")?.remove()
    document.querySelector("#newAttackGraph")?.remove()
    genNewDiv("topology")
    renderTopology()
  } else if (e.target.value == "newAttackGraph") {
    document.querySelector("#attackGraph")?.remove()
    document.querySelector("#topology")?.remove()
    genNewDiv("newAttackGraph")
    renderAttackGraph(newAttackGraph, "newAttackGraph")
  }
})