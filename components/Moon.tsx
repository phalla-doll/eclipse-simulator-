import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function Moon({ position, radius = 0.5, isLunarEclipse }: { position: [number, number, number], radius?: number, isLunarEclipse: boolean }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial 
        color={isLunarEclipse ? "#8b2a2a" : "#aaaaaa"} 
        roughness={0.9} 
        metalness={0.0} 
      />
    </mesh>
  )
}
