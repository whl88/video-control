import type { PlasmoCSConfig } from "plasmo"

import "./styles/video-speed-indicator.scss"

import { initVideoControl } from "./init"

export const config: PlasmoCSConfig = {
  matches: ["https://*/*", "http://*/*"],
  run_at: "document_idle"
}

initVideoControl()
