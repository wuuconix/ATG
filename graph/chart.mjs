// import * as echarts from "echarts"
import * as echarts from "../echarts.mjs"
import chartData from "../data/chart.json" assert { type: "json" }

function genSeries(chartData, chartNum, yName) {
	const result = []
	for (let key of Object.keys(chartData[chartNum])) {
		result.push({
			name: key,
			data: chartData[chartNum][key][yName],
			type: "line"
		})
	}
	return result
}

const i18nMap = new Map(
	[
		["hostsNum", "主机数"],
		["hostvulNum", "主机漏洞数"],
		["serviceNum", "服务数"],
		["conNum", "可达性数"],
		["real_time", "时间（s）"],
		["max_mem", "内存（MB）"],
		["plan_counter", "规划器调用数"],
		["path_num", "攻击路径数"],
		["ag_nnum", "攻击节点数"],
		["ag_enum", "攻击边数"]
	]
)

function renderChart(chartNum, xName, yName) {
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
			name: i18nMap.get(xName),
			nameLocation: "center",
			nameTextStyle: {
				fontSize: "24",
				padding: [20, 0, 0, 0]
			},
			data: chartData[xName]
		},
		yAxis: {
      type: 'value',
      name: i18nMap.get(yName),
			nameLocation: "middle",
			nameTextStyle: {
				fontSize: "24",
				padding: [0, 0, 40, 0]
			},
      min: 0
    },
		series: genSeries(chartData, chartNum, yName)
	})
}

export default renderChart