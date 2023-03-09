import renderAttackGraph from "./graph/attackGraph.mjs"
import renderTopology from "./graph/topology.mjs"

const select = document.querySelector("#menu > fieldset > select")
renderAttackGraph()

function genNewDiv(id) {
  const div = document.createElement("div")
  div.id = id
  document.body.append(div)
}

select.addEventListener("change", (e) => {
  if (e.target.value == "attackGraph") {
    document.querySelector("#topology").remove()
    genNewDiv("attackGraph")
    renderAttackGraph()
  } else {
    document.querySelector("#attackGraph").remove()
    genNewDiv("topology")
    renderTopology()
  }
})