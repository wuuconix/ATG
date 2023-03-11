import go from "../go-debug.mjs"
// import go from "gojs"

function renderAttackGraph(attackGraph, divId = "attackGraph") {
  const $ = go.GraphObject.make
  const atg = new go.Diagram(divId)
  atg.undoManager.isEnabled = true
  atg.nodeTemplate = $(go.Node, "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Rectangle",
      new go.Binding("strokeDashArray", "dotted", d => d ? [5, 5] : null),
      new go.Binding("stroke", "dotted", d => d ? "red" : null),
      new go.Binding("fill", "type", t => t == "vulnerability" ? "#e3f0f5" : "white")
    ),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
  atg.linkTemplate = $(go.Link,
    {
      curve: go.Link.Bezier,
      adjusting: go.Link.Scale,
      reshapable: true, relinkableFrom: true, relinkableTo: true,
    },
    new go.Binding("points", "points"),
    $(go.Shape,
      new go.Binding("strokeDashArray", "dotted", d => d ? [5, 5] : null),
      new go.Binding("stroke", "dotted", d => d ? "red" : null)
    ),
    $(go.Shape, { toArrow: "Standard" },
      new go.Binding("fill", "dotted", d => d ? "red" : null),
      new go.Binding("stroke", "dotted", d => d ? "red" : null)
    )
  )
  const nodeDataArray = []
  const linkDataArray = []
  for (let node of attackGraph.nodes) {
    nodeDataArray.push({ key: node.name, type: node.type, loc: node.loc, dotted: node.dotted })
  }
  for (let edge of attackGraph.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, points: edge.points, dotted: edge.dotted })
  }
  atg.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderAttackGraph
