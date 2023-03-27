import go from "../go-debug.mjs"
// import go from "gojs"

function stringify(node) {
  let res = ""
  for (const key in node) {
    if ([ "key", "loc", "__gohashid", "category", "points", "from", "to", "img" ].includes(key)) {
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
		$(go.Picture, new go.Binding("source", "img")),
    {
      toolTip: $("ToolTip", 
        $(go.TextBlock, { margin: 5 },
          new go.Binding("text", "", n => stringify(n))
        )
      )
    }
  )
}

function renderTopology(topology) {
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
    $(go.Shape, { toArrow: "Standard" }),
		{
      toolTip: $("ToolTip", 
        $(go.TextBlock, { margin: 5 },
          new go.Binding("text", "", n => stringify(n))
        )
      )
    }
  )
  const nodeDataArray = []
  const linkDataArray = []
  for (let host of topology.hosts) {
    nodeDataArray.push({ key: host.host_name, category: "host", ...host })
  }
  for (let edge of topology.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, ...edge })
  }
  topo.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderTopology