import { ensureLiveExtensionContext } from "../core/extension-context"
import { showSpeedIndicator } from "../video/indicator"
import { getSavedSpeed } from "./speed-storage"

const processedVideos = new WeakSet<HTMLVideoElement>()

const applySpeedToVideo = (video: HTMLVideoElement) => {
  const savedSpeed = getSavedSpeed()
  if (savedSpeed !== 1.0) {
    video.playbackRate = savedSpeed
    setTimeout(() => {
      showSpeedIndicator(video, savedSpeed)
    }, 100)
  }

  if (!processedVideos.has(video)) {
    processedVideos.add(video)
    video.addEventListener("loadedmetadata", () => {
      if (!ensureLiveExtensionContext()) {
        return
      }
      const speed = getSavedSpeed()
      if (speed && speed !== 1.0) {
        video.playbackRate = speed
        setTimeout(() => {
          showSpeedIndicator(video, speed)
        }, 100)
      }
    })
  }
}

export const applySavedSpeed = () => {
  document.querySelectorAll("video").forEach((video) => {
    applySpeedToVideo(video)
  })
}

export const observeNewVideos = (): (() => void) => {
  const observer = new MutationObserver((mutations) => {
    if (!ensureLiveExtensionContext()) {
      return
    }
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element
          if (el.tagName === "VIDEO") {
            applySpeedToVideo(el as HTMLVideoElement)
          } else {
            el.querySelectorAll?.("video").forEach((video) => {
              applySpeedToVideo(video)
            })
          }
        }
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return () => observer.disconnect()
}
