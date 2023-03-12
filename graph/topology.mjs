import go from "../go-debug.mjs"
// import go from "gojs"
import topology from "../data/originalTopologyWithLoc.json" assert { type: "json" }

function stringify(node) {
  let res = ""
  for (const key in node) {
    if (["key", "loc", "__gohashid", "category", "points"].includes(key)) {
      continue
    }
    res += `${key}: ${JSON.stringify(node[key]).replace(/"/g, "")}\n`
  }
  res = res.replace(/\n$/, "")
  return res
}

function genTemplate(color) {
  const $ = go.GraphObject.make
  return $(go.Node, "Auto",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Shape, "Rectangle", { fill: color }),
    $(go.TextBlock, 
      { margin: 5, textAlign: "center" },
      new go.Binding("text", "key")
    ),
    {
      toolTip: $("ToolTip", 
        $(go.TextBlock, { margin: 5 },
          new go.Binding("text", "", n => stringify(n))
        )
      )
    }
  )
}

function renderTopology() {
  const $ = go.GraphObject.make
  const topo = new go.Diagram("topology")
  topo.undoManager.isEnabled = true
  topo.toolManager.hoverDelay = 100
  topo.toolManager.toolTipDuration = 100000
  topo.nodeTemplateMap.add("host", genTemplate("#e3f0f5"))
  topo.nodeTemplateMap.add("vul", genTemplate("white"))
  topo.linkTemplate = $(go.Link,
    {
      curve: go.Link.Bezier,
      adjusting: go.Link.Scale,
      reshapable: true, relinkableFrom: true, relinkableTo: true
    },
    new go.Binding("points", "points"),
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
  )
  const nodeDataArray = []
  const linkDataArray = []
  for (let vul of topology.vulnerabilities) {
    nodeDataArray.push({ key: vul.vul_name, category: "vul", ...vul })
  }
  for (let host of topology.hosts) {
    nodeDataArray.push({ key: host.host_name, category: "host", ...host })
    for (let i = 0; i < host.vuls.length; i++) {
      linkDataArray.push({ from: host.vuls[i], to: host.host_name, points: host.points[i] })
    }
  }
  for (let edge of topology.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, points: edge.points })
  }
  topo.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderTopology
