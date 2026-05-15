import { WHEEL_LISTENER_OPTS } from "../core/constants"
import { ensureLiveExtensionContext } from "../core/extension-context"
import { adjustVideoSpeed, resetVideoSpeed, seekVideo } from "../video/video-actions"
import { isMouseOverVideo } from "../video/video-utils"

const consumeWheelIfVideoModifier = (e: WheelEvent, handler: () => void) => {
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()
  handler()
}

export const handleWheel = (e: WheelEvent) => {
  if (!ensureLiveExtensionContext()) {
    return
  }

  const hasCtrl = e.ctrlKey
  const hasShift = e.shiftKey
  if (!hasCtrl && !hasShift) {
    return
  }

  const video = isMouseOverVideo(e.clientX, e.clientY)
  if (!video) {
    return
  }

  if (hasCtrl) {
    consumeWheelIfVideoModifier(e, () => seekVideo(video, e.deltaY))
    return
  }

  if (hasShift) {
    consumeWheelIfVideoModifier(e, () => adjustVideoSpeed(video, e.deltaY))
  }
}

export const handleClick = (e: MouseEvent) => {
  if (!ensureLiveExtensionContext()) {
    return
  }

  if (!e.shiftKey) {
    return
  }

  const video = isMouseOverVideo(e.clientX, e.clientY)
  if (!video) {
    return
  }

  e.preventDefault()
  e.stopPropagation()

  resetVideoSpeed(video)
}

export { WHEEL_LISTENER_OPTS }
