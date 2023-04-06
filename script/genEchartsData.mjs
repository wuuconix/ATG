import { readFile, writeFile } from "fs/promises"

async function readCsv(path) {
	let result = await readFile(path, {
		 encoding: "utf-8" 
	})
	result = result.split("\n")
	return result
}

const expandCsv = await readCsv("../data/statistic_expand.csv")
const allFdCsv = await readCsv("../data/statistic_all_fd.csv")
const allPyhopCsv = await readCsv("../data/statistic_all_PYHOP.csv")
const sgplanCsv = await readCsv("../data/statistic_SGplan.csv")
const popfCsv = await readCsv("../data/statistic_POPF.csv")
const pyhopCsv = await readCsv("../data/statistic_PYHOP.csv")
const ffCsv = await readCsv("../data/statistic_FF.csv")
const fdCsv = await readCsv("../data/statistic_FD.csv")

function genChartStructure(type) {
	if (type == "chart1") {
		return { 
			real_time: [],
			max_mem: [],
			path_num: [],
			ag_nnum: [],
			ag_enum: []
		}
	} else if (type == "chart2") {
		return {
			real_time: [],
			max_mem: [],
			plan_counter: [],
			path_num: [],
			ag_nnum: [],
			ag_enum: []
		}
	}
}

const result = {
	hostsNum: [],
	hostvulNum: [],
	serviceNum: [],
	conNum: [],
	chart1: {
		fd: genChartStructure("chart1"),
		pyhop: genChartStructure("chart1")
	},
	chart2: {
		sgplan: genChartStructure("chart2"),
		popf: genChartStructure("chart2"),
		pyhop: genChartStructure("chart2"),
		ff: genChartStructure("chart2"),
		fd: genChartStructure("chart2"),
	}
}

for (let i = 1; i < expandCsv.length; i++) {
	const line = expandCsv[i].split("\t")
	result.hostsNum.push(Number(line[1]))
	result.hostvulNum.push(Number(line[3]))
	result.serviceNum.push(Number(line[4]))
	result.conNum.push(Number(line[5]))
}

function getChartData(type, csv, name) {
	if (type == "chart1") {
		for (let i = 1; i < csv.length; i++) {
			const line = csv[i].split("\t")
			result.chart1[name].real_time.push(Number(line[8]))
			result.chart1[name].max_mem.push(Math.floor(Number(line[12]) / 1000))		// change from KB to MB
			result.chart1[name].path_num.push(Number(line[11]))
			result.chart1[name].ag_nnum.push(Number(line[9]))
			result.chart1[name].ag_enum.push(Number(line[10]))
		}
	} else if (type == "chart2") {
		for (let i = 1; i < csv.length; i++) {
			const line = csv[i].split("\t")
			result.chart2[name].real_time.push(Number(line[3]))
			result.chart2[name].max_mem.push(Math.floor(Number(line[8]) / 1000))		// change from KB to MB
			result.chart2[name].plan_counter.push(Number(line[7]))
			result.chart2[name].path_num.push(Number(line[6]))
			result.chart2[name].ag_nnum.push(Number(line[4]))
			result.chart2[name].ag_enum.push(Number(line[5]))
		}
	}
}

getChartData("chart1", allFdCsv, "fd")
getChartData("chart1", allPyhopCsv, "pyhop")
getChartData("chart2", sgplanCsv, "sgplan"),
getChartData("chart2", popfCsv, "popf"),
getChartData("chart2", pyhopCsv, "pyhop"),
getChartData("chart2", ffCsv, "ff"),
getChartData("chart2", fdCsv, "fd"),

await writeFile("../data/chart.json", JSON.stringify(result, null, "\t"))
console.log("gen chart.json successfully")