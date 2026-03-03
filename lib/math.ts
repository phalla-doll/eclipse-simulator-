import { Vector3 } from 'three'

export function getMoonPosition(timeDegrees: number, inclinationDegrees: number, moonDistance: number) {
  const angle = timeDegrees * Math.PI / 180
  const inc = inclinationDegrees * Math.PI / 180
  
  // Un-tilted position in XZ plane
  const x = moonDistance * Math.cos(angle)
  const z = moonDistance * Math.sin(angle)
  
  // Tilt around Z axis so that at angle=0 (x=moonDistance), y is affected by inclination
  // This means the ascending node is at 90 degrees (Z axis)
  const x_tilted = x * Math.cos(inc)
  const y_tilted = x * Math.sin(inc)
  
  return new Vector3(x_tilted, y_tilted, z)
}
