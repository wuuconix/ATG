import go from "../go-debug.mjs"
// import go from "gojs"
import attackGraph from "../data/attackGraphWithLoc.json" assert { type: "json" }

function genTemplate(color) {
  const $ = go.GraphObject.make
  return $(go.Node, "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Rectangle", { fill: color }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
}

function renderAttackGraph() {
  const $ = go.GraphObject.make
  const atg = new go.Diagram("attackGraph")
  atg.undoManager.isEnabled = true
  atg.nodeTemplateMap.add("privilege", genTemplate("white"))
  atg.nodeTemplateMap.add("condition", genTemplate("white"))
  atg.nodeTemplateMap.add("vulnerability", genTemplate("#e3f0f5"))
  atg.linkTemplate = $(go.Link,
    {
      curve: go.Link.Bezier,
      adjusting: go.Link.Scale,
      reshapable: true, relinkableFrom: true, relinkableTo: true,
    },
    new go.Binding("points", "points"),
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
  )
  const nodeDataArray = []
  const linkDataArray = []
  for (let node of attackGraph.nodes) {
    nodeDataArray.push({ key: node.name, category: node.type, loc: node.loc })
  }
  for (let edge of attackGraph.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, points: edge.points })
  }
  atg.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderAttackGraph
