// import go from "gojs"
import go from "../go-debug.mjs"

function renderNewTopology() {
	const $ = go.GraphObject.make
  const topo = new go.Diagram("newTopology")
	topo.nodeTemplateMap.add("firewall",
		$(go.Node, "Position",
			$(go.Picture, {
				source: "https://upyun.wuuconix.link/image-firewall.png",
				width: 100,
				height: 100,
				imageStretch: go.GraphObject.Uniform 
			}),
			$(go.Shape, {
				position: new go.Point(0, 100 * 0.5),
				portId: "left",
				toSpot: go.Spot.Left,
				width: 0,
				height: 0
			}),
			$(go.Shape, {
				position: new go.Point(100, 100 * 0.5),
				portId: "right",
				fromSpot: go.Spot.Right,
				width: 0,
				height: 0
			})
		)
	)
	topo.nodeTemplateMap.add("leftHost",
		$(go.Node, "Horizontal", 
			$(go.Panel, "Vertical",
				$(go.Picture, {
					source: "https://upyun.wuuconix.link/image-attacker.png",
					width: 100,
					height: 100,
					imageStretch: go.GraphObject.Uniform 
				}),
				$(go.TextBlock, new go.Binding("text", "name"))
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
				$(go.TextBlock, new go.Binding("text", "name"))
			)
		)
	)
	topo.nodeTemplateMap.add("bar",
		$(go.Node, "Position",
			$(go.Shape,	{		// bar
				width: 20, height: 500, fill: "white" 
			}),
			$(go.Shape, { 	// left port in 15% height
				position: new go.Point(0, 500 * 0.15),
				portId: "left15",
				toSpot: go.Spot.Left,
				width: 0,
				height: 0
			}),
			$(go.Shape, {		// left port in 50% height
				position: new go.Point(0, 500 * 0.5),
				portId: "left50",
				toSpot: go.Spot.Left,
				width: 0,
				height: 0
			}),
			$(go.Shape, { 	// left port in 80% height
				position: new go.Point(0, 500 * 0.8),
				portId: "left80",
				toSpot: go.Spot.Left,
				width: 0,
				height: 0
			}),
			$(go.Shape, { 	// right port in 25% height
				position: new go.Point(20, 500 * 0.25),
				portId: "right25",
				toSpot: go.Spot.Right,
				width: 0,
				height: 0
			}),
			$(go.Shape, { 	// right port in 50% height
				position: new go.Point(20, 500 * 0.5),
				portId: "right50",
				toSpot: go.Spot.Right,
				width: 0,
				height: 0
			}),
			$(go.Shape, { 	// right port in 60% height
				position: new go.Point(20, 500 * 0.6),
				portId: "right60",
				toSpot: go.Spot.Right,
				width: 0,
				height: 0
			}),
			$(go.Shape, { 	// right port in 90% height
				position: new go.Point(20, 500 * 0.9),
				portId: "right90",
				toSpot: go.Spot.Right,
				width: 0,
				height: 0
			}),
			$(go.Shape, {
				position: new go.Point(10, 500),
				portId: "bottom",
				toSpot: go.Spot.Bottom,
				fromSpot: go.Spot.Bottom,
				width: 0,
				height: 0
			})
		)
	)
	topo.linkTemplate = 
		$(go.Link, 
			{ routing: go.Link.Orthogonal },
			$(go.Shape)
		);
	const nodeDataArray = [
		{ key: "bar1", category: "bar" },
		{ key: "server", name: "服务器", category: "leftHost" },
		{ key: "pc", name: "PC", category: "leftHost" },
		{ key: "db", name: "数据库", category: "rightHost" },
		{ key: "firewall", name: "防火墙", category: "firewall" },
		{ key: "bar2", category: "bar" },
		{ key: "historyDb", name: "历史数据库", category: "leftHost" },
		{ key: "operator", name: "操作员站", category: "leftHost" },
		{ key: "engineer", name: "工程师站", category: "leftHost" },
		{ key: "hmi", name: "HMI", category: "rightHost" }
	]
  const linkDataArray = [
		{ from: "server", to: "bar1", toPort: "left15" },
		{ from: "pc", to: "bar1", toPort: "left80" },
		{ from: "db", to: "bar1", toPort: "right50" },
		{ from: "bar1", to: "firewall", fromPort: "bottom", toPort: "left", },
		{ from: "firewall", to: "bar2", fromPort: "right", toPort: "bottom" },
		{ from: "historyDb", to: "bar2", toPort: "left15" },
		{ from: "operator", to: "bar2", toPort: "left50" },
		{ from: "engineer", to: "bar2", toPort: "left80" },
		{ from: "hmi", to: "bar2", toPort: "right25" }
	]
	topo.model = new go.GraphLinksModel({
		linkFromPortIdProperty: "fromPort",
		linkToPortIdProperty: "toPort",
		nodeDataArray,
		linkDataArray
	})
}

export default renderNewTopology