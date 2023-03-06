import go from "./node_modules/gojs/release/go-debug.mjs"
// import go from "gojs"

const $ = go.GraphObject.make

const atg = new go.Diagram("atg")

atg.nodeTemplate = $(go.Node, "Auto",
  $(go.TextBlock, 
    { margin: 5 },
    new go.Binding("text", "text")
  )
)

atg.nodeTemplateMap.add("exploit",
  $(go.Node, "Auto",
    $(go.Shape, "Circle", { fill: "#e3f0f5" }),
    $(go.TextBlock, 
      { margin: 5, width: 96, textAlign: "center" },
      new go.Binding("text", "text")
    )
  )
)

const nodeDataArray = [
  { key: 0, text: "User(0)" },
  { key: 1, text: "IIS(0)" },
  { key: 2, text: "IIS_bof(0, 0)", category: "exploit" },
  { key: 3, text: "Root(0)" },
  { key: 4, text: "squid proxy(0, 3)" },
  { key: 5, text: "squid_port_scan(0, 3)", category: "exploit" },
  { key: 6, text: "LICQ_port(0, 3)" },
  { key: 7, text: "LICQ(0, 3)" },
  { key: 8, text: "LICQ_remote_to_user(0, 3)", category: "exploit" },
  { key: 9, text: "User(3)" },
  { key: 10, text: "local_setuid_bof(3, 3)", category: "exploit" },
  { key: 11, text: "Root(3)" }
]

const linkDataArray = [
  { from: 0, to: 2 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 5 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 8 },
  { from: 7, to: 8 },
  { from: 8, to: 9 },
  { from: 9, to: 10 },
  { from: 10, to: 11 },
]

atg.model = new go.GraphLinksModel(nodeDataArray, linkDataArray)