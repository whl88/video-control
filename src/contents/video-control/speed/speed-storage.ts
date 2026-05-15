import { STORAGE_KEY } from "../core/constants"

export const getSavedSpeed = (): number => {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? parseFloat(saved) : 1.0
}

export const saveSpeed = (speed: number) => {
  localStorage.setItem(STORAGE_KEY, speed.toString())
}
