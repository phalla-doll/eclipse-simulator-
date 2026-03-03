import { Vector3 } from 'three'

const SUN_RADIUS = 5
const EARTH_RADIUS = 1
const MOON_RADIUS = 0.5
const EARTH_DISTANCE = 50

export function checkLunarEclipse(earthPos: Vector3, moonPos: Vector3, sunPos: Vector3) {
  // Earth shadow on Moon
  const sunToEarth = new Vector3().subVectors(earthPos, sunPos)
  const d = sunToEarth.length()
  const dir = sunToEarth.clone().normalize()
  
  const earthToMoon = new Vector3().subVectors(moonPos, earthPos)
  const x = earthToMoon.dot(dir) // distance along shadow axis
  
  if (x <= 0) return 'No Eclipse' // Moon is between Sun and Earth
  
  const y = new Vector3().copy(earthToMoon).sub(dir.clone().multiplyScalar(x)).length() // distance from axis
  
  const r_u = EARTH_RADIUS - x * (SUN_RADIUS - EARTH_RADIUS) / d
  const r_p = EARTH_RADIUS + x * (SUN_RADIUS + EARTH_RADIUS) / d
  
  if (y + MOON_RADIUS < r_u) return 'Total Eclipse'
  if (y - MOON_RADIUS < r_p) return 'Partial Eclipse'
  return 'No Eclipse'
}

export function checkSolarEclipse(earthPos: Vector3, moonPos: Vector3, sunPos: Vector3) {
  // Moon shadow on Earth
  const sunToMoon = new Vector3().subVectors(moonPos, sunPos)
  const d_m = sunToMoon.length()
  const dir = sunToMoon.clone().normalize()
  
  const moonToEarth = new Vector3().subVectors(earthPos, moonPos)
  const x = moonToEarth.dot(dir)
  
  if (x <= 0) return 'No Eclipse' // Earth is between Sun and Moon
  
  const y = new Vector3().copy(moonToEarth).sub(dir.clone().multiplyScalar(x)).length()
  
  const r_u = MOON_RADIUS - x * (SUN_RADIUS - MOON_RADIUS) / d_m
  const r_p = MOON_RADIUS + x * (SUN_RADIUS + MOON_RADIUS) / d_m
  
  // Earth is large, so we check if the shadow hits Earth
  // If the umbra hits any part of Earth, we call it Total Eclipse
  if (y < EARTH_RADIUS + r_u) return 'Total Eclipse'
  if (y < EARTH_RADIUS + r_p) return 'Partial Eclipse'
  return 'No Eclipse'
}
