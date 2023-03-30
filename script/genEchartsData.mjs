import { readFile, writeFile } from "fs/promises"

async function readCsv(path) {
	let result = await readFile(path, {
		 encoding: "utf-8" 
	})
	result = result.split("\n")
	return result
}
const expandCsv = await readCsv("../data/statistic_expand.csv")
const pyhopCsv = await readCsv("../data/statistic_PYHOP.csv")
const sgplanCsv = await readCsv("../data/statistic_SGplan.csv")

const hostsNums = []
const pyhopTime = []
const pyhopMem = []
const sgplanTime = []
const sgplanMem = []
for (let i = 1; i < expandCsv.length; i++) {
	const line = expandCsv[i].split("\t")
	hostsNums.push(Number(line[1]))
}
for (let i = 1; i < pyhopCsv.length; i++) {
	const line = pyhopCsv[i].split("\t")
	pyhopTime.push(Number(line[3]))
	pyhopMem.push(Number(line[line.length - 1]))
}
for (let i = 1; i < sgplanCsv.length; i++) {
	const line = sgplanCsv[i].split("\t")
	sgplanTime.push(Number(line[3]))
	sgplanMem.push(Number(line[line.length - 1]))
}

const data = {
	hostsNums,
	pyhopTime,
	pyhopMem,
	sgplanTime,
	sgplanMem
}

await writeFile("../data/chart.json", JSON.stringify(data, null, "\t"))
console.log("gen chart.json successfully")