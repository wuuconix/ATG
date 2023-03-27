// import * as echarts from "echarts"
import * as echarts from "../echarts.mjs"

function renderChart() {
	const chart = echarts.init(document.querySelector("#chart"))
	const option = {
		xAxis: {
			data: ['A', 'B', 'C', 'D', 'E']
		},
		yAxis: {},
		series: [
			{
				data: [10, 22, 28, 43, 49],
				type: 'line',
				stack: 'x',
				areaStyle: {}
			},
			{
				data: [5, 4, 3, 5, 10],
				type: 'line',
				stack: 'x',
				areaStyle: {}
			}
		]
	}
	chart.setOption(option)
}

export default renderChart