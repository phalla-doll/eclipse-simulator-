import { create } from 'zustand'

interface SimulationState {
  mode: 'solar' | 'lunar'
  setMode: (mode: 'solar' | 'lunar') => void
  timeScale: number
  setTimeScale: (scale: number) => void
  isPlaying: boolean
  setIsPlaying: (playing: boolean) => void
  showOrbits: boolean
  setShowOrbits: (show: boolean) => void
  showShadowCones: boolean
  setShowShadowCones: (show: boolean) => void
  showLabels: boolean
  setShowLabels: (show: boolean) => void
  cameraPreset: 'space' | 'earth' | 'sun'
  setCameraPreset: (preset: 'space' | 'earth' | 'sun') => void
  cameraResetTrigger: number
  triggerCameraReset: () => void
  time: number // 0 to 360
  setTime: (time: number) => void
  solarEclipseStatus: string
  lunarEclipseStatus: string
  setEclipseStatus: (solar: string, lunar: string) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  mode: 'solar',
  setMode: (mode) => set({ mode, time: mode === 'solar' ? 180 : 0 }),
  timeScale: 1,
  setTimeScale: (scale) => set({ timeScale: scale }),
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  showOrbits: true,
  setShowOrbits: (show) => set({ showOrbits: show }),
  showShadowCones: true,
  setShowShadowCones: (show) => set({ showShadowCones: show }),
  showLabels: true,
  setShowLabels: (show) => set({ showLabels: show }),
  cameraPreset: 'space',
  setCameraPreset: (preset) => set({ cameraPreset: preset }),
  cameraResetTrigger: 0,
  triggerCameraReset: () => set((state) => ({ cameraResetTrigger: state.cameraResetTrigger + 1 })),
  time: 180,
  setTime: (time) => set({ time }),
  solarEclipseStatus: 'No Eclipse',
  lunarEclipseStatus: 'No Eclipse',
  setEclipseStatus: (solar, lunar) => set({ solarEclipseStatus: solar, lunarEclipseStatus: lunar })
}))
