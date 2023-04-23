import renderAttackGraph from "./graph/attackGraph.mjs"
import attackGraph1 from "./data/attackGraphWithLoc.json" assert { type: "json" }
import attackGraph2 from "./data/newAttackGraphWithLocAndDotted.json" assert { type: "json" }
import renderTopology1 from "./graph/topology.mjs"
import renderTopology2 from "./graph/newTopology.mjs"
import renderTopology3 from "./graph/topology3.mjs"
import renderAttackPath1 from "./graph/attackPath.mjs"
import renderAttackPath2 from "./graph/attackPath2.mjs"
import renderChart from "./graph/chart.mjs"

const diagrams = [ "attackGraph", "topology", "attackPath", "chart" ]
const handlerMap = new Map([
	[ "attackGraph", attackGraphHandler ],
	[ "topology", topologyHandler ],
	[ "attackPath", attackPathHandler ],
	[ "chart", chartHandler ]
])
const secondSelectMap = new Map([
	[	"attackGraph", document.querySelector("fieldset[name=attackGraph]") ],
	[ "attackPath", document.querySelector("fieldset[name=attackPath]") ],
	[ "topology", document.querySelector("fieldset[name=topology]") ],
	[ "chart", document.querySelector("div#chartDiv") ]
])

const diagramSelect = document.querySelector("fieldset[name=diagram] > select")
const attackGraphSelect = document.querySelector("fieldset[name=attackGraph] > select")
const attackPathSelect = document.querySelector("fieldset[name=attackPath] > select")
const topologySelect = document.querySelector("fieldset[name=topology] > select")
const chartSelect = document.querySelector("fieldset[name=chart] > select")
const xSelect = document.querySelector("fieldset[name=x]> select")
const ySelect = document.querySelector("fieldset[name=y]> select")

diagramSelect.value = "topology"
render(diagramSelect.value)
diagramSelect.addEventListener("change", (e) => {
	render(e.target.value)
})

attackGraphSelect.addEventListener("change", attackGraphHandler)
topologySelect.addEventListener("change", topologyHandler)
attackPathSelect.addEventListener("change", attackPathHandler)
chartSelect.addEventListener("change", chartHandler)
xSelect.addEventListener("change", chartHandler)
ySelect.addEventListener("change", chartHandler)

/**
 * 由一级菜单下拉菜单调用 显出相应二级菜单并调用相应handler
 * @param {string} diagram 
 */
function render(diagram) {
	showSecondSelect(diagram)
	handlerMap.get(diagram)()
}

/**
 * 自动根据二级下拉框所选值渲染对应攻击图
 */
function attackGraphHandler() {
	removeDiagrams()
	addNewDiv("attackGraph")
	const index = attackGraphSelect.value
	if (index == 1) {					// TestNet攻击图
		renderAttackGraph(attackGraph1)
	} else if (index == 2) {	// TestNet更新攻击图
		renderAttackGraph(attackGraph2)
	}
}

/**
 * 自动根据二级下拉框所选值渲染对应拓扑图
 */
function topologyHandler() {
	removeDiagrams()
	addNewDiv("topology")
	const index = topologySelect.value
	if (index == 1) {					// TestNet拓扑图
		renderTopology1()
	} else if (index == 2) {	// 流程工业拓扑图
		renderTopology2()
	} else if (index == 3) {	// 流程工业新拓扑图
		renderTopology3()
	}
}

/**
 * 自动根据二级下拉框所选值渲染对应攻击路径
 */
function attackPathHandler() {
	removeDiagrams()
	addNewDiv("attackPath")
	const index = attackPathSelect.value
	if (index == 1) {					// TestNet攻击路径
		renderAttackPath1()
	} else if (index == 2) {	//	新攻击路径
		renderAttackPath2()
	}
}

/**
 * 自动根据二级下拉框所选值渲染对应折线图
 */
function chartHandler() {
	removeDiagrams()
	addNewDiv("chart")
	renderChart(chartSelect.value, xSelect.value, ySelect.value)
}

/**
 * 根据一级下拉菜单的所选值，显示相应二级下拉菜单并隐藏其他二级菜单
 * @param {string} value 
 */
function showSecondSelect(value) {
	for (let d of diagrams) {
		const secondSelect = secondSelectMap.get(d)
		d == value ? show(secondSelect) : hide(secondSelect)
	}
}

/**
 * 设置inline-css隐藏元素
 * @param {HTMLElement} element 
 */
function hide(element) {
	element.style.display = "none"
}

/**
 * 设置inline-css显示元素
 * @param {HTMLElement} element 
 */
function show(element) {
	element.style.display = ""
}

/**
 * 清除所有Diagram
 */
function removeDiagrams() {
	for (let d of diagrams) {
		document.querySelector(`#${d}`)?.remove()
	}
}

/**
 * 新建一个Div 为后续渲染做准备
 * @param {string} id 
 */
function addNewDiv(id) {
	const div = document.createElement("div")
  div.id = id
  document.body.append(div)
}