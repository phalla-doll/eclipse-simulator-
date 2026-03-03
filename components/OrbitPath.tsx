import { Line } from '@react-three/drei'
import { Vector3 } from 'three'
import { getMoonPosition } from '../lib/math'

export function OrbitPath({ earthPos, moonDistance, inclination }: { earthPos: Vector3, moonDistance: number, inclination: number }) {
  const points = []
  for (let i = 0; i <= 360; i += 2) {
    const pos = getMoonPosition(i, inclination, moonDistance)
    points.push(new Vector3().copy(earthPos).add(pos))
  }

  return (
    <Line points={points} color="#ffffff" opacity={0.2} transparent lineWidth={1} />
  )
}
