import { showSeekIndicator, showSpeedIndicator } from "./indicator"
import { saveSpeed } from "./speed-storage"

export const adjustVideoSpeed = (video: HTMLVideoElement, delta: number) => {
  const currentSpeed = video.playbackRate || 1.0
  const step = 0.1
  let newSpeed: number

  if (delta < 0) {
    newSpeed = Math.min(currentSpeed + step, 16.0)
  } else {
    newSpeed = Math.max(currentSpeed - step, 0.25)
  }

  newSpeed = Math.round(newSpeed * 10) / 10

  video.playbackRate = newSpeed
  saveSpeed(newSpeed)
  showSpeedIndicator(video, newSpeed)
}

export const seekVideo = (video: HTMLVideoElement, delta: number) => {
  const step = 5
  const currentTime = video.currentTime || 0
  const duration = video.duration || 0
  let newTime: number

  if (delta < 0) {
    newTime = Math.min(currentTime + step, duration)
  } else {
    newTime = Math.max(currentTime - step, 0)
  }

  video.currentTime = newTime
  showSeekIndicator(video, delta)
}

export const resetVideoSpeed = (video: HTMLVideoElement) => {
  video.playbackRate = 1.0
  saveSpeed(1.0)
  showSpeedIndicator(video, 1.0)
}
