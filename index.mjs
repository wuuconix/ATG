import renderAttackGraph from "./graph/attackGraph.mjs"
import renderTopology from "./graph/topology.mjs"
import renderAttackPath from "./graph/attackPath.mjs"
import renderChart from "./graph/chart.mjs"
import renderNewTopology from "./graph/newTopology.mjs"
import attackGraph from "./data/attackGraphWithLoc.json" assert { type: "json" }
import topology from "./data/originalTopologyWithLoc.json" assert { type: "json" }
import newAttackGraph from "./data/newAttackGraphWithLocAndDotted.json" assert { type: "json" }
import attackPath from "./data/attackPathWithLoc.json" assert { type: "json" }
import chartData from "../data/chart.json" assert { type: "json" }

const diagrams = [ "attackGraph", "topology", "newAttackGraph", "attackPath", "chart", "newTopology" ]
const renderMap = new Map([
	[ "attackGraph", [ renderAttackGraph, attackGraph ] ],
	[ "topology", [ renderTopology, topology] ],
	[ "newAttackGraph", [ renderAttackGraph, newAttackGraph ] ],
	[ "attackPath", [ renderAttackPath, attackPath ] ],
	[ "chart", [ renderChart, chartData ]],
	[ "newTopology", [ renderNewTopology, null ]]
])

function render(diagram, chartNum = "chart1", xName = "hostsNum", yName = "real_time") {
	for (let d of diagrams) {
		document.querySelector(`#${d}`)?.remove()			// remove all diagram
	}
	const div = document.createElement("div")				// gen a new one
  div.id = diagram
  document.body.append(div)
	const renderFun = renderMap.get(diagram)[0]
	const data = renderMap.get(diagram)[1]
	renderFun(data, diagram, chartNum, xName, yName)									// call render function with data and divID
	if (diagram == "chart") {
		document.querySelector("fieldset[name=chart]").style.display = "block"
		document.querySelector("fieldset[name=x]").style.display = "block"
		document.querySelector("fieldset[name=y]").style.display = "block"
	} else {
		document.querySelector("fieldset[name=chart]").style.display = "none"
		document.querySelector("fieldset[name=x]").style.display = "none"
		document.querySelector("fieldset[name=y]").style.display = "none"
	}
}

const diagramSelect = document.querySelector("#menu > fieldset[name=graph] > select")
const chartSelect = document.querySelector("#menu > fieldset[name=chart] > select")
const xSelect = document.querySelector("#menu > fieldset[name=x]> select")
const ySelect = document.querySelector("#menu > fieldset[name=y]> select")

diagramSelect.value = "newTopology"
render(diagramSelect.value)

diagramSelect.addEventListener("change", (e) => {
	if (diagrams.includes(e.target.value)) {
		render(e.target.value)
	}
})

chartSelect.addEventListener("change", (e) => {
	document.querySelector(`#chart`)?.remove()
	render("chart", e.target.value)
})

xSelect.addEventListener("change", (e) => {
	render("chart", chartSelect.value, e.target.value, ySelect.value)
})

ySelect.addEventListener("change", (e) => {
	render("chart", chartSelect.value, xSelect.value, e.target.value)
})