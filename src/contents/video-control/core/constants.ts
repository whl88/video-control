export const WHEEL_LISTENER_OPTS: AddEventListenerOptions = {
  capture: true,
  passive: false
}

export const STORAGE_KEY = "video_speed"

export const INDICATOR_BASE_STYLE = `
  position: fixed;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 20px;
  font-weight: bold;
  z-index: 999999;
  pointer-events: none;
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`
