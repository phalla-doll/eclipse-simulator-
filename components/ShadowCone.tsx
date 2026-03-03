import { useRef, useEffect } from 'react'
import { Mesh, Vector3, Quaternion, DoubleSide } from 'three'

export function ShadowCone({ 
  startPos, 
  dir, 
  length, 
  startRadius, 
  endRadius, 
  color, 
  opacity 
}: { 
  startPos: Vector3, 
  dir: Vector3, 
  length: number, 
  startRadius: number, 
  endRadius: number, 
  color: string, 
  opacity: number 
}) {
  const meshRef = useRef<Mesh>(null)

  useEffect(() => {
    if (meshRef.current) {
      // CylinderGeometry is oriented along Y axis.
      // Top is at y = length/2, Bottom is at y = -length/2.
      // We want the bottom (startRadius) to be at startPos, and top (endRadius) to point along dir.
      const position = new Vector3().copy(startPos).add(dir.clone().multiplyScalar(length / 2))
      meshRef.current.position.copy(position)
      
      const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir)
      meshRef.current.quaternion.copy(quaternion)
    }
  }, [startPos, dir, length])

  return (
    <mesh ref={meshRef}>
      <cylinderGeometry args={[endRadius, startRadius, length, 32]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={DoubleSide} depthWrite={false} />
    </mesh>
  )
}
