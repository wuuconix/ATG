// import * as echarts from "echarts"
import * as echarts from "../echarts.mjs"
import chartData from "../data/chart.json" assert { type: "json" }

function renderChart() {
	const chart = echarts.init(document.querySelector("#chart"))
	chart.setOption({
		tooltip: {
			trigger: 'axis',
			axisPointer: { type: 'cross' }
		},
		legend: {
			orient: "vertical",
			top: "center",
			right: 30
		},
		xAxis: {
			// type: "value",
			name: "主机数",
			nameLocation: "center",
			nameTextStyle: {
				fontSize: "24",
				padding: [20, 0, 0, 0]
			},
			data: chartData.hostsNums
		},
		yAxis: {
      type: 'value',
      name: '时间',
			nameLocation: "middle",
			nameTextStyle: {
				fontSize: "24",
				padding: [0, 0, 20, 0]
			},
      min: 0,
      max: 2500,
      axisLabel: {
        formatter: '{value}s'
      },
    },
		series: [
			{
				name: "pyhop",
				data: chartData.pyhopTime,
				type: "line"
			},
			{
				name: "sgplan",
				data: chartData.sgplanTime,
				type: "line"
			}
		]
	})
}

export default renderChart