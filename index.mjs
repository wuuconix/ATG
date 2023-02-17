import mermaid from './mermaid.min.mjs'

document.querySelector("pre").innerHTML = `
  graph TD
  A(("IIS_bof(0, 0)"))
  G(("squid_port_scan\n(0, 3)"))
  H(("LICQ_remote_to_\nuser(0, 3)"))
  F(("local_setuid_bo\nf(3, 3)"))
  c1["User(0)"]
  c2["IIS(0)"]
  c3["Root(0)"]
  c4["squid proxy(0, 3)"]
  c5["LICQ_port(0, 3)"]
  c6["LICQ(0, 3)"]
  c7["User(3)"]
  c8["Root(3)"]
  c1 --> A
  c2 --> A
  A --> c3
  c3 --> G
  c4 --> G
  G --> c5
  c5 --> H
  c6 --> H
  H --> c7
  c7 --> F
  F --> c8
`

document.addEventListener("load", () => {
  mermaid.initialize({ startOnLoad: true })
})