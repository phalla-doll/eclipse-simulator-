import { useSimulationStore } from '../store/simulationStore'
import { Play, Pause } from 'lucide-react'

export function UIPanel() {
  const { 
    mode, setMode, 
    timeScale, setTimeScale, 
    isPlaying, setIsPlaying, 
    showOrbits, setShowOrbits, 
    showShadowCones, setShowShadowCones, 
    cameraPreset, setCameraPreset, 
    cameraResetTrigger, triggerCameraReset,
    time, setTime, 
    inclination, setInclination,
    solarEclipseStatus, lunarEclipseStatus 
  } = useSimulationStore()

  return (
    <div className="absolute top-0 right-0 w-80 h-full bg-black/80 border-l border-white/10 text-white p-6 flex flex-col gap-6 font-sans backdrop-blur-md z-10 overflow-y-auto">
      <div>
        <h1 className="text-2xl font-medium tracking-tight mb-1">Eclipse Simulator</h1>
        <p className="text-xs text-white/50 font-mono uppercase tracking-widest">Orbital Mechanics</p>
      </div>

      {/* Status Panel */}
      <div className="bg-white/5 border border-white/10 p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/50 uppercase tracking-wider">Solar</span>
          <span className={`text-sm font-medium ${solarEclipseStatus === 'Total Eclipse' ? 'text-emerald-400' : solarEclipseStatus === 'Partial Eclipse' ? 'text-amber-400' : 'text-white/70'}`}>
            {solarEclipseStatus}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-white/50 uppercase tracking-wider">Lunar</span>
          <span className={`text-sm font-medium ${lunarEclipseStatus === 'Total Eclipse' ? 'text-emerald-400' : lunarEclipseStatus === 'Partial Eclipse' ? 'text-amber-400' : 'text-white/70'}`}>
            {lunarEclipseStatus}
          </span>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex bg-white/5 border border-white/10 p-1">
        <button 
          className={`flex-1 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${mode === 'solar' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
          onClick={() => setMode('solar')}
        >
          Solar
        </button>
        <button 
          className={`flex-1 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${mode === 'lunar' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
          onClick={() => setMode('lunar')}
        >
          Lunar
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50 uppercase tracking-wider">Timeline</span>
          <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 hover:bg-white/10 rounded-none transition-colors">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>
        <input 
          type="range" 
          min="0" max="360" step="0.1" 
          value={time} 
          onChange={(e) => { setTime(parseFloat(e.target.value)); setIsPlaying(false); }}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-[10px] text-white/30 font-mono">
          <span>0°</span>
          <span>180°</span>
          <span>360°</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50 uppercase tracking-wider">Speed ({timeScale}x)</span>
        </div>
        <input 
          type="range" 
          min="0.1" max="50" step="0.1" 
          value={timeScale} 
          onChange={(e) => setTimeScale(parseFloat(e.target.value))}
          className="w-full accent-white"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50 uppercase tracking-wider">Inclination ({inclination}°)</span>
        </div>
        <input 
          type="range" 
          min="0" max="10" step="0.1" 
          value={inclination} 
          onChange={(e) => setInclination(parseFloat(e.target.value))}
          className="w-full accent-white"
        />
      </div>

      {/* View Options */}
      <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-white/10">
        <span className="text-xs text-white/50 uppercase tracking-wider mb-2">View Options</span>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Show Orbits</span>
          <input type="checkbox" checked={showOrbits} onChange={(e) => setShowOrbits(e.target.checked)} className="accent-white" />
        </label>
        
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm text-white/70 group-hover:text-white transition-colors">Show Shadow Cones</span>
          <input type="checkbox" checked={showShadowCones} onChange={(e) => setShowShadowCones(e.target.checked)} className="accent-white" />
        </label>
      </div>

      {/* Camera Presets */}
      <div className="flex flex-col gap-3 mt-4 pt-6 border-t border-white/10">
        <span className="text-xs text-white/50 uppercase tracking-wider mb-2">Camera</span>
        <div className="grid grid-cols-3 gap-2">
          {['space', 'earth', 'sun'].map((preset) => (
            <button 
              key={preset}
              onClick={() => setCameraPreset(preset as any)}
              className={`py-2 text-[10px] font-medium uppercase tracking-wider border transition-colors ${cameraPreset === preset ? 'bg-white/10 border-white/30 text-white' : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white'}`}
            >
              {preset}
            </button>
          ))}
        </div>
        <button 
          onClick={triggerCameraReset}
          className="mt-2 py-2 text-xs font-medium uppercase tracking-wider border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors"
        >
          Reset Camera
        </button>
      </div>
    </div>
  )
}
