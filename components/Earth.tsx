import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, AdditiveBlending } from 'three'

const vertexShader = `
varying vec3 vNormal;
void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec3 vNormal;
void main() {
  float intensity = pow(max(0.0, 0.7 - dot(vNormal, vec3(0, 0, 1.0))), 3.0);
  gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 2.0;
}
`

export function Earth({ position, radius = 1 }: { position: [number, number, number], radius?: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial color="#2b82c9" roughness={0.6} metalness={0.1} />
      </mesh>
      
      {/* Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[radius * 1.2, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          blending={AdditiveBlending}
          transparent={true}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
