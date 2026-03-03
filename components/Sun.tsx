import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, AdditiveBlending } from 'three'

export function Sun({ radius = 5 }: { radius?: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Glow layers */}
      <mesh>
        <sphereGeometry args={[radius * 1.2, 64, 64]} />
        <meshBasicMaterial color="#ffddaa" transparent opacity={0.3} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 1.5, 64, 64]} />
        <meshBasicMaterial color="#ffaa55" transparent opacity={0.15} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight intensity={5000} distance={200} decay={2} color="#ffffff" />
    </group>
  )
}
