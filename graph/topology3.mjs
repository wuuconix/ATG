import go from "../go-debug.mjs"
// import go from "gojs"
import topology from "../data/topology3WithLoc.json" assert { type: "json" }


function stringify(node) {
  const sep = "--------------\n"
  let res = sep
  if (node.vuls.length == 0) {
    return ""
  } else if (node.vuls.length == 1) {
    res += `脆弱性名称/功能故障: ${node.vuls[0]}\n指标: ${node.impacts[0]}\n${sep}`
  } else {
    for (let i = 0; i < node.vuls.length; i++) {
      res += `脆弱性名称/功能故障${i + 1}: ${node.vuls[i]}\n指标: ${node.impacts[i]}\n${sep}`
    }
  }
  res = res.replace(/\n$/g, "")
  return res
}

function renderTopology() {
  const $ = go.GraphObject.make
  const topo = new go.Diagram("topology")
  topo.undoManager.isEnabled = true
  topo.toolManager.hoverDelay = 100
  topo.toolManager.toolTipDuration = 100000
  topo.nodeTemplate = $(go.Node, "Vertical",
    { locationSpot: go.Spot.Center },
    new go.Binding("location", "loc", go.Point.parse),
    $(go.Picture, 
      {
        source: "https://upyun.wuuconix.link/image-attacker.png",
        width: 100,
        height: 100,
        imageStretch: go.GraphObject.Uniform 
      },
      new go.Binding("source", "img")
    ),
    $(go.TextBlock, 
      { margin: new go.Margin(10, 0, 0, 0) },
      new go.Binding("text", "name")
    ),
    {
      toolTip: $("ToolTip", 
        $(go.TextBlock, { margin: 5 },
          new go.Binding("text", "", n => stringify(n))
        )
      )
    }
  )
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
  const i18nMap = new Map([
    [ "Attacker", "攻击者" ],
    [ "WS", "工作站" ],
    [ "DNS", "DNS服务器" ],
    [ "OPC", "OPC服务器" ],
    [ "Historian", "历史数据库"] ,
    [ "EWS", "工程师站" ],
    [ "HMI", "HMI" ],
    [ "PLC1", "PLC1" ],
    [ "PLC2", "PLC2" ],
    [ "Valve", "阀门" ],
    [ "Reactor", "反应釜" ],
    [ "Sensor", "传感器" ]
  ])
  for (let host of topology.hosts) {
    nodeDataArray.push({ key: host.host_name, loc: host.loc, ...host, name: i18nMap.get(host.host_name) })
  }
  for (let edge of topology.edges) {
    linkDataArray.push({ from: edge.source, to: edge.target, points: edge.points, ...edge })
  }
  topo.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)
}

export default renderTopology