// import go from "gojs"
import go from "../go-debug.mjs"

function renderNewTopology() {
	const $ = go.GraphObject.make
  const topo = new go.Diagram("newTopology")
	topo.nodeTemplateMap.add("leftHost",
		$(go.Node, "Horizontal", 
			$(go.Panel, "Vertical",
				$(go.Picture, {
					source: "https://upyun.wuuconix.link/image-attacker.png",
					width: 100,
					height: 100,
					imageStretch: go.GraphObject.Uniform 
				}),
				$(go.TextBlock, 
					new go.Binding("text", "name"))
			),
			$(go.Shape, "Circle",	{
				portId: "",			// change the port from the hole node to this circle
				fromSpot: go.Spot.Right,
				width: 10,
				margin: new go.Margin(0, 0, 0, 30),
				fill: "white"
			})
		)
	)
	topo.nodeTemplateMap.add("rightHost",
		$(go.Node, "Horizontal", 
			$(go.Shape, "Circle",	{
				portId: "",
				fromSpot: go.Spot.Left,
				width: 10,
				margin: new go.Margin(0, 30, 0, 0),
				fill: "white"
			}),
			$(go.Panel, "Vertical",
				$(go.Picture, {
					source: "https://upyun.wuuconix.link/image-attacker.png",
					width: 100,
					height: 100,
					imageStretch: go.GraphObject.Uniform 
				}),
				$(go.TextBlock, { text: "服务器" })
			)
		)
	)
	topo.nodeTemplateMap.add("bar",
		$(go.Node, "Position",
			$(go.Shape, "Rectangle",	// bar
				{ width: 20, height: 500, fill: "white" }
			),
			$(go.Shape, "Rectangle",	// port1
			 	{ 
					position: new go.Point(0, 500 * 0.25),
					portId: "1",
					toSpot: go.Spot.Left,
					width: 0
				}
			),
			$(go.Shape, "Rectangle",	// port2
			 	{ 
					position: new go.Point(0, 500 * 0.75),
					portId: "2",
					toSpot: go.Spot.Left,
					width: 0
				}
			),
			$(go.Shape, "Rectangle",	// port3
			 	{ 
					position: new go.Point(20, 500 * 0.5),
					portId: "3",
					toSpot: go.Spot.Right,
					width: 0
				}
			)
		)
	)
	const nodeDataArray = [
		{ key: "bar1", category: "bar" },
		{ key: "server", name: "服务器", category: "leftHost" },
		{ key: "pc", name: "PC", category: "leftHost" },
		{ key: "db", name: "数据库", category: "rightHost" }
	]
  const linkDataArray = [
		{ from: "server", to: "bar1", toPort: "1" },
		{ from: "pc", to: "bar1", toPort: "2" },
		{ from: "db", to: "bar1", toPort: "3" },
	]
	topo.model = new go.GraphLinksModel({
		linkToPortIdProperty: "toPort",
		nodeDataArray,
		linkDataArray
	})
}

export default renderNewTopology