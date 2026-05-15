/** 扩展被重载/更新后，旧内容脚本上下文会失效；继续跑逻辑可能抛错，这里统一收尾。 */
let live = true
const onDeactivateCallbacks: (() => void)[] = []

export const registerOnDeactivate = (callback: () => void) => {
  onDeactivateCallbacks.push(callback)
}

export const isExtensionContextValid = (): boolean => {
  try {
    return Boolean(
      typeof chrome !== "undefined" &&
        chrome.runtime &&
        typeof chrome.runtime.id === "string" &&
        chrome.runtime.id.length > 0
    )
  } catch {
    return false
  }
}

export const deactivate = () => {
  if (!live) {
    return
  }
  live = false
  for (const callback of onDeactivateCallbacks) {
    callback()
  }
  onDeactivateCallbacks.length = 0
}

export const ensureLiveExtensionContext = (): boolean => {
  if (!live) {
    return false
  }
  if (!isExtensionContextValid()) {
    deactivate()
    return false
  }
  return true
}
