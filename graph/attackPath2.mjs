import go from "../go-debug.mjs"
// import go from "gojs"
import attackPath from "../data/attackPath2WithLoc.json" assert { type: "json" }

function renderAttackPath() {
  const $ = go.GraphObject.make
  const atp = new go.Diagram("attackPath")
  atp.undoManager.isEnabled = true
  atp.toolManager.hoverDelay = 100
  atp.toolManager.toolTipDuration = 100000
  atp.nodeTemplate = $(go.Node, "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Rectangle", { fill: "#e3f0f5" }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
  atp.linkTemplate = $(go.Link,
    {
      curve: go.Link.Bezier,
      adjusting: go.Link.Scale,
      reshapable: true, relinkableFrom: true, relinkableTo: true,
    },
		$(go.Shape),
    $(go.Shape, { toArrow: "Standard" }),
    new go.Binding("points", "points")
  )
  const nodeDataArray = []
  const linkDataArray = []
	for (let i = 0; i < attackPath.nodes.length; i++) {
    nodeDataArray.push({ key: attackPath.nodes[i], loc: attackPath.locs[i] })
	}
  for (let edge of attackPath.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, ...edge })
  }
  atp.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderAttackPath
