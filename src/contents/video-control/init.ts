import {
  registerOnDeactivate,
  isExtensionContextValid
} from "./extension-context"
import { handleClick, handleWheel, WHEEL_LISTENER_OPTS } from "./events"
import { applySavedSpeed, observeNewVideos } from "./speed-applier"
import { setupUrlChangeListener } from "./url-listener"

export const initVideoControl = () => {
  if (!isExtensionContextValid()) {
    return
  }

  let disposeVideoObserver: (() => void) | null = null
  let disposeUrlListener: (() => void) | null = null

  registerOnDeactivate(() => {
    window.removeEventListener("wheel", handleWheel, WHEEL_LISTENER_OPTS)
    document.removeEventListener("click", handleClick, true)
    disposeVideoObserver?.()
    disposeUrlListener?.()
    disposeVideoObserver = null
    disposeUrlListener = null
  })

  window.addEventListener("wheel", handleWheel, WHEEL_LISTENER_OPTS)
  document.addEventListener("click", handleClick, true)

  const startObservers = () => {
    applySavedSpeed()
    disposeVideoObserver = observeNewVideos()
    disposeUrlListener = setupUrlChangeListener()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startObservers, { once: true })
  } else {
    startObservers()
  }
}
