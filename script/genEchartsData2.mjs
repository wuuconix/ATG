import center from "../data/center.json" assert { type: "json" }
import { writeFile } from "fs/promises"

const chart2 = {
  degree: [],
  BC: [],
  "BC'": [],
  CC: [],
  "CC'": [],
  IEC: []
}

for (let i = 0; i < center.length; i++) {
  const c = center[i]
  chart2.degree.push(c.degree)
  chart2.BC.push(c.BC)
  chart2["BC'"].push(c["BC'"])
  chart2.CC.push(c.CC)
  chart2["CC'"].push(c["CC'"])
  chart2.IEC.push(c.IEC)
}

await writeFile("../data/chart2.json", JSON.stringify(chart2, null, "\t"))
console.log("gen chart2.json successfully")