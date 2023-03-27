import renderAttackGraph from "./graph/attackGraph.mjs"
import renderTopology from "./graph/topology.mjs"
import renderAttackPath from "./graph/attackPath.mjs"
import renderChart from "./graph/chart.mjs"
import attackGraph from "./data/attackGraphWithLoc.json" assert { type: "json" }
import topology from "./data/originalTopologyWithLoc.json" assert { type: "json" }
import newAttackGraph from "./data/newAttackGraphWithLocAndDotted.json" assert { type: "json" }
import attackPath from "./data/attackPathWithLoc.json" assert { type: "json" }

const diagrams = [ "attackGraph", "topology", "newAttackGraph", "attackPath", "chart" ]
const renderMap = new Map([
	[ "attackGraph", [ renderAttackGraph, attackGraph ] ],
	[ "topology", [ renderTopology, topology] ],
	[ "newAttackGraph", [ renderAttackGraph, newAttackGraph ] ],
	[ "attackPath", [ renderAttackPath, attackPath ] ],
	[ "chart", [ renderChart, null ]]
])

function render(diagram) {
	for (let d of diagrams) {
		document.querySelector(`#${d}`)?.remove()			// remove all diagram
	}
	const div = document.createElement("div")				// gen a new one
  div.id = diagram
  document.body.append(div)
	const renderFun = renderMap.get(diagram)[0]
	const data = renderMap.get(diagram)[1]
	renderFun(data, diagram)												// call render function with data and divID
}

const select = document.querySelector("#menu > fieldset > select")
render(select.value)

select.addEventListener("change", (e) => {
	if (diagrams.includes(e.target.value)) {
		render(e.target.value)
	}
})