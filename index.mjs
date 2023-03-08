import go from "./go-debug.mjs"
// import go from "gojs"
import attackGraph from "./data/attackGraphWithLoc.json" assert { type: "json" }

const $ = go.GraphObject.make

const atg = new go.Diagram("atg")

atg.nodeTemplateMap.add("privilege",
  $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Ellipse", { fill: "white" }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
)

atg.nodeTemplateMap.add("condition",
  $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Ellipse", { fill: "white" }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
)

atg.nodeTemplateMap.add("vulnerability",
  $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Rectangle", { fill: "#e3f0f5" }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    )
  )
)

// atg.linkTemplate = $(go.Link,
//   { curve: go.Link.Bezier, curviness: 100 },                  // rounded corners
//   $(go.Shape),
//   $(go.Shape, { toArrow: "Standard" })
// )

const nodeDataArray = []
const linkDataArray = []
for (let node of attackGraph.nodes) {
  nodeDataArray.push({ key: node.name, category: node.type, loc: node.loc })
}
for (let edge of attackGraph.edges) {
  linkDataArray.push({ from: edge.source, to: edge.target })
}

console.log(nodeDataArray)
console.log(linkDataArray)

atg.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)