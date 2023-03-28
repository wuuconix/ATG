// import * as echarts from "echarts"
import * as echarts from "../echarts.mjs"

function renderChart(chartData, divID, type = "time") {
	const chart = echarts.init(document.querySelector(`#${divID}`))
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
      name: type == "time" ? "时间" : "内存",
			nameLocation: "middle",
			nameTextStyle: {
				fontSize: "24",
				padding: [0, 0, 40, 0]
			},
      min: 0,
      max: type == "time" ? 2500 : 180,
      axisLabel: {
        formatter: type == "time" ? "{value}s" : "{value}MB"
      },
    },
		series: [
			{
				name: "pyhop",
				data: type == "time" ? chartData.pyhopTime : chartData.pyhopMem.map(d => d / 1000),
				type: "line"
			},
			{
				name: "sgplan",
				data: type == "time" ? chartData.sgplanTime : chartData.sgplanMem.map(d => d / 1000),
				type: "line"
			}
		]
	})
}

export default renderChart