// import go from "gojs"
import go from "../go-debug.mjs"
import modelJson from "../data/newTopologyModel.json" assert { type: "json" }

function renderNewTopology() {
	const $ = go.GraphObject.make
  const topo = new go.Diagram("newTopology")
	topo.undoManager.isEnabled = true
	topo.nodeTemplateMap.add("firewall",
		$(go.Node, "Position",
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
	topo.nodeTemplateMap.add("sensor",
		$(go.Node, "Auto", 
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Picture, 
				{
					width: 80,
					height: 80,
					imageStretch: go.GraphObject.Uniform 
				},
				new go.Binding("source", "img")
			)
		)
	)	
	topo.nodeTemplateMap.add("leftHost",
		$(go.Node, "Horizontal", 
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Panel, "Vertical",
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
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Shape, "Circle",	{
				portId: "",
				fromSpot: go.Spot.Left,
				width: 10,
				margin: new go.Margin(0, 30, 0, 0),
				fill: "white"
			}),
			$(go.Panel, "Vertical",
				$(go.Picture, 
					{
						width: 100,
						height: 100,
						imageStretch: go.GraphObject.Uniform,
						portId: "pic"
					},
					new go.Binding("source", "img")
				),
				$(go.TextBlock, 
					{ margin: new go.Margin(10, 0, 0, 0) },
					new go.Binding("text", "name")
				),
				$(go.Shape, {
					width: 0,
					height: 0,
					portId: "bottom",
					toSpot: go.Spot.Bottom
				})
			)
		)
	)
	topo.nodeTemplateMap.add("bar",
		$(go.Node, "Position",
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
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
	),
	topo.groupTemplateMap.add("controller",
		$(go.Group, "Vertical",
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Shape,{
				figure: "RoundedRectangle",
				fill: "rgba(128,128,128,0.33)",
				width: 120,
				height: 350
			}),
			$(go.TextBlock,
				{ alignment: go.Spot.Bottom, margin: 5 },
				new go.Binding("text", "name")
			)
		)
	)
	topo.groupTemplateMap.add("sensor",
		$(go.Group, "Vertical",
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Shape,{
				figure: "RoundedRectangle",
				fill: "rgba(128,128,128,0.33)",
				width: 200,
				height: 200
			}),
			$(go.TextBlock,
				{ alignment: go.Spot.Bottom, margin: 5 },
				new go.Binding("text", "name")
			)
		)
	)
	topo.groupTemplateMap.add("excutor",
		$(go.Group, "Vertical",
			{	locationSpot: go.Spot.Center },
			new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
			$(go.Shape,{
				figure: "RoundedRectangle",
				fill: "rgba(128,128,128,0.33)",
				width: 200,
				height: 200
			}),
			$(go.TextBlock,
				{ alignment: go.Spot.Bottom, margin: 5 },
				new go.Binding("text", "name")
			)
		)
	)
	topo.linkTemplate = 
		$(go.Link, 
			{ routing: go.Link.Normal },
			new go.Binding("routing", "routing", r => go.Link[r]),
			$(go.Shape)
		)
	topo.linkTemplateMap.add("twoArrow",
		$(go.Link, 
			$(go.Shape),
			$(go.Shape, { fromArrow: "Backward" }),
			$(go.Shape, { toArrow: "Standard" })
		)
	)
	topo.linkTemplateMap.add("oneArrow",
		$(go.Link, 
			$(go.Shape),
			$(go.Shape, { toArrow: "Standard" })
		)
	)
	topo.model = go.Model.fromJson(modelJson)
	window.print = () => {
		console.log(JSON.stringify(JSON.parse(topo.model.toJson()), null, "\t"))
	}
}

export default renderNewTopology