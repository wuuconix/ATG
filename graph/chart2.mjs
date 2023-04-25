// import * as echarts from "echarts"
import * as echarts from "../echarts.mjs"
import chartData from "../data/chart2.json" assert { type: "json" }

function genSeries(chartData, chartNum) {
	const result = []
	const yMap = new Map([
		[3, ["degree", "BC", "CC"]],
		[4, ["IEC", "BC'", "CC'"]]
	])
	const keys = yMap.get(Number(chartNum))
	keys.forEach(key => {
		result.push({
			name: key,
			data: chartData[key],
			type: "line"
		})
	})
	return result
}

function renderChart(chartNum) {
	const chart = echarts.init(document.querySelector(`#chart`))
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
			name: "排序",
			nameLocation: "center",
			nameTextStyle: {
				fontSize: "24",
				padding: [20, 0, 0, 0]
			},
			data: new Array(16).fill(1).map((v, i) => v + i)		// [1, 2, 3, .... 15, 16]
		},
		yAxis: {
      type: 'value',
      name: "得分",
			nameLocation: "middle",
			nameTextStyle: {
				fontSize: "24",
				padding: [0, 0, 40, 0]
			},
      min: 0
    },
		series: genSeries(chartData, chartNum)
	})
}

export default renderChart