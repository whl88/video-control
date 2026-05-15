import type { PlasmoCSConfig } from "plasmo"

import { initVideoControl } from "./video-control/init"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*", "http://*/*"],
  run_at: "document_idle"
}

initVideoControl()
