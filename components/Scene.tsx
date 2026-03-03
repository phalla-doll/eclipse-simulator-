import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Sun } from './Sun'
import { Earth } from './Earth'
import { Moon } from './Moon'
import { OrbitPath } from './OrbitPath'
import { ShadowCone } from './ShadowCone'
import { useSimulationStore } from '../store/simulationStore'
import { getMoonPosition } from '../lib/math'
import { checkLunarEclipse, checkSolarEclipse } from '../lib/eclipseDetection'
import { Vector3 } from 'three'
import { useEffect, useMemo } from 'react'
import { useControls } from 'leva'

const SUN_RADIUS = 5
const EARTH_RADIUS = 1
const MOON_RADIUS = 0.5
const EARTH_DISTANCE = 50
const MOON_DISTANCE = 5

function Simulation() {
  const { time, setTime, isPlaying, timeScale, setEclipseStatus, showOrbits, showShadowCones, cameraPreset } = useSimulationStore()
  
  // Leva controls for dev mode
  const isDev = process.env.NODE_ENV === 'development'
  const { inclination } = useControls({
    inclination: { value: 5, min: 0, max: 10, step: 0.1, render: () => isDev }
  })

  const sunPos = useMemo(() => new Vector3(0, 0, 0), [])
  const earthPos = useMemo(() => new Vector3(EARTH_DISTANCE, 0, 0), [])
  
  const moonRelativePos = useMemo(() => getMoonPosition(time, inclination, MOON_DISTANCE), [time, inclination])
  const moonPos = useMemo(() => new Vector3().copy(earthPos).add(moonRelativePos), [earthPos, moonRelativePos])

  useEffect(() => {
    const lunarStatus = checkLunarEclipse(earthPos, moonPos, sunPos)
    const solarStatus = checkSolarEclipse(earthPos, moonPos, sunPos)
    setEclipseStatus(solarStatus, lunarStatus)
  }, [time, inclination, earthPos, moonPos, sunPos, setEclipseStatus])

  useFrame((state, delta) => {
    if (isPlaying) {
      setTime((time + delta * 10 * timeScale) % 360)
    }
    
    // Camera logic
    const camera = state.camera
    const target = new Vector3()
    
    if (cameraPreset === 'space') {
      target.copy(earthPos)
      camera.position.lerp(new Vector3(EARTH_DISTANCE + 20, 15, 20), 0.05)
    } else if (cameraPreset === 'earth') {
      target.copy(moonPos)
      camera.position.lerp(new Vector3(EARTH_DISTANCE - 2, 0, 0), 0.05)
    } else if (cameraPreset === 'sun') {
      target.copy(earthPos)
      camera.position.lerp(new Vector3(SUN_RADIUS + 2, 0, 0), 0.05)
    }
    
    camera.lookAt(target)
  })

  const earthDir = new Vector3().subVectors(earthPos, sunPos).normalize()
  const moonDir = new Vector3().subVectors(moonPos, sunPos).normalize()

  return (
    <>
      <ambientLight intensity={0.1} />
      <Sun radius={SUN_RADIUS} />
      <Earth position={[earthPos.x, earthPos.y, earthPos.z]} radius={EARTH_RADIUS} />
      <Moon 
        position={[moonPos.x, moonPos.y, moonPos.z]} 
        radius={MOON_RADIUS} 
        isLunarEclipse={useSimulationStore.getState().lunarEclipseStatus === 'Total Eclipse'} 
      />
      
      {showOrbits && (
        <OrbitPath earthPos={earthPos} moonDistance={MOON_DISTANCE} inclination={inclination} />
      )}
      
      {showShadowCones && (
        <>
          {/* Earth Umbra */}
          <ShadowCone 
            startPos={earthPos} 
            dir={earthDir} 
            length={12.5} 
            startRadius={EARTH_RADIUS} 
            endRadius={0} 
            color="#000000" 
            opacity={0.5} 
          />
          {/* Earth Penumbra */}
          <ShadowCone 
            startPos={earthPos} 
            dir={earthDir} 
            length={20} 
            startRadius={EARTH_RADIUS} 
            endRadius={3.4} 
            color="#444444" 
            opacity={0.2} 
          />
          {/* Moon Umbra */}
          <ShadowCone 
            startPos={moonPos} 
            dir={moonDir} 
            length={5} 
            startRadius={MOON_RADIUS} 
            endRadius={0} 
            color="#000000" 
            opacity={0.5} 
          />
          {/* Moon Penumbra */}
          <ShadowCone 
            startPos={moonPos} 
            dir={moonDir} 
            length={10} 
            startRadius={MOON_RADIUS} 
            endRadius={2.7} 
            color="#444444" 
            opacity={0.2} 
          />
        </>
      )}
    </>
  )
}

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [70, 15, 20], fov: 45 }}>
      <color attach="background" args={['#000000']} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Simulation />
      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  )
}
