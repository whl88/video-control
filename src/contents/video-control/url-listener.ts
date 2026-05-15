import { ensureLiveExtensionContext } from "./extension-context"
import { applySavedSpeed } from "./speed-applier"

export const setupUrlChangeListener = (): (() => void) => {
  let currentUrl = window.location.href
  let timer: ReturnType<typeof setTimeout> | null = null

  const scheduleApplySpeed = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      if (!ensureLiveExtensionContext()) {
        return
      }
      applySavedSpeed()
    }, 300)
  }

  const handleUrlMaybeChanged = () => {
    const newUrl = window.location.href

    if (newUrl !== currentUrl) {
      currentUrl = newUrl
      scheduleApplySpeed()
    }
  }

  const onPopState = () => {
    if (!ensureLiveExtensionContext()) {
      return
    }
    handleUrlMaybeChanged()
  }

  window.addEventListener("popstate", onPopState)

  const originalPushState = history.pushState.bind(history)
  const originalReplaceState = history.replaceState.bind(history)

  history.pushState = (...args: Parameters<History["pushState"]>) => {
    originalPushState(...args)
    handleUrlMaybeChanged()
  }

  history.replaceState = (...args: Parameters<History["replaceState"]>) => {
    originalReplaceState(...args)
    handleUrlMaybeChanged()
  }

  const urlObserver = new MutationObserver(() => {
    if (!ensureLiveExtensionContext()) {
      return
    }
    handleUrlMaybeChanged()
  })

  urlObserver.observe(document, {
    childList: true,
    subtree: true
  })

  return () => {
    window.removeEventListener("popstate", onPopState)
    urlObserver.disconnect()
    if (timer) {
      clearTimeout(timer)
    }
    history.pushState = originalPushState
    history.replaceState = originalReplaceState
  }
}
