import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function Earth({ position, radius = 1 }: { position: [number, number, number], radius?: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial color="#2b82c9" roughness={0.6} metalness={0.1} />
    </mesh>
  )
}
