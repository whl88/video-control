import { INDICATOR_BASE_STYLE } from "../core/constants"
import { formatTime } from "./video-utils"

type IndicatorData = {
  element: HTMLDivElement
  timeout: ReturnType<typeof setTimeout> | null
}

const videoIndicators = new WeakMap<HTMLVideoElement, IndicatorData>()

const getOrCreateIndicator = (video: HTMLVideoElement): IndicatorData => {
  let indicatorData = videoIndicators.get(video)
  if (!indicatorData) {
    const indicator = document.createElement("div")
    indicator.className = "video-speed-indicator"
    indicator.style.cssText = INDICATOR_BASE_STYLE
    indicatorData = { element: indicator, timeout: null }
    videoIndicators.set(video, indicatorData)
    document.body.appendChild(indicator)
  }
  return indicatorData
}

const positionIndicatorNearVideo = (
  indicator: HTMLElement,
  video: HTMLVideoElement
) => {
  const rect = video.getBoundingClientRect()
  indicator.style.top = `${rect.top + 15}px`
  indicator.style.right = `${window.innerWidth - rect.right + 15}px`
}

const scheduleIndicatorHide = (indicatorData: IndicatorData) => {
  const { element: indicator } = indicatorData
  indicatorData.timeout = setTimeout(() => {
    if (indicator.parentElement) {
      indicator.style.opacity = "0"
      setTimeout(() => {
        if (indicator.style.opacity === "0") {
          indicator.style.display = "none"
        }
      }, 300)
    }
  }, 1000)
}

const showIndicator = (video: HTMLVideoElement, text: string) => {
  const indicatorData = getOrCreateIndicator(video)
  const { element: indicator, timeout } = indicatorData

  if (timeout) {
    clearTimeout(timeout)
  }

  indicator.textContent = text
  positionIndicatorNearVideo(indicator, video)
  indicator.style.opacity = "1"
  indicator.style.display = "block"
  indicator.style.visibility = "visible"

  scheduleIndicatorHide(indicatorData)
}

export const showSpeedIndicator = (video: HTMLVideoElement, speed: number) => {
  showIndicator(video, `${speed.toFixed(1)}x`)
}

export const showSeekIndicator = (video: HTMLVideoElement, direction: number) => {
  const currentTime = video.currentTime
  const duration = video.duration || 0
  const symbol = direction < 0 ? "⏩" : "⏪"
  showIndicator(
    video,
    `${symbol} ${formatTime(currentTime)} / ${formatTime(duration)}`
  )
}
